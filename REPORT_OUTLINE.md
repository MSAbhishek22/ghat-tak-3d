# REPORT OUTLINE — GHAT TAK 3D (Manycore Aholo, stage-04 final submission)

**Hard deadline: Thu 19 Nov 2026, 16:30 IST. Our submit target: 19 Nov 14:30 IST (2 h buffer).**
Final submission = project report (PDF or PPT) + working demo link and/or video.
Report must include (official requirement): **process screenshots, comparisons of key asset iterations, or images of the final results.** This outline covers all three.

## Report sections (PDF, ~10–12 pages / PPT equivalent)

1. **Cover** — "GHAT TAK 3D — The Ghat at Golden Hour" · one hero render · name/team (Abhi Solo) · one line: *A Chhath ghat at evening arghya, generated with Aholo Lux3D and assembled in real-time 3D.*
2. **The idea** — Chhath and the arghya moment; why a ghat at golden hour; the existing GHAT TAK web experience this grows out of (live link); what "spatial storytelling" means here. English only.
3. **Tools & pipeline** — Aholo Lux3D (G1 + G1-Turbo, text-to-3D and image-to-3D from my own rights-cleared GHAT TAK photographs) → GLB → named asset slots in a Three.js scene → Vercel. One pipeline diagram (draw simple boxes; screenshot of the slot table in `public/assets/glb/README.md` works).
4. **Process — generation log** — per asset: the exact prompt used, mode (Turbo/G1), and the generation screenshot. Source: `screenshots/process/<slot>-turbo.png` + `<slot>-g1.png` captured during generation (see ASSET_LIST.md working method).
5. **Key asset-iteration comparisons** ⭐ (the section the rules explicitly ask for) — side-by-side table for at least 3 assets:
   - **soop:** Turbo draft → prompt fix (what was wrong: e.g. tray too deep / fruit floating) → G1 final.
   - **banana:** draft → G1 final (leaf detail).
   - **boat:** draft → G1 final (hull proportions).
   Each cell = one screenshot + one caption line: *what changed and why.*
6. **Scene assembly** — the slot system (placeholder geometry → GLB swap 1:1), golden-hour lighting rig (sun disc, gradient sky shader, water glitter path, warm fog), cinematic auto-orbit camera. 1–2 editor/scene screenshots.
7. **Final results** — 3 hero renders from the **live URL** with `?clean=1`: (a) wide from the steps toward the sun, (b) close on the soop + sugarcane + banana trio, (c) boat on the glitter path. Full-bleed, one per page if PPT.
8. **Demo & video** — live demo URL + video link + what the viewer can do (orbit, zoom, auto-drift).
9. **What I learned / what's next** — Lux3D strengths (single hero objects, PBR), limits (foliage, multi-object scenes), next steps (SpatialGen pass, more ghat life: brass lota, garland).
10. **Credits & links** — assets generated with Aholo Lux3D from my own photographs and prompts; scene code (source link); GHAT TAK original site; X post link.

## Demo / video plan
- **Demo link:** the live Vercel URL of this scene (verify signed-out before submitting).
- **Video:** screen recording **of the live URL only** (never localhost/slides): open with `?clean=1`, let the cinematic auto-orbit carry it, one slow manual drag mid-way, end on the soop close-up. **60–90 seconds.**
- **Audio rule (GHAT TAK canon):** Chhath geet BGM only (Sharda Sinha), **no voiceover**; captions allowed by the hackathon rules — add 3–4 short English captions (what Chhath is, what arghya is, "generated with Lux3D").
- Record after the GLB swap is verified on the live URL — not before.

## Stage-04 form choices (fill exactly like this)
- **Ecosystem / tech used:** `Aholo Lux3D (G1 & G1-Turbo, text-to-3D + image-to-3D) · Three.js · Vite · Vercel`
- **Tracks / awards — pick these (best fit first):**
  1. **Spatial Design** (Application Award) — the entry *is* a designed 3D space.
  2. **Film & TV** (Application Award) — cinematic golden-hour scene, camera drift, filmable composition.
  3. If a third pick is offered: **Creativity Award** direction (original cultural world, own-photo image-to-3D) — the main pool (Special/First/Second/Third) is judged from the same submission regardless.
- **Demo field:** live Vercel URL. **Video field:** the recorded demo video link.
- **Source code (bonus):** link the public repo/folder of `build/` (or attach a zip of `build/` minus `node_modules`/`dist`).
- **Reach (+5%):** after submitting, post on X introducing the project with **#Manycorehackathon** + demo link, keep it public until results, and add the post link in the form if a field exists.

## 19 Nov run-sheet (IST)
| Time | Step |
|---|---|
| ≤ 10:00 | All G1 finals downloaded (ASSET_LIST order), GLBs in `public/assets/glb/` |
| 11:00 | Build + deploy; live URL verified signed-out; slot-swap check in console |
| 12:00 | Hero renders (§7) + any one small placement fix if needed |
| 12:30 | Record video from live URL (geet BGM, captions) |
| 13:30 | Report PDF assembled from §4–§7 screenshots |
| **14:30** | **SUBMIT stage-04** (report + demo link + video + source link) |
| After | X post #Manycorehackathon; optional ModelScope publish (+20 h GPU) if time remains |
