<sub>Reproduction was created with `pnpx storybook@next init --builder vite` on `node` version `18 LTS`. Consecutive update via `pnpx storybook@next upgrade --prerelease --skip-check` and on 2023-03-17 from [this tag](https://github.com/D1no/reproduction-storybook-symlinks-pnpm/tree/before_pnpm_workspace_extension) for [this original issue](storybookjs/storybook/issues/21399) onwards extended to a `pnpm` mono repo workspace with issue cases.</sub>

Issue: [storybookjs/storybook/issues/21399](https://github.com/storybookjs/storybook/issues/21399)<br/>
Storybook Version: `^7.0.0-rc.4`<br/>
PNPM Version: `^7.29.3`<br/>
Node Version: `18 LTS`<br/>
Builder: `vite`<br/>
Renderer: `react 18`

## Test Rig: Storybook in a Typical PNPM Monorepo

This repository mimics a typical integrated monorepo architecture where individual views or "micro front-ends" consume one or more centralized UI libraries. Build and test tooling (like storybook) live outside of that relationship to ensure weak coupling.

```text
 MonoRepo/                        PNPM Workspace
     │
     ├─ ...
     │                            Outside components
     ├─ tools/                    are referenced via
     │  └── storybook ◄──┬────┐   symlinked packages
     │                   │    │   in node_modules.
     ├─ ui/              │    │
     │  ├── Component────┘    │   Storybook Issues:
     │  ├── Component         │
     │  └── ...    │          │   · TSDocs to Arg-Docs
     │             │          │   · "New File" HMR
     └─ views/     ▼          │   · Recursions / Broken
        ├── SampleView────────┘   · ...
        └── ...
```

### How to run Storybook Issues Inspection

Clone [D1no/reproduction-storybook-symlinks-pnpm](https://github.com/D1no/reproduction-storybook-symlinks-pnpm)

```bash
git clone git@github.com:D1no/reproduction-storybook-symlinks-pnpm.git && cd reproduction-storybook-symlinks-pnpm.git
```

and install

```bash
pnpm install
```

> _For install with empty cache, run_
>
> ```bash
> pnpm clean-install
> ```

then for the case run the respective pnpm script...

> these are defined in [main.ts](https://github.com/D1no/reproduction-storybook-symlinks-pnpm/blob/master/tools/.storybook/main.ts) under `tools/.storybook/main.ts`

### Expectation

After running `pnpx storybook@next init --builder vite`, official storybook features should function without any additional configuration of loaders, builders or other down stream dependencies installed by storybook.

> ❗️ Preview images are from Version `7.0.0-rc.4` and NOT continuously updated to the latest version.

---

#### Case 1: Components inside storybook folder

![1_local_symlink_stories-animated](https://user-images.githubusercontent.com/2397125/226085212-8a8a3a07-4ec9-4ecb-ab13-b7d41073132d.png)

```bash
pnpm run storybook:case_1
```

Components that are _inside_ of the storybook root folder (`../stories`) will:

- [x] For real files (`tools/stories/Component`)
  - [x] Render successfully in storybook
  - [x] Have JSDocs converted to story docs
  - [x] Have HMR show new stories files (while running, co-located `another.stories-hmr.tsx` to `.stories.tsx`)
- [ ] For symbolic links (`tools/stories/ComponentAsSymlink`)
  - [x] Render successfully in storybook
  - [ ] Have JSDocs converted to story docs
  - [ ] Have HMR show new stories files (while running, co-located `another.stories-hmr.tsx` to `.stories.tsx`)

---

#### Case 2-1: Components outside storybook folder

![2-1_manual_outside_root_stories-animated](https://user-images.githubusercontent.com/2397125/226085223-b739c07d-7ce5-4d41-b0c4-cb6182e07958.png)

```bash
pnpm run storybook:case_2-1
```

Components that are _outside_ of the storybook root folder but referenced with a relative path (`../../ui/`) will:

- [x] Render successfully in storybook
- [ ] Have JSDocs converted to story docs
- [ ] Have HMR show new stories files (while running, co-located `another.stories-hmr.tsx` to `.stories.tsx`)

---

#### Case 2-2: Single capitalized component folder outside storybook

![2-2_manual_outside_root_stories_direct_to_capitalized_component_folder](https://user-images.githubusercontent.com/2397125/226085238-4d4b05ed-d1ce-4fca-be4b-75246720c0d0.png)

```bash
pnpm run storybook:case_2-2
```

A single component that is _outside_ of the storybook root folder but referenced with a relative path (`../../ui/Component`) to its _capitalized_ folder, will:

<details>
<summary>❌ ERROR: WARN 🚨 Unable to index ./../ui/Component/index.stories.tsx</summary>

```bash
tools storybook: WARN 🚨 Unable to index ./../ui/Component/index.stories.tsx:
tools storybook: WARN   Error: Invalid kind '', must include alphanumeric characters
tools storybook: WARN     at m (/Users/worker/development/_REPRODUCTIONS/reproduction-storybook-symlinks-pnpm/node_modules/.pnpm/@storybook+csf@0.0.2-next.10/node_modules/@storybook/csf/dist/index.js:3:3033)
tools storybook: WARN     at N (/Users/worker/development/_REPRODUCTIONS/reproduction-storybook-symlinks-pnpm/node_modules/.pnpm/@storybook+csf@0.0.2-next.10/node_modules/@storybook/csf/dist/index.js:3:3126)
tools storybook: WARN     at /Users/worker/development/_REPRODUCTIONS/reproduction-storybook-symlinks-pnpm/node_modules/.pnpm/@storybook+csf-tools@7.0.0-rc.4/node_modules/@storybook/csf-tools/dist/index.js:18:343
tools storybook: WARN     at Array.reduce (<anonymous>)
tools storybook: WARN     at CsfFile.parse (/Users/worker/development/_REPRODUCTIONS/reproduction-storybook-symlinks-pnpm/node_modules/.pnpm/@storybook+csf-tools@7.0.0-rc.4/node_modules/@storybook/csf-tools/dist/index.js:18:230)
tools storybook: WARN     at Object.indexer (/Users/worker/development/_REPRODUCTIONS/reproduction-storybook-symlinks-pnpm/node_modules/.pnpm/@storybook+core-server@7.0.0-rc.4/node_modules/@storybook/core-server/dist/presets/common-preset.js:8:2055)
tools storybook: WARN     at async StoryIndexGenerator.extractStories (/Users/worker/development/_REPRODUCTIONS/reproduction-storybook-symlinks-pnpm/node_modules/.pnpm/@storybook+core-server@7.0.0-rc.4/node_modules/@storybook/core-server/dist/index.js:13:3554)
tools storybook: WARN     at async /Users/worker/development/_REPRODUCTIONS/reproduction-storybook-symlinks-pnpm/node_modules/.pnpm/@storybook+core-server@7.0.0-rc.4/node_modules/@storybook/core-server/dist/index.js:13:1869
tools storybook: WARN     at async Promise.all (index 0)
tools storybook: WARN     at async Promise.all (index 0)
```

</details>

- [ ] Render successfully in storybook
- [ ] Have JSDocs converted to story docs
- [ ] Have HMR show new stories files (while running, co-located `another.stories-hmr.tsx` to `.stories.tsx`)

---

#### Case 3: Components added to storybook from `pnpm` workspace

![3_proper_workspace_stories_but_recursion](https://user-images.githubusercontent.com/2397125/226085245-c6b5b8e7-c27f-423b-9486-d8949eb74a7b.png)

```bash
pnpm run storybook:case_3
```

Components that are _outside_ of the storybook root folder but referenced via `pnpm` workspaces, therefore located in `../node_modules/@repo/` as a symlink will:

<details>
<summary>❌ ERROR: importers[path] is not a function</summary>

```bash
importers[path] is not a function
TypeError: importers[path] is not a function
    at StoryStore.importFn (http://localhost:6006/virtual:/@storybook/builder-vite/storybook-stories.js:6:31)
    at StoryStore.loadCSFFileByStoryId (http://localhost:6006/sb-preview/runtime.mjs:40:8376)
    at StoryStore.loadStory (http://localhost:6006/sb-preview/runtime.mjs:40:9563)
    at async http://localhost:6006/sb-preview/runtime.mjs:74:9003
    at async StoryRender.runPhase (http://localhost:6006/sb-preview/runtime.mjs:74:8764)
    at async StoryRender.prepare (http://localhost:6006/sb-preview/runtime.mjs:74:8922)
    at async PreviewWeb.renderSelection (http://localhost:6006/sb-preview/runtime.mjs:94:3120)
```

</details>

- [ ] Render successfully in storybook
- [ ] Have JSDocs converted to story docs
- [ ] Have HMR show new stories files (while running, co-located `another.stories-hmr.tsx` to `.stories.tsx`)
- [ ] Detects symlink recursion or provides easy way to exclude them

---

#### Case 4: Components via `pnpm` with globby workaround in `main.ts` to avoid `node_modules` recursion

![4_proper_workspace_stories_trying_to_avoid_recursion_with_glob-animation](https://user-images.githubusercontent.com/2397125/226085251-72b615f6-88e9-4178-94aa-d44c8f9eef95.png)

```bash
pnpm run storybook:case_4
# or
pnpm run storybook
```

Components that are _outside_ of the storybook root folder but referenced via `pnpm` workspaces, ingested via a negative glob to avoid recursion as `../node_modules/@repo/**!(node_modules)/**!(node_modules)/*.stories.@(js|jsx|ts|tsx)` will:

- [x] Render successfully in storybook
- [ ] Have JSDocs converted to story docs
- [ ] Have HMR show new stories files (while running, co-located `another.stories-hmr.tsx` to `.stories.tsx`)
- [ ] Detects symlink recursion or provides easy way to exclude them

## System

Via `pnpx sb@next info` on 2023-03-18

```cpp
Environment Info:

  System:
    OS: macOS 13.2.1
    CPU: (10) arm64 Apple M1 Max
  Binaries:
    Node: 18.14.1 - ~/.nvs/default/bin/node
    npm: 9.3.1 - ~/.nvs/default/bin/npm
  Browsers:
    Chrome: 111.0.5563.64
    Firefox: 97.0.1
    Safari: 16.3
  npmPackages:
    @storybook/addon-essentials: ^7.0.0-rc.4 => 7.0.0-rc.4
    @storybook/addon-interactions: ^7.0.0-rc.4 => 7.0.0-rc.4
    @storybook/addon-links: ^7.0.0-rc.4 => 7.0.0-rc.4
    @storybook/blocks: ^7.0.0-rc.4 => 7.0.0-rc.4
    @storybook/react: ^7.0.0-rc.4 => 7.0.0-rc.4
    @storybook/react-vite: ^7.0.0-rc.4 => 7.0.0-rc.4
    @storybook/testing-library: ^0.0.14-next.1 => 0.0.14-next.1
```
