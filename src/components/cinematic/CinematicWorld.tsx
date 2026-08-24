"use client";

import { Canvas, useFrame, useThree, type ThreeElements } from "@react-three/fiber";
import {
  Component,
  type MutableRefObject,
  type ReactNode,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

export type CinematicQuality = "essential" | "balanced" | "premium";

type WorldProps = {
  progress: MutableRefObject<number>;
  quality: CinematicQuality;
};

type CinematicWorldProps = WorldProps & {
  renderProgress: number;
  signalMessages: readonly string[];
  onRendererStatus: (ready: boolean) => void;
};

type CameraKey = {
  at: number;
  position: THREE.Vector3;
  target: THREE.Vector3;
  fov: number;
  roll?: number;
};

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const range = (value: number, start: number, end: number) => clamp01((value - start) / (end - start));
const ease = (value: number) => value * value * (3 - 2 * value);
const smoother = (value: number) => value * value * value * (value * (value * 6 - 15) + 10);
const seeded = (seed: number) => Math.abs(Math.sin(seed * 12.9898 + 78.233) * 43758.5453) % 1;

const BLACK_METAL = "#202729";
const CERAMIC = "#d8d4c9";
const AMBER = "#ff6841";
const BLUEPRINT = "#6f9c9a";

const CAMERA_KEYS: CameraKey[] = [
  { at: 0, position: new THREE.Vector3(0, 2.55, 7.9), target: new THREE.Vector3(0, -0.45, -3.1), fov: 47 },
  { at: 0.075, position: new THREE.Vector3(0.12, 2.45, 7.55), target: new THREE.Vector3(0, -0.45, -3.1), fov: 46 },
  { at: 0.12, position: new THREE.Vector3(0.9, 0.58, 4.2), target: new THREE.Vector3(0, -0.38, -3.1), fov: 39, roll: -0.012 },
  { at: 0.19, position: new THREE.Vector3(0.65, 0.38, 3.3), target: new THREE.Vector3(0, -0.35, -3.25), fov: 38 },
  { at: 0.24, position: new THREE.Vector3(-4.9, 0.92, -0.6), target: new THREE.Vector3(-0.1, -0.05, -5.2), fov: 40 },
  { at: 0.35, position: new THREE.Vector3(4.4, 0.62, -1.8), target: new THREE.Vector3(-0.2, 0.02, -7.15), fov: 39 },
  { at: 0.405, position: new THREE.Vector3(2.9, 3.1, -3.3), target: new THREE.Vector3(-0.2, 0, -8.2), fov: 42 },
  { at: 0.525, position: new THREE.Vector3(0, 9.25, -8.7), target: new THREE.Vector3(0, 0, -8.7), fov: 50 },
  { at: 0.57, position: new THREE.Vector3(0, 7.8, -8.4), target: new THREE.Vector3(0, 0.2, -9.3), fov: 52 },
  { at: 0.635, position: new THREE.Vector3(3.65, 0.2, -8.7), target: new THREE.Vector3(0, -0.08, -12), fov: 43 },
  { at: 0.695, position: new THREE.Vector3(-2.15, 0.15, -9), target: new THREE.Vector3(0, -0.08, -12.05), fov: 40 },
  { at: 0.73, position: new THREE.Vector3(0, 0.72, -10.7), target: new THREE.Vector3(0, -0.08, -14.8), fov: 43 },
  { at: 0.805, position: new THREE.Vector3(2.65, 0.42, -11.65), target: new THREE.Vector3(0.2, -0.14, -15.2), fov: 40 },
  { at: 0.87, position: new THREE.Vector3(0, 0.22, -13.7), target: new THREE.Vector3(0, -0.15, -18), fov: 42 },
  { at: 0.925, position: new THREE.Vector3(0, 0.18, -15.4), target: new THREE.Vector3(0, -0.12, -19.6), fov: 36 },
  { at: 0.95, position: new THREE.Vector3(0, 0.28, -17.2), target: new THREE.Vector3(0, -0.1, -22), fov: 40 },
  { at: 0.985, position: new THREE.Vector3(0, 3.75, -12.7), target: new THREE.Vector3(0, -0.35, -22.2), fov: 45 },
  { at: 1, position: new THREE.Vector3(0, 4.05, -12.1), target: new THREE.Vector3(0, -0.35, -22.2), fov: 45 },
];

const WORKFLOW_CURVE = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 0.03, -3.1),
  new THREE.Vector3(-1.2, 0.02, -4.35),
  new THREE.Vector3(1.15, 0.16, -5.25),
  new THREE.Vector3(-0.65, 0.08, -6.5),
  new THREE.Vector3(-2, 0.15, -8.05),
], false, "catmullrom", 0.36);

const cameraPosition = new THREE.Vector3();
const cameraTarget = new THREE.Vector3();
const coreScratch = new THREE.Vector3();

function interpolateCamera(progress: number) {
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
  const local = smoother(range(p, start.at, end.at));
  cameraPosition.lerpVectors(start.position, end.position, local);
  cameraTarget.lerpVectors(start.target, end.target, local);
  return {
    position: cameraPosition,
    target: cameraTarget,
    fov: THREE.MathUtils.lerp(start.fov, end.fov, local),
    roll: THREE.MathUtils.lerp(start.roll ?? 0, end.roll ?? 0, local),
  };
}

function getCorePosition(progress: number, output: THREE.Vector3) {
  const p = clamp01(progress);
  if (p <= 0.158) {
    const drop = smoother(range(p, 0.074, 0.112));
    const bounceProgress = range(p, 0.112, 0.158);
    const bounce = bounceProgress > 0 && bounceProgress < 1
      ? Math.abs(Math.sin(bounceProgress * Math.PI * 2.35)) * (1 - bounceProgress) * 0.13
      : 0;
    return output.set(0, THREE.MathUtils.lerp(2.72, 0.03, drop) + bounce, -3.1);
  }
  if (p <= 0.24) return output.set(0, 0.03, -3.1);
  if (p <= 0.41) return WORKFLOW_CURVE.getPoint(smoother(range(p, 0.24, 0.41)), output);
  if (p <= 0.57) {
    const local = smoother(range(p, 0.41, 0.57));
    return output.set(
      THREE.MathUtils.lerp(-2, 0, local) + Math.sin(local * Math.PI * 2) * 0.34,
      0.15,
      THREE.MathUtils.lerp(-8.05, -8.7, local),
    );
  }
  if (p <= 0.595) {
    const local = smoother(range(p, 0.57, 0.595));
    return output.set(0, THREE.MathUtils.lerp(0.15, 1.68, local), THREE.MathUtils.lerp(-8.7, -10, local));
  }
  if (p <= 0.635) {
    const local = range(p, 0.595, 0.635);
    return output.set(0, THREE.MathUtils.lerp(1.68, -0.02, local * local), THREE.MathUtils.lerp(-10, -12, ease(local)));
  }
  if (p <= 0.73) return output.set(0, -0.02, -12);
  if (p <= 0.758) {
    const local = smoother(range(p, 0.73, 0.758));
    return output.set(Math.sin(local * Math.PI) * 0.34, -0.08, THREE.MathUtils.lerp(-12, -15.35, local));
  }
  if (p <= 0.87) return output.set(0, -0.08, -15.35);
  if (p <= 0.95) return output.set(0, -0.1, THREE.MathUtils.lerp(-15.35, -20.25, smoother(range(p, 0.87, 0.95))));
  return output.set(0, -0.1, THREE.MathUtils.lerp(-20.25, -23.15, smoother(range(p, 0.95, 1))));
}

function getRouteReveal(progress: number) {
  const p = clamp01(progress);
  if (p <= 0.24) return THREE.MathUtils.lerp(0, 0.1, smoother(range(p, 0.085, 0.24)));
  if (p <= 0.41) return THREE.MathUtils.lerp(0.1, 0.43, smoother(range(p, 0.24, 0.41)));
  if (p <= 0.57) return THREE.MathUtils.lerp(0.43, 0.55, smoother(range(p, 0.41, 0.57)));
  if (p <= 0.73) return THREE.MathUtils.lerp(0.55, 0.68, smoother(range(p, 0.57, 0.73)));
  if (p <= 0.87) return THREE.MathUtils.lerp(0.68, 0.8, smoother(range(p, 0.73, 0.87)));
  if (p <= 0.95) return THREE.MathUtils.lerp(0.8, 0.93, smoother(range(p, 0.87, 0.95)));
  return THREE.MathUtils.lerp(0.93, 1, smoother(range(p, 0.95, 1)));
}

