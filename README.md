# Intervall website

Live: https://intervall-studio.onrender.com

Standalone static website using Intervall's original brand artwork and Right Grotesk fonts. The iOS app remains in its private repository.

## Preview

Run `python3 -m http.server 8765` from this directory.

## Render

- Service: `intervall-studio`
- ID: `srv-daqs40ff3r2c73cukdog`
- Repository: `catdilf69/Intervall-Site`, branch `main`
- Root: repository root
- Build command: `true`
- Publish directory: `.`
- Public Git repository connection: deploy updates using Render's Manual Deploy > Deploy latest commit. Do not assume pushing to GitHub deploys automatically.

All runtime assets are local. The interactive timer starts only on user input, supports pause and phase selection, and uses a wall-clock deadline. This is a website demonstration, not the iOS timing engine.

Verified 24 September 2026: public HTTPS, matching CSS and font bytes, desktop and 390px mobile layouts, no mobile horizontal overflow, start/pause, and rest selection.
