// GHAT TAK 3D — The Ghat at Golden Hour
// A Chhath ghat at evening arghya: stepped stone platform, river, low sun.
// Hero objects live in named ASSET SLOTS. Each slot starts with procedural
// placeholder geometry (src/placeholders.js); if a Lux3D GLB exists at
// public/assets/glb/<slot>.glb it transparently replaces the placeholder 1:1.
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { buildPlaceholder } from './placeholders.js';

/* ---------------------------------- setup --------------------------------- */

const canvas = document.getElementById('scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.12;

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xdd9a5f, 55, 240); // warm golden haze

const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 900);
camera.position.set(13.5, 6.8, -15);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 2.1, 13);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.minDistance = 7;
controls.maxDistance = 70;
controls.maxPolarAngle = 1.53;
controls.autoRotate = true;          // slow cinematic drift
controls.autoRotateSpeed = 0.45;
let idleTimer = null;
controls.addEventListener('start', () => { controls.autoRotate = false; clearTimeout(idleTimer); });
controls.addEventListener('end', () => { idleTimer = setTimeout(() => { controls.autoRotate = true; }, 4000); });

/* ----------------------------------- sky ---------------------------------- */

const SUN_DIR = new THREE.Vector3(0, 0.10, 1).normalize();
const SUN_POS = new THREE.Vector3(0, 7, 150);

