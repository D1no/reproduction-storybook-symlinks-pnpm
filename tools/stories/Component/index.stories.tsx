import type { Meta, StoryObj } from "@storybook/react";

import { default as LocalComponent } from "./index";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: "stories/Component (local)",
  component: LocalComponent,
  tags: ["autodocs"],
} satisfies Meta<typeof LocalComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Component: Story = {
  args: {
    text: "I am a local component inside of tools/stories/Component. And I have docs from the JSDoc comments.",
  },
};
