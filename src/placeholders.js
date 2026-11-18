// Procedural placeholder geometry for every Lux3D asset slot.
// Each builder returns a THREE.Group sized roughly like the final asset, so the
// scene is complete and filmable today. Tomorrow the GLB for a slot replaces
// its placeholder 1:1 (same wrapper position / target size — see main.js).
import * as THREE from 'three';

const M = {
  clay:   new THREE.MeshStandardMaterial({ color: 0x9a5a38, roughness: 0.9 }),
  weave:  new THREE.MeshStandardMaterial({ color: 0xb98a4e, roughness: 1.0 }),
  brass:  new THREE.MeshStandardMaterial({ color: 0xc9973f, roughness: 0.35, metalness: 0.85 }),
  wood:   new THREE.MeshStandardMaterial({ color: 0x6e4a2f, roughness: 0.95 }),
  leaf:   new THREE.MeshStandardMaterial({ color: 0x4e7d33, roughness: 0.8, side: THREE.DoubleSide }),
  cane:   new THREE.MeshStandardMaterial({ color: 0x8a9a52, roughness: 0.7 }),
  caneAlt:new THREE.MeshStandardMaterial({ color: 0x7d5a68, roughness: 0.7 }),
  trunk:  new THREE.MeshStandardMaterial({ color: 0x6d7a3f, roughness: 1.0 }),
  dark:   new THREE.MeshStandardMaterial({ color: 0x2a201c, roughness: 1.0 }),
  flame:  new THREE.MeshStandardMaterial({ color: 0xffc46b, emissive: 0xff9a2e, emissiveIntensity: 2.4 })
};
M.woodDk = new THREE.MeshStandardMaterial({ color: 0x4e3421, roughness: 0.95 });

function shadowed(root) {
  root.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  return root;
}

/** Soop — a shallow woven offering tray with fruit and a coconut. */
function soop() {
  const g = new THREE.Group();
  const pts = [];
  pts.push(new THREE.Vector2(0.0, 0.0));
  pts.push(new THREE.Vector2(0.42, 0.015));
  pts.push(new THREE.Vector2(0.55, 0.07));
  pts.push(new THREE.Vector2(0.60, 0.14));
  const tray = new THREE.Mesh(new THREE.LatheGeometry(pts, 28), M.weave);
  g.add(tray);
  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.60, 0.022, 8, 40), M.woodDk);
  rim.rotation.x = Math.PI / 2; rim.position.y = 0.14; g.add(rim);
  const fruitCols = [0xe8862e, 0xf2a541, 0xc23b2a, 0xe8b13c, 0xd96f32];
  fruitCols.forEach((c, i) => {
    const f = new THREE.Mesh(
      new THREE.SphereGeometry(0.085, 14, 12),
      new THREE.MeshStandardMaterial({ color: c, roughness: 0.55 })
    );
    const a = (i / fruitCols.length) * Math.PI * 2;
    f.position.set(Math.cos(a) * 0.30, 0.17, Math.sin(a) * 0.30);
    g.add(f);
  });
  const coconut = new THREE.Mesh(new THREE.SphereGeometry(0.11, 14, 12), M.woodDk);
  coconut.position.set(0, 0.20, 0); coconut.scale.y = 0.92; g.add(coconut);
  const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.05, 6), M.leaf);
  leaf.position.set(0, 0.30, 0); g.add(leaf);
  return shadowed(g);
}

/** Sugarcane — a standing cluster of stalks with node bands and leafy tops. */
function sugarcane() {
  const g = new THREE.Group();
  const spots = [[0, 0], [0.16, 0.08], [-0.15, 0.10], [0.08, -0.14], [-0.10, -0.12], [0.02, 0.18]];
  spots.forEach(([x, z], i) => {
    const h = 2.4 + (i % 3) * 0.22;
    const stalk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.035, 0.045, h, 8),
      i % 2 ? M.caneAlt : M.cane
    );
    stalk.position.set(x, h / 2, z);
    stalk.rotation.z = (i - 2.5) * 0.035;
    g.add(stalk);
    for (let n = 1; n <= 3; n++) {
      const band = new THREE.Mesh(new THREE.CylinderGeometry(0.047, 0.047, 0.03, 8), M.weave);
      band.position.set(x + Math.sin(stalk.rotation.z) * -(n * h / 4) * 0.0, n * h / 4, z);
      band.position.x = x - Math.sin(stalk.rotation.z) * (n * h / 4);
      g.add(band);
    }
    const top = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.5, 6), M.leaf);
    top.position.set(x - Math.sin(stalk.rotation.z) * h, h + 0.18, z);
    top.rotation.z = stalk.rotation.z * 2.2;
    g.add(top);
  });
  return shadowed(g);
}

