# History

## 2026-03-09

- Added an npm `deploy` script for Google Cloud Run using the `stream-overlay` service in the active local `gcloud` project and region `europe-west1`.
- Documented the Cloud Run deployment command and its runtime limits: public access, `200m` CPU, `128Mi` memory, `min-instances=0`, and `max-instances=1`.

## 2026-03-08

- Added a proper repository `.gitignore` for Node/Vite build artifacts, dependencies, logs, local env files, and editor files.
- Added Docker packaging support with a multi-stage `Dockerfile` and `.dockerignore`.
- Documented Docker build, run, and auto-start behavior for Linux deployments.
- Added a production Express static server and a Linux `systemd` service template for automatic startup at boot.
- Updated the Starting Soon countdown to stay at zero for one hour after the configured EEST start time before rolling to the next day.
- Added configurable Starting Soon countdown support based on a user-entered `HH:MM` time in EEST.
- Added a launcher control that opens `starting.html` with the selected EEST time.
- Removed the internal-facing "Browser Overlay Ready" badge from the shared overlay header.
- Simplified the BRB scene by removing the visible return timer.
- Simplified the Ending scene copy to a generic sign-off without a scheduled date or time.
- Changed the root `index.html` page into a launcher for the overlay scenes.
- Moved the Starting Soon overlay onto its own dedicated `starting.html` entry.
- Converted the project from a single-entry app into a true multi-page Vite overlay build.
- Added dedicated HTML entries for Starting Soon, BRB, and Ending overlays.
- Added a shared overlay shell component for consistent visual framing and animation.
- Set the active channel branding to `JDeiutz`.
- Standardized viewer-facing social messaging to Discord only, using the `!discord` chat command.
- Removed the unused Live overlay page and its Vite entry points.
- Added repository documentation and an agent maintenance rule file to keep docs aligned with code changes.