function makeRoundedPanel(width: number, height: number, depth: number, radius: number, bevel = 0.035) {
  const shape = new THREE.Shape();
  const left = -width / 2;
  const bottom = -height / 2;
  shape.moveTo(left + radius, bottom);
  shape.lineTo(left + width - radius, bottom);
  shape.quadraticCurveTo(left + width, bottom, left + width, bottom + radius);
  shape.lineTo(left + width, bottom + height - radius);
  shape.quadraticCurveTo(left + width, bottom + height, left + width - radius, bottom + height);
  shape.lineTo(left + radius, bottom + height);
  shape.quadraticCurveTo(left, bottom + height, left, bottom + height - radius);
  shape.lineTo(left, bottom + radius);
  shape.quadraticCurveTo(left, bottom, left + radius, bottom);
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelSegments: 2,
    bevelSize: bevel,
    bevelThickness: bevel,
    curveSegments: 6,
    steps: 1,
  });
  geometry.center();
  geometry.computeVertexNormals();
  return geometry;
}

function makeSignalTexture(text: string, quality: CinematicQuality) {
  const scale = quality === "essential" ? 0.5 : 1;
  const canvas = document.createElement("canvas");
  canvas.width = 1024 * scale;
  canvas.height = 256 * scale;
  const context = canvas.getContext("2d");
  if (!context) return new THREE.CanvasTexture(canvas);
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = "rgba(140, 177, 171, 0.55)";
  context.lineWidth = 2 * scale;
  context.beginPath();
  context.moveTo(42 * scale, 34 * scale);
  context.lineTo(982 * scale, 34 * scale);
  context.stroke();
  context.fillStyle = "rgba(255, 104, 65, 0.92)";
  context.beginPath();
  context.arc(48 * scale, 67 * scale, 5 * scale, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = "rgba(222, 231, 226, 0.94)";
  context.font = `500 ${quality === "essential" ? 28 : 52}px Arial, sans-serif`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(text, canvas.width / 2, canvas.height * 0.59, canvas.width * 0.88);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = false;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

function makeProjectTexture(title: string, index: number, quality: CinematicQuality) {
  const size = quality === "essential" ? 256 : 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");
  if (!context) return new THREE.CanvasTexture(canvas);
  const unit = size / 512;
  const accent = index === 0 ? "#7fa39d" : index === 1 ? "#ff7652" : "#d9b783";
  context.fillStyle = "#0b1011";
  context.fillRect(0, 0, size, size);
  context.strokeStyle = "rgba(218, 228, 222, 0.13)";
  context.lineWidth = unit;
  for (let line = 1; line < 8; line += 1) {
    context.beginPath();
    context.moveTo(34 * unit, line * 58 * unit);
    context.lineTo(478 * unit, line * 58 * unit);
    context.stroke();
  }
  context.fillStyle = accent;
  context.fillRect(34 * unit, 30 * unit, 92 * unit, 5 * unit);
  context.fillStyle = "rgba(208, 218, 212, 0.52)";
  context.font = `500 ${12 * unit}px Arial, sans-serif`;
  context.letterSpacing = `${2.2 * unit}px`;
  context.fillText(`0${index + 1} / PRODUCT`, 34 * unit, 62 * unit);

  if (index === 0) {
    [[34, 100, 205, 118], [255, 100, 223, 52], [255, 168, 223, 50], [34, 236, 444, 86]].forEach(([x, y, width, height], block) => {
      context.fillStyle = block === 0 ? "rgba(127, 163, 157, 0.19)" : "rgba(220, 229, 224, 0.055)";
      context.fillRect(x * unit, y * unit, width * unit, height * unit);
      context.strokeRect(x * unit, y * unit, width * unit, height * unit);
    });
  } else if (index === 1) {
    for (let column = 0; column < 3; column += 1) {
      context.fillStyle = column === 1 ? "rgba(255, 118, 82, 0.13)" : "rgba(220, 229, 224, 0.05)";
      context.fillRect((34 + column * 151) * unit, 104 * unit, 132 * unit, 220 * unit);
      context.strokeRect((34 + column * 151) * unit, 104 * unit, 132 * unit, 220 * unit);
      context.fillStyle = accent;
      context.fillRect((49 + column * 151) * unit, 124 * unit, 46 * unit, 3 * unit);
    }
  } else {
    const nodes = [[90, 178], [198, 116], [306, 220], [416, 142], [210, 298], [390, 306]];
    context.strokeStyle = "rgba(217, 183, 131, 0.34)";
    context.beginPath();
    nodes.forEach(([x, y], node) => node === 0 ? context.moveTo(x * unit, y * unit) : context.lineTo(x * unit, y * unit));
    context.stroke();
    nodes.forEach(([x, y], node) => {
      context.fillStyle = node === 2 ? "#ff7652" : accent;
      context.beginPath();
      context.arc(x * unit, y * unit, (node === 2 ? 9 : 5) * unit, 0, Math.PI * 2);
      context.fill();
    });
  }

  context.fillStyle = "rgba(239, 237, 229, 0.97)";
  context.font = `600 ${54 * unit}px Arial, sans-serif`;
  context.letterSpacing = `${-2.4 * unit}px`;
  context.fillText(title.toUpperCase(), 32 * unit, 430 * unit);
  context.fillStyle = accent;
  context.fillRect(34 * unit, 452 * unit, 444 * unit, 4 * unit);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = false;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

type RoundedBlockProps = Omit<ThreeElements["mesh"], "geometry"> & {
  size: [number, number, number];
  radius?: number;
  segments?: number;
};

function RoundedBlock({ size, radius = 0.06, segments = 2, children, ...props }: RoundedBlockProps) {
  const [width, height, depth] = size;
  const geometry = useMemo(
    () => new RoundedBoxGeometry(width, height, depth, segments, radius),
    [depth, height, radius, segments, width],
  );
  useEffect(() => () => geometry.dispose(), [geometry]);
  return <mesh {...props} geometry={geometry}>{children}</mesh>;
}

function CameraRig({ progress }: Pick<WorldProps, "progress">) {
  const { camera, size } = useThree();
  const forward = useMemo(() => new THREE.Vector3(0, 0, -1), []);
  const rollQuaternion = useMemo(() => new THREE.Quaternion(), []);

  useFrame(() => {
    const shot = interpolateCamera(progress.current);
    const portrait = size.height > size.width;
    camera.position.copy(shot.position);
    if (portrait) {
      const proofPullback = smoother(range(progress.current, 0.91, 0.975));
      const blueprintLift = smoother(range(progress.current, 0.385, 0.445))
        * (1 - smoother(range(progress.current, 0.555, 0.625)));
      camera.position.z += THREE.MathUtils.lerp(2.45, 4.2, proofPullback);
      camera.position.y += 0.28 + blueprintLift * 1.32;
    }
    camera.lookAt(shot.target);
    rollQuaternion.setFromAxisAngle(forward, portrait ? 0 : shot.roll);
    camera.quaternion.multiply(rollQuaternion);
    if (camera instanceof THREE.PerspectiveCamera) {
      const nextFov = shot.fov + (portrait ? 7 : 0);
      if (Math.abs(camera.fov - nextFov) > 0.01) {
        camera.fov = nextFov;
        camera.updateProjectionMatrix();
      }
    }
  });
  return null;
}

function Atmosphere({ progress, quality }: WorldProps) {
  const coldKey = useRef<THREE.DirectionalLight>(null);
  const coldTarget = useRef<THREE.Object3D>(null);
  const coreLight = useRef<THREE.PointLight>(null);
  const zoneLight = useRef<THREE.PointLight>(null);
  const zoneColors = useMemo(() => [
    new THREE.Color("#79aaa7"),
    new THREE.Color("#ffd0a2"),
    new THREE.Color("#ff351d"),
    new THREE.Color("#ffd8a5"),
  ], []);

  useLayoutEffect(() => {
    if (coldKey.current && coldTarget.current) coldKey.current.target = coldTarget.current;
  }, []);

  useFrame(() => {
    const p = progress.current;
    const blueprintMoment = ease(range(p, 0.39, 0.49)) * (1 - ease(range(p, 0.58, 0.64)));
    const assembly = ease(range(p, 0.57, 0.66)) * (1 - ease(range(p, 0.75, 0.82)));
    const fault = ease(range(p, 0.775, 0.805)) * (1 - ease(range(p, 0.82, 0.86)));
    const dawn = ease(range(p, 0.89, 0.95));
    getCorePosition(p, coreScratch);
    if (coreLight.current) {
      coreLight.current.position.copy(coreScratch);
      coreLight.current.intensity = 2.4 + blueprintMoment * 1.4 + assembly * 2 + dawn * 2.2;
      coreLight.current.color.set(dawn > 0.45 ? "#ffe2b3" : AMBER);
    }
    if (coldTarget.current) {
      coldTarget.current.position.copy(coreScratch);
      coldTarget.current.updateMatrixWorld();
    }
    if (coldKey.current) {
      coldKey.current.position.set(coreScratch.x + 4, coreScratch.y + 8, coreScratch.z + 4);
      coldKey.current.intensity = 0.75 + blueprintMoment * 0.7 - dawn * 0.35;
    }
    if (zoneLight.current) {
      const total = Math.max(0.001, blueprintMoment + assembly + fault + dawn);
      zoneLight.current.position.set(
        (-3 * assembly + 1.2 * fault) / total,
        (4.5 * blueprintMoment + 3.5 * assembly + 0.3 * fault + 0.5 * dawn) / total,
        (-8.7 * blueprintMoment - 11 * assembly - 15.1 * fault - 22 * dawn) / total,
      );
      zoneLight.current.color.setRGB(
        (zoneColors[0].r * blueprintMoment + zoneColors[1].r * assembly + zoneColors[2].r * fault + zoneColors[3].r * dawn) / total,
        (zoneColors[0].g * blueprintMoment + zoneColors[1].g * assembly + zoneColors[2].g * fault + zoneColors[3].g * dawn) / total,
        (zoneColors[0].b * blueprintMoment + zoneColors[1].b * assembly + zoneColors[2].b * fault + zoneColors[3].b * dawn) / total,
      );
      zoneLight.current.intensity = blueprintMoment * 5.2 + assembly * 4.6 + fault * 7.5 + dawn * (quality === "essential" ? 7 : 10);
      zoneLight.current.distance = dawn > 0.2 ? 18 : 13;
    }
  });

  const shadowSize = quality === "premium" ? 1536 : 1024;
  return (
    <>
      <ambientLight intensity={0.12} color="#6f7b79" />
      <directionalLight
        ref={coldKey}
        position={[4, 8, 4]}
        intensity={0.8}
        color="#9bb0ae"
        castShadow={quality !== "essential"}
        shadow-mapSize-width={shadowSize}
        shadow-mapSize-height={shadowSize}
        shadow-camera-near={0.1}
        shadow-camera-far={28}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        shadow-bias={-0.0006}
      />
      <object3D ref={coldTarget} />
      <pointLight ref={coreLight} intensity={2.4} distance={5.5} decay={2} color={AMBER} />
      <pointLight ref={zoneLight} intensity={0} distance={13} decay={2} color="#79aaa7" />
    </>
  );
}

function IdeaCore({ progress, quality }: WorldProps) {
  const root = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Group>(null);
  const innerMaterial = useRef<THREE.MeshStandardMaterial>(null);
  const shellMaterial = useRef<THREE.MeshStandardMaterial>(null);
  const modules = useRef<THREE.Mesh[]>([]);
  const moduleMaterial = useRef<THREE.MeshStandardMaterial>(null);
  const interfaceMaterial = useRef<THREE.MeshStandardMaterial>(null);
  const interfaceAccent = useRef<THREE.Mesh>(null);
  const moduleGeometry = useMemo(() => makeRoundedPanel(0.72, 0.46, 0.13, 0.08, 0.025), []);
  const productPosition = useMemo(() => new THREE.Vector3(), []);
  const warmWhite = useMemo(() => new THREE.Color("#ffe6bd"), []);
  const hotOrange = useMemo(() => new THREE.Color(AMBER), []);
  const moduleBase = useMemo(() => new THREE.Color(BLACK_METAL), []);
  const moduleCorrected = useMemo(() => new THREE.Color("#31504d"), []);
  const moduleFault = useMemo(() => new THREE.Color("#7d2c25"), []);
  const moduleStarts = useMemo(() => [
    new THREE.Vector3(-1.8, 0.9, 0.2), new THREE.Vector3(1.8, 0.65, 0.05),
    new THREE.Vector3(-1.4, -1.15, -0.15), new THREE.Vector3(1.45, -1.1, 0),
    new THREE.Vector3(0, 1.65, -0.18), new THREE.Vector3(0, -1.7, 0.12),
  ], []);
  const moduleTargets = useMemo(() => [
    new THREE.Vector3(0, 0, 0.38), new THREE.Vector3(0, 0, -0.34),
    new THREE.Vector3(-0.48, -0.03, -0.02), new THREE.Vector3(0.48, -0.03, -0.02),
    new THREE.Vector3(0, 0.38, -0.03), new THREE.Vector3(0, -0.38, -0.03),
  ], []);
  const moduleScales = useMemo(() => [
    new THREE.Vector3(1.22, 0.94, 1), new THREE.Vector3(0.74, 1.2, 1.08),
    new THREE.Vector3(0.82, 1.35, 1), new THREE.Vector3(0.62, 0.86, 0.82),
    new THREE.Vector3(1.08, 0.58, 0.95), new THREE.Vector3(0.9, 0.72, 1.18),
  ], []);

  useEffect(() => () => moduleGeometry.dispose(), [moduleGeometry]);
  useFrame(() => {
    const p = progress.current;
    const assembly = smoother(range(p, 0.615, 0.705));
    const fault = ease(range(p, 0.785, 0.808)) * (1 - ease(range(p, 0.818, 0.858)));
    const corrected = ease(range(p, 0.825, 0.865));
    const live = ease(range(p, 0.915, 0.95));
    const resolve = smoother(range(p, 0.955, 0.987));
    getCorePosition(p, productPosition);
    if (root.current) {
      root.current.visible = p > 0.025 && resolve < 0.995;
      root.current.position.copy(productPosition);
      const travelTurn = Math.sin(range(p, 0.24, 0.41) * Math.PI * 3) * 0.22;
      root.current.rotation.set(0.09 + travelTurn * 0.25, -0.36 + p * 0.34, travelTurn * 0.18);
      root.current.scale.setScalar((assembly > 0 ? 1 + assembly * 0.16 : 1) * (1 - resolve));
    }
    if (shell.current) {
      shell.current.rotation.y = -0.12 + p * 0.82;
      shell.current.scale.setScalar(1 + assembly * 0.16);
    }
    if (innerMaterial.current) {
      innerMaterial.current.color.lerpColors(hotOrange, warmWhite, live);
      innerMaterial.current.emissive.lerpColors(hotOrange, warmWhite, live);
      innerMaterial.current.emissiveIntensity = 2.7 + assembly * 1.8 + live * 1.2;
    }
    if (shellMaterial.current) shellMaterial.current.roughness = THREE.MathUtils.lerp(0.34, 0.24, assembly);
    modules.current.forEach((mesh, index) => {
      const delayedAssembly = smoother(range(assembly, index * 0.08, 0.58 + index * 0.065));
      mesh.visible = assembly > index * 0.045;
      mesh.position.lerpVectors(moduleStarts[index], moduleTargets[index], delayedAssembly);
      mesh.rotation.set(
        (1 - delayedAssembly) * (index % 2 ? -0.55 : 0.48),
        (1 - delayedAssembly) * (index - 2.5) * 0.22,
        (1 - delayedAssembly) * (index % 3 - 1) * 0.35,
      );
      mesh.scale.copy(moduleScales[index]);
      if (index === 3) {
        mesh.position.y -= fault * 0.92;
        mesh.position.x += fault * 0.28;
        mesh.rotation.z += fault * 1.05;
        mesh.position.x += corrected * 0.22;
        mesh.position.z += corrected * 0.08;
        mesh.rotation.y -= corrected * 0.26;
        mesh.scale.x *= 1 + corrected * 0.58;
      }
    });
    if (moduleMaterial.current) {
      moduleMaterial.current.color.lerpColors(moduleBase, moduleCorrected, corrected);
      moduleMaterial.current.color.lerp(moduleFault, fault);
    }
    if (interfaceMaterial.current) interfaceMaterial.current.emissiveIntensity = 0.08 + assembly * 0.16 + live * 0.26;
    if (interfaceAccent.current) {
      interfaceAccent.current.visible = assembly > 0.01;
      interfaceAccent.current.scale.x = assembly;
    }
  });

  const ribCount = quality === "essential" ? 3 : 6;
  return (
    <group ref={root} visible={false}>
      <mesh castShadow>
        <icosahedronGeometry args={[0.22, quality === "essential" ? 1 : 2]} />
        <meshStandardMaterial ref={innerMaterial} color={AMBER} emissive={AMBER} emissiveIntensity={2.7} roughness={0.18} metalness={0.05} />
      </mesh>
      <group ref={shell}>
        {Array.from({ length: ribCount }, (_, index) => {
          const angle = index * (Math.PI * 2 / ribCount);
          return (
            <mesh key={index} castShadow position={[Math.cos(angle) * 0.19, Math.sin(angle) * 0.19, 0]} rotation={[Math.PI / 2, 0, angle]}>
              <capsuleGeometry args={[0.046, 0.35, quality === "premium" ? 6 : 4, quality === "essential" ? 8 : 12]} />
              <meshStandardMaterial ref={index === 0 ? shellMaterial : undefined} color={BLACK_METAL} metalness={0.9} roughness={0.34} />
            </mesh>
          );
        })}
        <mesh rotation={[0.82, 0.36, 0.08]} castShadow>
          <torusGeometry args={[0.29, 0.018, 6, quality === "premium" ? 56 : 36, Math.PI * 1.65]} />
          <meshStandardMaterial color="#4b5657" metalness={0.94} roughness={0.24} />
        </mesh>
      </group>
      {moduleStarts.map((_, index) => (
        <mesh key={index} ref={(mesh) => { if (mesh) modules.current[index] = mesh; }} geometry={moduleGeometry} visible={false} castShadow receiveShadow>
          <meshStandardMaterial
            ref={index === 3 ? moduleMaterial : index === 0 ? interfaceMaterial : undefined}
            color={index === 0 ? CERAMIC : index === 4 ? "#394849" : BLACK_METAL}
            emissive={index === 0 ? "#d8caaa" : "#000000"}
            emissiveIntensity={index === 0 ? 0.08 : 0}
            metalness={index === 0 ? 0.18 : 0.82}
            roughness={index === 0 ? 0.5 : 0.32}
          />
        </mesh>
      ))}
      <mesh ref={interfaceAccent} position={[0, 0, 0.46]} visible={false}>
        <planeGeometry args={[0.42, 0.018]} />
        <meshBasicMaterial color={AMBER} toneMapped={false} />
      </mesh>
    </group>
  );
}

function ReceivingChamber({ progress, quality, signalMessages }: WorldProps & { signalMessages: readonly string[] }) {
  const root = useRef<THREE.Group>(null);
  const receiverMaterials = useRef<THREE.MeshStandardMaterial[]>([]);
  const textMaterials = useRef<THREE.MeshBasicMaterial[]>([]);
  const traceMaterial = useRef<THREE.MeshBasicMaterial>(null);
  const platformMaterial = useRef<THREE.MeshStandardMaterial>(null);
  const signalGeometry = useMemo(() => makeRoundedPanel(1.28, 0.62, 0.08, 0.06), []);
  const signalTextures = useMemo(
    () => signalMessages.map((message) => makeSignalTexture(message, quality)),
    [quality, signalMessages],
  );

  useEffect(() => () => {
    signalGeometry.dispose();
    signalTextures.forEach((texture) => texture.dispose());
  }, [signalGeometry, signalTextures]);
  useFrame(() => {
    const p = progress.current;
    const impact = ease(range(p, 0.09, 0.145));
    const open = ease(range(p, 0.18, 0.24));
    const dim = 1 - ease(range(p, 0.245, 0.34));
    if (root.current) {
      root.current.visible = dim > 0.002;
      root.current.position.x = open * -0.15;
    }
    if (traceMaterial.current) traceMaterial.current.opacity = impact * dim;
    if (platformMaterial.current) platformMaterial.current.emissiveIntensity = impact * 0.18;
    receiverMaterials.current.forEach((material, index) => {
      const wake = ease(range(p, 0.112 + index * 0.014, 0.16 + index * 0.014));
      const flicker = index === 2 && p > 0.165 && p < 0.178 ? 0.12 : 1;
      material.emissiveIntensity = wake * flicker * 0.35;
      material.opacity = dim * (0.52 + wake * 0.36);
      if (textMaterials.current[index]) textMaterials.current[index].opacity = dim * wake * flicker;
    });
  });

  const receivers: [number, number, number, number, number, number][] = [
    [-2.35, 0.65, -3.55, 0, 0.34, 0], [2.42, 0.9, -3.65, 0, -0.34, 0],
    [-1.85, 1.8, -4.05, 0.08, 0.18, -0.04], [1.75, -0.18, -3.8, -0.05, -0.2, 0.02],
  ];
  return (
    <group ref={root}>
      <mesh position={[0, -0.82, -3.1]} receiveShadow castShadow>
        <cylinderGeometry args={[1.28, 1.42, 0.18, quality === "essential" ? 28 : 48]} />
        <meshStandardMaterial ref={platformMaterial} color="#111719" emissive="#6d2b1b" emissiveIntensity={0} metalness={0.76} roughness={0.44} />
      </mesh>
      <mesh position={[0, -0.72, -3.1]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.66, 0.018, 6, quality === "premium" ? 72 : 48]} />
        <meshBasicMaterial ref={traceMaterial} color={AMBER} transparent opacity={0} toneMapped={false} />
      </mesh>
      {[0, 1, 2, 3].map((index) => (
        <mesh key={index} position={[0, -0.79, -3.1]} rotation={[0, index * Math.PI / 2, 0]} receiveShadow>
          <boxGeometry args={[0.055, 0.1, 2.65]} />
          <meshStandardMaterial color={index === 0 ? "#6d2b1b" : "#1b2324"} metalness={0.78} roughness={0.43} />
        </mesh>
      ))}
      {[-3.05, 3.05].map((x) => (
        <group key={x} position={[x, 0.05, -3.7]}>
          <RoundedBlock size={[0.24, 4.7, 0.32]} radius={0.055} castShadow receiveShadow>
            <meshStandardMaterial color="#171d1f" metalness={0.75} roughness={0.5} />
          </RoundedBlock>
          <mesh position={[x < 0 ? 0.14 : -0.14, 0.55, 0.18]}>
            <boxGeometry args={[0.035, 2.4, 0.03]} />
            <meshBasicMaterial color="#725147" toneMapped={false} />
          </mesh>
        </group>
      ))}
      {receivers.slice(0, quality === "essential" ? 2 : 4).map(([x, y, z, rx, ry, rz], index) => (
        <group key={index} position={[x, y, z]} rotation={[rx, ry, rz]}>
          <mesh geometry={signalGeometry} castShadow>
            <meshStandardMaterial
              ref={(material) => { if (material) receiverMaterials.current[index] = material; }}
              color="#263032"
              emissive={index === 0 ? AMBER : "#76908e"}
              emissiveIntensity={0}
              metalness={0.72}
              roughness={0.38}
              transparent
            />
          </mesh>
          <mesh position={[0, 0, 0.075]}>
            <planeGeometry args={[1.08, 0.47]} />
            <meshBasicMaterial
              ref={(material) => { if (material) textMaterials.current[index] = material; }}
              map={signalTextures[index]}
              transparent
              opacity={0}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}
      <mesh position={[0, 3.8, -3.35]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.15, 7]} />
        <meshBasicMaterial color="#d8f0ed" transparent opacity={0.035} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

function OwnershipRoute({ progress, quality }: WorldProps) {
  const curve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, -0.7, -3.1), new THREE.Vector3(-1.18, -0.68, -4.35),
    new THREE.Vector3(1.12, -0.62, -5.25), new THREE.Vector3(-0.64, -0.66, -6.5),
    new THREE.Vector3(-2, -0.62, -8.05), new THREE.Vector3(0, -0.58, -8.7),
    new THREE.Vector3(0, -0.58, -12), new THREE.Vector3(0.34, -0.62, -15.35),
    new THREE.Vector3(0, -0.64, -20.2), new THREE.Vector3(0, -0.64, -23.1),
  ], false, "catmullrom", 0.34), []);
  const geometry = useMemo(() => new THREE.TubeGeometry(curve, quality === "premium" ? 280 : quality === "balanced" ? 200 : 130, quality === "essential" ? 0.018 : 0.024, 7, false), [curve, quality]);
  const material = useMemo(() => new THREE.ShaderMaterial({
    uniforms: { uReveal: { value: 0 }, uColor: { value: new THREE.Color(AMBER) } },
    vertexShader: "varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",
    fragmentShader: "uniform float uReveal;uniform vec3 uColor;varying vec2 vUv;void main(){if(vUv.x>uReveal)discard;float head=smoothstep(max(0.0,uReveal-0.035),uReveal,vUv.x);gl_FragColor=vec4(uColor,0.72+head*0.28);}",
    transparent: true,
    depthWrite: false,
    toneMapped: false,
  }), []);
  useEffect(() => () => { geometry.dispose(); material.dispose(); }, [geometry, material]);
  useFrame(() => {
    const reveal = getRouteReveal(progress.current);
    material.uniforms.uReveal.value = reveal;
  });
  return (
    <mesh geometry={geometry} material={material} frustumCulled={false} />
  );
}

const MESSY_POSITIONS = [
  new THREE.Vector3(-2.5, 0.15, -4.5), new THREE.Vector3(-0.8, 0.65, -4.9),
  new THREE.Vector3(1.7, -0.15, -5.25), new THREE.Vector3(2.45, 0.55, -6.05),
  new THREE.Vector3(0.8, -0.35, -6.45), new THREE.Vector3(-1.4, 0.35, -6.8),
  new THREE.Vector3(-2.5, -0.2, -7.35), new THREE.Vector3(-0.25, 0.8, -7.7),
  new THREE.Vector3(2.05, 0.1, -8), new THREE.Vector3(0.4, -0.25, -8.35),
  new THREE.Vector3(-1.75, 0.45, -8.55), new THREE.Vector3(2.65, -0.05, -8.75),
];

const BLUEPRINT_POSITIONS = MESSY_POSITIONS.map((_, index) => new THREE.Vector3(
  (index % 4 - 1.5) * 1.35,
  0.16,
  -8.7 + (Math.floor(index / 4) - 1) * 1.25,
));

function WorkflowMaze({ progress, quality }: WorldProps) {
  const root = useRef<THREE.Group>(null);
  const blueprintPieces = useRef<THREE.Group>(null);
  const modules = useRef<THREE.InstancedMesh>(null);
  const moduleMaterial = useRef<THREE.MeshStandardMaterial>(null);
  const tokens = useRef<THREE.InstancedMesh>(null);
  const railMaterials = useRef<THREE.MeshStandardMaterial[]>([]);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const current = useMemo(() => new THREE.Vector3(), []);
  const count = quality === "essential" ? 8 : quality === "balanced" ? 10 : 12;
  const tokenCount = quality === "essential" ? 3 : 6;
  const loopPaths = useMemo(() => [
    new THREE.CatmullRomCurve3([new THREE.Vector3(-2.8, -0.52, -4.3), new THREE.Vector3(-0.5, -0.5, -5), new THREE.Vector3(2.6, -0.52, -5.4)], true),
    new THREE.CatmullRomCurve3([new THREE.Vector3(2.6, -0.52, -5.4), new THREE.Vector3(3.1, -0.5, -6.7), new THREE.Vector3(0.5, -0.52, -7.2), new THREE.Vector3(1.1, -0.52, -5.8)], true),
    new THREE.CatmullRomCurve3([new THREE.Vector3(-2.2, -0.5, -5.1), new THREE.Vector3(-3, -0.5, -6.25), new THREE.Vector3(-1.15, -0.52, -7.3), new THREE.Vector3(-2.25, -0.52, -8.5)], true),
    new THREE.CatmullRomCurve3([new THREE.Vector3(0.1, -0.52, -6), new THREE.Vector3(0.15, -0.52, -7.4), new THREE.Vector3(2.65, -0.52, -8.7)], true),
  ], []);
  const railGeometry = useMemo(() => loopPaths.map((curve) => new THREE.TubeGeometry(curve, quality === "premium" ? 70 : 42, 0.055, 6, true)), [loopPaths, quality]);
  const moduleGeometry = useMemo(
    () => new RoundedBoxGeometry(1.05, 0.7, 0.62, quality === "premium" ? 3 : 2, 0.085),
    [quality],
  );

  useEffect(() => () => {
    railGeometry.forEach((geometry) => geometry.dispose());
    moduleGeometry.dispose();
  }, [moduleGeometry, railGeometry]);
  useFrame(() => {
    const p = progress.current;
    const reveal = ease(range(p, 0.19, 0.27));
    const arrange = smoother(range(p, 0.395, 0.525));
    const flip = smoother(range(p, 0.56, 0.62));
    const flipAway = 1 - ease(range(p, 0.635, 0.68));
    if (root.current) {
      root.current.visible = reveal * flipAway > 0.002;
      root.current.position.y = (1 - reveal) * -1.2;
    }
    if (blueprintPieces.current) {
      blueprintPieces.current.position.set(0, flip * 1.55, -8.7 - flip * 1.15);
      blueprintPieces.current.rotation.x = -flip * Math.PI / 2;
    }
    if (moduleMaterial.current) moduleMaterial.current.opacity = reveal * flipAway * (0.82 + arrange * 0.16);
    railMaterials.current.forEach((material, index) => {
      material.opacity = reveal * flipAway * (1 - arrange * 0.78) * (index === 1 ? 0.72 : 0.46);
      material.emissiveIntensity = index === 1 ? 0.1 + reveal * 0.12 : 0;
    });
    if (modules.current) {
      for (let index = 0; index < count; index += 1) {
        current.lerpVectors(MESSY_POSITIONS[index], BLUEPRINT_POSITIONS[index], arrange);
        current.y += Math.sin(index * 1.7 + p * 14) * 0.035 * (1 - arrange);
        dummy.position.set(current.x, current.y, current.z + 8.7);
        dummy.rotation.set(
          (seeded(index + 3) - 0.5) * 0.34 * (1 - arrange),
          (seeded(index + 13) - 0.5) * 0.65 * (1 - arrange),
          (seeded(index + 23) - 0.5) * 0.28 * (1 - arrange),
        );
        dummy.scale.set(0.78 + seeded(index + 4) * 0.36, THREE.MathUtils.lerp(1, 0.18, arrange), 0.8 + seeded(index + 9) * 0.4);
        dummy.updateMatrix();
        modules.current.setMatrixAt(index, dummy.matrix);
      }
      modules.current.instanceMatrix.needsUpdate = true;
    }
    if (tokens.current) {
      const travel = smoother(range(p, 0.245, 0.405));
      for (let index = 0; index < tokenCount; index += 1) {
        const path = loopPaths[index % 3];
        path.getPoint((travel + index * 0.16) % 1, current);
        dummy.position.set(current.x, current.y + 0.12, current.z);
        dummy.scale.setScalar(1);
        dummy.rotation.set(0, travel * Math.PI * 2, 0);
        dummy.updateMatrix();
        tokens.current.setMatrixAt(index, dummy.matrix);
      }
      tokens.current.visible = arrange < 0.8;
      tokens.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={root} visible={false}>
      <group ref={blueprintPieces} position={[0, 0, -8.7]}>
        <instancedMesh ref={modules} args={[undefined, undefined, count]} castShadow receiveShadow frustumCulled={false}>
          <primitive object={moduleGeometry} attach="geometry" />
          <meshStandardMaterial ref={moduleMaterial} color="#293234" metalness={0.78} roughness={0.42} transparent opacity={0} />
        </instancedMesh>
      </group>
      {railGeometry.map((geometry, index) => (
        <mesh key={index} geometry={geometry} castShadow receiveShadow>
          <meshStandardMaterial
            ref={(material) => { if (material) railMaterials.current[index] = material; }}
            color={index === 1 ? "#5f2c22" : "#354143"}
            emissive={index === 1 ? AMBER : "#000000"}
            emissiveIntensity={0}
            metalness={0.86}
            roughness={0.34}
            transparent
            opacity={0}
          />
        </mesh>
      ))}
      <instancedMesh ref={tokens} args={[undefined, undefined, tokenCount]} frustumCulled={false} castShadow>
        <cylinderGeometry args={[0.11, 0.13, 0.12, 12]} />
        <meshStandardMaterial color="#b9b5aa" metalness={0.38} roughness={0.55} />
      </instancedMesh>
      {[[-2.9, -6.2], [2.85, -7.15], [0.2, -5.7]].map(([x, z], index) => (
        <group key={index} position={[x, 0.25, z]} rotation={[0, index === 1 ? -0.2 : 0.2, 0]}>
          <mesh castShadow><boxGeometry args={[0.18, 2.25, 0.22]} /><meshStandardMaterial color="#1b2224" metalness={0.8} roughness={0.4} /></mesh>
          <mesh position={[index === 1 ? -0.65 : 0.65, 0.66, 0]} rotation={[0, 0, index === 1 ? 0.5 : -0.5]} castShadow>
            <boxGeometry args={[1.35, 0.16, 0.18]} /><meshStandardMaterial color="#313b3d" metalness={0.82} roughness={0.35} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, -0.62, -6.7]} receiveShadow>
        <boxGeometry args={[7.3, 0.16, 5.6]} /><meshStandardMaterial color="#0d1213" metalness={0.46} roughness={0.68} />
      </mesh>
    </group>
  );
}

function BlueprintDeck({ progress, quality }: WorldProps) {
  const root = useRef<THREE.Group>(null);
  const grooveMaterials = useRef<THREE.MeshBasicMaterial[]>([]);
  const nodeMaterials = useRef<THREE.MeshStandardMaterial[]>([]);
  const scan = useRef<THREE.Mesh>(null);
  const panelMaterials = useRef<THREE.MeshStandardMaterial[]>([]);
  const panelParts: [number, number, number, number][] = [
    [-1.85, 0, 2.5, 5], [1.85, 0, 2.5, 5], [0, -1.55, 1.2, 1.9], [0, 1.55, 1.2, 1.9],
  ];
  const grooves: [number, number, number, number, number][] = [
    [-1.9, -1.35, 2.1, 0.035, 0], [-1.2, 0.05, 3.15, 0.035, Math.PI / 2],
    [1.2, 0.68, 2.25, 0.035, 0], [2, -0.55, 1.7, 0.035, Math.PI / 2],
    [0, 0, 1.1, 0.055, 0], [0.5, -1.4, 1.15, 0.035, 0], [-2.25, 1.2, 1.3, 0.035, Math.PI / 2],
  ];

  useFrame(() => {
    const p = progress.current;
    const reveal = smoother(range(p, 0.395, 0.49));
    const flip = smoother(range(p, 0.56, 0.62));
    const fade = 1 - ease(range(p, 0.625, 0.67));
    if (root.current) {
      root.current.visible = reveal * fade > 0.002;
      root.current.scale.setScalar(0.82 + reveal * 0.18);
      root.current.rotation.x = -flip * Math.PI / 2;
      root.current.position.set(0, flip * 1.55, -8.7 - flip * 1.15);
    }
    panelMaterials.current.forEach((material) => {
      material.opacity = reveal * fade * 0.94;
      material.emissiveIntensity = reveal * 0.04;
    });
    grooveMaterials.current.forEach((material, index) => { material.opacity = reveal * fade * (index === 4 ? 0.9 : 0.46 + reveal * 0.24); });
    nodeMaterials.current.forEach((material) => {
      material.opacity = reveal * fade;
      material.emissiveIntensity = reveal * 0.32;
    });
    if (scan.current) {
      const scanProgress = range(p, 0.455, 0.55);
      scan.current.visible = scanProgress > 0 && scanProgress < 1 && fade > 0.2;
      scan.current.position.x = THREE.MathUtils.lerp(-2.8, 2.8, scanProgress);
    }
  });

  const nodeCount = quality === "essential" ? 5 : 9;
  return (
    <group ref={root} position={[0, 0, -8.7]} visible={false}>
      {panelParts.map(([x, z, width, depth], index) => (
        <RoundedBlock key={index} size={[width, 0.13, depth]} radius={0.055} position={[x, 0, z]} receiveShadow castShadow>
          <meshStandardMaterial
            ref={(material) => { if (material) panelMaterials.current[index] = material; }}
            color="#182324"
            emissive="#375655"
            emissiveIntensity={0}
            metalness={0.72}
            roughness={0.4}
            transparent
            opacity={0}
          />
        </RoundedBlock>
      ))}
      {grooves.map(([x, z, width, height, rotation], index) => (
        <mesh key={index} position={[x, 0.075, z]} rotation={[Math.PI / 2, 0, rotation]}>
          <planeGeometry args={[width, height]} />
          <meshBasicMaterial ref={(material) => { if (material) grooveMaterials.current[index] = material; }} color={index === 4 ? AMBER : BLUEPRINT} transparent opacity={0} toneMapped={false} />
        </mesh>
      ))}
      {Array.from({ length: nodeCount }, (_, index) => (
        <mesh key={index} position={[(index % 3 - 1) * 1.75 + (index % 2) * 0.25, 0.13, (Math.floor(index / 3) - 1) * 1.35]} castShadow>
          <cylinderGeometry args={[0.13, 0.13, 0.09, 16]} />
          <meshStandardMaterial
            ref={(material) => { if (material) nodeMaterials.current[index] = material; }}
            color={index === 4 ? AMBER : "#799593"}
            emissive={index === 4 ? AMBER : BLUEPRINT}
            emissiveIntensity={0}
            metalness={0.55}
            roughness={0.36}
            transparent
            opacity={0}
          />
        </mesh>
      ))}
      <mesh ref={scan} position={[-2.8, 0.12, 0]} rotation={[Math.PI / 2, 0, Math.PI / 2]} visible={false}>
        <planeGeometry args={[5, 0.035]} /><meshBasicMaterial color="#e5fffb" transparent opacity={0.7} toneMapped={false} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

function Foundry({ progress, quality }: WorldProps) {
  const root = useRef<THREE.Group>(null);
  const arms = useRef<THREE.Group[]>([]);
  const practicals = useRef<THREE.MeshStandardMaterial[]>([]);
  const cradle = useRef<THREE.Group>(null);

  useFrame(() => {
    const p = progress.current;
    const reveal = smoother(range(p, 0.565, 0.635));
    const assembly = smoother(range(p, 0.615, 0.705));
    const leave = 1 - ease(range(p, 0.72, 0.79));
    if (root.current) {
      root.current.visible = reveal * leave > 0.002;
      root.current.position.y = (1 - reveal) * -2.2;
    }
    arms.current.forEach((arm, index) => {
      const delayed = smoother(range(assembly, index * 0.08, 0.54 + index * 0.08));
      const side = index % 2 === 0 ? -1 : 1;
      arm.position.x = side * THREE.MathUtils.lerp(2.65, 0.75, delayed);
      arm.position.y = (1 - delayed) * (index < 2 ? 1.35 : index < 4 ? 0 : -1.2);
      arm.rotation.z = side * THREE.MathUtils.lerp(0.15, 0.54, delayed);
    });
    practicals.current.forEach((material, index) => { material.emissiveIntensity = ease(range(assembly, index * 0.12, 0.42 + index * 0.1)) * 1.6; });
    if (cradle.current) {
      cradle.current.position.y = THREE.MathUtils.lerp(1.7, -0.02, smoother(range(p, 0.595, 0.635)));
      cradle.current.rotation.y = assembly * 0.12;
    }
  });

  const armCount = quality === "essential" ? 4 : 6;
  return (
    <group ref={root} position={[0, 0, -12]} visible={false}>
      <group ref={cradle} position={[0, 1.7, 0]}>
        {[0, 1, 2].map((index) => (
          <RoundedBlock key={index} size={[0.14, 0.62, 0.16]} radius={0.035} position={[Math.cos(index * Math.PI * 2 / 3) * 0.52, -0.15, Math.sin(index * Math.PI * 2 / 3) * 0.52]} rotation={[0, -index * Math.PI * 2 / 3, -0.38]} castShadow>
            <meshStandardMaterial color="#3a4546" metalness={0.88} roughness={0.3} />
          </RoundedBlock>
        ))}
      </group>
      {Array.from({ length: armCount }, (_, index) => {
        const side = index % 2 === 0 ? -1 : 1;
        return (
          <group key={index} ref={(group) => { if (group) arms.current[index] = group; }} position={[side * 2.65, index < 2 ? 1.35 : index < 4 ? 0 : -1.2, (index % 3 - 1) * 0.45]}>
            <RoundedBlock size={[1.65, 0.16, 0.18]} radius={0.045} castShadow><meshStandardMaterial color="#293234" metalness={0.86} roughness={0.32} /></RoundedBlock>
            <mesh position={[-side * 0.78, 0, 0]} castShadow><cylinderGeometry args={[0.2, 0.2, 0.22, 16]} /><meshStandardMaterial color="#556062" metalness={0.92} roughness={0.25} /></mesh>
            <mesh position={[side * 0.62, 0, 0]}>
              <boxGeometry args={[0.38, 0.055, 0.22]} />
              <meshStandardMaterial ref={(material) => { if (material) practicals.current[index] = material; }} color="#52291f" emissive={AMBER} emissiveIntensity={0} metalness={0.45} roughness={0.4} />
            </mesh>
          </group>
        );
      })}
      {[-3.25, 3.25].map((x) => (
        <RoundedBlock key={x} size={[0.42, 5.5, 0.52]} radius={0.075} position={[x, 0, 0]} castShadow receiveShadow><meshStandardMaterial color="#161c1e" metalness={0.72} roughness={0.5} /></RoundedBlock>
      ))}
      <RoundedBlock size={[6.9, 0.42, 0.52]} radius={0.075} position={[0, 2.55, 0]} castShadow><meshStandardMaterial color="#161c1e" metalness={0.72} roughness={0.5} /></RoundedBlock>
      <mesh position={[0, -0.68, 0]} receiveShadow><boxGeometry args={[7.4, 0.18, 4.7]} /><meshStandardMaterial color="#0d1213" metalness={0.55} roughness={0.64} /></mesh>
    </group>
  );
}

function TestArena({ progress, quality }: WorldProps) {
  const root = useRef<THREE.Group>(null);
  const agents = useRef<THREE.InstancedMesh>(null);
  const agentMaterial = useRef<THREE.MeshStandardMaterial>(null);
  const gate = useRef<THREE.Group>(null);
  const faultPractical = useRef<THREE.MeshStandardMaterial>(null);
  const routeMaterials = useRef<THREE.MeshStandardMaterial[]>([]);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const position = useMemo(() => new THREE.Vector3(), []);
  const mainPath = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-2.7, -0.48, 1.4), new THREE.Vector3(-1.2, -0.46, 0.5),
    new THREE.Vector3(0, -0.44, 0), new THREE.Vector3(1.4, -0.46, -0.45),
    new THREE.Vector3(2.7, -0.48, -1.25),
  ]), []);
  const divergentPath = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-2.7, -0.48, 1.4), new THREE.Vector3(-1.25, -0.46, 0.5),
    new THREE.Vector3(-0.2, -0.44, 0.05), new THREE.Vector3(0.6, -0.44, 0.86),
    new THREE.Vector3(2.7, -0.48, -1.25),
  ]), []);
  const routeGeometries = useMemo(
    () => [mainPath, divergentPath].map((curve) => new THREE.TubeGeometry(curve, quality === "premium" ? 72 : 46, 0.04, 6, false)),
    [divergentPath, mainPath, quality],
  );
  const agentCount = quality === "essential" ? 3 : 4;

  useEffect(() => () => routeGeometries.forEach((geometry) => geometry.dispose()), [routeGeometries]);
  useFrame(() => {
    const p = progress.current;
    const reveal = smoother(range(p, 0.705, 0.75));
    const fault = ease(range(p, 0.785, 0.808)) * (1 - ease(range(p, 0.818, 0.858)));
    const correction = ease(range(p, 0.825, 0.865));
    const leave = 1 - ease(range(p, 0.865, 0.9));
    if (root.current) {
      root.current.visible = reveal * leave > 0.002;
      root.current.position.y = (1 - reveal) * -1.5;
    }
    if (agents.current) {
      for (let index = 0; index < agentCount; index += 1) {
        const start = index === agentCount - 1 ? 0.762 : 0.758 + index * 0.012;
        let travel = smoother(range(p, start, 0.845 + index * 0.006));
        if (index === agentCount - 1) {
          const approach = smoother(range(p, start, 0.795)) * 0.61;
          const release = smoother(range(p, 0.823, 0.865));
          travel = THREE.MathUtils.lerp(approach, 1, release);
          divergentPath.getPoint(travel, position);
        } else {
          mainPath.getPoint(travel, position);
        }
        dummy.position.copy(position);
        dummy.scale.setScalar(index === agentCount - 1 ? 1.12 : 0.9);
        dummy.rotation.set(0, travel * Math.PI * 2, 0);
        dummy.updateMatrix();
        agents.current.setMatrixAt(index, dummy.matrix);
      }
      agents.current.instanceMatrix.needsUpdate = true;
    }
    if (agentMaterial.current) {
      agentMaterial.current.emissiveIntensity = 1.1 + fault * 2.8;
      agentMaterial.current.color.set(fault > 0.28 ? "#ff5b3b" : "#c9ddd8");
    }
    if (gate.current) {
      gate.current.position.x = 0.55 + correction * 0.42;
      gate.current.position.y = THREE.MathUtils.lerp(0.18, -0.32, fault) + correction * 0.28;
      gate.current.rotation.z = fault * 0.08 - correction * 0.34;
    }
    if (faultPractical.current) faultPractical.current.emissiveIntensity = fault * 3.4;
    routeMaterials.current.forEach((material, index) => {
      material.emissiveIntensity = index === 1 ? correction * 1.4 : 0.15;
      material.opacity = reveal * leave * (index === 1 ? 0.3 + correction * 0.65 : 0.72);
    });
  });

  return (
    <group ref={root} position={[0, 0, -15.35]} visible={false}>
      <mesh position={[0, -0.62, 0]} receiveShadow><boxGeometry args={[7.2, 0.16, 4.5]} /><meshStandardMaterial color="#111719" metalness={0.55} roughness={0.65} /></mesh>
      {routeGeometries.map((geometry, index) => (
        <mesh key={index} geometry={geometry} receiveShadow>
          <meshStandardMaterial
            ref={(material) => { if (material) routeMaterials.current[index] = material; }}
            color={index === 1 ? "#5e3025" : "#526261"}
            emissive={index === 1 ? AMBER : "#88aaa7"}
            emissiveIntensity={0}
            metalness={0.7}
            roughness={0.38}
            transparent
            opacity={0}
          />
        </mesh>
      ))}
      <instancedMesh ref={agents} args={[undefined, undefined, agentCount]} frustumCulled={false} castShadow>
        <dodecahedronGeometry args={[0.1, 0]} />
        <meshStandardMaterial ref={agentMaterial} color="#c9ddd8" emissive="#94b8b3" emissiveIntensity={1.1} roughness={0.25} />
      </instancedMesh>
      <group ref={gate} position={[0.55, 0.18, 0.8]}>
        <RoundedBlock size={[0.16, 1.35, 0.2]} radius={0.035} castShadow><meshStandardMaterial color="#2f393a" metalness={0.82} roughness={0.34} /></RoundedBlock>
        <mesh position={[0, 0.58, 0.02]}><boxGeometry args={[0.2, 0.12, 0.24]} /><meshStandardMaterial ref={faultPractical} color="#52251e" emissive="#ff351d" emissiveIntensity={0} /></mesh>
      </group>
      {[-3.1, 3.1].map((x) => (
        <RoundedBlock key={x} size={[0.3, 2.45, 0.36]} radius={0.055} position={[x, 0.55, 0]} castShadow><meshStandardMaterial color="#1b2224" metalness={0.75} roughness={0.48} /></RoundedBlock>
      ))}
    </group>
  );
}

