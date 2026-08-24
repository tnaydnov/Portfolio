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
  onRendererStatus: (ready: boolean) => void;
};

type CameraKey = { at: number; position: THREE.Vector3; target: THREE.Vector3 };

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const range = (value: number, start: number, end: number) => clamp01((value - start) / (end - start));
const ease = (value: number) => value * value * (3 - 2 * value);
const seeded = (seed: number) => Math.abs(Math.sin(seed * 12.9898 + 78.233) * 43758.5453) % 1;

const CAMERA_KEYS: CameraKey[] = [
  { at: 0, position: new THREE.Vector3(0, 0.25, 7.8), target: new THREE.Vector3(0, 0, -2.5) },
  { at: 0.12, position: new THREE.Vector3(0, 0.25, 7.8), target: new THREE.Vector3(0, 0, -2.5) },
  { at: 0.19, position: new THREE.Vector3(0, 0.12, 6.7), target: new THREE.Vector3(0, 0, -3.1) },
  { at: 0.24, position: new THREE.Vector3(0, 0.12, 6.7), target: new THREE.Vector3(0, 0, -3.1) },
  { at: 0.35, position: new THREE.Vector3(-0.2, 0.2, 4.7), target: new THREE.Vector3(0, 0, -5.8) },
  { at: 0.41, position: new THREE.Vector3(-0.2, 0.2, 4.7), target: new THREE.Vector3(0, 0, -5.8) },
  { at: 0.525, position: new THREE.Vector3(0.4, 0.32, 2.1), target: new THREE.Vector3(0, 0, -8.5) },
  { at: 0.57, position: new THREE.Vector3(0.4, 0.32, 2.1), target: new THREE.Vector3(0, 0, -8.5) },
  { at: 0.695, position: new THREE.Vector3(-0.35, 0.15, -0.7), target: new THREE.Vector3(0, 0, -11.6) },
  { at: 0.73, position: new THREE.Vector3(-0.35, 0.15, -0.7), target: new THREE.Vector3(0, 0, -11.6) },
  { at: 0.845, position: new THREE.Vector3(0.28, 0.2, -3.6), target: new THREE.Vector3(0, 0, -13.8) },
  { at: 0.87, position: new THREE.Vector3(0.28, 0.2, -3.6), target: new THREE.Vector3(0, 0, -13.8) },
  { at: 0.925, position: new THREE.Vector3(0, 0.12, -6.3), target: new THREE.Vector3(0, 0, -16.2) },
  { at: 0.95, position: new THREE.Vector3(0, 0.12, -6.3), target: new THREE.Vector3(0, 0, -16.2) },
  { at: 1, position: new THREE.Vector3(0, 0.12, -7.2), target: new THREE.Vector3(0, 0, -16.8) },
];

function interpolateCamera(progress: number, outputPosition: THREE.Vector3, outputTarget: THREE.Vector3) {
  const p = clamp01(progress);
  let start = CAMERA_KEYS[0];
  let end = CAMERA_KEYS[CAMERA_KEYS.length - 1];
  for (let index = 0; index < CAMERA_KEYS.length - 1; index += 1) {
    if (p >= CAMERA_KEYS[index].at && p <= CAMERA_KEYS[index + 1].at) {
      start = CAMERA_KEYS[index];
      end = CAMERA_KEYS[index + 1];
      break;
    }
  }
  const local = ease(range(p, start.at, end.at));
  outputPosition.lerpVectors(start.position, end.position, local);
  outputTarget.lerpVectors(start.target, end.target, local);
}

function CameraRig({ progress }: Pick<WorldProps, "progress">) {
  const desiredPosition = useMemo(() => new THREE.Vector3(), []);
  const desiredTarget = useMemo(() => new THREE.Vector3(), []);
  const { camera, size } = useThree();

  useFrame(() => {
    interpolateCamera(progress.current, desiredPosition, desiredTarget);
    camera.position.copy(desiredPosition);
    if (size.height > size.width) {
      camera.position.z += 2.15;
      camera.position.y += 0.18;
    }
    camera.lookAt(desiredTarget);
  });

  return null;
}

