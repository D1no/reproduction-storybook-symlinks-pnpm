<sub>Reproduction was created with `pnpx storybook@next init --builder vite`</sub>
### Reproduction: No Storybook JSDocGen inside of Monorepo

_No TypeScript JSDoc to Story Documentation. Basic monorepo scenario where the UI library is outside of test and build tooling._

(1) Install

```bash
cd ui && pnpm install && cd ../tools pnpm install
```

(2) Run

```bash
pnpm run storybook
```

<sub>Which package manager likely doesn't matter.</sub>

### Issue

The same component is included as (1) local copy inside `stories/`, (2) as reference in `.storybook/main.ts` and as a (3) symbolic link into `stories/`.

✅ All three types render successfully in storybook.

❌ Only variant (1) has JSDoc converted to story docs (!)

### Expected Behavior

1. Components that are _outside_ of the storybook root folder (here: `tools/`), but referenced in SBs `main.ts` should have JSDocs converted to story docs. As by example here:

```ts
const config: StorybookConfig = {
  stories: [
  // (...)
    "../../ui/Component/*.stories.@(js|jsx|ts|tsx)",
  ],
  // (...)
```

2. Components inside of the root folder that are included as a **symbolic link** should have JSDocs converted to story docs. _This is a problem for PNPM workspaces especially, as they symlink stories into `tools/node_modules/ui/**` as project package within the tools folder_. To keep this repro simple, symlink used here:

```bash
cd tools/stories && ln -s ../../ui/ComponentAsSymlink ComponentAsSymlink
```

### System
Via `pnpx sb@next info` on 2023-03-04

```cpp
Environment Info:

  System:
    OS: macOS 13.2.1
    CPU: (10) arm64 Apple M1 Max
  Binaries:
    Node: 18.14.1 - ~/.nvs/default/bin/node
    npm: 9.3.1 - ~/.nvs/default/bin/npm
  Browsers:
    Chrome: 110.0.5481.177
    Firefox: 97.0.1
    Safari: 16.3
  npmPackages:
    @storybook/addon-essentials: ^7.0.0-beta.61 => 7.0.0-beta.61 
    @storybook/addon-interactions: ^7.0.0-beta.61 => 7.0.0-beta.61 
    @storybook/addon-links: ^7.0.0-beta.61 => 7.0.0-beta.61 
    @storybook/blocks: ^7.0.0-alpha.8 => 7.0.0-alpha.8 
    @storybook/react: ^7.0.0-beta.61 => 7.0.0-beta.61 
    @storybook/react-vite: ^7.0.0-beta.61 => 7.0.0-beta.61 
    @storybook/testing-library: ^0.0.14-next.1 => 0.0.14-next.1 
```