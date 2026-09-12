"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { EXPERIENCE_PROJECTS, experienceProjects, type ExperienceProject } from "./projects";

type V3 = [number, number, number];
export type ProjectSceneProps = {
  project: ExperienceProject;
  operated: boolean;
  active: boolean;
  reducedMotion: boolean;
  rtl: boolean;
  onReady: () => void;
  onUnavailable: () => void;
};

type Model = { root: THREE.Group; token: THREE.Mesh; path: THREE.CatmullRomCurve3; moving: THREE.Group; lights: THREE.Mesh[] };

/** Keep moving objects independent; batch the stationary architecture into a few draw calls. */
function batchStaticMeshes(model: Model) {
  const excluded = new Set<THREE.Object3D>([model.token, ...model.lights]);
  model.moving.traverse(object => excluded.add(object));
  model.root.updateMatrixWorld(true);
  const batches = new Map<string, { material: THREE.Material; cast: boolean; receive: boolean; meshes: THREE.Mesh[] }>();
  model.root.traverse(object => {
    if (!(object instanceof THREE.Mesh) || excluded.has(object) || Array.isArray(object.material)) return;
    const key = `${object.material.uuid}/${object.castShadow}/${object.receiveShadow}`;
    const batch = batches.get(key) ?? { material: object.material, cast: object.castShadow, receive: object.receiveShadow, meshes: [] as THREE.Mesh[] };
    batch.meshes.push(object); batches.set(key, batch);
  });
  batches.forEach(batch => {
    if (batch.meshes.length < 2) return;
    const pieces = batch.meshes.map(mesh => {
      const geometry = mesh.geometry.index ? mesh.geometry.toNonIndexed() : mesh.geometry.clone();
      return geometry.applyMatrix4(mesh.matrixWorld);
    });
    const combined = mergeGeometries(pieces);
    pieces.forEach(piece => piece.dispose());
    if (!combined) return;
    const mesh = new THREE.Mesh(combined, batch.material);
    mesh.castShadow = batch.cast; mesh.receiveShadow = batch.receive;
    batch.meshes.forEach(original => { original.removeFromParent(); original.geometry.dispose(); });
    model.root.add(mesh);
  });
  return model;
}

