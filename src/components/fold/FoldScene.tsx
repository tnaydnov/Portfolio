"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

export type FoldSceneProps = {
  expanded: boolean;
  reducedMotion: boolean;
  active: boolean;
  onReady: () => void;
  onUnavailable: () => void;
};

const BLUE = "#264bec";
const PAPER = "#fffdf5";
const WIDTH = 1.55;
const HEIGHT = 3.65;
const CLOSED_ANGLE = THREE.MathUtils.degToRad(46);
const OPEN_ANGLE = THREE.MathUtils.degToRad(8);

function Studio({ onUnavailable }: Pick<FoldSceneProps, "onUnavailable">) {
  const { gl, scene, camera, size, invalidate } = useThree();

  useLayoutEffect(() => {
    const orthographic = camera as THREE.OrthographicCamera;
    orthographic.position.set(5.4, 6.3, 11);
    orthographic.lookAt(0, 1.88, 0);
    orthographic.zoom = Math.min(size.width / 5.6, size.height / 4.9);
    orthographic.updateProjectionMatrix();
    invalidate();
  }, [camera, invalidate, size.height, size.width]);

  useEffect(() => {
    const room = new RoomEnvironment();
    const generator = new THREE.PMREMGenerator(gl);
    const environment = generator.fromScene(room, 0.04);
    const previousEnvironment = scene.environment;
    const previousIntensity = scene.environmentIntensity;
    scene.environment = environment.texture;
    scene.environmentIntensity = 0.45;
    room.dispose();
    generator.dispose();
    invalidate();

    return () => {
      scene.environment = previousEnvironment;
      scene.environmentIntensity = previousIntensity;
      environment.dispose();
    };
  }, [gl, invalidate, scene]);

  useEffect(() => {
    const canvas = gl.domElement;
    const loseContext = (event: Event) => {
      event.preventDefault();
      onUnavailable();
    };
    canvas.addEventListener("webglcontextlost", loseContext);
    return () => {
      canvas.removeEventListener("webglcontextlost", loseContext);
    };
  }, [gl, onUnavailable]);

  return (
    <>
      <hemisphereLight args={["#fffdf5", "#d7cba3", 0.65]} />
      <directionalLight
        position={[-3.5, 12, 5]}
        intensity={2.2}
        color="#fffdf6"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={6}
        shadow-camera-bottom={-5}
        shadow-camera-near={0.5}
        shadow-camera-far={22}
        shadow-bias={-0.0002}
        shadow-normalBias={0.025}
        shadow-radius={5}
        shadow-blurSamples={8}
      />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.012, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <shadowMaterial transparent opacity={0.16} color="#3b3b6d" />
      </mesh>
    </>
  );
}

function PrintedMark({ stage, color }: { stage: number; color: string }) {
  const ink = useMemo(() => new THREE.MeshBasicMaterial({ color, toneMapped: false }), [color]);
  useEffect(() => () => ink.dispose(), [ink]);

  return (
    <group position={[WIDTH / 2, 0, 0.037]}>
      {/* The exhibit's printed diagrams are geometry, not image textures. */}
      <mesh position={[-0.43, 1.39, 0]} material={ink}>
        <planeGeometry args={[0.37, 0.035]} />
      </mesh>
      <mesh position={[0.49, 1.39, 0]} material={ink}>
        <circleGeometry args={[0.033, 24]} />
      </mesh>
      {stage === 0 && (
        <group position={[0, 0.2, 0]}>
          <mesh material={ink} rotation={[0, 0, Math.PI / 5]}>
            <ringGeometry args={[0.365, 0.5, 72, 1, 0, Math.PI * 1.55]} />
          </mesh>
          <mesh position={[0.035, -0.42, 0]} material={ink}>
            <circleGeometry args={[0.076, 24]} />
          </mesh>
        </group>
      )}
      {stage === 1 && (
        <group position={[0, 0.26, 0]}>
          {[-0.42, 0, 0.42].map((y, index) => (
            <group key={y} position={[0, y, 0]}>
              <mesh position={[-0.4, 0, 0]} material={ink}>
                <ringGeometry args={[0.055, 0.07, 24]} />
              </mesh>
              <mesh position={[index === 1 ? 0.035 : 0.105, 0, 0]} material={ink}>
                <planeGeometry args={[index === 1 ? 0.49 : 0.63, 0.075]} />
              </mesh>
            </group>
          ))}
        </group>
      )}
      {stage === 2 && (
        <group position={[0, 0.24, 0]}>
          <mesh material={ink} rotation={[0, 0, Math.PI * 0.2]}>
            <ringGeometry args={[0.37, 0.48, 72, 1, 0, Math.PI * 1.7]} />
          </mesh>
          <mesh position={[0.38, 0.2, 0]} rotation={[0, 0, -0.3]} material={ink}>
            <circleGeometry args={[0.15, 3]} />
          </mesh>
          <mesh material={ink}>
            <circleGeometry args={[0.058, 24]} />
          </mesh>
        </group>
      )}
      <mesh position={[0, -1.15, 0]} material={ink}>
        <planeGeometry args={[0.98, 0.021]} />
      </mesh>
      <mesh position={[-0.21, -1.34, 0]} material={ink}>
        <planeGeometry args={[0.56, 0.052]} />
      </mesh>
      <mesh position={[-0.31, -1.48, 0]} material={ink}>
        <planeGeometry args={[0.36, 0.023]} />
      </mesh>
    </group>
  );
}

