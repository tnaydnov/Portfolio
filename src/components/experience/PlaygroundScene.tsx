"use client";

import { Canvas, useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import type { PlaygroundObject, PlaygroundState } from "./playground";

type Vec = [number, number, number];
type AnchorRefs = Record<PlaygroundObject, RefObject<HTMLButtonElement | null>>;
export type PlaygroundSceneProps = {
  state: PlaygroundState; turn: number; reset: number; active: boolean; reducedMotion: boolean;
  anchors: AnchorRefs; onReady: () => void; onUnavailable: () => void;
  onInteract: (object: PlaygroundObject) => void;
};
type Toy = { root: THREE.Group; moving: THREE.Object3D[]; anchor: THREE.Vector3 };
type Playground = { root: THREE.Group; toys: Record<PlaygroundObject, Toy>; ball: THREE.Mesh; path: THREE.CatmullRomCurve3; beacons: THREE.Mesh[] };

function makePlayground(): Playground {
  const root = new THREE.Group();
  const materials = {
    shell: new THREE.MeshStandardMaterial({ color: "#bed3ca", roughness: .32, metalness: .15 }),
    dark: new THREE.MeshStandardMaterial({ color: "#223739", roughness: .42, metalness: .6 }),
    floor: new THREE.MeshStandardMaterial({ color: "#1b2b30", roughness: .55, metalness: .25 }),
    paper: new THREE.MeshStandardMaterial({ color: "#edf0df", roughness: .48, metalness: .05 }),
    mint: new THREE.MeshStandardMaterial({ color: "#a7ecd4", roughness: .28, metalness: .15, emissive: "#8edac0", emissiveIntensity: .08 }),
    peach: new THREE.MeshStandardMaterial({ color: "#ffb49e", roughness: .32, metalness: .15 }),
    violet: new THREE.MeshStandardMaterial({ color: "#ceb6ff", roughness: .35, metalness: .12 }),
    light: new THREE.MeshBasicMaterial({ color: "#a7ecd4", toneMapped: false }),
    warmLight: new THREE.MeshBasicMaterial({ color: "#ffb49e", toneMapped: false }),
    violetLight: new THREE.MeshBasicMaterial({ color: "#ceb6ff", toneMapped: false }),
  };
  const box = (parent: THREE.Object3D, size: Vec, pos: Vec, material: THREE.Material = materials.shell, radius = .06) => {
    const mesh = new THREE.Mesh(new RoundedBoxGeometry(...size, 2, Math.min(radius, ...size.map(x => x / 3))), material);
    mesh.position.set(...pos); mesh.castShadow = true; mesh.receiveShadow = true; parent.add(mesh); return mesh;
  };
  const cylinder = (parent: THREE.Object3D, radius: number, height: number, pos: Vec, material: THREE.Material = materials.dark) => {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, height, 48), material);
    mesh.position.set(...pos); mesh.castShadow = true; mesh.receiveShadow = true; parent.add(mesh); return mesh;
  };
  const ring = (parent: THREE.Object3D, radius: number, pos: Vec, material: THREE.Material, thickness = .025, arc = Math.PI * 2) => {
    const mesh = new THREE.Mesh(new THREE.TorusGeometry(radius, thickness, 8, 80, arc), material);
    mesh.rotation.x = -Math.PI / 2; mesh.position.set(...pos); parent.add(mesh); return mesh;
  };
  const route = (parent: THREE.Object3D, points: Vec[], radius: number, material: THREE.Material, closed = false) => {
    const path = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)), closed, "centripetal");
    parent.add(new THREE.Mesh(new THREE.TubeGeometry(path, 120, radius, 8, closed), material)); return path;
  };
  const label = (parent: THREE.Object3D, value: string, size: [number, number], pos: Vec, color: string, rotation = 0) => {
    const canvas = document.createElement("canvas"); canvas.width = 512; canvas.height = 128;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, 512, 128); ctx.fillStyle = color; ctx.font = "500 54px Arial, sans-serif"; ctx.textBaseline = "middle"; ctx.fillText(value, 8, 64);
    const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace;
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(...size), new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false, toneMapped: false }));
    mesh.position.set(...pos); mesh.rotation.set(rotation, 0, 0); parent.add(mesh); return mesh;
  };

  // A single sculptural landscape. All three objects remain in the same space.
  box(root, [7.4, .18, 5.3], [0, -.18, 0], materials.floor, .15);
  box(root, [7.25, .05, 5.15], [0, -.065, 0], materials.dark, .08);
  for (let i = -3; i <= 3; i += .5) box(root, [.006, .009, 4.6], [i, -.034, 0], materials.floor, .002);
  for (let i = -2; i <= 2; i += .5) box(root, [6.6, .009, .006], [0, -.034, i], materials.floor, .002);
  label(root, "A WORK IN CURIOSITY.", [1.9, .42], [-2.4, -.023, 2.23], "#a4b9b4", -Math.PI / 2);
  [-3.13, 3.13].forEach(x => [-2, 2].forEach(z => cylinder(root, .095, .14, [x, -.32, z])));

  const engineer = new THREE.Group(); engineer.position.set(.05, 0, -.9); root.add(engineer);
  cylinder(engineer, 1.3, .13, [0, .08, 0]);
  ring(engineer, 1.16, [0, .154, 0], materials.light, .012);
  const layers: THREE.Object3D[] = [];
  for (let i = 0; i < 4; i++) {
    const layer = new THREE.Group(); layer.position.y = .38 + i * .48; engineer.add(layer); layers.push(layer);
    box(layer, [1.8, .24, 1.35], [0, 0, 0], i === 3 ? materials.mint : materials.shell, .075);
    box(layer, [1.56, .07, 1.13], [0, .16, 0], materials.dark, .025);
    box(layer, [.72, .03, .59], [0, .21, 0], materials.mint, .03);
    for (let j = 0; j < 5; j++) {
      box(layer, [.016, .01, .2], [-.27 + j * .135, .199, .46], materials.light, .002);
      box(layer, [.016, .01, .2], [-.27 + j * .135, .199, -.46], materials.light, .002);
    }
    box(layer, [.57, .047, .013], [-.29, -.01, .679], materials.dark, .003);
    box(layer, [.17, .047, .014], [.53, -.01, .681], materials.light, .003);
  }
  const code = new THREE.Group(); code.position.set(0, 2.5, 0); engineer.add(code); layers.push(code);
  [[-.41,.14,-.66],[-.41,-.14,.66],[.41,.14,.66],[.41,-.14,-.66]].forEach(([x,y,angle]) => { box(code, [.095,.38,.11], [x,y,0], materials.mint,.022).rotation.z=angle; });
  box(code, [.1, .66, .12], [0, 0, 0], materials.paper, .025).rotation.z = -.24;

  const teaching = new THREE.Group(); teaching.position.set(-2.2, 0, .94); teaching.rotation.y = -.14; root.add(teaching);
  cylinder(teaching, 1.12, .16, [0, .075, 0]);
  ring(teaching, 1, [0, .17, 0], materials.violetLight, .014);
  box(teaching, [.16, 1.64, .75], [0, .97, -.13], materials.violet, .055);
  const pages: THREE.Object3D[] = [];
  for (let i = 0; i < 6; i++) {
    const page = new THREE.Group(); page.position.set(0, .94, -.13); teaching.add(page); pages.push(page);
    box(page, [.84, 1.48, .055], [.44, 0, 0], i === 0 || i === 5 ? materials.violet : materials.paper, .025);
    if (i > 0 && i < 5) {
      box(page, [.42, .034, .008], [.43, .3, .032], materials.dark, .001);
      box(page, [.48, .025, .008], [.45, .11, .032], materials.dark, .001);
      box(page, [.34, .025, .008], [.38, -.01, .032], materials.dark, .001);
      box(page, [.46, .3, .008], [.44, -.37, .032], i % 2 ? materials.mint : materials.peach, .003);
    }
    page.rotation.y = -.3 + i * .1;
  }
  const note = new THREE.Group(); teaching.add(note); note.position.set(-.61, .51, .55); note.rotation.set(-.6, -.2, -.07);
  box(note, [.68, .6, .06], [0, 0, 0], materials.paper, .025);
  label(note, "a-ha!", [.58, .15], [-.01, .01, .034], "#456c60");

  const product = new THREE.Group(); product.position.set(2.2, 0, .96); root.add(product);
  cylinder(product, 1.16, .14, [0, .09, 0]);
  cylinder(product, .91, .19, [0, .25, 0], materials.shell);
  const gyroscope = new THREE.Group(); gyroscope.position.y = 1.05; product.add(gyroscope);
  const orbitA = ring(gyroscope, .84, [0, 0, 0], materials.peach, .12, Math.PI * 1.72); orbitA.rotation.set(.55, .22, -.2);
  const orbitB = ring(gyroscope, .6, [0, 0, 0], materials.paper, .065, Math.PI * 1.8); orbitB.rotation.set(-.7, -.65, .1);
  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(.33, 1), materials.mint); gyroscope.add(core); core.castShadow = true;
  const satellite = new THREE.Mesh(new THREE.SphereGeometry(.12, 20, 12), materials.peach); satellite.position.set(.53, .64, .1); gyroscope.add(satellite);
  ring(product, 1.035, [0, .18, 0], materials.warmLight, .013);
  label(product, "BUILD / LEARN", [1.2, .24], [-.05, .365, .59], "#34554c", -Math.PI / 2);

  const path = route(root, [[-3.15, .12, 1.94],[-3.32, .13, -.45],[-2.2, .13, -2.12],[.4, .13, -2.13],[3.15, .13, -1.54],[3.3, .13, 1.46],[1.55, .13, 2.17],[-.76, .13, 2.18]], .022, materials.light, true);
  const ball = new THREE.Mesh(new THREE.SphereGeometry(.135, 24, 16), materials.peach); root.add(ball); ball.castShadow = true; ball.position.copy(path.getPoint(0));
  const beacons = [0, .32, .66].map(p => {
    const position = path.getPoint(p);
    const beacon = cylinder(root, .083, .032, [position.x, .033, position.z], materials.mint); return beacon;
  });
  const toys = {
    engineering: { root: engineer, moving: layers, anchor: new THREE.Vector3(.05, 3.29, -.9) },
    teaching: { root: teaching, moving: pages, anchor: new THREE.Vector3(-2.2, .05, 2.0) },
    product: { root: product, moving: [gyroscope], anchor: new THREE.Vector3(2.2, .05, 2.13) },
  };
  Object.entries(toys).forEach(([key, toy]) => toy.root.traverse(object => { object.userData.toy = key; }));
  root.updateMatrixWorld(true);
  Object.values(toys).forEach(toy => toy.moving.forEach(part => { if (part instanceof THREE.Group) batchStatic(part, new Set()); }));
  const excluded = new Set<THREE.Object3D>([ball, ...beacons]);
  Object.values(toys).forEach(toy => toy.moving.forEach(part => part.traverse(object => excluded.add(object))));
  // Batch within each clickable toy to keep its hit target and draw calls small.
  [engineer, teaching, product, root].forEach(group => batchStatic(group, excluded));
  return { root, toys, ball, path, beacons };
}