function ReleaseTunnel({ progress, quality }: WorldProps) {
  const root = useRef<THREE.Group>(null);
  const gates = useRef<THREE.Group[]>([]);
  const indicators = useRef<THREE.MeshStandardMaterial[]>([]);
  const doorLeft = useRef<THREE.Mesh>(null);
  const doorRight = useRef<THREE.Mesh>(null);
  const dawnMaterial = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(() => {
    const p = progress.current;
    const reveal = smoother(range(p, 0.845, 0.88));
    const live = smoother(range(p, 0.91, 0.95));
    const dim = 1 - ease(range(p, 0.97, 1));
    if (root.current) {
      root.current.visible = reveal > 0.002;
      root.current.position.y = (1 - reveal) * -1.5;
    }
    gates.current.forEach((gate, index) => {
      const gateProgress = smoother(range(p, 0.87 + index * 0.017, 0.9 + index * 0.017));
      gate.scale.set(1 - gateProgress * 0.025, 1 - gateProgress * 0.025, 1);
      if (indicators.current[index]) indicators.current[index].emissiveIntensity = gateProgress * 2.2 * dim;
    });
    if (doorLeft.current) doorLeft.current.position.x = THREE.MathUtils.lerp(-1.55, -3.25, live);
    if (doorRight.current) doorRight.current.position.x = THREE.MathUtils.lerp(1.55, 3.25, live);
    if (dawnMaterial.current) dawnMaterial.current.opacity = live * dim * 0.96;
  });

  return (
    <group ref={root} visible={false}>
      {Array.from({ length: 3 }, (_, index) => (
        <group key={index} ref={(group) => { if (group) gates.current[index] = group; }} position={[0, 0, -17.2 - index * 1.25]}>
          <RoundedBlock size={[0.36, 3.5, 0.4]} radius={0.065} position={[-2.75, 0.65, 0]} castShadow><meshStandardMaterial color="#1b2224" metalness={0.8} roughness={0.42} /></RoundedBlock>
          <RoundedBlock size={[0.36, 3.5, 0.4]} radius={0.065} position={[2.75, 0.65, 0]} castShadow><meshStandardMaterial color="#1b2224" metalness={0.8} roughness={0.42} /></RoundedBlock>
          <RoundedBlock size={[5.85, 0.34, 0.4]} radius={0.065} position={[0, 2.25, 0]} castShadow><meshStandardMaterial color="#1b2224" metalness={0.8} roughness={0.42} /></RoundedBlock>
          <mesh position={[2.42, 1.72, 0.23]}>
            <boxGeometry args={[0.14, 0.42, 0.06]} />
            <meshStandardMaterial ref={(material) => { if (material) indicators.current[index] = material; }} color="#5a3329" emissive={index === 2 ? "#ffd2a0" : AMBER} emissiveIntensity={0} />
          </mesh>
        </group>
      ))}
      <group position={[0, 0.48, -21.1]}>
        <RoundedBlock ref={doorLeft} size={[3.05, 4.8, 0.32]} radius={0.08} position={[-1.55, 0, 0]} castShadow><meshStandardMaterial color="#13191b" metalness={0.78} roughness={0.46} /></RoundedBlock>
        <RoundedBlock ref={doorRight} size={[3.05, 4.8, 0.32]} radius={0.08} position={[1.55, 0, 0]} castShadow><meshStandardMaterial color="#13191b" metalness={0.78} roughness={0.46} /></RoundedBlock>
        <mesh position={[0, 0, -0.22]}><planeGeometry args={[7.1, 5.4]} /><meshBasicMaterial ref={dawnMaterial} color="#ffd6a1" transparent opacity={0} toneMapped={false} /></mesh>
      </group>
      <mesh position={[0, -0.64, -18.9]} receiveShadow><boxGeometry args={[6.6, 0.14, 8.4]} /><meshStandardMaterial color="#0c1112" metalness={0.52} roughness={0.66} /></mesh>
      {quality !== "essential" && (
        <mesh position={[0, 3.2, -19.6]} rotation={[Math.PI / 2, 0, 0]}><planeGeometry args={[1.6, 7]} /><meshBasicMaterial color="#ffd5a7" transparent opacity={0.055} depthWrite={false} blending={THREE.AdditiveBlending} /></mesh>
      )}
    </group>
  );
}