const sky = new THREE.Mesh(
  new THREE.SphereGeometry(420, 32, 20),
  new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    uniforms: {
      sunDir: { value: SUN_DIR },
      top:    { value: new THREE.Color(0x39355e) },  // dusk indigo
      mid:    { value: new THREE.Color(0xc65f3d) },  // burnt orange band
      hor:    { value: new THREE.Color(0xffb35c) },  // golden horizon
      low:    { value: new THREE.Color(0x51362c) }   // below horizon
    },
    vertexShader: `
      varying vec3 vDir;
      void main() {
        vDir = normalize(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: `
      varying vec3 vDir;
      uniform vec3 sunDir, top, mid, hor, low;
      void main() {
        float h = vDir.y;
        vec3 col = h < 0.0 ? mix(hor, low, clamp(-h * 3.0, 0.0, 1.0))
                           : mix(hor, mid, smoothstep(0.0, 0.22, h));
        col = mix(col, top, smoothstep(0.18, 0.62, h));
        float s = max(dot(normalize(vDir), normalize(sunDir)), 0.0);
        col += vec3(1.0, 0.55, 0.18) * pow(s, 18.0) * 0.55;  // halo
        col += vec3(1.0, 0.75, 0.35) * pow(s, 90.0) * 0.9;   // inner glow
        gl_FragColor = vec4(col, 1.0);
      }`
  })
);
scene.add(sky);

// Sun disc + soft glow sprite, low over the water.
const sunDisc = new THREE.Mesh(
  new THREE.CircleGeometry(5.2, 40),
  new THREE.MeshBasicMaterial({ color: 0xffd9a0, fog: false })
);
sunDisc.position.copy(SUN_POS);
sunDisc.lookAt(0, 7, 0);
scene.add(sunDisc);

function glowTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 256;
  const ctx = c.getContext('2d');
  const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0, 'rgba(255,190,110,0.85)');
  grad.addColorStop(0.35, 'rgba(255,150,70,0.35)');
  grad.addColorStop(1, 'rgba(255,140,60,0)');
  ctx.fillStyle = grad; ctx.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(c);
}
const sunGlow = new THREE.Sprite(new THREE.SpriteMaterial({
  map: glowTexture(), transparent: true, depthWrite: false, fog: false
}));
sunGlow.position.copy(SUN_POS);
sunGlow.scale.setScalar(85);
scene.add(sunGlow);

/* --------------------------------- lights --------------------------------- */

const sunLight = new THREE.DirectionalLight(0xffab5e, 2.6);
sunLight.position.set(0, 16, 70);
sunLight.target.position.set(0, 1.5, 0);
sunLight.castShadow = true;
sunLight.shadow.mapSize.set(2048, 2048);
sunLight.shadow.camera.left = -32; sunLight.shadow.camera.right = 32;
sunLight.shadow.camera.top = 32; sunLight.shadow.camera.bottom = -32;
sunLight.shadow.camera.near = 20; sunLight.shadow.camera.far = 180;
sunLight.shadow.bias = -0.0004;
scene.add(sunLight, sunLight.target);

scene.add(new THREE.HemisphereLight(0xffd9a3, 0x4a322b, 0.85));
const bounce = new THREE.PointLight(0xff9a4d, 12, 30, 1.8); // warm bounce off the water
bounce.position.set(0, 1.2, 16);
scene.add(bounce);

/* ------------------------------ ground & river ----------------------------- */

function stoneTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 256;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#8d7460'; ctx.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 5200; i++) {
    const g = 110 + Math.random() * 70;
    ctx.fillStyle = `rgba(${g},${g * 0.82},${g * 0.62},${0.16 + Math.random() * 0.2})`;
    ctx.fillRect(Math.random() * 256, Math.random() * 256, 2, 2);
  }
  ctx.strokeStyle = 'rgba(60,44,32,0.35)'; ctx.lineWidth = 2;
  ctx.strokeRect(1, 1, 254, 254);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
const stoneTex = stoneTexture();
const stoneMat = new THREE.MeshStandardMaterial({ map: stoneTex, roughness: 0.95 });

// Earth disc underneath everything (seen when orbiting behind the ghat).
const earth = new THREE.Mesh(
  new THREE.CircleGeometry(320, 48),
  new THREE.MeshStandardMaterial({ color: 0x6b4a38, roughness: 1 })
);
earth.rotation.x = -Math.PI / 2;
earth.position.y = -0.05;
earth.receiveShadow = true;
scene.add(earth);

// River — broad plane running away from the steps to the horizon.
function waterTexture() {
  const c = document.createElement('canvas'); c.width = 64; c.height = 256;
  const ctx = c.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0, '#7c4630');
  grad.addColorStop(0.5, '#96603c');
  grad.addColorStop(1, '#c9854e');
  ctx.fillStyle = grad; ctx.fillRect(0, 0, 64, 256);
  for (let i = 0; i < 700; i++) { // sparkle flecks
    ctx.fillStyle = `rgba(255,205,140,${Math.random() * 0.25})`;
    ctx.fillRect(Math.random() * 64, Math.random() * 256, 1.6, 1);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(10, 3);
  return tex;
}
const waterTex = waterTexture();
const water = new THREE.Mesh(
  new THREE.PlaneGeometry(640, 300),
  new THREE.MeshPhongMaterial({
    map: waterTex, color: 0xdca06a, shininess: 110,
    specular: 0xffbe78, transparent: true, opacity: 0.97
  })
);
water.rotation.x = -Math.PI / 2;
water.position.set(0, 0, 159.5); // front edge at z = 9.5, where the steps end
water.receiveShadow = true;
scene.add(water);

// The sun's glitter path on the water.
function glitterTexture() {
  const c = document.createElement('canvas'); c.width = 128; c.height = 256;
  const ctx = c.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 128, 0);
  grad.addColorStop(0, 'rgba(255,170,80,0)');
  grad.addColorStop(0.5, 'rgba(255,190,105,0.9)');
  grad.addColorStop(1, 'rgba(255,170,80,0)');
  ctx.fillStyle = grad; ctx.fillRect(0, 0, 128, 256);
  const tex = new THREE.CanvasTexture(c);
  return tex;
}
const glitter = new THREE.Mesh(
  new THREE.PlaneGeometry(15, 190),
  new THREE.MeshBasicMaterial({
    map: glitterTexture(), transparent: true, opacity: 0.33,
    blending: THREE.AdditiveBlending, depthWrite: false
  })
);
glitter.rotation.x = -Math.PI / 2;
glitter.position.set(0, 0.03, 104);
scene.add(glitter);

/* -------------------------------- the ghat -------------------------------- */
// Platform slab (top y = 3.6) + 8 steps descending to the water at z = 9.5.

const PLATFORM_TOP = 3.6;
const platform = new THREE.Mesh(new THREE.BoxGeometry(42, 1.0, 11), stoneMat.clone());
platform.material.map = stoneTex.clone();
platform.material.map.repeat.set(6, 2);
platform.position.set(0, PLATFORM_TOP - 0.5, -6.5);
platform.receiveShadow = true; platform.castShadow = true;
scene.add(platform);

const STEP_H = 0.45, STEP_D = 1.4;
const stepTopY = (i) => PLATFORM_TOP - i * STEP_H; // top surface height of step i (0-based from top)
for (let i = 0; i < 8; i++) {
  const top = stepTopY(i);
  const step = new THREE.Mesh(new THREE.BoxGeometry(38, STEP_H + 0.02, STEP_D), stoneMat);
  step.position.set(0, top - STEP_H / 2, -1 + i * STEP_D + STEP_D / 2);
  step.receiveShadow = true; step.castShadow = true;
  scene.add(step);
}
// Low parapet walls flanking the steps.
[-19.4, 19.4].forEach((x) => {
  const wall = new THREE.Mesh(new THREE.BoxGeometry(0.8, 4.4, 12.4), stoneMat);
  wall.position.set(x, 1.9, 4.2);
  wall.castShadow = true; wall.receiveShadow = true;
  scene.add(wall);
});

/* ------------------------------- asset slots ------------------------------- */
// position = where the asset's base sits in the world. targetSize = the real
// asset's largest dimension in metres; GLBs are auto-scaled to it on load.
// GLB drop path: public/assets/glb/<id>.glb  (see ASSET_LIST.md)

const ASSET_SLOTS = [
  { id: 'temple',    position: [-11.5, PLATFORM_TOP, -8.0], rotationY: 0.12,  targetSize: 4.4 },
  { id: 'banana',    position: [9.0, PLATFORM_TOP, -4.0],   rotationY: -0.5,  targetSize: 2.7 },
  { id: 'sugarcane', position: [-6.6, stepTopY(4), 5.2],    rotationY: 0.3,   targetSize: 2.9 },
  { id: 'soop',      position: [2.9, stepTopY(6), 7.9],     rotationY: 0.45,  targetSize: 1.25 },
  { id: 'diyaRow',   position: [0, stepTopY(7), 9.0],       rotationY: 0,     targetSize: 3.3 },
  { id: 'boat',      position: [8.0, 0.02, 17.5],           rotationY: -0.65, targetSize: 4.8 }
];

const loader = new GLTFLoader();
const flameSets = [];

for (const slot of ASSET_SLOTS) {
  const wrapper = new THREE.Group();
  wrapper.name = `slot:${slot.id}`;
  wrapper.position.fromArray(slot.position);
  wrapper.rotation.y = slot.rotationY;
  scene.add(wrapper);

  const placeholder = buildPlaceholder(slot.id);
  wrapper.add(placeholder);
  if (placeholder.userData.flames) flameSets.push(placeholder.userData.flames);

  loader.load(
    `${import.meta.env.BASE_URL}assets/glb/${slot.id}.glb`,
    (gltf) => {
      const model = gltf.scene;
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z) || 1;
      model.scale.setScalar(slot.targetSize / maxDim);
      const box2 = new THREE.Box3().setFromObject(model);
      const centre2 = box2.getCenter(new THREE.Vector3());
      model.position.x -= centre2.x; // centre the footprint on the slot point
      model.position.z -= centre2.z;
      model.position.y -= box2.min.y; // rest the asset's base on the slot point
      model.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
      wrapper.remove(placeholder);
      wrapper.add(model);
      console.info(`[slots] ${slot.id}: Lux3D GLB loaded, placeholder replaced.`);
    },
    undefined,
    () => console.info(`[slots] ${slot.id}: no GLB yet, keeping placeholder.`)
  );
}

// One shared warm light for the diya row (kept subtle — this is dusk, not Diwali night).
const diyaLight = new THREE.PointLight(0xffa64d, 5, 7, 2);
diyaLight.position.set(0, stepTopY(7) + 0.45, 9.0);
scene.add(diyaLight);

/* --------------------------------- hotspots -------------------------------- */
// Small gold markers anchored in the scene; tap one to read its story card.
// Anchors are world positions just above each asset slot. English only.

const HOTSPOTS = [
  { id: 'temple',    anchor: [-11.5, PLATFORM_TOP + 5.0, -8.0], title: 'The Temple',
    text: 'Its stepped shikhara catches the last of the light as the ghat gathers for the evening prayer.' },
  { id: 'banana',    anchor: [9.0, PLATFORM_TOP + 3.2, -4.0],   title: 'The Banana Plant',
    text: 'Broad leaves frame the steps. For Chhath the plant is honoured whole — root, stem and fruit.' },
  { id: 'sugarcane', anchor: [-6.6, stepTopY(4) + 3.4, 5.2],    title: 'Sugarcane',
    text: 'Fresh-cut stalks stand with the offering — the sweetness of the harvest, carried to the river.' },
  { id: 'soop',      anchor: [2.9, stepTopY(6) + 0.8, 7.9],     title: 'The Soop',
    text: 'A woven bamboo tray of fruit and coconut — the offering itself, laid on the step closest to the water.' },
  { id: 'diyaRow',   anchor: [0, stepTopY(7) + 0.6, 9.0],       title: 'One Row of Diyas',
    text: 'A single, quiet row of clay lamps along the front step. This is dusk at the ghat, not a festival night.' },
  { id: 'boat',      anchor: [8.0, 1.4, 17.5],                   title: 'The Boat',
    text: 'A wooden rowing boat rests on the sun\u2019s glitter path, waiting for the crossing home.' }
];

const hotspotLayer = document.getElementById('hotspots');
const hotspotItems = HOTSPOTS.map((h) => {
  const el = document.createElement('div');
  el.className = 'hotspot';
  const btn = document.createElement('button');
  btn.className = 'hotspot-dot';
  btn.type = 'button';
  btn.setAttribute('aria-label', h.title);
  const card = document.createElement('div');
  card.className = 'hotspot-card';
  const heading = document.createElement('h3');
  heading.textContent = h.title;
  const para = document.createElement('p');
  para.textContent = h.text;
  card.append(heading, para);
  el.append(btn, card);
  btn.addEventListener('click', () => {
    const wasOpen = el.classList.contains('open');
    hotspotItems.forEach((item) => item.el.classList.remove('open'));
    if (!wasOpen) el.classList.add('open');
  });
  hotspotLayer.appendChild(el);
  return { el, anchor: new THREE.Vector3(...h.anchor) };
});

const _proj = new THREE.Vector3();
function updateHotspots() {
  for (const item of hotspotItems) {
    _proj.copy(item.anchor).project(camera);
    if (_proj.z > 1 || _proj.z < -1) { item.el.style.display = 'none'; continue; }
    item.el.style.display = '';
    item.el.style.left = `${((_proj.x + 1) / 2) * window.innerWidth}px`;
    item.el.style.top = `${((1 - _proj.y) / 2) * window.innerHeight}px`;
  }
}

/* --------------------------------- animate --------------------------------- */

const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  if (document.hidden) return; // pause while the tab is hidden / off-screen
  const t = clock.getElapsedTime();
  waterTex.offset.y = Math.sin(t * 0.05) * 0.012;
  waterTex.offset.x = Math.sin(t * 0.031) * 0.006;
  glitter.material.opacity = 0.30 + Math.sin(t * 0.8) * 0.05;
  flameSets.forEach((flames, s) => flames.forEach((f, i) => {
    f.scale.y = 1 + Math.sin(t * 11 + i * 1.7 + s) * 0.18;
  }));
  diyaLight.intensity = 5 + Math.sin(t * 9.3) * 0.7;
  controls.update();
  updateHotspots();
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