/** All model surfaces, diagrams and lettering originate here. No model or image assets are fetched. */
function buildModel(project: ExperienceProject): Model {
  const info = experienceProjects[project];
  const root = new THREE.Group();
  const accent = new THREE.Color(info.accent);
  const metal = new THREE.MeshStandardMaterial({ color: "#354548", metalness: 0.62, roughness: 0.36 });
  const baseMaterial = new THREE.MeshStandardMaterial({ color: "#243236", metalness: 0.45, roughness: 0.52 });
  const ceramic = new THREE.MeshStandardMaterial({ color: "#dce7df", metalness: 0.12, roughness: 0.32 });
  const ink = new THREE.MeshStandardMaterial({ color: "#101d22", metalness: 0.15, roughness: 0.55 });
  const accentMaterial = new THREE.MeshStandardMaterial({ color: accent, roughness: 0.32, metalness: 0.2, emissive: accent, emissiveIntensity: 0.15 });
  const glow = new THREE.MeshBasicMaterial({ color: accent, toneMapped: false });
  const lights: THREE.Mesh[] = [];
  const surfaceMaterials = new Map<string, THREE.MeshBasicMaterial>();

  function box(parent: THREE.Object3D, size: V3, position: V3, material: THREE.Material = ceramic, radius = 0.05) {
    const mesh = new THREE.Mesh(new RoundedBoxGeometry(...size, 2, Math.min(radius, ...size.map(v => v / 3))), material);
    mesh.position.set(...position); mesh.castShadow = true; mesh.receiveShadow = true; parent.add(mesh); return mesh;
  }
  function cylinder(parent: THREE.Object3D, radius: number, height: number, position: V3, material: THREE.Material = metal) {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, height, 64), material);
    mesh.position.set(...position); mesh.castShadow = true; mesh.receiveShadow = true; parent.add(mesh); return mesh;
  }
  function route(points: V3[], radius = 0.012, material: THREE.Material = glow) {
    const curve = new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p)), false, "catmullrom", 0.12);
    const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, 64, radius, 6, false), material);
    root.add(mesh); return curve;
  }
  function ring(parent: THREE.Object3D, radius: number, position: V3, material: THREE.Material = glow, start = 0, arc = Math.PI * 2) {
    const mesh = new THREE.Mesh(new THREE.TorusGeometry(radius, .013, 6, 96, arc), material);
    mesh.rotation.set(-Math.PI / 2, 0, start); mesh.position.set(...position); parent.add(mesh); return mesh;
  }
  function screen(parent: THREE.Object3D, w: number, h: number, position: V3, type: string, rotation = 0) {
    const group = new THREE.Group(); group.position.set(...position); group.rotation.y = rotation; parent.add(group);
    box(group, [w, h, .12], [0, 0, 0], metal, .045);
    let surface = surfaceMaterials.get(type);
    if (!surface) { surface = new THREE.MeshBasicMaterial({ map: drawSurface(project, type), toneMapped: false }); surfaceMaterials.set(type, surface); }
    const face = new THREE.Mesh(new THREE.PlaneGeometry(w - .055, h - .055), surface);
    face.position.z = .065; group.add(face);
    box(group, [.012, h * .75, .025], [-w / 2 - .008, 0, .01], glow, .002);
    return group;
  }
  function pin(position: V3, radius = .055) {
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 16, 10), glow); mesh.position.set(...position); root.add(mesh); lights.push(mesh); return mesh;
  }
  // A substantial common foundation makes these feel like curated product environments.
  if (project !== "eventa") {
    box(root, [7.3, .22, 4.25], [0, -.06, .05], baseMaterial, .1);
    box(root, [7.12, .08, 4.07], [0, .09, .05], metal, .04);
    box(root, [6.65, .015, .018], [0, .138, 1.94], glow, .003);
    [-3.1, 3.1].forEach(x=>[-1.6, 1.65].forEach(z=>cylinder(root,.12,.12,[x,-.22,z],ink)));
    for (let x = -3; x <= 3; x += .5) box(root, [.008, .009, 3.4], [x, .137, .05], baseMaterial, .002);
    for (let z = -1.45; z <= 1.6; z += .5) box(root, [6.5, .008, .008], [0, .137, z], baseMaterial, .002);
  } else {
    cylinder(root, 3.42, .23, [0, -.02, 0], baseMaterial);
    cylinder(root, 3.35, .07, [0, .13, 0], metal);
    ring(root, 3.15, [0, .18, 0]);
    ring(root, 2.68, [0, .18, 0], baseMaterial);
    ring(root, 1.64, [0, .18, 0], baseMaterial);
  }

  let path: THREE.CatmullRomCurve3;
  let moving: THREE.Group;
  if (project === "arc") {
    // Reusable library, classroom console, and a receiving group of sample submissions.
    box(root, [1.46, .3, 2.8], [-2.45, .3, -.25], ink);
    for (let i = 0; i < 6; i++) {
      const book = box(root, [.17, .75 + (i % 3) * .1, .84], [-2.98 + i * .205, .83, -.95], i === 2 ? accentMaterial : ceramic, .022);
      book.rotation.z = i === 5 ? -.12 : 0;
      box(root, [.075, .018, .014], [-2.98 + i * .205, .65, -.523], metal, .002);
    }
    for (let i=0;i<3;i++) box(root, [1.15,.065,.83],[-2.43,.48+i*.09,.67],i===2?accentMaterial:ceramic,.02);
    screen(root, 1.35, .48, [-2.43, 1.85, -1.4], "library");
    box(root,[.045,1.35,.045],[-3.03,.95,-1.5],metal);
    box(root,[.045,1.35,.045],[-1.82,.95,-1.5],metal);
    screen(root, 3.12, 2.1, [.13, 1.7, -1.2], "classroom", -.09);
    box(root,[.11,.7,.16],[.13,.5,-1.23],metal);
    box(root,[1.1,.07,.65],[.13,.18,-1.17],metal);
    for (let row = 0; row < 2; row++) {
      for (let col = 0; col < 3; col++) {
        const x = -.8 + col * .86, z = .5 + row * .8;
        const tile = screen(root, .7, .55, [x, .3 + row * .06, z], "submission");
        tile.rotation.x = -Math.PI / 2 + .23;
      }
    }
    moving = screen(root, 1.13, 1.47, [2.57, 1.15, -.45], "feedback", -.22);
    box(root,[1.36,.22,1.18],[2.5,.27,-.35],ink);
    // A returning rail makes the feedback relationship physically visible.
    path = route([[-2.4,.62,.65],[-1.6,.7,.88],[-1,.57,.92],[.1,.57,1.45],[1.46,.6,1.35],[2.54,.8,.25]], .025, accentMaterial);
    route([[2.65,.24,-.96],[2.8,.24,-1.73],[-2.45,.24,-1.73],[-2.45,.58,-.7]],.012,glow);
    [-2.4,-.25,2.5].forEach((x,i)=>pin([x,.31,1.65-i*.14]));
    ring(root,.37,[2.6,.18,1.12],glow,-.3,Math.PI*1.65);
  } else if (project === "applytide") {
    // Capture flows from a browser surface into an actual three-stage tracking composition.
    const browser = screen(root, 2.16, 2.62, [-2.1, 1.68, -.56], "opportunity", .12);
    browser.rotation.z = .045;
    box(root,[1.6,.09,1.4],[-2.1,.2,-.48],metal);
    for (let col = 0; col < 3; col++) {
      const x = -.1 + col * 1.04;
      box(root,[.84,.07,2.56],[x,.25,.02],ink);
      screen(root,.82,.31,[x,.62,-1.32],["saved","applied","next"][col]);
      for (let row=0;row<(col===0?2:1);row++) {
        const record = screen(root,.76,.68,[x,.42+row*.07,-.52+row*.9],"record");
        record.rotation.x=-Math.PI/2+.12;
      }
      box(root,[.02,.025,2.1],[x-.46,.29,.1],col===0?glow:metal,.003);
    }
    moving = screen(root, 1.24, .95, [-1.85, 1.65, .95], "captured", -.15);
    path = route([[-2.0,.55,1.35],[-1.25,.5,1.7],[-.1,.5,1.7],[.8,.6,1.2],[1.85,.55,.6]], .024, accentMaterial);
    route([[-3,.16,-1.64],[3,.16,-1.64],[3,.16,1.57]], .01, glow);
    [-.1,.94,1.98].forEach(x=>pin([x,.32,1.49]));
    const tag=screen(root,1.17,.37,[2.13,1.66,-1.34],"history"); tag.rotation.y=-.1;
    box(root,[.02,.76,.02],[2.13,1.1,-1.38],metal,.003);
  } else {
    // One bounded event, with a clear entry point and a ring of individual guest profiles.
    const doorway = new THREE.Group(); doorway.position.set(-2.18,0,-.8); doorway.rotation.y=.25; root.add(doorway);
    box(doorway,[1.38,.15,.32],[0,2.77,0],ceramic);
    box(doorway,[.15,2.5,.32],[-.61,1.48,0],ceramic);
    box(doorway,[.15,2.5,.32],[.61,1.48,0],ceramic);
    box(doorway,[1.05,.014,.035],[0,2.64,.18],glow,.003);
    screen(doorway, .91, 1.22,[0,1.65,.04],"entry");
    box(doorway,[1.6,.12,.82],[0,.24,.02],ink);
    const personPositions: V3[] = [[-.4,1.08,-1.77],[1.28,1.4,-1.34],[2.34,1.01,.0],[1.38,.88,1.65],[-.4,.79,1.9]];
    personPositions.forEach((position,i)=>{
      const holder=screen(root,.84,1.17,position,`guest${i}`, -.1-i*.12);
      if(i===3) holder.rotation.y=-.3;
      cylinder(root,.45,.15,[position[0],.28,position[2]],ink);
      box(root,[.03,.48,.03],[position[0],.49,position[2]],metal,.007);
    });
    cylinder(root,.86,.3,[.17,.31,.1],ceramic);
    cylinder(root,.8,.055,[.17,.49,.1],ink);
    ring(root,.69,[.17,.53,.1]);
    ring(root,2.22,[.05,.24,.03],glow,.2,Math.PI*1.55);
    moving = screen(root, 1.26, .72,[.2,1.04,.63],"connection");
    path=route([[-2.2,.65,-.45],[-1.3,.65,.08],[.12,.78,.35],[1.4,.74,1.35]],.025,accentMaterial);
    route([[1.3,.39,-1.35],[.3,.42,-.7],[.17,.6,.1],[1.1,.45,1.6]],.014,glow);
    personPositions.forEach(p=>pin([p[0],.4,p[2]]));
  }
  const token = new THREE.Mesh(new THREE.SphereGeometry(.115,24,16),new THREE.MeshStandardMaterial({color:"#f1fff6",emissive:accent,emissiveIntensity:1.2,roughness:.2}));
  token.castShadow=true; root.add(token); token.position.copy(path.getPoint(0));
  root.userData.project=project;
  return batchStaticMeshes({root,token,path,moving,lights});
}

