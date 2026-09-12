"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { wordmarkLines } from "./wordmark";

type Props = { onReady: () => void; onUnavailable: () => void };

function makeTitle() {
  const root = new THREE.Group();
  const face = new THREE.MeshPhysicalMaterial({ color: "#c6d2df", metalness: .96, roughness: .25, clearcoat: .8, clearcoatRoughness: .2 });
  const edge = new THREE.MeshPhysicalMaterial({ color: "#b6c6d8", metalness: 1, roughness: .19, clearcoat: .8, clearcoatRoughness: .15 });
  face.onBeforeCompile = shader => {
    shader.vertexShader = shader.vertexShader.replace("#include <common>", "#include <common>\nvarying vec3 vTitlePosition;")
      .replace("#include <begin_vertex>", "#include <begin_vertex>\nvTitlePosition = position;");
    shader.fragmentShader = shader.fragmentShader.replace("#include <common>", "#include <common>\nvarying vec3 vTitlePosition;")
      .replace("#include <normal_fragment_begin>", `#include <normal_fragment_begin>
        normal = normalize(normal + vec3(
          .16 * sin(vTitlePosition.x * .78 + vTitlePosition.y * .9),
          .21 * cos(vTitlePosition.x * .43 - vTitlePosition.y * 1.25), 0.0));`);
  };
  const loader = new SVGLoader();
  const geometries: THREE.BufferGeometry[] = [];
  wordmarkLines.forEach((line, row) => {
    const scale = 13.6 / line.width;
    const baseline = row ? -2.46 : .31;
    line.letters.forEach(letter => {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg"><path transform="matrix(${scale} 0 0 ${scale} ${letter.x * scale - 6.8} ${baseline})" d="${letter.path}"/></svg>`;
      const shapes = loader.parse(svg).paths.flatMap(path => SVGLoader.createShapes(path));
      const geometry = new THREE.ExtrudeGeometry(shapes, { depth: .18, bevelEnabled: true, bevelSize: .105, bevelThickness: .17, bevelSegments: 12, curveSegments: 32, steps: 1 });
      geometry.translate(0, 0, -.09);
      const mesh = new THREE.Mesh(geometry, [face, edge]);
      root.add(mesh); geometries.push(geometry);
    });
  });
  root.rotation.set(.11, -.09, 0);
  return { root, dispose() { geometries.forEach(geometry => geometry.dispose()); face.dispose(); edge.dispose(); } };
}

/** Large studio softboxes, generated in code instead of a photographed HDR. */
function makeStudio(gl: THREE.WebGLRenderer) {
  const studio = new THREE.Scene(); studio.background = new THREE.Color("#26334f");
  const resources: Array<{ dispose: () => void }> = [];
  const panel = (color: string, intensity: number, position: [number, number, number], width: number, height: number) => {
    const geometry = new THREE.PlaneGeometry(width, height);
    const material = new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(intensity), side: THREE.DoubleSide });
    const light = new THREE.Mesh(geometry, material); light.position.set(...position); light.lookAt(0, 0, 0); studio.add(light); resources.push(geometry, material);
  };
  panel("#fff7e8", 5, [-3, 6, 5], 15, 5);
  panel("#d6e9ff", 3, [-9, .3, 2], 3, 9);
  panel("#7188ff", 4, [9, -1, 3], 6, 8);
  panel("#a9d9f6", 3.5, [0, -5, 4], 14, .8);
  panel("#fff4e7", 3, [-2, 1, 10], 5, 9);
  panel("#dce7ff", 1.8, [6, 1, 9], 4, 7);
  const generator = new THREE.PMREMGenerator(gl);
  const environment = generator.fromScene(studio, .035, .1, 100, { size: 256 });
  generator.dispose(); resources.forEach(resource => resource.dispose());
  return environment;
}

function Title({ onReady, onUnavailable }: Props) {
  const { gl, scene, camera, size, invalidate } = useThree();
  const title = useMemo(makeTitle, []);
  const ready = useRef(false);

  useLayoutEffect(() => {
    const view = camera as THREE.PerspectiveCamera;
    const aspect = size.width / size.height;
    const visibleHeight = Math.max(6.4, 15 / aspect);
    const distance = visibleHeight / (2 * Math.tan(THREE.MathUtils.degToRad(30 / 2)));
    view.position.set(0, .36, distance); view.lookAt(0, .36, 0);
    view.updateProjectionMatrix(); view.updateMatrixWorld();
    // Keep the counters open and the depth proportionate on narrow screens.
    title.root.scale.z = size.width < 600 ? .7 : 1;
    title.root.rotation.x = size.width < 600 ? .055 : .11;
    title.root.rotation.y = size.width < 600 ? -.03 : -.09;
    title.root.position.x = 0;
    title.root.updateMatrixWorld(true);
    const bounds = new THREE.Box3().setFromObject(title.root);
    let left = Infinity, right = -Infinity;
    for (const x of [bounds.min.x, bounds.max.x]) for (const y of [bounds.min.y, bounds.max.y]) for (const z of [bounds.min.z, bounds.max.z]) {
      const point = new THREE.Vector3(x, y, z).project(view);
      left = Math.min(left, point.x); right = Math.max(right, point.x);
    }
    title.root.position.x = -(left + right) * visibleHeight * aspect / 4;
    invalidate();
  }, [camera, size.width, size.height, title, invalidate]);

  useEffect(() => {
    const environment = makeStudio(gl);
    scene.environment = environment.texture; scene.environmentIntensity = 1.25;
    invalidate();
    const lost = (event: Event) => { event.preventDefault(); onUnavailable(); };
    gl.domElement.addEventListener("webglcontextlost", lost);
    return () => { gl.domElement.removeEventListener("webglcontextlost", lost); scene.environment = null; environment.dispose(); };
  }, [gl, scene, onUnavailable, invalidate]);

  useEffect(() => () => title.dispose(), [title]);

  return <>
    <ambientLight intensity={.2} />
    <directionalLight position={[-4, 7, 8]} color="#f8eee0" intensity={2.3} />
    <directionalLight position={[7, -3, 6]} color="#6383fd" intensity={1.3} />
    <primitive object={title.root} />
    <mesh position={[0, 0, -1.05]} onAfterRender={() => { if (!ready.current && scene.environment) { ready.current = true; onReady(); } }}>
      <planeGeometry args={[40, 20]} /><meshBasicMaterial transparent opacity={0} depthWrite={false} />
    </mesh>
  </>;
}

export default function IdentityScene(props: Props) {
  return <Canvas camera={{ position: [0, .36, 20], fov: 30, near: .1, far: 100 }} frameloop="demand" dpr={[1.5, 2]}
    gl={{ alpha: true, antialias: true, stencil: false, powerPreference: "low-power" }}
    onCreated={({ gl }) => { gl.setClearColor(0x080d1b, 0); gl.toneMapping = THREE.ACESFilmicToneMapping; gl.toneMappingExposure = .95; }}>
    <Title {...props} />
  </Canvas>;
}
