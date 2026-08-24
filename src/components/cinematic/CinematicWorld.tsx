"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Component,
  type MutableRefObject,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
} from "react";
import * as THREE from "three";

export type CinematicQuality = "essential" | "balanced" | "premium";

type WorldProps = {
  progress: MutableRefObject<number>;
  quality: CinematicQuality;
};

type CinematicWorldProps = WorldProps & {
  renderProgress: number;
};

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const range = (value: number, start: number, end: number) =>
  clamp01((value - start) / (end - start));
const ease = (value: number) => value * value * (3 - 2 * value);
const visible = (value: number, start: number, end: number, feather = 0.035) =>
  ease(range(value, start, start + feather)) *
  (1 - ease(range(value, end - feather, end)));

function seeded(seed: number) {
  return Math.abs(Math.sin(seed * 12.9898 + 78.233) * 43758.5453) % 1;
}

function CameraRig({ progress }: Pick<WorldProps, "progress">) {
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        [
          new THREE.Vector3(0, 0, 10),
          new THREE.Vector3(0, -0.25, 8.6),
          new THREE.Vector3(-0.8, 0.5, 11.5),
          new THREE.Vector3(1.2, -0.35, 8.2),
          new THREE.Vector3(-1.1, 0.35, 10.8),
          new THREE.Vector3(0, 0, 9.2),
        ],
        false,
        "catmullrom",
        0.38,
      ),
    [],
  );

  const targetCurve = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, -0.4, -1.5),
        new THREE.Vector3(0.3, 0, -2.4),
        new THREE.Vector3(-0.5, 0.15, -1),
        new THREE.Vector3(0, 0, -2),
      ]),
    [],
  );

  useFrame(({ camera }) => {
    const p = clamp01(progress.current);
    camera.position.copy(curve.getPointAt(p));
    camera.lookAt(targetCurve.getPointAt(p));
  });

  return null;
}

