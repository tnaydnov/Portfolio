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

type CameraKey = {
  at: number;
  position: THREE.Vector3;
  target: THREE.Vector3;
};

type VectorKey = { at: number; value: THREE.Vector3 };

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const range = (value: number, start: number, end: number) =>
  clamp01((value - start) / (end - start));
const ease = (value: number) => value * value * (3 - 2 * value);
const seeded = (seed: number) =>
  Math.abs(Math.sin(seed * 12.9898 + 78.233) * 43758.5453) % 1;

const CAMERA_KEYS: CameraKey[] = [
  {
    at: 0,
    position: new THREE.Vector3(0, 1.55, 8.6),
    target: new THREE.Vector3(0, 0.25, 0),
  },
  {
    at: 0.12,
    position: new THREE.Vector3(-0.25, 1.35, 7.1),
    target: new THREE.Vector3(0, 0.35, 0.25),
  },
  {
    at: 0.24,
    position: new THREE.Vector3(0.2, 0.72, 4.4),
    target: new THREE.Vector3(0, -0.4, -3.2),
  },
  {
    at: 0.32,
    position: new THREE.Vector3(0.15, 0.05, -2.2),
    target: new THREE.Vector3(0, -0.25, -7.5),
  },
  {
    at: 0.4,
    position: new THREE.Vector3(-3.35, 0.78, -6.8),
    target: new THREE.Vector3(0, -0.15, -9.7),
  },
  {
    at: 0.46,
    position: new THREE.Vector3(-2.15, 0.18, -8.4),
    target: new THREE.Vector3(-0.9, -0.55, -10.7),
  },
  {
    at: 0.56,
    position: new THREE.Vector3(2.6, 1.15, -9.8),
    target: new THREE.Vector3(0, -0.42, -13.6),
  },
  {
    at: 0.64,
    position: new THREE.Vector3(0.15, 0.82, -9.3),
    target: new THREE.Vector3(0, -0.25, -13.7),
  },
  {
    at: 0.76,
    position: new THREE.Vector3(-2.7, 2.1, -11.8),
    target: new THREE.Vector3(0, -0.5, -16.1),
  },
  {
    at: 0.86,
    position: new THREE.Vector3(0.4, 4.8, -13.5),
    target: new THREE.Vector3(0, -0.7, -17.8),
  },
  {
    at: 0.94,
    position: new THREE.Vector3(0, 1.35, -14.1),
    target: new THREE.Vector3(0, 0.45, -21.2),
  },
  {
    at: 0.965,
    position: new THREE.Vector3(0, 1.4, -12.1),
    target: new THREE.Vector3(0, 0.45, -21.2),
  },
  {
    at: 0.99,
    position: new THREE.Vector3(0, 1.55, 8.6),
    target: new THREE.Vector3(0, 0.25, 0),
  },
  {
    at: 1,
    position: new THREE.Vector3(-0.12, 1.5, 8.15),
    target: new THREE.Vector3(0, 0.25, 0),
  },
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

function interpolateVector(keys: VectorKey[], progress: number, output: THREE.Vector3) {
  const p = clamp01(progress);
  let start = keys[0];
  let end = keys[keys.length - 1];
  for (let index = 0; index < keys.length - 1; index += 1) {
    if (p >= keys[index].at && p <= keys[index + 1].at) {
      start = keys[index];
      end = keys[index + 1];
      break;
    }
  }
  output.lerpVectors(start.value, end.value, ease(range(p, start.at, end.at)));
}

function CameraRig({ progress }: Pick<WorldProps, "progress">) {
  const desiredPosition = useMemo(() => new THREE.Vector3(), []);
  const desiredTarget = useMemo(() => new THREE.Vector3(), []);
  const { camera, size } = useThree();

  useFrame(() => {
    interpolateCamera(progress.current, desiredPosition, desiredTarget);
    const portraitPullback = size.height > size.width ? 1.65 : 1;
    camera.position.copy(desiredPosition);
    camera.position.z += portraitPullback;
    camera.lookAt(desiredTarget);
  });

  return null;
}

function Workshop({ progress }: Pick<WorldProps, "progress">) {
  const room = useRef<THREE.Group>(null);
  const leftWall = useRef<THREE.Group>(null);
  const rightWall = useRef<THREE.Group>(null);
  const backTop = useRef<THREE.Mesh>(null);

  useFrame(() => {
    const open = ease(range(progress.current, 0.19, 0.29));
    const close = ease(range(progress.current, 0.958, 0.988));
    const reveal = open * (1 - close);
    if (leftWall.current) leftWall.current.rotation.y = -reveal * 1.18;
    if (rightWall.current) rightWall.current.rotation.y = reveal * 1.18;
    if (backTop.current) {
      backTop.current.position.y = 2.55 + reveal * 3.4;
      backTop.current.rotation.x = reveal * 0.42;
    }
    if (room.current) {
      room.current.position.z = reveal * 0.8;
      room.current.visible = progress.current < 0.355 || progress.current > 0.952;
    }
  });

  return (
    <group ref={room}>
      <mesh position={[0, -1.46, -0.8]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 11]} />
        <meshStandardMaterial color="#16191a" roughness={0.96} />
      </mesh>

      <group ref={leftWall} position={[-4.1, 1.2, -1.2]}>
        <mesh>
          <boxGeometry args={[0.14, 5.4, 7]} />
          <meshStandardMaterial color="#242524" roughness={0.9} />
        </mesh>
      </group>
      <group ref={rightWall} position={[4.1, 1.2, -1.2]}>
        <mesh>
          <boxGeometry args={[0.14, 5.4, 7]} />
          <meshStandardMaterial color="#202323" roughness={0.9} />
        </mesh>
      </group>
      <mesh ref={backTop} position={[0, 2.55, -4.65]}>
        <boxGeometry args={[8.3, 2.7, 0.18]} />
        <meshStandardMaterial color="#292a28" roughness={0.94} />
      </mesh>
      <mesh position={[0, -0.15, -4.65]}>
        <boxGeometry args={[8.3, 2.65, 0.18]} />
        <meshStandardMaterial color="#1c1f1f" roughness={0.94} />
      </mesh>

      <mesh position={[0, -0.72, 0.05]}>
        <boxGeometry args={[5.3, 0.18, 2.15]} />
        <meshStandardMaterial color="#6d5b49" roughness={0.78} />
      </mesh>
      {[-2.18, 2.18].map((x) => (
        <mesh key={x} position={[x, -1.18, 0]}>
          <boxGeometry args={[0.18, 0.95, 1.8]} />
          <meshStandardMaterial color="#42392f" roughness={0.86} />
        </mesh>
      ))}

      <group position={[-1.45, 0.18, -0.08]}>
        <mesh position={[0, 0.58, 0]}>
          <boxGeometry args={[2, 1.28, 0.12]} />
          <meshStandardMaterial color="#111516" roughness={0.42} />
        </mesh>
        <mesh position={[0, 0.58, 0.075]}>
          <boxGeometry args={[1.76, 1.04, 0.025]} />
          <meshStandardMaterial color="#273337" emissive="#16262b" emissiveIntensity={0.72} />
        </mesh>
        <mesh position={[0, 1.155, 0.14]}>
          <boxGeometry args={[2.05, 0.14, 0.14]} />
          <meshStandardMaterial color="#15191a" roughness={0.48} />
        </mesh>
        <mesh position={[0, 0.005, 0.14]}>
          <boxGeometry args={[2.05, 0.14, 0.14]} />
          <meshStandardMaterial color="#15191a" roughness={0.48} />
        </mesh>
        <mesh position={[-0.955, 0.58, 0.14]}>
          <boxGeometry args={[0.14, 1.08, 0.14]} />
          <meshStandardMaterial color="#15191a" roughness={0.48} />
        </mesh>
        <mesh position={[0.955, 0.58, 0.14]}>
          <boxGeometry args={[0.14, 1.08, 0.14]} />
          <meshStandardMaterial color="#15191a" roughness={0.48} />
        </mesh>
        <mesh position={[0, -0.15, 0]}>
          <boxGeometry args={[0.13, 0.36, 0.13]} />
          <meshStandardMaterial color="#1a1d1e" />
        </mesh>
        <mesh position={[0, -0.34, 0]}>
          <boxGeometry args={[0.72, 0.07, 0.42]} />
          <meshStandardMaterial color="#1a1d1e" />
        </mesh>
      </group>

      <group position={[2.15, 0.05, -0.5]} rotation={[0, 0, -0.2]}>
        <mesh position={[0, 0.55, 0]} rotation={[0, 0, 0.38]}>
          <cylinderGeometry args={[0.055, 0.055, 1.25, 10]} />
          <meshStandardMaterial color="#b7a77f" roughness={0.55} metalness={0.2} />
        </mesh>
        <mesh position={[-0.22, 1.05, 0]} rotation={[0.1, 0, -0.65]}>
          <coneGeometry args={[0.34, 0.48, 18, 1, true]} />
          <meshStandardMaterial color="#cc633e" roughness={0.66} side={THREE.DoubleSide} />
        </mesh>
        <pointLight position={[-0.38, 0.82, 0.35]} intensity={12} distance={5} color="#ffd3a4" />
      </group>

      <group position={[2.85, -0.42, 0.1]} rotation={[0, -0.18, 0]}>
        {[0, 1, 2, 3].map((index) => (
          <mesh key={index} position={[0, index * 0.045, 0]} rotation={[0, 0, (index - 1.5) * 0.055]}>
            <boxGeometry args={[0.72, 0.025, 0.92]} />
            <meshStandardMaterial color={index === 3 ? "#f0e5cf" : "#d6cbb7"} roughness={0.95} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function DeskCrossSection({ progress }: Pick<WorldProps, "progress">) {
  const layers = useRef<THREE.Group>(null);

  useFrame(() => {
    const reveal = ease(range(progress.current, 0.19, 0.305));
    const fade = 1 - ease(range(progress.current, 0.315, 0.36));
    if (!layers.current) return;
    layers.current.visible = reveal > 0.002 && fade > 0.002;
    layers.current.children.forEach((child, index) => {
      child.position.y = -index * 0.34 * reveal;
      child.position.z = -index * 0.18 * reveal;
      child.rotation.z = (index % 2 ? -1 : 1) * reveal * 0.018 * index;
      const material = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
      if (material) material.opacity = fade;
    });
  });

  return (
    <group ref={layers} position={[0, -1.17, -1.05]} visible={false}>
      {["#6d5b49", "#2b3030", "#d7ccb8", "#202626", "#c8653f", "#171b1c"].map((color, index) => (
        <mesh key={color}>
          <boxGeometry args={[5.05 - index * 0.16, 0.11, 1.85 - index * 0.08]} />
          <meshStandardMaterial
            color={color}
            emissive={index === 4 ? "#64210f" : "#000000"}
            emissiveIntensity={index === 4 ? 0.55 : 0}
            roughness={index === 2 ? 0.96 : 0.75}
            transparent
          />
        </mesh>
      ))}
      <pointLight position={[0, -1.35, 0.5]} intensity={8} distance={5} color="#ff633b" />
    </group>
  );
}

function Limb({ length, color }: { length: number; color: string }) {
  return (
    <mesh position={[0, -length * 0.48, 0]}>
      <capsuleGeometry args={[0.105, length, 5, 10]} />
      <meshStandardMaterial color={color} roughness={0.88} />
    </mesh>
  );
}

function TomerFigure({ progress }: Pick<WorldProps, "progress">) {
  const root = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const leftArm = useRef<THREE.Group>(null);
  const rightArm = useRef<THREE.Group>(null);
  const leftLeg = useRef<THREE.Group>(null);
  const rightLeg = useRef<THREE.Group>(null);
  const position = useMemo(() => new THREE.Vector3(), []);
  const positions = useMemo<VectorKey[]>(
    () => [
      { at: 0, value: new THREE.Vector3(1.18, -0.02, -0.22) },
      { at: 0.22, value: new THREE.Vector3(1, -0.02, -0.3) },
      { at: 0.31, value: new THREE.Vector3(0.8, -0.02, -6.1) },
      { at: 0.4, value: new THREE.Vector3(-1.65, -0.02, -9.15) },
      { at: 0.47, value: new THREE.Vector3(-1.1, -0.56, -10.7) },
      { at: 0.54, value: new THREE.Vector3(-0.25, -0.02, -13.2) },
      { at: 0.64, value: new THREE.Vector3(0.7, -0.02, -13.5) },
      { at: 0.75, value: new THREE.Vector3(1.05, -0.02, -15.9) },
      { at: 0.86, value: new THREE.Vector3(0.9, -0.02, -17.7) },
      { at: 0.95, value: new THREE.Vector3(0, -0.02, -20.7) },
      { at: 0.978, value: new THREE.Vector3(1.18, -0.02, -0.22) },
      { at: 1, value: new THREE.Vector3(1.08, -0.02, -0.22) },
    ],
    [],
  );

  useFrame(() => {
    const p = progress.current;
    const notice = ease(range(p, 0.075, 0.145));
    const question = ease(range(p, 0.14, 0.235));
    const listen = ease(range(p, 0.4, 0.46)) * (1 - ease(range(p, 0.47, 0.51)));
    const build = ease(range(p, 0.49, 0.55)) * (1 - ease(range(p, 0.59, 0.64)));
    const reroute = ease(range(p, 0.67, 0.76)) * (1 - ease(range(p, 0.84, 0.9)));
    interpolateVector(positions, p, position);
    if (root.current) {
      root.current.position.copy(position);
      root.current.rotation.y = p < 0.26
        ? -0.28 - notice * 0.48
        : p < 0.49
          ? 0.4
          : p < 0.67
            ? -0.35
            : 0.24;
      root.current.rotation.z = listen * -0.06;
    }
    if (head.current) {
      head.current.rotation.y = -0.16 - notice * 0.58 + build * 0.38 - reroute * 0.25;
      head.current.rotation.z = -question * 0.09 + listen * 0.16;
    }
    if (leftArm.current) leftArm.current.rotation.z = 0.28 + question * 0.72 - build * 0.9 + reroute * 0.65;
    if (rightArm.current) rightArm.current.rotation.z = -0.2 - question * 0.56 + build * 0.75 - reroute * 0.72;
    if (leftLeg.current) leftLeg.current.rotation.z = listen * -0.55;
    if (rightLeg.current) rightLeg.current.rotation.z = listen * 0.35;
  });

  return (
    <group ref={root} position={[1.18, -0.02, -0.22]} rotation={[0, -0.28, 0]}>
      <mesh position={[0, -0.05, 0]} scale={[0.72, 0.92, 0.5]}>
        <capsuleGeometry args={[0.52, 0.82, 7, 14]} />
        <meshStandardMaterial color="#2b4a4b" roughness={0.92} />
      </mesh>

      <group ref={head} position={[0, 1.06, 0]}>
        <mesh scale={[0.82, 1, 0.82]}>
          <icosahedronGeometry args={[0.55, 3]} />
          <meshStandardMaterial color="#c98e68" roughness={0.92} flatShading />
        </mesh>
        <mesh position={[0, 0.34, -0.02]} scale={[0.88, 0.48, 0.88]}>
          <icosahedronGeometry args={[0.53, 2]} />
          <meshStandardMaterial color="#26211f" roughness={0.96} flatShading />
        </mesh>
        {[-0.19, 0.19].map((x) => (
          <mesh key={x} position={[x, 0.08, 0.47]}>
            <sphereGeometry args={[0.055, 10, 8]} />
            <meshStandardMaterial color="#161718" roughness={0.4} />
          </mesh>
        ))}
        <mesh position={[0, -0.04, 0.52]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.07, 0.18, 8]} />
          <meshStandardMaterial color="#b97957" roughness={0.9} />
        </mesh>
        {[-0.19, 0.19].map((x) => (
          <mesh key={`brow-${x}`} position={[x, 0.19, 0.5]} rotation={[0, 0, x < 0 ? -0.08 : 0.08]}>
            <boxGeometry args={[0.2, 0.035, 0.035]} />
            <meshStandardMaterial color="#312824" roughness={0.9} />
          </mesh>
        ))}
      </group>

      <group ref={leftArm} position={[-0.62, 0.42, 0]} rotation={[0.1, 0, 0.28]}>
        <Limb length={0.88} color="#2b4a4b" />
        <mesh position={[0, -0.98, 0]}>
          <sphereGeometry args={[0.15, 12, 10]} />
          <meshStandardMaterial color="#c98e68" roughness={0.92} />
        </mesh>
      </group>
      <group ref={rightArm} position={[0.62, 0.42, 0]} rotation={[-0.1, 0, -0.2]}>
        <Limb length={0.88} color="#2b4a4b" />
        <mesh position={[0, -0.98, 0]}>
          <sphereGeometry args={[0.15, 12, 10]} />
          <meshStandardMaterial color="#c98e68" roughness={0.92} />
        </mesh>
      </group>

      <group ref={leftLeg} position={[-0.26, -0.62, 0]} rotation={[0, 0, -0.04]}>
        <Limb length={0.76} color="#1c2527" />
        <mesh position={[-0.02, -0.88, 0.11]} scale={[1.55, 0.58, 2.1]}>
          <sphereGeometry args={[0.16, 12, 8]} />
          <meshStandardMaterial color="#151819" roughness={0.92} />
        </mesh>
      </group>
      <group ref={rightLeg} position={[0.26, -0.62, 0]} rotation={[0, 0, 0.04]}>
        <Limb length={0.76} color="#1c2527" />
        <mesh position={[0.02, -0.88, 0.11]} scale={[1.55, 0.58, 2.1]}>
          <sphereGeometry args={[0.16, 12, 8]} />
          <meshStandardMaterial color="#151819" roughness={0.92} />
        </mesh>
      </group>
      <mesh position={[0, -1.42, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[1.1, 0.58, 1]}>
        <circleGeometry args={[0.68, 28]} />
        <meshBasicMaterial color="#050606" transparent opacity={0.42} depthWrite={false} />
      </mesh>
    </group>
  );
}

function RequestCard({ progress }: Pick<WorldProps, "progress">) {
  const group = useRef<THREE.Group>(null);
  const start = useMemo(() => new THREE.Vector3(-1.45, 0.74, 0.08), []);
  const end = useMemo(() => new THREE.Vector3(-0.08, 0.45, 1.52), []);

  useFrame(() => {
    const arrival = ease(range(progress.current, 0.065, 0.155));
    const hover = ease(range(progress.current, 0.155, 0.22));
    const returning = ease(range(progress.current, 0.956, 0.988));
    const nextTap = ease(range(progress.current, 0.989, 1));
    if (!group.current) return;
    group.current.visible = progress.current > 0.045;
    group.current.position.lerpVectors(start, end, arrival * (1 - returning));
    group.current.position.y += Math.sin(arrival * Math.PI) * 0.52 + hover * 0.08 + Math.sin(nextTap * Math.PI) * 0.09;
    group.current.position.x += nextTap * -0.25;
    group.current.rotation.set(
      -0.08 - arrival * 0.08,
      -0.18 + arrival * 0.28,
      (1 - arrival) * -0.32 + Math.sin(hover * Math.PI) * 0.035,
    );
    const scale = 0.38 + arrival * (1 - returning) * 0.62;
    group.current.scale.setScalar(scale);
  });

  return (
    <group ref={group} visible={false}>
      <mesh>
        <boxGeometry args={[1.9, 1.08, 0.055]} />
        <meshStandardMaterial color="#eee4d2" roughness={0.86} />
      </mesh>
      <mesh position={[-0.72, 0.36, 0.04]}>
        <boxGeometry args={[0.2, 0.08, 0.018]} />
        <meshStandardMaterial color="#ff5a2f" emissive="#7a1e09" emissiveIntensity={0.38} />
      </mesh>
      {[0.16, -0.08, -0.32].map((y, index) => (
        <mesh key={y} position={[-0.18 + index * 0.08, y, 0.041]}>
          <boxGeometry args={[1.18 - index * 0.17, 0.055, 0.015]} />
          <meshStandardMaterial color="#77746d" roughness={0.9} />
        </mesh>
      ))}
      <pointLight position={[0, 0, 0.65]} intensity={3.4} distance={3.6} color="#ff8b62" />
    </group>
  );
}

function OrangeThread({ progress }: Pick<WorldProps, "progress">) {
  const points = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.12, 0.22, 1.48),
      new THREE.Vector3(0.05, -0.35, 1),
      new THREE.Vector3(-0.28, -0.9, 0.2),
      new THREE.Vector3(0.25, -1.18, -1.5),
      new THREE.Vector3(0, -0.86, -4.5),
    ]);
    return curve.getPoints(80);
  }, []);
  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);
  const material = useMemo(
    () => new THREE.LineBasicMaterial({ color: "#ff5a2f", transparent: true, opacity: 0.95 }),
    [],
  );
  const line = useMemo(() => new THREE.Line(geometry, material), [geometry, material]);

  useEffect(() => () => {
    geometry.dispose();
    material.dispose();
  }, [geometry, material]);

  useFrame(() => {
    const reveal = ease(range(progress.current, 0.16, 0.285));
    geometry.setDrawRange(0, Math.max(0, Math.floor(points.length * reveal)));
    line.visible = reveal > 0.002 && progress.current < 0.38;
  });

  return <primitive object={line} />;
}