function batchStatic(root: THREE.Group, excluded: Set<THREE.Object3D>) {
  root.updateMatrixWorld(true);
  const inverse = root.matrixWorld.clone().invert();
  const batches = new Map<string, THREE.Mesh[]>();
  root.traverse(object => {
    if (!(object instanceof THREE.Mesh) || excluded.has(object) || Array.isArray(object.material)) return;
    if (root.parent === null && object.userData.toy) return;
    const key = `${object.material.uuid}/${object.castShadow}/${object.receiveShadow}`;
    const batch = batches.get(key) ?? []; batch.push(object); batches.set(key, batch);
  });
  batches.forEach(meshes => {
    if (meshes.length < 2) return;
    const pieces = meshes.map(mesh => (mesh.geometry.index ? mesh.geometry.toNonIndexed() : mesh.geometry.clone()).applyMatrix4(inverse.clone().multiply(mesh.matrixWorld)));
    const geometry = mergeGeometries(pieces); pieces.forEach(piece => piece.dispose()); if (!geometry) return;
    const merged = new THREE.Mesh(geometry, meshes[0].material); merged.castShadow = meshes[0].castShadow; merged.receiveShadow = meshes[0].receiveShadow;
    merged.userData = { ...meshes[0].userData };
    meshes.forEach(mesh => { mesh.removeFromParent(); mesh.geometry.dispose(); }); root.add(merged);
  });
}