/** Banana plant — curved trunk with a fan of large bent leaves. */
function banana() {
  const g = new THREE.Group();
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.11, 1.5, 8), M.trunk);
  trunk.position.y = 0.75; trunk.rotation.z = 0.06; g.add(trunk);
  for (let i = 0; i < 7; i++) {
    const geo = new THREE.PlaneGeometry(0.55, 1.7, 1, 8);
    geo.translate(0, 0.85, 0);
    const pos = geo.attributes.position;
    for (let v = 0; v < pos.count; v++) {
      const y = pos.getY(v);
      pos.setZ(v, -Math.pow(y / 1.7, 2) * 0.6);
    }
    geo.computeVertexNormals();
    const leaf = new THREE.Mesh(geo, M.leaf);
    const a = (i / 7) * Math.PI * 2;
    leaf.position.set(0.09, 1.5, 0);
    leaf.rotation.order = 'YXZ';
    leaf.rotation.y = a;
    leaf.rotation.x = -0.55 - (i % 3) * 0.16;
    g.add(leaf);
  }
  return shadowed(g);
}

/** Diya row — five small clay lamps in a line, flames lit (one shared light is added by main.js). */
function diyaRow() {
  const g = new THREE.Group();
  const pts = [];
  pts.push(new THREE.Vector2(0.0, 0.0));
  pts.push(new THREE.Vector2(0.075, 0.008));
  pts.push(new THREE.Vector2(0.105, 0.045));
  pts.push(new THREE.Vector2(0.115, 0.075));
  const bowlGeo = new THREE.LatheGeometry(pts, 18);
  g.userData.flames = [];
  for (let i = 0; i < 5; i++) {
    const x = (i - 2) * 0.62;
    const bowl = new THREE.Mesh(bowlGeo, M.clay);
    bowl.position.x = x; g.add(bowl);
    const flame = new THREE.Mesh(new THREE.ConeGeometry(0.020, 0.085, 8), M.flame);
    flame.position.set(x, 0.115, 0);
    g.add(flame);
    g.userData.flames.push(flame);
  }
  return shadowed(g);
}

/** Temple — a small stepped shikhara in silhouette against the sunset. */
function temple() {
  const g = new THREE.Group();
  const base = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.45, 2.6), M.dark);
  base.position.y = 0.225; g.add(base);
  let w = 2.0, y = 0.45;
  for (let i = 0; i < 5; i++) {
    const h = 0.52;
    const tier = new THREE.Mesh(new THREE.BoxGeometry(w, h, w), M.dark);
    tier.position.y = y + h / 2; g.add(tier);
    y += h; w *= 0.78;
  }
  const cap = new THREE.Mesh(new THREE.ConeGeometry(0.34, 0.5, 4), M.dark);
  cap.position.y = y + 0.25; cap.rotation.y = Math.PI / 4; g.add(cap);
  const finial = new THREE.Mesh(new THREE.SphereGeometry(0.11, 10, 8), M.brass);
  finial.position.y = y + 0.56; g.add(finial);
  const door = new THREE.Mesh(
    new THREE.BoxGeometry(0.55, 0.95, 0.06),
    new THREE.MeshStandardMaterial({ color: 0x120d0b, roughness: 1 })
  );
  door.position.set(0, 0.48, 1.31); g.add(door);
  return shadowed(g);
}

/** Boat — a simple wooden rowing boat resting on the water. */
function boat() {
  const g = new THREE.Group();
  const hullGeo = new THREE.SphereGeometry(1, 24, 12, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);
  const hull = new THREE.Mesh(hullGeo, M.wood);
  hull.scale.set(2.3, 0.62, 0.78);
  hull.position.y = 0.62;
  g.add(hull);
  const rim = new THREE.Mesh(new THREE.TorusGeometry(1, 0.045, 8, 40), M.woodDk);
  rim.rotation.x = Math.PI / 2;
  rim.scale.set(2.3, 0.78, 1);
  rim.position.y = 0.62;
  g.add(rim);
  const bench = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.05, 1.3), M.woodDk);
  bench.position.set(-0.3, 0.5, 0); g.add(bench);
  const bench2 = bench.clone(); bench2.position.x = 0.75; g.add(bench2);
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 2.6, 8), M.weave);
  pole.position.set(1.15, 0.9, 0.25); pole.rotation.z = 0.5; g.add(pole);
  return shadowed(g);
}

export const PLACEHOLDERS = { soop, sugarcane, banana, diyaRow, temple, boat };

export function buildPlaceholder(id) {
  const fn = PLACEHOLDERS[id];
  if (!fn) throw new Error(`No placeholder builder for slot "${id}"`);
  const group = fn();
  group.name = `placeholder:${id}`;
  return group;
}