function questionCurveAt(z = -21.2) {
  return new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1.5, 1.7, z),
    new THREE.Vector3(-1.35, 2.65, z),
    new THREE.Vector3(-0.35, 3.2, z),
    new THREE.Vector3(0.85, 2.9, z),
    new THREE.Vector3(1.55, 2.05, z),
    new THREE.Vector3(1.3, 1.05, z),
    new THREE.Vector3(0.38, 0.55, z),
    new THREE.Vector3(0.1, -0.18, z),
  ]);
}

function StationGate({ index }: { index: number }) {
  const color = index % 2 ? "#697b78" : "#596767";
  return (
    <group>
      <mesh position={[-0.82, -0.3, 0]}>
        <boxGeometry args={[0.12, 2.1, 0.32]} />
        <meshStandardMaterial color={color} roughness={0.78} />
      </mesh>
      <mesh position={[0.82, -0.3, 0]}>
        <boxGeometry args={[0.12, 2.1, 0.32]} />
        <meshStandardMaterial color={color} roughness={0.78} />
      </mesh>
      <mesh position={[0, 0.72, 0]}>
        <boxGeometry args={[1.76, 0.12, 0.32]} />
        <meshStandardMaterial color={color} roughness={0.78} />
      </mesh>
      <mesh position={[0, 1.02, 0.04]}>
        <boxGeometry args={[1.2, 0.24, 0.055]} />
        <meshStandardMaterial color={index === 4 ? "#c9603d" : "#d4c9b5"} roughness={0.92} />
      </mesh>
    </group>
  );
}

