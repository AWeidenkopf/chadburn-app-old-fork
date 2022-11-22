# Chadburn

## Development Setup

1. Install the `pnpm` package manager following [these instructions](https://pnpm.io/installation).

2. Install all dependencies:

```bash
pnpm install
```

3. Start the dev server in watch mode:

```bash
pnpm run start
```

4. In another terminal, clone `y-webrtc` to get the test WebRTC signaling server:

```bash
git clone https://github.com/yjs/y-webrtc.git
```

5. Install `y-webrtc`'s dependencies:

```bash
cd y-webrtc
```

```bash
pnpm install
```

6. Start the test signaling server:

```bash
./bin/server.js
```

5. View the app in your browser at http://localhost:8000