function QuestionRibbon({ progress }: Pick<WorldProps, "progress">) {
  const group = useRef<THREE.Group>(null);
  const material = useRef<THREE.MeshStandardMaterial>(null);
  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.9, 1.05, 0),
      new THREE.Vector3(-0.55, 1.62, 0.05),
      new THREE.Vector3(0.32, 1.78, -0.05),
      new THREE.Vector3(0.82, 1.2, 0),
      new THREE.Vector3(0.66, 0.55, 0.08),
      new THREE.Vector3(0.05, 0.2, -0.03),
      new THREE.Vector3(0.02, -0.35, 0),
    ]);
    return new THREE.TubeGeometry(curve, 72, 0.055, 8, false);
  }, []);

  useFrame(() => {
    const p = progress.current;
    const first = visible(p, 0.055, 0.24, 0.035);
    const returnBeat = visible(p, 0.87, 0.995, 0.03);
    const opacity = Math.max(first, returnBeat);

    if (material.current) material.current.opacity = opacity;
    if (group.current) {
      group.current.visible = opacity > 0.002;
      group.current.rotation.z = -0.08 + range(p, 0.05, 0.24) * 0.2;
      group.current.position.z = -0.8 - range(p, 0.09, 0.22) * 2.4;
      const scale = 0.82 + range(p, 0.05, 0.18) * 0.42;
      group.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={group} position={[0, -0.12, -0.8]}>
      <mesh geometry={geometry}>
        <meshStandardMaterial
          ref={material}
          color="#ff5a2f"
          emissive="#9c1f08"
          emissiveIntensity={0.35}
          roughness={0.48}
          transparent
          opacity={0}
        />
      </mesh>
      <mesh position={[0.02, -0.76, 0]}>
        <sphereGeometry args={[0.075, 18, 18]} />
        <meshStandardMaterial color="#ff5a2f" emissive="#8a1d09" />
      </mesh>
    </group>
  );
}

function PaperArchive({ progress, quality }: WorldProps) {
  const count = quality === "premium" ? 144 : quality === "balanced" ? 88 : 38;
  const mesh = useRef<THREE.InstancedMesh>(null);
  const material = useRef<THREE.MeshStandardMaterial>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const seeds = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => ({
        a: seeded(index + 1),
        b: seeded(index + 91),
        c: seeded(index + 413),
        d: seeded(index + 997),
      })),
    [count],
  );

  useEffect(() => {
    const current = mesh.current;
    if (!current) return;
    seeds.forEach((seed, index) => {
      const tone = new THREE.Color().setHSL(
        0.105 + seed.c * 0.025,
        0.2,
        0.78 + seed.a * 0.13,
      );
      current.setColorAt(index, tone);
    });
    if (current.instanceColor) current.instanceColor.needsUpdate = true;
  }, [seeds]);

  useFrame(() => {
    const current = mesh.current;
    if (!current) return;

    const p = progress.current;
    const normalPresence = visible(p, 0.14, 0.49, 0.055);
    const correctionPresence = visible(p, 0.898, 0.946, 0.012);
    const presence = Math.max(normalPresence, correctionPresence);
    current.visible = presence > 0.002;
    if (material.current) material.current.opacity = presence * 0.94;
    if (!current.visible) return;

    const revising = ease(range(p, 0.904, 0.936));
    const arrival = correctionPresence > normalPresence ? 1 : ease(range(p, 0.16, 0.29));
    const alignment = correctionPresence > normalPresence ? 1 : ease(range(p, 0.31, 0.42));

    seeds.forEach((seed, index) => {
      const depth = -2.5 - seed.c * 13;
      const archiveX = (seed.a - 0.5) * 16;
      const archiveY = (seed.b - 0.5) * 9;
      const stormX = archiveX + Math.sin(seed.d * 15 + arrival * 5) * 1.8;
      const stormY = archiveY + Math.cos(seed.a * 18 + arrival * 4) * 1.2;
      const column = index % 11;
      const row = Math.floor(index / 11);
      const alignedX = (column - 5) * 0.72;
      const alignedY = (3.5 - row) * 0.44;
      const alignedZ = -2.4 - (index % 3) * 0.018;

      const baseX = THREE.MathUtils.lerp(stormX, alignedX, alignment);
      const baseY = THREE.MathUtils.lerp(stormY, alignedY, alignment);
      const baseZ = THREE.MathUtils.lerp(depth, alignedZ, alignment);
      const correctedX = (index / Math.max(1, count - 1) - 0.5) * 12;
      const correctedY = Math.sin(index * 0.31) * 0.58;
      const correctedZ = -2.2 - Math.cos(index * 0.17) * 0.34;

      dummy.position.set(
        THREE.MathUtils.lerp(baseX, correctedX, revising),
        THREE.MathUtils.lerp(baseY, correctedY, revising),
        THREE.MathUtils.lerp(baseZ, correctedZ, revising),
      );
      dummy.rotation.set(
        THREE.MathUtils.lerp((seed.b - 0.5) * 1.4, 0, alignment),
        THREE.MathUtils.lerp((seed.c - 0.5) * 1.8, 0, alignment),
        THREE.MathUtils.lerp(
          THREE.MathUtils.lerp((seed.d - 0.5) * 1.2, 0, alignment),
          Math.sin(index * 0.24) * 0.16,
          revising,
        ),
      );
      const inScale = 0.2 + arrival * 0.8;
      dummy.scale.set(1.15 * inScale, 0.78 * inScale, 1);
      dummy.updateMatrix();
      current.setMatrixAt(index, dummy.matrix);
    });

    current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1.35, 0.018]} />
      <meshStandardMaterial
        ref={material}
        vertexColors
        color="#f4efe3"
        roughness={0.92}
        metalness={0}
        transparent
        opacity={0}
      />
    </instancedMesh>
  );
}