function WorkflowArchitecture({ progress }: Pick<WorldProps, "progress">) {
  const root = useRef<THREE.Group>(null);
  const stations = useRef<THREE.Group>(null);

  useFrame(() => {
    const p = progress.current;
    const arrival = ease(range(p, 0.245, 0.325));
    const merge = ease(range(p, 0.69, 0.84));
    const fade = 1 - ease(range(p, 0.885, 0.94));
    if (root.current) {
      root.current.visible = arrival * fade > 0.002;
      root.current.scale.setScalar(0.88 + arrival * 0.12);
    }
    stations.current?.children.forEach((station, index) => {
      const lane = (index % 2 ? 1 : -1) * (0.72 + index * 0.11);
      station.position.x = THREE.MathUtils.lerp(lane, 0, merge);
      station.rotation.y = THREE.MathUtils.lerp((index - 2) * 0.08, 0, merge);
      station.position.y = Math.sin(index * 1.8) * 0.08 * (1 - merge);
    });
  });

  return (
    <group ref={root} visible={false}>
      <group ref={stations}>
        {Array.from({ length: 5 }, (_, index) => (
          <group key={index} position={[0, 0, -6.2 - index * 2.45]}>
            <StationGate index={index} />
          </group>
        ))}
      </group>
      {Array.from({ length: 7 }, (_, index) => (
        <mesh key={index} position={[0, -1.43, -5.2 - index * 2.2]}>
          <boxGeometry args={[4.5 - index * 0.15, 0.12, 1.9]} />
          <meshStandardMaterial color={index % 2 ? "#191d1e" : "#202425"} roughness={0.95} />
        </mesh>
      ))}
      <mesh position={[-2.25, -0.88, -11]}>
        <boxGeometry args={[0.08, 0.08, 12]} />
        <meshStandardMaterial color="#7e6a54" roughness={0.74} />
      </mesh>
      <mesh position={[2.25, -0.88, -11]}>
        <boxGeometry args={[0.08, 0.08, 12]} />
        <meshStandardMaterial color="#7e6a54" roughness={0.74} />
      </mesh>
    </group>
  );
}

