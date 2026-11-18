# GHAT TAK 3D — The Ghat at Golden Hour

An interactive 3D Chhath ghat at evening arghya, built for the **Manycore Aholo
Global 3D AI Hackathon**. Hero assets are generated with **Aholo Lux3D** (from
original prompts and the creator's own rights-cleared GHAT TAK photographs),
exported as GLB, and assembled into a real-time **Three.js** scene: a stepped
stone ghat, a low sun over the river, and the offering — soop, sugarcane and
banana plant — laid out for the sunset prayer.

**Live demo:** https://msabhishek22.github.io/ghat-tak-3d/
**The original GHAT TAK experience:** https://ghat-tak.vercel.app

## How it works

- `src/main.js` — the scene: golden-hour sky shader, sun disc and glitter path
  on the water, stepped ghat platform, cinematic auto-drifting orbit camera,
  and gold story hotspots anchored to each asset.
- **Named asset slots** — every hero object lives in a slot
  (`temple`, `banana`, `sugarcane`, `soop`, `diyaRow`, `boat`). A slot first
  tries to load its Lux3D model from `public/assets/glb/<slot>.glb`; if the
  file is not there yet it falls back to procedural placeholder geometry
  (`src/placeholders.js`), so the scene is always complete. Loaded GLBs are
  auto-scaled from their bounding box to the slot's real-world target size and
  centred on the slot point — dropping in a new GLB needs **zero code changes**.
- `ASSET_LIST.md` — the Lux3D generation shot-list (prompts, order, budgets).
- `REPORT_OUTLINE.md` — the hackathon report plan.

## Run it

```bash
npm install
npm run dev      # local development
npm run build    # outputs dist/
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds with
the `/ghat-tak-3d/` base path and deploys `dist/` to GitHub Pages.

## Credits

3D assets generated with Aholo Lux3D from original prompts and the creator's
own photographs. Scene code: Three.js + Vite. Part of the GHAT TAK world by
M S Abhishek.