function TabWave({ progress, quality }: WorldProps) {
  const count = quality === "premium" ? 170 : quality === "balanced" ? 108 : 42;
  const mesh = useRef<THREE.InstancedMesh>(null);
  const material = useRef<THREE.MeshStandardMaterial>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    const current = mesh.current;
    if (!current) return;
    const p = progress.current;
    const normalPresence = visible(p, 0.49, 0.75, 0.045);
    const correctionPresence = visible(p, 0.875, 0.914, 0.009);
    const presence = Math.max(normalPresence, correctionPresence);
    current.visible = presence > 0.002;
    if (material.current) material.current.opacity = presence * 0.88;
    if (!current.visible) return;

    const revising = ease(range(p, 0.88, 0.907));
    const release = correctionPresence > normalPresence ? 1 : ease(range(p, 0.52, 0.63));
    const fold = correctionPresence > normalPresence
      ? 1 - revising
      : ease(range(p, 0.65, 0.735));

    for (let index = 0; index < count; index += 1) {
      const t = index / (count - 1);
      const row = index % 6;
      const flatX = (index % 9 - 4) * 0.88;
      const flatY = (Math.floor(index / 9) - 5) * 0.33;
      const waveX = (t - 0.5) * 20;
      const waveY = Math.sin(t * Math.PI * 5.2 + release * 2.8) * 2.3 + (row - 2.5) * 0.12;
      const waveZ = -2.5 - Math.cos(t * Math.PI * 2) * 2.8 - row * 0.08;
      const foldX = (index % 5 - 2) * 1.05;
      const foldY = (2.5 - Math.floor((index % 30) / 5)) * 0.52;
      const foldZ = -2.2 - Math.floor(index / 30) * 0.08;

      const releasedX = THREE.MathUtils.lerp(flatX, waveX, release);
      const releasedY = THREE.MathUtils.lerp(flatY, waveY, release);
      const releasedZ = THREE.MathUtils.lerp(-1.8, waveZ, release);

      dummy.position.set(
        THREE.MathUtils.lerp(releasedX, foldX, fold),
        THREE.MathUtils.lerp(releasedY, foldY, fold),
        THREE.MathUtils.lerp(releasedZ, foldZ, fold),
      );
      dummy.rotation.set(
        THREE.MathUtils.lerp(Math.sin(t * 11) * 0.18, 0, fold),
        THREE.MathUtils.lerp((t - 0.5) * 0.42, 0, fold),
        THREE.MathUtils.lerp(Math.cos(t * 17) * 0.12, 0, fold),
      );
      const scale = 0.28 + release * 0.72;
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      current.setMatrixAt(index, dummy.matrix);
    }

    current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <boxGeometry args={[1.15, 0.36, 0.035]} />
      <meshStandardMaterial
        ref={material}
        color="#bcc8cf"
        emissive="#28404a"
        emissiveIntensity={0.28}
        roughness={0.42}
        metalness={0.04}
        transparent
        opacity={0}
      />
    </instancedMesh>
  );
}

function PresenceWorlds({ progress, quality }: WorldProps) {
  const count = quality === "premium" ? 64 : quality === "balanced" ? 42 : 20;
  const left = useRef<THREE.InstancedMesh>(null);
  const right = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    const p = progress.current;
    const normalPresence = visible(p, 0.7, 0.865, 0.035);
    const correctionPresence = visible(p, 0.85, 0.886, 0.008);
    const presence = Math.max(normalPresence, correctionPresence);
    const meshes = [left.current, right.current];

    if (presence <= 0.002) {
      meshes.forEach((mesh) => {
        if (!mesh) return;
        mesh.visible = false;
        (mesh.material as THREE.MeshStandardMaterial).opacity = 0;
      });
      return;
    }

    const connection = correctionPresence > normalPresence
      ? 1 - ease(range(p, 0.856, 0.88)) * 0.55
      : ease(range(p, 0.765, 0.84));

    meshes.forEach((mesh, side) => {
      if (!mesh) return;
      for (let index = 0; index < count; index += 1) {
        const radius = 0.55 + seeded(index + side * 100) * 1.6;
        const angle = seeded(index + 20) * Math.PI * 2;
        const baseX = side === 0 ? -2.6 : 2.6;
        const shared = index < Math.max(2, Math.floor(connection * 8));
        dummy.position.set(
          shared
            ? THREE.MathUtils.lerp(baseX, 0, connection)
            : baseX + Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          -2.8 + (seeded(index + 70) - 0.5) * 2,
        );
        const itemScale = 0.12 + seeded(index + 9) * 0.12;
        dummy.scale.setScalar(shared ? itemScale * 1.35 : itemScale);
        dummy.rotation.set(angle * 0.2, angle * 0.3, angle * 0.1);
        dummy.updateMatrix();
        mesh.setMatrixAt(index, dummy.matrix);
      }
      mesh.instanceMatrix.needsUpdate = true;
      mesh.visible = true;
      const meshMaterial = mesh.material as THREE.MeshStandardMaterial;
      meshMaterial.opacity = presence * 0.9;
    });
  });

  return (
    <>
      <instancedMesh ref={left} args={[undefined, undefined, count]}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color="#e49b58" roughness={0.72} transparent opacity={0} />
      </instancedMesh>
      <instancedMesh ref={right} args={[undefined, undefined, count]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#7e9d93" roughness={0.68} transparent opacity={0} />
      </instancedMesh>
    </>
  );
}