function Atmosphere({ progress }: Pick<WorldProps, "progress">) {
  const warm = useRef<THREE.PointLight>(null);
  const signal = useRef<THREE.PointLight>(null);
  const cool = useRef<THREE.DirectionalLight>(null);

  useFrame(() => {
    const p = progress.current;
    const structure = ease(range(p, 0.38, 0.68));
    const live = ease(range(p, 0.87, 0.95));
    if (warm.current) warm.current.intensity = 1.5 + structure * 2.2 + live * 5.5;
    if (signal.current) {
      signal.current.intensity = 2 + structure * 2.5 + live * 3;
      signal.current.position.z = THREE.MathUtils.lerp(-2.4, -15.8, ease(range(p, 0.1, 0.94)));
    }
    if (cool.current) cool.current.intensity = 1.15 + structure * 0.9 - live * 0.45;
  });

  return (
    <>
      <ambientLight intensity={0.32} color="#9ea8a6" />
      <directionalLight ref={cool} position={[4, 5, 7]} intensity={1.15} color="#9eb5b4" />
      <pointLight ref={warm} position={[-3.5, 2, -10]} intensity={1.5} distance={22} color="#ffd2a6" />
      <pointLight ref={signal} position={[0, 0, -2.4]} intensity={2} distance={8} color="#ff6841" />
    </>
  );
}

function SignalVolume({ progress }: Pick<WorldProps, "progress">) {
  const root = useRef<THREE.Group>(null);
  const panelMaterial = useRef<THREE.MeshStandardMaterial>(null);
  const accentMaterials = useRef<THREE.MeshBasicMaterial[]>([]);

  useFrame(() => {
    const arrival = ease(range(progress.current, 0.105, 0.17));
    const fade = 1 - ease(range(progress.current, 0.245, 0.3));
    const presence = arrival * fade;
    if (root.current) {
      root.current.visible = presence > 0.002;
      root.current.scale.setScalar(0.74 + arrival * 0.26);
      root.current.position.y = (1 - arrival) * -0.16;
      root.current.rotation.y = (1 - arrival) * -0.08;
    }
    if (panelMaterial.current) panelMaterial.current.opacity = presence * 0.36;
    accentMaterials.current.forEach((material, index) => {
      material.opacity = presence * (index === 0 ? 1 : index === 1 ? 0.45 : 0.5);
    });
  });

  return (
    <group ref={root} position={[0, 0, -3.1]} visible={false}>
      <mesh>
        <boxGeometry args={[2.35, 1.16, 0.025]} />
        <meshStandardMaterial ref={panelMaterial} color="#cbd0cc" transparent opacity={0} roughness={0.86} depthWrite={false} />
      </mesh>
      <mesh position={[-1.17, 0, 0.02]}>
        <boxGeometry args={[0.018, 1.16, 0.018]} />
        <meshBasicMaterial ref={(material) => { if (material) accentMaterials.current[0] = material; }} color="#ff6841" transparent opacity={0} />
      </mesh>
      <mesh position={[0, 0.35, 0.03]}>
        <boxGeometry args={[1.72, 0.02, 0.015]} />
        <meshBasicMaterial ref={(material) => { if (material) accentMaterials.current[1] = material; }} color="#596261" transparent opacity={0} />
      </mesh>
      <mesh position={[-0.28, 0.05, 0.03]}>
        <boxGeometry args={[1.16, 0.025, 0.015]} />
        <meshBasicMaterial ref={(material) => { if (material) accentMaterials.current[2] = material; }} color="#7c8481" transparent opacity={0} />
      </mesh>
    </group>
  );
}