function WorkflowCards({ progress, quality }: WorldProps) {
  const count = quality === "premium" ? 72 : quality === "balanced" ? 44 : 18;
  const mesh = useRef<THREE.InstancedMesh>(null);
  const material = useRef<THREE.MeshStandardMaterial>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const base = useMemo(() => new THREE.Vector3(), []);
  const chaos = useMemo(() => new THREE.Vector3(), []);
  const clean = useMemo(() => new THREE.Vector3(), []);
  const position = useMemo(() => new THREE.Vector3(), []);
  const curve = useMemo(() => questionCurveAt(), []);
  const questionPoints = useMemo(
    () => Array.from({ length: count }, (_, index) => curve.getPoint(index / Math.max(1, count - 1))),
    [count, curve],
  );

  useFrame(() => {
    const current = mesh.current;
    if (!current) return;
    const p = progress.current;
    const arrival = ease(range(p, 0.255, 0.34));
    const chaosWindow = Math.sin(Math.PI * range(p, 0.5, 0.68));
    const align = ease(range(p, 0.69, 0.86));
    const becomeQuestion = ease(range(p, 0.885, 0.95));
    const returnFade = 1 - ease(range(p, 0.958, 0.982));
    current.visible = arrival * returnFade > 0.002;
    if (material.current) material.current.opacity = arrival * returnFade * 0.96;
    if (!current.visible) return;

    for (let index = 0; index < count; index += 1) {
      const t = (index / Math.max(1, count - 1) + p * 0.82) % 1;
      const lane = (index % 5 - 2) * 0.68;
      base.set(
        lane + Math.sin(index * 2.1) * 0.16,
        -0.92 + (index % 3) * 0.16,
        -5.4 - t * 12.6,
      );
      const angle = index * 0.86 + p * Math.PI * 5;
      chaos.set(
        Math.cos(angle) * (1.1 + seeded(index + 5) * 2.8),
        -0.25 + Math.sin(angle * 1.4) * 1.65,
        -13.5 + Math.sin(angle) * 2.1,
      );
      clean.set(
        Math.sin(index * 0.55) * 0.13,
        -0.85,
        -13.2 - (index / Math.max(1, count - 1)) * 6.2,
      );
      position.copy(base).lerp(chaos, chaosWindow).lerp(clean, align);
      position.lerp(questionPoints[index], becomeQuestion);
      dummy.position.copy(position);
      dummy.rotation.set(
        THREE.MathUtils.lerp((seeded(index + 11) - 0.5) * 0.7, 0, align),
        THREE.MathUtils.lerp((seeded(index + 31) - 0.5) * 0.8, 0, align),
        THREE.MathUtils.lerp((seeded(index + 71) - 0.5) * 0.65, 0, align),
      );
      const scale = 0.28 + arrival * 0.72;
      dummy.scale.set(0.78 * scale, 0.52 * scale, 0.5 * scale);
      dummy.updateMatrix();
      current.setMatrixAt(index, dummy.matrix);
    }
    current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]} visible={false} frustumCulled={false}>
      <boxGeometry args={[0.9, 0.68, 0.055]} />
      <meshStandardMaterial ref={material} color="#e4d9c5" roughness={0.92} transparent opacity={0} />
    </instancedMesh>
  );
}

