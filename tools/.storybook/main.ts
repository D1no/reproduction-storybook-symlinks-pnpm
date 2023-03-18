// -----------------------------------------------------------------------------
// Storybook Configuration Test Cases (env set in root/package.json -> scripts)
// -----------------------------------------------------------------------------
const issueCase = process.env.TEST_CASE;

let configStories: string[] = [];

switch (issueCase) {
  case "1_local_symlink_stories":
    configStories = [
      /**
       * Compares local stories and a local symlinked story.
       * -> TSDoc to addon-docs broken (ComponentAsSymlink)
       * While storybook is running, rename another.stories-hmr.tsx to
       * another.stories.tsx
       * -> Live reload works for local component
       * -> Live reload broken for symlinked component (needs restart)
       */
      "../stories/**/*.stories.@(js|jsx|ts|tsx)",
    ];
    break;
  case "2-1_manual_outside_root_stories":
    configStories = [
      /**
       * Manual out of root path to ui components.
       * -> All TSDoc to addon-docs broken
       * -> No live reload when adding new stories files (needs restart)
       */
      "../../ui/**/*.stories.@(js|jsx|ts|tsx)",
    ];
    break;
  case "2-2_manual_outside_root_stories_direct_to_capitalized_component_folder":
    configStories = [
      /**
       * Manual out of root path to a single ui component in a capitalized folder.
       * -> Breaks with "Unable to index ./../ui/Component/index.stories.tsx:"
       */
      //        ↓ this
      "../../ui/Component/**/*.stories.@(js|jsx|ts|tsx)",
    ];
    break;
  case "3_proper_workspace_stories_but_recursion":
    configStories = [
      /**
       * Via `tools/package.json` -> peerDependencies -> @ui and @views adding
       * the libraries using their proper mono-repo identifiers. Renders
       * the stories but causes a recursion through the nested node_modules
       * (SampleView imports Component).
       * -> Broken
       */
      "../node_modules/@repo/ui/**/*.stories.@(js|jsx|ts|tsx)",
      "../node_modules/@repo/views/**/*.stories.@(js|jsx|ts|tsx)",
    ];
  default:
  case "4_proper_workspace_stories_trying_to_avoid_recursion_with_glob":
    configStories = [
      /**
       * Since storybook uses globby under the hood, trying to add a negative
       * glob for nested node_modules via "**!(node_modules)/**!(node_modules)".
       * -> Insight from https://github.com/storybookjs/storybook/issues/11181#issuecomment-1474347928
       *    though sometimes just "**!(node_modules)" seems to work, when there
       *    are stories directly on next level folder. The following wont work:
       *    "../node_modules/@repo/views/**!(node_modules)/**!(node_modules)/*.stories.@(js|jsx|ts|tsx)"
       *    This does:
       *    "../node_modules/@repo/views/**!(node_modules)/*.stories.@(js|jsx|ts|tsx)"
       */
      "../node_modules/@repo/**!(node_modules)/**!(node_modules)/*.stories.@(js|jsx|ts|tsx)",
    ];
    break;
}

if (issueCase) {
  console.log("|");
  console.log("| --------- ISSUE CASE ENV ---------");
  console.log(`| -> "${issueCase}"`);
  console.log("|");
}

// -----------------------------------------------------------------------------
// Storybook Configuration (main.ts)
// -----------------------------------------------------------------------------
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: configStories,
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
