// @ts-ignore
import type { Meta, StoryObj } from "@storybook/react";

import { default as UiComponent } from "./index";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: "ui/Component (via symlink)",
  component: UiComponent,
  tags: ["autodocs"],
} satisfies Meta<typeof UiComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Component: Story = {
  args: {
    text: "I am a component inside of ui/ComponentAsSymlink included via a symlink into tools/stories. And I don't have docs from the JSDoc comments.",
  },
};