function drawSurface(project: ExperienceProject, type: string) {
  const canvas = document.createElement("canvas"); canvas.width=768; canvas.height=512;
  const ctx=canvas.getContext("2d")!;
  const accent=experienceProjects[project].accent;
  ctx.fillStyle="#132127"; ctx.fillRect(0,0,768,512);
  ctx.strokeStyle="#31464a"; ctx.lineWidth=2; ctx.strokeRect(1,1,766,510);
  const text=(value:string,x:number,y:number,size=23,color="#e8f1ed")=>{ctx.fillStyle=color;ctx.font=`500 ${size}px Arial, sans-serif`;ctx.fillText(value,x,y);};
  const rect=(x:number,y:number,w:number,h:number,color:string,r=8)=>{ctx.fillStyle=color;ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill();};
  const line=(x:number,y:number,w:number,color="#47615f")=>rect(x,y,w,6,color,3);
  text(project.toUpperCase(),34,43,20,accent);text("ILLUSTRATIVE / SAMPLE",470,43,14,"#90aaa4");
  ctx.strokeStyle="#324a4a";ctx.beginPath();ctx.moveTo(30,64);ctx.lineTo(738,64);ctx.stroke();
  if(type==="classroom") {
    text("Loops & logic",36,126,43);text("CLASSROOM 01",36,161,17,"#a3b9b3");
    rect(584,92,145,43,accent);text("RELEASED",601,120,19,"#12251f");
    rect(34,193,186,274,"#203336");text("ACTIVITIES",52,228,16,accent);
    ["01  Trace a loop","02  Find the bug","03  Build & test"].forEach((v,i)=>{text(v,52,274+i*64,19);line(52,290+i*64,119);});
    for(let row=0;row<2;row++)for(let col=0;col<3;col++) {const x=248+col*162,y=196+row*140;rect(x,y,142,119,"#263c3e");rect(x+12,y+14,34,32,row===0?accent:"#738d8a");text(`${row*3+col+1}`.padStart(2,"0"),x+20,y+36,17,"#152720");line(x+13,y+66,101);line(x+13,y+85,69,"#607c75");}
  } else if(type==="opportunity") {
    text("ONE LESS",37,128,52);text("OPEN TAB.",37,187,52);
    text("Systems engineer",39,266,37);text("NORTHSTAR / FICTIONAL COMPANY",39,307,19,"#a7b6af");
    line(39,351,597);line(39,376,548);line(39,401,399);
    rect(37,433,687,47,accent);text("CAPTURE OPPORTUNITY  +",67,464,23,"#2b221d");
  } else if(type==="entry") {
    text("YOU'RE",42,126,50);text("INVITED.",42,186,50);
    for(let y=0;y<7;y++)for(let x=0;x<7;x++)if((x*13+y*7+x*y)%5<3)rect(52+x*29,235+y*29,23,23,"#d8c4f4",0);
    text("ONE EVENT.",321,289,24);text("NEW PEOPLE.",321,327,24);text("SAMPLE ENTRY",322,399,16,"#a7a3b4");
  } else if(type.startsWith("guest")) {
    const index=Number(type.slice(-1)); const names=["NOA","DAN","MAYA","ORI","LEE"];
    ctx.fillStyle=accent;ctx.beginPath();ctx.arc(384,216,82,0,Math.PI*2);ctx.fill();
    text(names[index].slice(0,1),352,241,80,"#322541");text(names[index],36,381,48);text("SAMPLE GUEST / SAME EVENT",36,426,22,"#b3a9c2");
    line(36,463,394);
  } else if(type==="feedback") {
    text("LOOK BACK.",35,131,46);text("BUILD ON IT.",35,188,46);
    text("Feedback connected",37,273,31,accent);line(37,325,610);line(37,355,508);line(37,385,560);
    rect(36,428,690,48,accent);text("REVISION 02  →",66,461,27,"#14271e");
  } else if(type==="connection") {
    text("A NEW CONNECTION",38,221,42,accent);text("SAME EVENT. A SHARED CONTEXT.",38,307,25);line(38,377,590);
  } else if(type==="captured") {
    text("OPPORTUNITY",38,181,52);text("CAPTURED.",38,245,52,accent);text("01 / STRUCTURED RECORD",38,348,27);line(38,403,557);
  } else if(type==="record") {
    text("Systems engineer",35,181,41);text("NORTHSTAR / SAMPLE",35,241,25,"#afbab2");rect(35,321,232,61,accent);text("SAVED",61,361,31,"#24221b");line(35,429,530);
  } else if(type==="submission") {
    text("STUDENT WORK",37,153,46,accent);text("Version 01",37,255,43);line(37,321,580);line(37,373,467);rect(35,421,283,45,"#436356");
  } else {
    const labels:Record<string,string>={library:"CONTENT LIBRARY",saved:"01 / SAVED",applied:"02 / APPLIED",next:"03 / FOLLOW-UP",history:"ONE CONTINUOUS HISTORY"};
    text(labels[type]??type.toUpperCase(),37,270,type==="history"?38:49,accent);line(37,344,540);
  }
  const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=4;return texture;
}