function MiniPerson({ color, offset = 0 }: { color: string; offset?: number }) {
  return (
    <group rotation={[0, offset, 0]}>
      <mesh position={[0, 0.34, 0]} scale={[0.72, 0.92, 0.52]}>
        <capsuleGeometry args={[0.22, 0.54, 5, 9]} />
        <meshStandardMaterial color={color} roughness={0.9} />
      </mesh>
      <mesh position={[0, 1.04, 0]}>
        <icosahedronGeometry args={[0.31, 2]} />
        <meshStandardMaterial color="#b98262" roughness={0.94} flatShading />
      </mesh>
      <mesh position={[-0.14, -0.58, 0]}>
        <capsuleGeometry args={[0.075, 0.58, 4, 7]} />
        <meshStandardMaterial color="#252b2b" roughness={0.9} />
      </mesh>
      <mesh position={[0.14, -0.58, 0]}>
        <capsuleGeometry args={[0.075, 0.58, 4, 7]} />
        <meshStandardMaterial color="#252b2b" roughness={0.9} />
      </mesh>
    </group>
  );
}

function AudienceStations({ progress }: Pick<WorldProps, "progress">) {
  const root = useRef<THREE.Group>(null);

  useFrame(() => {
    const presence = ease(range(progress.current, 0.345, 0.385)) * (1 - ease(range(progress.current, 0.49, 0.525)));
    if (!root.current) return;
    root.current.visible = presence > 0.002;
    root.current.children.forEach((child, index) => {
      const viewpoint = ease(range(progress.current, 0.36 + index * 0.018, 0.405 + index * 0.018));
      child.rotation.y = (index - 1) * 0.28 * (1 - viewpoint);
      child.position.z = -9.7 - index * 0.54 + viewpoint * 0.24;
    });
  });

  return (
    <group ref={root} visible={false}>
      {[
        { x: -2.15, color: "#b96b48", angle: -0.3 },
        { x: 0, color: "#617f7b", angle: 0.08 },
        { x: 2.15, color: "#8d765f", angle: 0.34 },
      ].map((person, index) => (
        <group key={person.x} position={[person.x, -0.05, -9.7 - index * 0.54]}>
          <mesh position={[0, 0.15, -0.18]}>
            <boxGeometry args={[1.55, 2.75, 0.08]} />
            <meshStandardMaterial color="#262b2b" roughness={0.82} transparent opacity={0.74} />
          </mesh>
          <mesh position={[0, 1.18, -0.09]} rotation={[0, 0, person.angle]}>
            <boxGeometry args={[1.08, 0.1, 0.05]} />
            <meshStandardMaterial color={index === 1 ? "#ff6841" : "#d2c8b6"} roughness={0.9} />
          </mesh>
          <MiniPerson color={person.color} offset={person.angle} />
        </group>
      ))}
    </group>
  );
}

