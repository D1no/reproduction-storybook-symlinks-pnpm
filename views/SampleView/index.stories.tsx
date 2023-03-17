// @ts-ignore
import type { Meta, StoryObj } from "@storybook/react";

import { default as ViewComponent } from "./index";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: "views/SampleView (via workspace)",
  component: ViewComponent,
  tags: ["autodocs"],
} satisfies Meta<typeof ViewComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Component: Story = {
  args: {
    text: 'I am a View inside of views/SampleView included via a symlink into tools/node_modules/ as a workspace package via "@repo/views": "workspace:*". This text was rendered through the functionality of the Component inside of ui/Component and referenced.',
  },
};