function Sculpture({ expanded, reducedMotion, active, onReady }: Pick<FoldSceneProps, "expanded" | "reducedMotion" | "active" | "onReady">) {
  const root = useRef<THREE.Group>(null);
  const first = useRef<THREE.Group>(null);
  const second = useRef<THREE.Group>(null);
  const third = useRef<THREE.Group>(null);
  const progress = useRef(expanded ? 1 : 0);
  const rendered = useRef(false);
  const { invalidate } = useThree();
  const reportReady = useCallback(() => {
    if (rendered.current) return;
    rendered.current = true;
    onReady();
  }, [onReady]);
  const resources = useMemo(() => {
    const paper = new THREE.MeshStandardMaterial({ color: PAPER, roughness: 0.84 });
    const blue = new THREE.MeshStandardMaterial({ color: BLUE, roughness: 0.64, metalness: 0.025, toneMapped: false });
    return {
      paper,
      blue,
      geometry: new RoundedBoxGeometry(WIDTH, HEIGHT, 0.054, 2, 0.016),
      blueFaces: [paper, paper, paper, paper, blue, paper],
      paperFaces: [paper, paper, paper, paper, paper, blue],
    };
  }, []);

  useEffect(() => () => {
    resources.geometry.dispose();
    resources.paper.dispose();
    resources.blue.dispose();
  }, [resources]);

  const positionPanels = useCallback((value: number) => {
    const angle = THREE.MathUtils.lerp(CLOSED_ANGLE, OPEN_ANGLE, value);
    if (root.current) {
      root.current.position.set(-1.5 * WIDTH * Math.cos(angle), HEIGHT / 2 + 0.025, WIDTH * Math.sin(angle) / 2);
    }
    if (first.current) first.current.rotation.y = angle;
    if (second.current) second.current.rotation.y = -angle * 2;
    if (third.current) third.current.rotation.y = angle * 2;
  }, []);

  useLayoutEffect(() => {
    if (reducedMotion || !active) progress.current = expanded ? 1 : 0;
    positionPanels(progress.current);
    if (active) invalidate();
  }, [active, expanded, invalidate, positionPanels, reducedMotion]);

  useFrame((_, delta) => {
    if (!active) return;
    const target = expanded ? 1 : 0;
    const difference = Math.abs(target - progress.current);
    if (difference < 0.0005) {
      if (progress.current !== target) {
        progress.current = target;
        positionPanels(target);
      }
      return;
    }
    progress.current = reducedMotion ? target : THREE.MathUtils.damp(progress.current, target, 9, Math.min(delta, 0.05));
    positionPanels(progress.current);
    invalidate();
  });

  const panel = (stage: number) => (
    <>
      <mesh
        position={[WIDTH / 2, 0, 0]}
        geometry={resources.geometry}
        material={stage === 1 ? resources.paperFaces : resources.blueFaces}
        onAfterRender={stage === 0 ? reportReady : undefined}
        castShadow
        receiveShadow
      />
      <PrintedMark stage={stage} color={stage === 1 ? BLUE : PAPER} />
    </>
  );

  return (
    <group ref={root}>
      <group ref={first}>
        {panel(0)}
        <group position={[WIDTH, 0, 0]} ref={second}>
          {panel(1)}
          <group position={[WIDTH, 0, 0]} ref={third}>
            {panel(2)}
          </group>
        </group>
      </group>
    </group>
  );
}

export default function FoldScene(props: FoldSceneProps) {
  return (
    <Canvas
      orthographic
      camera={{ near: 0.1, far: 50, position: [5.4, 6.3, 11], zoom: 80 }}
      shadows="variance"
      dpr={[1, 1.6]}
      frameloop={props.active ? "demand" : "never"}
      gl={{ alpha: true, antialias: true, stencil: false, powerPreference: "default" }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
      }}
      style={{ pointerEvents: "none" }}
    >
      <Studio onUnavailable={props.onUnavailable} />
      <Sculpture expanded={props.expanded} reducedMotion={props.reducedMotion} active={props.active} onReady={props.onReady} />
    </Canvas>
  );
}