function ProofHangar({ progress, quality }: WorldProps) {
  const root = useRef<THREE.Group>(null);
  const bayMaterials = useRef<THREE.MeshStandardMaterial[]>([]);
  const faceMaterials = useRef<THREE.MeshStandardMaterial[]>([]);
  const routeMaterial = useRef<THREE.MeshBasicMaterial>(null);
  const projectTextures = useMemo(
    () => ["Arc", "Applytide", "Eventa"].map((title, index) => makeProjectTexture(title, index, quality)),
    [quality],
  );
  useEffect(() => () => projectTextures.forEach((texture) => texture.dispose()), [projectTextures]);
  useFrame(() => {
    const reveal = smoother(range(progress.current, 0.94, 0.985));
    if (root.current) {
      root.current.visible = reveal > 0.002;
      root.current.position.y = THREE.MathUtils.lerp(-0.55, -0.2, reveal);
      root.current.scale.setScalar(0.9 + reveal * 0.1);
    }
    bayMaterials.current.forEach((material, index) => {
      const delayed = smoother(range(reveal, index * 0.15, 0.58 + index * 0.12));
      material.emissiveIntensity = delayed * 0.18;
      material.opacity = 0.4 + delayed * 0.56;
      if (faceMaterials.current[index]) {
        faceMaterials.current[index].opacity = delayed;
        faceMaterials.current[index].emissiveIntensity = 0.24 + delayed * 0.2;
      }
    });
    if (routeMaterial.current) routeMaterial.current.opacity = reveal * 0.85;
  });

  const bays = quality === "essential" ? [-2.45, 0, 2.45] : [-2.65, 0, 2.65];
  return (
    <group ref={root} position={[0, -0.55, -23]} visible={false}>
      {bays.map((x, index) => (
        <group key={x} position={[x, 0.45, 0]}>
          <RoundedBlock size={[2.15, 2.75, 0.24]} radius={0.08} castShadow receiveShadow>
            <meshStandardMaterial
              ref={(material) => { if (material) bayMaterials.current[index] = material; }}
              color={index === 0 ? "#223132" : index === 1 ? "#2a2f32" : "#262b29"}
              emissive={index === 0 ? "#567c79" : index === 1 ? "#6b3b2f" : "#81715b"}
              emissiveIntensity={0}
              metalness={0.7}
              roughness={0.45}
              transparent
            />
          </RoundedBlock>
          <mesh position={[0, 0.15, 0.16]}>
            <planeGeometry args={[1.72, 1.75]} />
            <meshStandardMaterial
              ref={(material) => { if (material) faceMaterials.current[index] = material; }}
              map={projectTextures[index]}
              emissive={index === 1 ? "#3b211c" : "#182322"}
              emissiveMap={projectTextures[index]}
              emissiveIntensity={0.24}
              roughness={0.66}
              transparent
              opacity={0}
            />
          </mesh>
          <mesh position={[0, -1.24, 0.2]}><boxGeometry args={[1.45, 0.035, 0.035]} /><meshBasicMaterial color={index === 1 ? AMBER : "#7b9793"} toneMapped={false} /></mesh>
        </group>
      ))}
      <mesh position={[0, -0.96, 0.24]}><boxGeometry args={[5.4, 0.035, 0.04]} /><meshBasicMaterial ref={routeMaterial} color={AMBER} transparent opacity={0} toneMapped={false} /></mesh>
      <mesh position={[0, -1.03, 0]} receiveShadow><boxGeometry args={[9.2, 0.18, 4.2]} /><meshStandardMaterial color="#111617" metalness={0.58} roughness={0.64} /></mesh>
      {[-4.4, 4.4].map((x) => (
        <mesh key={x} position={[x, 1.3, 0]} castShadow><boxGeometry args={[0.28, 5, 0.38]} /><meshStandardMaterial color="#1a2123" metalness={0.76} roughness={0.46} /></mesh>
      ))}
    </group>
  );
}