function disposeModels(models:Model[]) {
  const geometries=new Set<THREE.BufferGeometry>();const materials=new Set<THREE.Material>();const textures=new Set<THREE.Texture>();
  models.forEach(model=>model.root.traverse(object=>{
    if(!(object instanceof THREE.Mesh))return;
    geometries.add(object.geometry);
    (Array.isArray(object.material)?object.material:[object.material]).forEach(material=>{
      materials.add(material);
      if("map" in material && material.map instanceof THREE.Texture) textures.add(material.map);
    });
  }));
  textures.forEach(texture=>texture.dispose());materials.forEach(material=>material.dispose());geometries.forEach(geometry=>geometry.dispose());
}

function World(props:ProjectSceneProps) {
  const {camera,size,gl,scene,invalidate}=useThree();
  const { onUnavailable } = props;
  const models=useMemo(()=>EXPERIENCE_PROJECTS.map(buildModel),[]);
  const selected=EXPERIENCE_PROJECTS.indexOf(props.project);
  const travel=useRef(selected);
  const animation=useRef({from:selected,to:selected,time:1});
  const operation=useRef([0,0,0]);
  const lastFrame=useRef(0);
  const ready=useRef(false);
  const reportReady=useCallback(()=>{if(!ready.current){ready.current=true;props.onReady();}},[props]);

  useLayoutEffect(()=>{
    lastFrame.current=performance.now();
    const perspective=camera as THREE.PerspectiveCamera;
    perspective.fov=33;
    const visibleHeight=Math.max(5.9,8.5/(size.width/size.height));
    const distance=visibleHeight/(2*Math.tan(THREE.MathUtils.degToRad(33/2)));
    perspective.position.copy(new THREE.Vector3(props.rtl ? -.76 : .76,.7,1).normalize().multiplyScalar(distance));
    perspective.position.y+=.6;
    perspective.lookAt(0,.8,0);
    perspective.updateProjectionMatrix();invalidate();
  },[camera,invalidate,size.height,size.width,props.rtl]);

  useEffect(()=>{
    const room=new RoomEnvironment();const generator=new THREE.PMREMGenerator(gl);const environment=generator.fromScene(room,.02);
    scene.environment=environment.texture;scene.environmentIntensity=.55;
    room.dispose();generator.dispose();invalidate();
    const canvas=gl.domElement;
    const lost=(event:Event)=>{event.preventDefault();onUnavailable();};
    canvas.addEventListener("webglcontextlost",lost);
    return()=>{canvas.removeEventListener("webglcontextlost",lost);scene.environment=null;environment.dispose();};
  },[gl,invalidate,onUnavailable,scene]);
  useEffect(()=>()=>disposeModels(models),[models]);
  useLayoutEffect(()=>{
    lastFrame.current=performance.now();
    animation.current={from:travel.current,to:selected,time:props.reducedMotion?1:0};
    if(props.reducedMotion)travel.current=selected;
    models.forEach((model,index)=>{model.root.position.x=(index-travel.current)*13;model.root.visible=Math.abs(index-travel.current)<.95;});
    if(props.active)invalidate();
  },[selected,props.reducedMotion,props.active,models,invalidate]);
  useLayoutEffect(()=>{lastFrame.current=performance.now();if(props.active)invalidate();},[props.operated,props.active,invalidate]);

  useFrame(()=>{
    if(!props.active)return;
    const now=performance.now();const delta=lastFrame.current?(now-lastFrame.current)/1000:0;lastFrame.current=now;
    let more=false;
    const movement=animation.current;
    if(movement.time<1){movement.time=Math.min(1,movement.time+delta/.72);const p=1-Math.pow(1-movement.time,4);travel.current=THREE.MathUtils.lerp(movement.from,movement.to,p);more=movement.time<1;}
    models.forEach((model,index)=>{
      model.root.position.x=(index-travel.current)*13;
      model.root.visible=Math.abs(index-travel.current)<.95;
      model.root.rotation.y=(index===selected?0:.08);
      const target=index===selected && props.operated?1:0;
      const previous=operation.current[index];
      const next=props.reducedMotion?target:THREE.MathUtils.damp(previous,target,4.8,delta);
      operation.current[index]=Math.abs(next-target)<.001?target:next;
      const value=operation.current[index];
      model.token.position.copy(model.path.getPoint(value));
      model.token.scale.setScalar(1+Math.sin(value*Math.PI)*.6);
      if(index===0){model.moving.position.y=1.15+value*.4;model.moving.rotation.y=-.22-value*.2;}
      if(index===1){model.moving.position.set(-1.85+value*1.75,1.65-value*.8,.95-value*.8);model.moving.rotation.y=-.15+value*.15;model.moving.rotation.x=-value*.55;}
      if(index===2){model.moving.position.y=1.04+value*.55;model.moving.scale.setScalar(.8+value*.2);}
      model.lights.forEach((light,i)=>light.scale.setScalar(value>(i+1)/(model.lights.length+1)?1.65:1));
      if(value!==target)more=true;
    });
    if(more)invalidate();
  });

  return <>
    <fog attach="fog" args={["#0b0e11",18,46]}/>
    <ambientLight intensity={.25}/>
    <hemisphereLight args={["#d8eee9","#182530",1.1]}/>
    <directionalLight position={[-3,8,5]} intensity={3.6} color="#e1efe9" castShadow shadow-mapSize={[1024,1024]} shadow-camera-left={-8} shadow-camera-right={8} shadow-camera-top={8} shadow-camera-bottom={-8} shadow-camera-near={.5} shadow-camera-far={24} shadow-bias={-.0002} shadow-normalBias={.03} shadow-radius={4}/>
    <pointLight position={[2.5,4,-3]} intensity={32} distance={12} color={experienceProjects[props.project].accent}/>
    <directionalLight position={[6,3,-5]} intensity={2} color="#668a9e"/>
    <mesh rotation={[-Math.PI/2,0,0]} position={[0,-.3,0]} receiveShadow onAfterRender={reportReady}>
      <planeGeometry args={[160,160]}/><shadowMaterial transparent opacity={.25}/>
    </mesh>
    {models.map((model,index)=><primitive key={index} object={model.root}/>)}
  </>;
}

export default function ProjectScene(props:ProjectSceneProps) {
  return <Canvas camera={{position:[8,7,10],fov:33,near:.1,far:160}} dpr={[1,1.6]} shadows="soft" frameloop={props.active?"demand":"never"}
    gl={{alpha:true,antialias:true,stencil:false,powerPreference:"default"}}
    onCreated={({gl})=>{gl.setClearColor(0x0b0e11,0);gl.toneMapping=THREE.ACESFilmicToneMapping;gl.toneMappingExposure=1.12;}}
    style={{pointerEvents:"none"}}>
    <World {...props}/>
  </Canvas>;
}