function ButtonFailure({ progress, quality }: WorldProps) {
  const count = quality === "premium" ? 70 : quality === "balanced" ? 34 : 10;
  const root = useRef<THREE.Group>(null);
  const bases = useRef<THREE.InstancedMesh>(null);
  const caps = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    const p = progress.current;
    const grow = ease(range(p, 0.475, 0.53));
    const multiply = ease(range(p, 0.525, 0.61));
    const remove = ease(range(p, 0.655, 0.72));
    const presence = grow * (1 - remove);
    if (root.current) {
      root.current.visible = presence > 0.002;
      const scale = (0.12 + grow * 1.88) * (1 - remove * 0.94);
      root.current.scale.setScalar(scale);
      root.current.rotation.y = grow * 0.18;
    }

    const instanceLayers = [bases.current, caps.current];
    const instancesVisible = multiply * (1 - remove) > 0.002;
    instanceLayers.forEach((mesh) => {
      if (mesh) mesh.visible = instancesVisible;
    });
    if (!instancesVisible) return;

    instanceLayers.forEach((mesh, layer) => {
      if (!mesh) return;
      for (let index = 0; index < count; index += 1) {
        const t = index / Math.max(1, count - 1);
        const radius = 0.7 + seeded(index + 18) * 3.6 * multiply;
        const angle = index * 1.57 + t * Math.PI * 2.5;
        dummy.position.set(
          Math.cos(angle) * radius,
          -1.05 + layer * 0.16 + Math.sin(index * 0.8) * 0.3 * multiply,
          -13.7 + Math.sin(angle) * radius * 0.68 + (t - 0.5) * 4,
        );
        dummy.rotation.set(0, angle * 0.1, (seeded(index + 3) - 0.5) * 0.3);
        const scale = 0.05 + multiply * (0.45 + seeded(index + 40) * 0.42);
        dummy.scale.setScalar(scale);
        dummy.updateMatrix();
        mesh.setMatrixAt(index, dummy.matrix);
      }
      mesh.instanceMatrix.needsUpdate = true;
    });
  });

  return (
    <>
      <group ref={root} position={[0, -0.9, -13.7]} visible={false}>
        <mesh>
          <cylinderGeometry args={[1.15, 1.28, 0.48, 28]} />
          <meshStandardMaterial color="#41352d" roughness={0.72} metalness={0.06} />
        </mesh>
        <mesh position={[0, 0.31, 0]}>
          <cylinderGeometry args={[0.88, 0.98, 0.22, 28]} />
          <meshStandardMaterial color="#ff5a2f" emissive="#6d1d09" emissiveIntensity={0.42} roughness={0.56} />
        </mesh>
        <pointLight position={[0, 0.85, 0.5]} intensity={8} distance={7} color="#ff5a2f" />
      </group>
      <instancedMesh ref={bases} args={[undefined, undefined, count]} visible={false} frustumCulled={false}>
        <cylinderGeometry args={[0.76, 0.86, 0.32, 16]} />
        <meshStandardMaterial color="#453a32" roughness={0.74} />
      </instancedMesh>
      <instancedMesh ref={caps} args={[undefined, undefined, count]} visible={false} frustumCulled={false}>
        <cylinderGeometry args={[0.58, 0.65, 0.18, 16]} />
        <meshStandardMaterial color="#ff5a2f" emissive="#5c1808" emissiveIntensity={0.34} roughness={0.58} />
      </instancedMesh>
    </>
  );
}