function OwnershipThread({ progress, quality }: WorldProps) {
  const head = useRef<THREE.Mesh>(null);
  const curve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1.12, -0.28, -3.05),
    new THREE.Vector3(-0.8, -0.55, -4.4),
    new THREE.Vector3(0.65, -0.35, -6.2),
    new THREE.Vector3(-0.55, 0.2, -8.4),
    new THREE.Vector3(0.7, 0.15, -10.7),
    new THREE.Vector3(-0.48, -0.15, -12.55),
    new THREE.Vector3(0.55, 0.2, -14.1),
    new THREE.Vector3(0.12, 0.02, -16.55),
  ], false, "catmullrom", 0.42), []);
  const tubularSegments = quality === "premium" ? 220 : quality === "balanced" ? 160 : 110;
  const geometry = useMemo(
    () => new THREE.TubeGeometry(curve, tubularSegments, quality === "essential" ? 0.013 : 0.018, 7, false),
    [curve, quality, tubularSegments],
  );
  const material = useMemo(() => new THREE.ShaderMaterial({
    uniforms: { uReveal: { value: 0 }, uColor: { value: new THREE.Color("#ff6841") } },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uReveal;
      uniform vec3 uColor;
      varying vec2 vUv;
      void main() {
        if (vUv.x > uReveal) discard;
        float head = smoothstep(max(0.0, uReveal - 0.035), uReveal, vUv.x);
        gl_FragColor = vec4(uColor, 0.66 + head * 0.3);
      }
    `,
    transparent: true,
    depthWrite: false,
    toneMapped: false,
  }), []);
  const headPosition = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => () => {
    geometry.dispose();
    material.dispose();
  }, [geometry, material]);

  useFrame(() => {
    const reveal = ease(range(progress.current, 0.1, 0.945));
    material.uniforms.uReveal.value = reveal;
    curve.getPoint(Math.min(0.999, reveal), headPosition);
    if (head.current) {
      head.current.visible = reveal > 0.005 && reveal < 0.999;
      head.current.position.copy(headPosition);
      head.current.scale.setScalar(0.55 + Math.sin(reveal * Math.PI * 8) * 0.08);
    }
  });

  return (
    <group>
      <mesh geometry={geometry} material={material} frustumCulled={false} />
      <mesh ref={head} visible={false}>
        <sphereGeometry args={[0.055, 12, 10]} />
        <meshBasicMaterial color="#ffb08f" toneMapped={false} />
      </mesh>
    </group>
  );
}

function EvidenceField({ progress, quality }: WorldProps) {
  const count = quality === "premium" ? 10 : quality === "balanced" ? 8 : 5;
  const mesh = useRef<THREE.InstancedMesh>(null);
  const material = useRef<THREE.MeshStandardMaterial>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const origins = useMemo(() => {
    const columns = Math.min(4, count);
    const rows = Math.ceil(count / columns);
    return Array.from({ length: count }, (_, index) => new THREE.Vector3(
      (index % columns - (columns - 1) / 2) * 0.52,
      ((rows - 1) / 2 - Math.floor(index / columns)) * 0.42,
      -3.07 - (index % 2) * 0.006,
    ));
  }, [count]);
  const scatter = useMemo(() => Array.from({ length: count }, (_, index) => new THREE.Vector3(
    (seeded(index + 8) - 0.5) * 6.3,
    (seeded(index + 28) - 0.5) * 3.4,
    -5.1 - seeded(index + 48) * 3,
  )), [count]);
  const aligned = useMemo(() => Array.from({ length: count }, (_, index) => new THREE.Vector3(
    (index % 3 - 1) * 1.65,
    (Math.floor(index / 3) - 1) * 0.9,
    -7.15 - (index % 2) * 0.28,
  )), [count]);
  const position = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    const reveal = ease(range(progress.current, 0.22, 0.31));
    const peel = ease(range(progress.current, 0.245, 0.335));
    const organize = ease(range(progress.current, 0.35, 0.48));
    const fade = 1 - ease(range(progress.current, 0.55, 0.62));
    const presence = reveal * fade;
    if (!mesh.current) return;
    mesh.current.visible = presence > 0.002;
    if (material.current) material.current.opacity = presence * 0.34;
    if (!mesh.current.visible) return;
    for (let index = 0; index < count; index += 1) {
      position.lerpVectors(origins[index], scatter[index], peel);
      position.lerp(aligned[index], organize);
      dummy.position.copy(position);
      dummy.rotation.set(
        (seeded(index + 70) - 0.5) * 0.38 * peel * (1 - organize),
        (seeded(index + 90) - 0.5) * 0.42 * peel * (1 - organize),
        (seeded(index + 110) - 0.5) * 0.3 * peel * (1 - organize),
      );
      const scale = 0.74 + reveal * 0.26;
      dummy.scale.set(
        THREE.MathUtils.lerp(0.35, scale * (0.72 + seeded(index + 3) * 0.55), peel),
        THREE.MathUtils.lerp(0.47, scale, peel),
        1,
      );
      dummy.updateMatrix();
      mesh.current.setMatrixAt(index, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]} visible={false} frustumCulled={false}>
      <boxGeometry args={[1.28, 0.62, 0.018]} />
      <meshStandardMaterial ref={material} color="#c4cbc7" transparent opacity={0} roughness={0.9} depthWrite={false} />
    </instancedMesh>
  );
}

const LAYER_NODE_TARGETS = [
  new THREE.Vector3(-2.15, 0.95, -12.95),
  new THREE.Vector3(0, 0.95, -12.95),
  new THREE.Vector3(2.15, 0.95, -12.95),
  new THREE.Vector3(-1.45, -0.95, -13.55),
  new THREE.Vector3(0, -0.95, -13.55),
];

function SpatialLayers({ progress }: Pick<WorldProps, "progress">) {
  const root = useRef<THREE.Group>(null);
  const materials = useRef<THREE.MeshStandardMaterial[]>([]);
  const accentMaterials = useRef<THREE.MeshBasicMaterial[]>([]);

  useFrame(() => {
    const reveal = ease(range(progress.current, 0.38, 0.48));
    const settle = ease(range(progress.current, 0.46, 0.56));
    const build = ease(range(progress.current, 0.53, 0.64));
    const handoff = 1 - ease(range(progress.current, 0.61, 0.69));
    if (root.current) {
      root.current.visible = reveal * handoff > 0.002;
      root.current.children.forEach((layer, index) => {
        const sourceX = (index - 2) * 0.34 * (1 - settle);
        const sourceY = (2 - index) * 0.2 * (1 - settle);
        const sourceZ = -8.1 - index * (0.62 + settle * 0.08);
        const target = LAYER_NODE_TARGETS[index];
        const sourceScale = 0.78 + reveal * 0.22;
        const targetScaleX = 1.18 / (5.4 - index * 0.18);
        const targetScaleY = 0.54 / (3.15 - index * 0.12);
        layer.position.set(
          THREE.MathUtils.lerp(sourceX, target.x, build),
          THREE.MathUtils.lerp(sourceY, target.y, build),
          THREE.MathUtils.lerp(sourceZ, target.z, build),
        );
        layer.rotation.set(
          (2 - index) * 0.025 * (1 - settle) * (1 - build),
          (index - 2) * 0.07 * (1 - settle) * (1 - build),
          0,
        );
        layer.scale.set(
          THREE.MathUtils.lerp(sourceScale, targetScaleX, build),
          THREE.MathUtils.lerp(sourceScale, targetScaleY, build),
          1,
        );
      });
    }
    materials.current.forEach((material, index) => {
      material.opacity = reveal * handoff * (0.045 + index * 0.008);
    });
    accentMaterials.current.forEach((material) => {
      material.opacity = reveal * handoff * 0.6;
    });
  });

  return (
    <group ref={root} visible={false}>
      {Array.from({ length: 5 }, (_, index) => (
        <group key={index}>
          <mesh>
            <boxGeometry args={[5.4 - index * 0.18, 3.15 - index * 0.12, 0.025]} />
            <meshStandardMaterial
              ref={(material) => { if (material) materials.current[index] = material; }}
              color={index === 2 ? "#78908d" : "#d7d9d2"}
              transparent
              opacity={0}
              roughness={0.85}
              depthWrite={false}
            />
          </mesh>
          <mesh position={[-1.45 + index * 0.25, 0.95 - index * 0.12, 0.025]}>
            <boxGeometry args={[1.1 + index * 0.12, 0.025, 0.02]} />
            <meshBasicMaterial
              ref={(material) => { if (material) accentMaterials.current[index] = material; }}
              color={index === 2 ? "#ff6841" : "#8d9692"}
              transparent
              opacity={0}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

const NODE_POSITIONS = [
  new THREE.Vector3(-2.15, 0.95, -0.7),
  new THREE.Vector3(0, 0.95, -0.7),
  new THREE.Vector3(2.15, 0.95, -0.7),
  new THREE.Vector3(-1.45, -0.95, -1.3),
  new THREE.Vector3(0, -0.95, -1.3),
  new THREE.Vector3(1.45, -0.95, -1.3),
];

const EDGES = [[0, 1], [1, 2], [1, 3], [1, 4], [2, 5], [3, 4], [4, 5]] as const;

function ArchitectureField({ progress }: Pick<WorldProps, "progress">) {
  const root = useRef<THREE.Group>(null);
  const nodes = useRef<THREE.InstancedMesh>(null);
  const nodeMaterial = useRef<THREE.MeshStandardMaterial>(null);
  const fault = useRef<THREE.Mesh>(null);
  const faultMaterial = useRef<THREE.MeshStandardMaterial>(null);
  const interfaceRoot = useRef<THREE.Group>(null);
  const interfaceMaterial = useRef<THREE.MeshStandardMaterial>(null);
  const interfaceAccents = useRef<THREE.MeshBasicMaterial[]>([]);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const edgePositions = useMemo(() => new Float32Array(EDGES.length * 6), []);
  const edgeGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(edgePositions, 3));
    return geometry;
  }, [edgePositions]);
  const edgeMaterial = useMemo(() => new THREE.LineBasicMaterial({ color: "#82908d", transparent: true, opacity: 0 }), []);
  const lineSegments = useMemo(() => {
    const lines = new THREE.LineSegments(edgeGeometry, edgeMaterial);
    lines.frustumCulled = false;
    return lines;
  }, [edgeGeometry, edgeMaterial]);
  const nodeColor = useMemo(() => new THREE.Color("#8b9794"), []);
  const fractureColor = useMemo(() => new THREE.Color("#ff6841"), []);
  const current = useMemo(() => NODE_POSITIONS.map((position) => position.clone()), []);

  useEffect(() => () => {
    edgeGeometry.dispose();
    edgeMaterial.dispose();
  }, [edgeGeometry, edgeMaterial]);

  useFrame(() => {
    const reveal = ease(range(progress.current, 0.54, 0.66));
    const fracture = ease(range(progress.current, 0.73, 0.79));
    const correct = ease(range(progress.current, 0.79, 0.865));
    const ship = ease(range(progress.current, 0.87, 0.945));
    const finalFade = 1 - ease(range(progress.current, 0.94, 0.985));
    const architectureOpacity = reveal * (1 - ship * 0.82) * finalFade;
    if (root.current) root.current.visible = architectureOpacity > 0.002;

    for (let index = 0; index < NODE_POSITIONS.length; index += 1) {
      current[index].copy(NODE_POSITIONS[index]);
      if (index === 4) {
        current[index].x += fracture * (1 - correct) * 1.05;
        current[index].y -= fracture * (1 - correct) * 0.38;
      }
      if (index < 5 && nodes.current) {
        dummy.position.copy(current[index]);
        dummy.scale.setScalar(0.72 + reveal * 0.28);
        dummy.updateMatrix();
        nodes.current.setMatrixAt(index, dummy.matrix);
      }
    }
    if (nodes.current) {
      nodes.current.visible = architectureOpacity > 0.002;
      nodes.current.instanceMatrix.needsUpdate = true;
    }
    if (nodeMaterial.current) nodeMaterial.current.opacity = architectureOpacity * 0.48;
    if (fault.current) {
      fault.current.position.copy(current[5]);
      fault.current.scale.setScalar(0.72 + reveal * 0.28);
    }
    if (faultMaterial.current) {
      faultMaterial.current.opacity = architectureOpacity * 0.58;
      faultMaterial.current.color.lerpColors(
        nodeColor,
        fractureColor,
        fracture * (1 - correct),
      );
    }

    EDGES.forEach(([startIndex, endIndex], edgeIndex) => {
      const start = current[startIndex];
      const end = current[endIndex];
      const offset = edgeIndex * 6;
      edgePositions[offset] = start.x;
      edgePositions[offset + 1] = start.y;
      edgePositions[offset + 2] = start.z;
      edgePositions[offset + 3] = end.x;
      edgePositions[offset + 4] = end.y;
      edgePositions[offset + 5] = end.z;
    });
    edgeGeometry.attributes.position.needsUpdate = true;
    edgeMaterial.opacity = architectureOpacity * 0.72;

    if (interfaceRoot.current) {
      interfaceRoot.current.position.z = THREE.MathUtils.lerp(0.65, -2.2, ship);
      interfaceRoot.current.scale.setScalar(0.72 + reveal * 0.28 - ship * 0.16);
      interfaceRoot.current.rotation.y = THREE.MathUtils.lerp(-0.035, 0, reveal);
    }
    if (interfaceMaterial.current) interfaceMaterial.current.opacity = reveal * (0.16 + ship * 0.22) * finalFade;
    interfaceAccents.current.forEach((material, index) => {
      const baseOpacity = index === 1 ? 0.7 : index === 0 ? 0.62 : 0.42;
      material.opacity = architectureOpacity * baseOpacity;
    });
  });

  return (
    <group ref={root} position={[0, 0, -12.25]} visible={false}>
      <primitive object={lineSegments} />
      <instancedMesh ref={nodes} args={[undefined, undefined, 5]} frustumCulled={false}>
        <boxGeometry args={[1.18, 0.54, 0.14]} />
        <meshStandardMaterial ref={nodeMaterial} color="#8b9794" transparent opacity={0} roughness={0.82} depthWrite={false} />
      </instancedMesh>
      <mesh ref={fault}>
        <boxGeometry args={[1.18, 0.54, 0.14]} />
        <meshStandardMaterial ref={faultMaterial} color="#8b9794" transparent opacity={0} roughness={0.82} depthWrite={false} />
      </mesh>

      <group ref={interfaceRoot} position={[0, 0, 0.65]}>
        <mesh>
          <boxGeometry args={[4.9, 2.8, 0.055]} />
          <meshStandardMaterial ref={interfaceMaterial} color="#d7d8d0" transparent opacity={0} roughness={0.88} depthWrite={false} />
        </mesh>
        <mesh position={[-1.8, 0, 0.055]}>
          <boxGeometry args={[0.045, 2.18, 0.025]} />
          <meshBasicMaterial ref={(material) => { if (material) interfaceAccents.current[0] = material; }} color="#677774" transparent opacity={0} />
        </mesh>
        {[0.72, 0.22, -0.28, -0.78].map((y, index) => (
          <mesh key={y} position={[0.45 + index * 0.12, y, 0.058]}>
            <boxGeometry args={[2.6 - index * 0.25, 0.035, 0.025]} />
            <meshBasicMaterial
              ref={(material) => { if (material) interfaceAccents.current[index + 1] = material; }}
              color={index === 0 ? "#ff6841" : "#697875"}
              transparent
              opacity={0}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function ShippingField({ progress }: Pick<WorldProps, "progress">) {
  const root = useRef<THREE.Group>(null);
  const materials = useRef<THREE.MeshStandardMaterial[]>([]);
  const light = useRef<THREE.PointLight>(null);

  useFrame(() => {
    const reveal = ease(range(progress.current, 0.845, 0.91));
    const live = ease(range(progress.current, 0.915, 0.95));
    const fade = 1 - ease(range(progress.current, 0.955, 0.99));
    if (root.current) {
      root.current.visible = reveal * fade > 0.002;
      root.current.scale.setScalar(0.8 + reveal * 0.2);
      root.current.position.z = -15.8 + live * -0.45;
    }
    materials.current.forEach((material, index) => {
      material.opacity = reveal * fade * (0.08 + index * 0.05 + live * 0.08);
    });
    if (light.current) light.current.intensity = reveal * fade * (2 + live * 3);
  });

  return (
    <group ref={root} position={[0, 0, -15.8]} visible={false}>
      {[0, 1, 2].map((index) => (
        <mesh key={index} position={[0, 0, -index * 0.58]}>
          <boxGeometry args={[5.3 - index * 0.8, 3.1 - index * 0.46, 0.035]} />
          <meshStandardMaterial
            ref={(material) => { if (material) materials.current[index] = material; }}
            color={index === 2 ? "#f1e9da" : "#82908d"}
            transparent
            opacity={0}
            roughness={0.84}
            depthWrite={false}
          />
        </mesh>
      ))}
      <pointLight ref={light} position={[0, 0, 1.4]} intensity={0} distance={8} color="#ffd3a7" />
    </group>
  );
}

function World({ progress, quality }: WorldProps) {
  return (
    <>
      <fog attach="fog" args={["#07090a", 7, 27]} />
      <Atmosphere progress={progress} />
      <CameraRig progress={progress} />
      <SignalVolume progress={progress} />
      <OwnershipThread progress={progress} quality={quality} />
      <EvidenceField progress={progress} quality={quality} />
      <SpatialLayers progress={progress} />
      <ArchitectureField progress={progress} />
      <ShippingField progress={progress} />
    </>
  );
}

function RenderInvalidator({ progress, quality }: { progress: number; quality: CinematicQuality }) {
  const invalidate = useThree((state) => state.invalidate);
  useEffect(() => { invalidate(); }, [invalidate, progress, quality]);
  return null;
}

function ContextLifecycle({ onRendererStatus }: Pick<CinematicWorldProps, "onRendererStatus">) {
  const gl = useThree((state) => state.gl);
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    const canvas = gl.domElement;
    const onLost = (event: Event) => { event.preventDefault(); onRendererStatus(false); };
    const onRestored = () => { invalidate(); onRendererStatus(true); };
    canvas.addEventListener("webglcontextlost", onLost);
    canvas.addEventListener("webglcontextrestored", onRestored);
    return () => {
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestored);
    };
  }, [gl, invalidate, onRendererStatus]);

  return null;
}

class WebGLBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export function CinematicWorld({ progress, renderProgress, quality, onRendererStatus }: CinematicWorldProps) {
  const dpr = quality === "premium" ? 1.55 : quality === "balanced" ? 1.25 : 1;
  return (
    <WebGLBoundary onFailure={() => onRendererStatus(false)}>
      <Canvas
        key={quality}
        aria-hidden
        camera={{ fov: 43, near: 0.1, far: 60, position: [0, 0.25, 7.8] }}
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
          gl.toneMappingExposure = 1.03;
          onRendererStatus(true);
        }}
      >
        <RenderInvalidator progress={renderProgress} quality={quality} />
        <ContextLifecycle onRendererStatus={onRendererStatus} />
        <World progress={progress} quality={quality} />
      </Canvas>
    </WebGLBoundary>
  );
}