function Dust({ quality }: Pick<WorldProps, "quality">) {
  const count = quality === "premium" ? 520 : quality === "balanced" ? 260 : 90;
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let index = 0; index < count; index += 1) {
      positions[index * 3] = (seeded(index + 2) - 0.5) * 24;
      positions[index * 3 + 1] = (seeded(index + 300) - 0.5) * 13;
      positions[index * 3 + 2] = -seeded(index + 700) * 18;
    }
    const result = new THREE.BufferGeometry();
    result.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return result;
  }, [count]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <points geometry={geometry}>
      <pointsMaterial color="#c8c0ad" size={0.024} opacity={0.34} transparent sizeAttenuation />
    </points>
  );
}

function World({ progress, quality }: WorldProps) {
  return (
    <>
      <fog attach="fog" args={["#080a0c", 7, 25]} />
      <ambientLight intensity={0.62} color="#9ba9ad" />
      <directionalLight position={[3, 5, 8]} intensity={2.1} color="#fff1d7" />
      <pointLight position={[-4, -1, 3]} intensity={24} distance={16} color="#ff4e22" />
      <pointLight position={[5, 2, -1]} intensity={17} distance={14} color="#6f9a9b" />
      <CameraRig progress={progress} />
      <QuestionRibbon progress={progress} />
      <PaperArchive progress={progress} quality={quality} />
      <TabWave progress={progress} quality={quality} />
      <PresenceWorlds progress={progress} quality={quality} />
      <Dust quality={quality} />
    </>
  );
}

function RenderInvalidator({ progress, quality }: { progress: number; quality: CinematicQuality }) {
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    invalidate();
  }, [invalidate, progress, quality]);

  return null;
}

function ContextLifecycle() {
  const gl = useThree((state) => state.gl);
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    const canvas = gl.domElement;
    const preserveForRestore = (event: Event) => event.preventDefault();
    const renderRestoredContext = () => invalidate();

    canvas.addEventListener("webglcontextlost", preserveForRestore);
    canvas.addEventListener("webglcontextrestored", renderRestoredContext);
    return () => {
      canvas.removeEventListener("webglcontextlost", preserveForRestore);
      canvas.removeEventListener("webglcontextrestored", renderRestoredContext);
    };
  }, [gl, invalidate]);

  return null;
}

class WebGLBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function CinematicWorld({ progress, renderProgress, quality }: CinematicWorldProps) {
  const dpr = quality === "premium" ? 1.8 : quality === "balanced" ? 1.35 : 1;

  return (
    <WebGLBoundary>
      <Canvas
        aria-hidden
        camera={{ fov: 43, near: 0.1, far: 60, position: [0, 0, 10] }}
        dpr={dpr}
        fallback={null}
        frameloop="demand"
        gl={{
          antialias: quality !== "essential",
          alpha: true,
          powerPreference: quality === "premium" ? "high-performance" : "default",
        }}
        onCreated={({ gl }) => {
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.02;
        }}
      >
        <RenderInvalidator progress={renderProgress} quality={quality} />
        <ContextLifecycle />
        <World progress={progress} quality={quality} />
      </Canvas>
    </WebGLBoundary>
  );
}
