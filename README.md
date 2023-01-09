# Chadburn

## Getting Started

1. Install the `pnpm` package manager following [these instructions](https://pnpm.io/installation).

2. Install all dependencies:

```bash
pnpm install
```

Install `firebase-tools` to enable the `firebase` command:

```bash
pnpm install -g firebase-tools
```

3. Start the dev server in watch mode:

```bash
pnpm run start
```

4. In another terminal, clone `chadburn-signaling` to get the WebRTC signaling server:

```bash
git clone https://github.com/scottysseus/chadburn-signaling.git
```

5. Install `chadburn-signaling`'s dependencies:

```bash
cd chadburn-signaling
```

```bash
pnpm install
```

6. Start the signaling server:

```bash
pnpm run start
```

5. View the app in your browser at http://localhost:8000

## Development Setup

1. Install the [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) for Visual Studio Code.

2. Install the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) for Visual Studio Code.

3. Set up Husky's Git hooks:

```bash
pnpm run prepare
```