function ReframedPath({ progress }: Pick<WorldProps, "progress">) {
  const material = useRef<THREE.MeshStandardMaterial>(null);
  const group = useRef<THREE.Group>(null);
  const tiles = useRef<THREE.Group>(null);
  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -0.88, -13.2),
      new THREE.Vector3(-0.15, -0.78, -15.2),
      new THREE.Vector3(0.12, -0.72, -17.3),
      new THREE.Vector3(0, -0.64, -19.55),
    ]);
    return new THREE.TubeGeometry(curve, 90, 0.055, 10, false);
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame(() => {
    const reveal = ease(range(progress.current, 0.69, 0.79));
    const fade = 1 - ease(range(progress.current, 0.91, 0.95));
    if (group.current) {
      group.current.visible = reveal * fade > 0.002;
      group.current.scale.set(1, 0.85 + reveal * 0.15, 0.18 + reveal * 0.82);
    }
    if (tiles.current) {
      tiles.current.children.forEach((tile, index) => {
        const tileReveal = ease(range(reveal, index / 7, (index + 2) / 7));
        tile.scale.set(0.84 + tileReveal * 0.16, 0.5 + tileReveal * 0.5, 0.12 + tileReveal * 0.88);
      });
    }
    if (material.current) material.current.opacity = reveal * fade;
  });

  return (
    <group ref={group} visible={false}>
      <mesh geometry={geometry}>
        <meshStandardMaterial
          ref={material}
          color="#ff6841"
          emissive="#8b250c"
          emissiveIntensity={0.45}
          roughness={0.55}
          transparent
          opacity={0}
        />
      </mesh>
      <group ref={tiles}>
        {Array.from({ length: 6 }, (_, index) => (
          <mesh key={index} position={[0, -1.1, -13.6 - index * 1.05]}>
            <boxGeometry args={[1.25, 0.08, 0.72]} />
            <meshStandardMaterial color={index === 5 ? "#d8ccb7" : "#303737"} roughness={0.88} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function FinalQuestion({ progress }: Pick<WorldProps, "progress">) {
  const group = useRef<THREE.Group>(null);
  const material = useRef<THREE.MeshStandardMaterial>(null);
  const curve = useMemo(() => questionCurveAt(), []);
  const geometry = useMemo(() => new THREE.TubeGeometry(curve, 110, 0.075, 10, false), [curve]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame(() => {
    const reveal = ease(range(progress.current, 0.895, 0.95));
    const fold = ease(range(progress.current, 0.958, 0.982));
    const presence = reveal * (1 - fold);
    if (group.current) {
      group.current.visible = presence > 0.002;
      const scale = 0.08 + reveal * 0.92 - fold * 0.85;
      group.current.scale.setScalar(Math.max(0.04, scale));
      group.current.rotation.z = (1 - reveal) * -0.12 + fold * 0.35;
    }
    if (material.current) material.current.opacity = presence;
  });

  return (
    <group ref={group} visible={false}>
      <mesh geometry={geometry}>
        <meshStandardMaterial
          ref={material}
          color="#ff5a2f"
          emissive="#8b220b"
          emissiveIntensity={0.62}
          roughness={0.48}
          transparent
          opacity={0}
        />
      </mesh>
      <mesh position={[0.08, -1.02, -21.2]} rotation={[0.08, 0.12, -0.04]}>
        <boxGeometry args={[0.78, 0.52, 0.08]} />
        <meshStandardMaterial color="#eee3d0" roughness={0.9} />
      </mesh>
      <pointLight position={[0.1, 0.75, -19.7]} intensity={17} distance={8} color="#ff5a2f" />
    </group>
  );
}

function Dust({ quality }: Pick<WorldProps, "quality">) {
  const count = quality === "premium" ? 320 : quality === "balanced" ? 170 : 70;
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let index = 0; index < count; index += 1) {
      positions[index * 3] = (seeded(index + 4) - 0.5) * 13;
      positions[index * 3 + 1] = (seeded(index + 300) - 0.5) * 7;
      positions[index * 3 + 2] = (seeded(index + 700) - 0.5) * 12;
    }
    const result = new THREE.BufferGeometry();
    result.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return result;
  }, [count]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <points geometry={geometry}>
      <pointsMaterial color="#d8cdb9" size={0.018} opacity={0.28} transparent sizeAttenuation />
    </points>
  );
}

function Atmosphere({ progress }: Pick<WorldProps, "progress">) {
  const warm = useRef<THREE.PointLight>(null);
  const cool = useRef<THREE.PointLight>(null);
  const signal = useRef<THREE.PointLight>(null);

  useFrame(() => {
    const p = progress.current;
    const underDesk = ease(range(p, 0.23, 0.34));
    const listen = Math.sin(Math.PI * range(p, 0.4, 0.49));
    const failure = Math.sin(Math.PI * range(p, 0.49, 0.68));
    const resolution = ease(range(p, 0.69, 0.92));
    if (warm.current) warm.current.intensity = 17 * (1 - underDesk * 0.58) + resolution * 5;
    if (cool.current) cool.current.intensity = 10 + underDesk * 12 - listen * 7;
    if (signal.current) {
      signal.current.intensity = 5 + failure * 22 + resolution * 8;
      signal.current.position.z = THREE.MathUtils.lerp(1, -16, ease(range(p, 0.2, 0.82)));
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} color="#9ca7a5" />
      <directionalLight position={[3, 6, 7]} intensity={2.25} color="#ffe6c4" />
      <pointLight ref={warm} position={[-4, 0, 3]} intensity={17} distance={16} color="#ffad72" />
      <pointLight ref={cool} position={[4, 2, -5]} intensity={10} distance={18} color="#6f9a9b" />
      <pointLight ref={signal} position={[0, -0.4, 1]} intensity={5} distance={13} color="#ff4f26" />
    </>
  );
}

function World({ progress, quality }: WorldProps) {
  return (
    <>
      <fog attach="fog" args={["#080a0b", 6.5, 28]} />
      <Atmosphere progress={progress} />
      <CameraRig progress={progress} />
      <Workshop progress={progress} />
      <DeskCrossSection progress={progress} />
      <TomerFigure progress={progress} />
      <RequestCard progress={progress} />
      <OrangeThread progress={progress} />
      <WorkflowArchitecture progress={progress} />
      <WorkflowCards progress={progress} quality={quality} />
      <AudienceStations progress={progress} />
      <ButtonFailure progress={progress} quality={quality} />
      <ReframedPath progress={progress} />
      <FinalQuestion progress={progress} />
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

function ContextLifecycle({ onRendererStatus }: Pick<CinematicWorldProps, "onRendererStatus">) {
  const gl = useThree((state) => state.gl);
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    const canvas = gl.domElement;
    const preserveForRestore = (event: Event) => {
      event.preventDefault();
      onRendererStatus(false);
    };
    const renderRestoredContext = () => {
      invalidate();
      onRendererStatus(true);
    };

    canvas.addEventListener("webglcontextlost", preserveForRestore);
    canvas.addEventListener("webglcontextrestored", renderRestoredContext);
    return () => {
      canvas.removeEventListener("webglcontextlost", preserveForRestore);
      canvas.removeEventListener("webglcontextrestored", renderRestoredContext);
    };
  }, [gl, invalidate, onRendererStatus]);

  return null;
}

class WebGLBoundary extends Component<
  { children: ReactNode; onFailure: () => void },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onFailure();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function CinematicWorld({
  progress,
  renderProgress,
  quality,
  onRendererStatus,
}: CinematicWorldProps) {
  const dpr = quality === "premium" ? 1.65 : quality === "balanced" ? 1.3 : 1;

  return (
    <WebGLBoundary onFailure={() => onRendererStatus(false)}>
      <Canvas
        key={quality}
        aria-hidden
        camera={{ fov: 42, near: 0.1, far: 70, position: [0, 1.55, 8.6] }}
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
          gl.toneMappingExposure = 1.04;
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
