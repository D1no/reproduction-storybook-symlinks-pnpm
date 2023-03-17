// @ts-ignore
import type { Meta, StoryObj } from "@storybook/react";

import { default as UiComponent } from "./index";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  component: UiComponent,
  tags: ["autodocs"],
} satisfies Meta<typeof UiComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Component: Story = {
  args: {
    text: "While storybook is running, rename me from '.stories-hmr.tsx' to '.stories.tsx'. I should appear now, but I don't.",
  },
};
