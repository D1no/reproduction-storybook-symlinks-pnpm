// @ts-ignore
import type { Meta, StoryObj } from "@storybook/react";

import { default as ViewComponent } from "./index";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: "views/SampleView (via workspace as HMR)",
  component: ViewComponent,
  tags: ["autodocs"],
} satisfies Meta<typeof ViewComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Component: Story = {
  args: {
    text: "While storybook is running, rename me from '.stories-hmr.tsx' to '.stories.tsx'. I should appear now, but I don't.",
  },
};
