# ASSET LIST — Lux3D generation shot-list (Wed 18 Nov session)

**Budget:** 3,300 credits on the account, **expiring 19 Nov 21:29 IST** — spend them or lose them, but spend in the order below.
**Costs are NOT published.** ⚠️ CHECK FIRST: on the first generation screen, note the exact credit cost shown for **G1-Turbo** and for **G1** before confirming anything, and write both numbers at the top of this file. Every "recommendation" below assumes Turbo is much cheaper than G1; if the real numbers break that assumption, re-plan with the rule: *all 6 Turbo drafts first, then G1 finals strictly in priority order, stop G1 when the balance can't cover the remaining finals.*

**Working method for every asset**
1. Generate a **G1-Turbo draft** (~20 s). Screenshot the result — this is report material.
2. If the shape is wrong, fix the **prompt** (not the model) and re-draft. Max 3 drafts per asset.
3. Generate the **G1 final** with the winning prompt. Download **GLB**.
4. Save the GLB as `build/public/assets/glb/<slot>.glb` (exact name — the scene auto-swaps it in).
5. Screenshot every generation screen: `screenshots/process/<slot>-turbo.png`, `<slot>-g1.png`. These feed the report's iteration comparisons (see REPORT_OUTLINE.md §5).

**Style for all prompts:** `photorealistic` style, single object, plain neutral background, centred, no people, no text. Suggested face count where offered: hero assets (soop, boat, banana) 100k–200k; small/repeated (diya row, sugarcane) 30k–80k; temple 50k–100k (it's a silhouette).

**Source-image note (image-to-3D):** the GHAT TAK photo library lives in `~/workspace/ghat-tak-vercel83/assets/` (files are sequentially named `media-01.jpg` … `media-46.jpg` + `.webp`/`.png` variants — content is NOT labelled per file). For any asset marked *image-to-3D preferred*, first open the library and pick the frame where that object is **large, sharp and unobstructed**; verify visually before uploading — do not guess a filename. If no clean frame exists, use the text prompt instead. Image-to-3D from his own rights-cleared photos is also the stronger originality story for the report.

---

## Priority 1 — `soop` · the offering basket (HERO — the arghya centrepiece)
- **Mode:** G1 final (Turbo draft first). **Image-to-3D preferred** if a clean soop frame exists in the library; else text.
- **Text prompt:** `A traditional Indian bamboo soop offering basket for the Chhath festival: a shallow wide woven bamboo tray with a raised rim, filled with bananas, oranges, apples, a whole coconut and green betel leaves, warm natural bamboo texture, photorealistic, single object on a plain background, no people, no text`
- **Slot:** front step by the water (`soop.glb`, target ≈1.25 m wide). This is what the camera reads first — if only one asset gets a second G1 attempt, it's this one.

## Priority 2 — `temple` · small temple silhouette
- **Mode:** G1-Turbo may be enough (it reads as a silhouette against the sun); upgrade to G1 only if credits are comfortably left after priorities 1, 3, 4 finals. Text-to-3D.
- **Text prompt:** `A small North Indian Hindu temple with a stepped shikhara spire, carved stone tiers tapering to a pointed finial, a single dark doorway, weathered sandstone, photorealistic architecture, single building on a plain background, no people, no text`
- **Slot:** back-left of the platform (`temple.glb`, target ≈4.4 m tall).

## Priority 3 — `banana` · banana plant
- **Mode:** G1 final (foliage is where Turbo usually mushes). **Image-to-3D preferred** if a clean banana-plant frame exists; else text.
- **Text prompt:** `A young banana plant with a smooth green pseudostem and a crown of large broad arching banana leaves, lush tropical green, photorealistic plant, single plant on a plain background, no people, no text`
- **Slot:** right side of the platform (`banana.glb`, target ≈2.7 m tall).

## Priority 4 — `sugarcane` · sugarcane cluster
- **Mode:** Turbo draft → G1 final. Text-to-3D (library frames usually show stalks in hands/bundles at odd angles — only use image mode if a clean standing bundle exists).
- **Text prompt:** `A standing bundle of fresh sugarcane stalks tied together, tall green and purple-tinged canes with visible ringed joints and long leafy tops, harvested for a festival offering, photorealistic, single bundle on a plain background, no people, no text`
- **Slot:** left mid-steps (`sugarcane.glb`, target ≈2.9 m tall). Iconography anchor with the banana + soop — the Chhath trio.

## Priority 5 — `boat` · wooden rowing boat
- **Mode:** G1 final (large, mid-ground, catches the light). Text-to-3D.
- **Text prompt:** `A simple wooden rowing boat of the kind used on Indian rivers, worn brown timber planks, a flat bench seat and a bamboo pole resting inside, gently weathered, photorealistic, single boat on a plain background, no people, no text`
- **Slot:** on the water, right of the glitter path (`boat.glb`, target ≈4.8 m long).

## Priority 6 — `diyaRow` · row of clay diyas
- **Mode:** G1-Turbo is fine (small, and the scene adds the flame light). Text-to-3D.
- **Text prompt:** `A row of five small handmade clay diya oil lamps on a stone step, terracotta earthenware bowls with tiny warm flames, evening light, photorealistic, single row on a plain background, no people, no text`
- **Slot:** front step edge (`diyaRow.glb`, target ≈3.3 m wide row). Keep it a single restrained row — the scene is evening arghya, NOT a Diwali wall of lamps.

## If credits remain — bonus (only after all 6 finals are downloaded)
7. **Brass lota** (water vessel for arghya): `A polished brass lota water vessel, rounded body with a flared rim, warm golden metal with soft reflections, photorealistic, single object on a plain background` — G1-Turbo. No scene slot yet; parent adds one beside the soop if it generates well.
8. **Marigold garland** to drape the temple door: `A garland of orange and yellow marigold flowers strung together, festive Indian flower toran, photorealistic, on a plain background` — G1-Turbo.

## After generation (same session, in order)
1. All GLBs in `build/public/assets/glb/` with exact slot names → `npm run build` → deploy → verify on the **live URL** signed-out: every slot swapped (console logs `[slots] <id>: Lux3D GLB loaded`).
2. Fix only what's broken: scale/placement tweaks live in `ASSET_SLOTS` in `src/main.js` (position / rotationY / targetSize) — one small patch per fix.
3. Take the 3 final hero renders for the report (see REPORT_OUTLINE.md §7) from the live URL with `?clean=1`.