function disposePlayground(playground: Playground) {
  const geometries = new Set<THREE.BufferGeometry>(); const materials = new Set<THREE.Material>(); const textures = new Set<THREE.Texture>();
  playground.root.traverse(object => {
    if (!(object instanceof THREE.Mesh)) return; geometries.add(object.geometry);
    (Array.isArray(object.material) ? object.material : [object.material]).forEach(material => {
      materials.add(material); if ("map" in material && material.map instanceof THREE.Texture) textures.add(material.map);
    });
  });
  textures.forEach(texture => texture.dispose()); materials.forEach(material => material.dispose()); geometries.forEach(geometry => geometry.dispose());
}

function World(props: PlaygroundSceneProps) {
  const { camera, size, gl, scene, invalidate } = useThree();
  const playground = useMemo(makePlayground, []);
  const { onUnavailable, onReady, anchors } = props;
  const lastFrame = useRef(0); const ready = useRef(false);
  const resizeFrames = useRef(2);
  const values = useRef({ engineering: 0, teaching: 0, turn: 0, loop: 1, spin: 0 });
  const projected = useMemo(() => new THREE.Vector3(), []);

  useLayoutEffect(() => {
    const view = camera as THREE.PerspectiveCamera; view.fov = 34;
    const height = Math.max(6.5, 9.5 / (size.width / size.height));
    const distance = height / (2 * Math.tan(THREE.MathUtils.degToRad(34 / 2)));
    view.position.copy(new THREE.Vector3(.57, .68, 1).normalize().multiplyScalar(distance)); view.position.y += .75;
    view.lookAt(0, .92, 0); view.updateProjectionMatrix(); view.updateMatrixWorld(); resizeFrames.current = 2; invalidate();
  }, [camera, size.width, size.height, invalidate]);
  useEffect(() => {
    const room = new RoomEnvironment(); const generator = new THREE.PMREMGenerator(gl); const environment = generator.fromScene(room, .02);
    scene.environment = environment.texture; scene.environmentIntensity = .65; room.dispose(); generator.dispose(); invalidate();
    const canvas = gl.domElement; const lost = (event: Event) => { event.preventDefault(); onUnavailable(); }; canvas.addEventListener("webglcontextlost", lost);
    return () => { canvas.removeEventListener("webglcontextlost", lost); scene.environment = null; environment.dispose(); };
  }, [gl, scene, invalidate, onUnavailable]);
  useEffect(() => () => disposePlayground(playground), [playground]);
  useLayoutEffect(() => { lastFrame.current = performance.now(); if (props.active) invalidate(); }, [props.state.engineering, props.state.teaching, props.turn, props.active, props.reducedMotion, invalidate]);
  useLayoutEffect(() => {
    if (props.state.runs > 0) values.current.loop = 0;
    lastFrame.current = performance.now(); invalidate();
  }, [props.state.runs, invalidate]);
  useLayoutEffect(() => { values.current.loop = 1; values.current.spin = 0; lastFrame.current = performance.now(); invalidate(); }, [props.reset, invalidate]);

  useFrame(() => {
    if (!props.active) return;
    const now = performance.now(); const delta = lastFrame.current ? (now - lastFrame.current) / 1000 : 0; lastFrame.current = now;
    const state = values.current; let more = false;
    if (props.reducedMotion) state.loop = 1;
    const approach = (value: number, target: number, speed = 7) => {
      const next = props.reducedMotion ? target : THREE.MathUtils.damp(value, target, speed, delta);
      if (Math.abs(target - next) < .001) return target; more = true; return next;
    };
    state.engineering = approach(state.engineering, props.state.engineering ? 1 : 0);
    state.teaching = approach(state.teaching, props.state.teaching ? 1 : 0);
    state.turn = approach(state.turn, props.turn, 10); playground.root.rotation.y = state.turn;
    playground.toys.engineering.moving.forEach((layer, i) => {
      if (i < 4) { layer.position.y = .38 + i * .48 + state.engineering * i * .2; layer.position.x = Math.sin(i * 1.7) * state.engineering * .17; layer.rotation.y = state.engineering * (i - 1.5) * .12; }
      else { layer.position.y = 2.5 + state.engineering * .67; layer.rotation.y = state.engineering * .18; }
    });
    playground.toys.teaching.moving.forEach((page, i) => { page.rotation.y = -.3 + i * .1 - state.teaching * (i * .48 - .5); });
    if (state.loop < 1) {
      state.loop = Math.min(1, state.loop + delta / 2.4); state.spin += delta * 1.6; more = state.loop < 1 || more;
    }
    const orbit = playground.toys.product.moving[0]; orbit.rotation.y = state.spin;
    orbit.rotation.z = props.reducedMotion ? 0 : Math.sin(state.loop * Math.PI) * .3;
    playground.ball.position.copy(playground.path.getPoint(state.loop % 1));
    playground.beacons.forEach((beacon, i) => beacon.scale.setScalar(state.loop < 1 && Math.abs(state.loop - [0, .32, .66][i]) < .14 ? 1.5 : 1));
    playground.root.updateMatrixWorld(true);
    (Object.keys(playground.toys) as PlaygroundObject[]).forEach(key => {
      const button = anchors[key].current; if (!button) return;
      button.style.left = "0"; button.style.top = "0";
      projected.copy(playground.toys[key].anchor);
      if (key === "engineering") projected.y += state.engineering * .67;
      projected.applyMatrix4(playground.root.matrixWorld).project(camera);
      const x = THREE.MathUtils.clamp((projected.x + 1) / 2 * size.width, 75, size.width - 75);
      const y = THREE.MathUtils.clamp((1 - projected.y) / 2 * size.height, 28, size.height - 32);
      button.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-50%)`;
    });
    if (resizeFrames.current > 0) { resizeFrames.current--; more = true; }
    if (more) invalidate();
  });

  const interact = (event: ThreeEvent<MouseEvent>) => {
    if (event.delta > 7) return;
    const object = event.object.userData.toy as PlaygroundObject | undefined;
    if (object) { event.stopPropagation(); props.onInteract(object); }
  };
  return <>
    <ambientLight intensity={.32} />
    <hemisphereLight args={["#e3f1e6", "#182431", 1.2]} />
    <directionalLight position={[-3, 8, 5]} intensity={3.5} color="#e4f2e9" castShadow shadow-mapSize={[1024, 1024]} shadow-camera-left={-7} shadow-camera-right={7} shadow-camera-top={7} shadow-camera-bottom={-7} shadow-camera-near={.5} shadow-camera-far={24} shadow-bias={-.0002} shadow-normalBias={.035} />
    <directionalLight position={[4, 3, -4]} intensity={2.2} color="#9db1dd" />
    <pointLight position={[-3, 3, 1]} color="#ceb6ff" intensity={18} distance={9} />
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -.41, 0]} receiveShadow onAfterRender={() => { if (!ready.current) { ready.current = true; onReady(); } }}>
      <planeGeometry args={[100, 100]} /><shadowMaterial transparent opacity={.22} />
    </mesh>
    <primitive object={playground.root} onClick={interact} onPointerOver={(event: ThreeEvent<PointerEvent>) => { if (event.object.userData.toy) gl.domElement.style.cursor = "pointer"; }} onPointerOut={() => { gl.domElement.style.cursor = ""; }} />
  </>;
}

export default function PlaygroundScene(props: PlaygroundSceneProps) {
  return <Canvas camera={{ position: [7, 8, 12], fov: 34, near: .1, far: 100 }} dpr={[1, 1.5]} shadows="soft" frameloop={props.active ? "demand" : "never"}
    gl={{ alpha: true, antialias: true, stencil: false, powerPreference: "default" }}
    onCreated={({ gl }) => { gl.setClearColor(0x0b0e11, 0); gl.toneMapping = THREE.ACESFilmicToneMapping; gl.toneMappingExposure = 1.07; }}>
    <World {...props} />
  </Canvas>;
}
