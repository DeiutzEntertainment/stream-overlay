# Stream Overlay

Browser-source overlays for JDeiutz built with Vite, React, TypeScript, Motion, and Tailwind CSS.

## Pages

- Launcher: [index.html](index.html)
- Starting Soon: [starting.html](starting.html)
- BRB: [brb.html](brb.html)
- Ending: [ending.html](ending.html)

## Current Scope

- Multi-page Vite setup with a launcher page plus separate HTML entries for each overlay page.
- Shared overlay shell in `src/overlay-shell.tsx` for consistent framing, animation, and layout.
- Brand name set to `JDeiutz` across all active overlays.
- Discord is the only social callout. The viewer-facing instruction is to use `!discord` in chat.
- Viewer-facing copy avoids internal or technical labels and keeps BRB and Ending messaging intentionally minimal.
- The Starting Soon page accepts a target time through `starting.html?time=HH:MM`, interpreted as EEST.
- The launcher includes a `Start Time (EEST)` control that opens the Starting Soon page with the selected time.

## Project Structure

- `src/nav.tsx`: launcher entry point
- `src/main.tsx`: Starting Soon entry point
- `src/brb.tsx`: BRB entry point
- `src/ending.tsx`: Ending entry point
- `src/nav-page.tsx`: launcher page content
- `src/app.tsx`: Starting Soon page content
- `src/brb-page.tsx`: BRB page content
- `src/ending-page.tsx`: Ending page content
- `src/overlay-shell.tsx`: Shared overlay layout components
- `vite.config.ts`: Multi-page Vite build inputs

## Starting Timer

- Enter the stream time on the launcher using the `Start Time (EEST)` field.
- The launcher opens the Starting Soon scene with a URL like `starting.html?time=20:00`.
- The Starting Soon overlay counts down to the next occurrence of that time in EEST.
- If the current time is between the configured start time and one hour after it, the overlay stays at `00:00:00`.

## Development

- Install dependencies: `npm install`
- Run dev server: `npm run dev`
- Build production files: `npm run build`
- Deploy to Cloud Run: `npm run deploy`
- Start the production server: `npm start`
- Type-check: `npm run lint`

## Build Output

Production builds emit the launcher plus one HTML file per overlay page into `dist/`.

The repository ignores generated build output, installed dependencies, local environment files, logs, and editor-specific files through `.gitignore`.

## Linux Startup

This repo includes a production Express static server in `server.js` and a `systemd` unit file template in `deploy/stream-overlay.service`.

Recommended Linux setup:

- Copy the project to `/opt/stream-overlay`
- Install Node.js and npm on the server
- Run `npm ci`
- Run `npm run build`
- Create a dedicated user such as `streamoverlay`
- Copy `deploy/stream-overlay.service` to `/etc/systemd/system/stream-overlay.service`
- Adjust `User`, `Group`, `WorkingDirectory`, `ExecStart`, or `PORT` in the service file if needed
- Enable startup with `sudo systemctl enable stream-overlay`
- Start it with `sudo systemctl start stream-overlay`
- Check status with `sudo systemctl status stream-overlay`

Example install flow:

```bash
sudo useradd --system --home /opt/stream-overlay --shell /usr/sbin/nologin streamoverlay
sudo mkdir -p /opt/stream-overlay
sudo chown -R streamoverlay:streamoverlay /opt/stream-overlay

cd /opt/stream-overlay
npm ci
npm run build

sudo cp deploy/stream-overlay.service /etc/systemd/system/stream-overlay.service
sudo systemctl daemon-reload
sudo systemctl enable stream-overlay
sudo systemctl start stream-overlay
```

By default the service listens on port `3000` and serves the built files from `dist/`.

## Docker

This repo also includes a production Docker image definition in `Dockerfile`.

Build the image:

```bash
docker build -t stream-overlay .
```

Run it manually:

```bash
docker run -d \
	--name stream-overlay \
	-p 3000:3000 \
	--restart unless-stopped \
	stream-overlay
```

Why this starts automatically after a Linux reboot:

- Docker must be enabled on boot: `sudo systemctl enable docker`
- The container must be created with a restart policy such as `--restart unless-stopped`

Useful Docker commands:

```bash
docker logs -f stream-overlay
docker ps
docker stop stream-overlay
docker start stream-overlay
docker rm -f stream-overlay
```

If port `3000` is already in use on the server, change the published port:

```bash
docker run -d \
	--name stream-overlay \
	-p 8080:3000 \
	--restart unless-stopped \
	stream-overlay
```

That keeps the app listening on port `3000` inside the container while exposing it on `8080` on the Linux host.

## Cloud Run

This repo can be deployed directly to Google Cloud Run from the workspace with the built-in npm script:

```bash
npm run deploy
```

That command deploys the service as:

- service name: `stream-overlay`
- project: active `gcloud` project
- region: `europe-west1`
- public access: enabled
- CPU limit: `200m`
- memory limit: `128Mi`
- minimum instances: `0`
- maximum instances: `1`

The `0` minimum instance setting allows the service to scale down to zero when idle.
The deploy script uses whichever Google Cloud project is currently selected in your local `gcloud` configuration.

## Documentation Rules

This repository keeps two human-maintained project records:

- `README.md`: current-state documentation
- `HISTORY.md`: chronological change log

Any change to overlay pages, page entries, brand text, page count, or build inputs must update both files in the same work session.