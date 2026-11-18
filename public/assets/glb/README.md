# Lux3D asset drop zone

Download each generated GLB from Aholo and save it here with the **exact**
filename of its slot. The scene (`src/main.js`, `ASSET_SLOTS`) loads it
automatically and replaces the procedural placeholder 1:1 — no code changes.

| Slot id    | File here        | Asset              |
|------------|------------------|--------------------|
| soop       | `soop.glb`       | Offering basket    |
| sugarcane  | `sugarcane.glb`  | Sugarcane cluster  |
| banana     | `banana.glb`     | Banana plant       |
| diyaRow    | `diyaRow.glb`    | Row of clay diyas  |
| temple     | `temple.glb`     | Temple silhouette  |
| boat       | `boat.glb`       | Wooden rowing boat |

Prompts and generation order: see `../ASSET_LIST.md` (project root of build/).
After dropping GLBs in: `npm run build` → deploy `dist/` → hard-refresh the
live URL and check every slot swapped (browser console logs `[slots] <id>:
Lux3D GLB loaded` for each success).