function World({ progress, quality, signalMessages }: WorldProps & { signalMessages: readonly string[] }) {
  return (
    <>
      <color attach="background" args={["#07090a"]} />
      <fog attach="fog" args={["#07090a", 6.5, 42]} />
      <Atmosphere progress={progress} quality={quality} />
      <CameraRig progress={progress} />
      <ReceivingChamber progress={progress} quality={quality} signalMessages={signalMessages} />
      <WorkflowMaze progress={progress} quality={quality} />
      <BlueprintDeck progress={progress} quality={quality} />
      <Foundry progress={progress} quality={quality} />
      <TestArena progress={progress} quality={quality} />
      <ReleaseTunnel progress={progress} quality={quality} />
      <ProofHangar progress={progress} quality={quality} />
      <OwnershipRoute progress={progress} quality={quality} />
      <IdeaCore progress={progress} quality={quality} />
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

export function CinematicWorld({ progress, renderProgress, quality, signalMessages, onRendererStatus }: CinematicWorldProps) {
  const dpr = quality === "premium" ? 1.5 : quality === "balanced" ? 1.2 : 1;
  return (
    <WebGLBoundary onFailure={() => onRendererStatus(false)}>
      <Canvas
        key={quality}
        aria-hidden
        camera={{ fov: 47, near: 0.1, far: 80, position: [0, 2.55, 7.9] }}
        dpr={dpr}
        fallback={null}
        frameloop="demand"
        shadows={quality !== "essential"}
        gl={{ antialias: quality !== "essential", alpha: false, powerPreference: quality === "premium" ? "high-performance" : "default", stencil: false }}
        onCreated={({ gl }) => {
          gl.outputColorSpace = THREE.SRGBColorSpace;
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 0.98;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
          onRendererStatus(true);
        }}
      >
        <RenderInvalidator progress={renderProgress} quality={quality} />
        <ContextLifecycle onRendererStatus={onRendererStatus} />
        <World progress={progress} quality={quality} signalMessages={signalMessages} />
      </Canvas>
    </WebGLBoundary>
  );
}
