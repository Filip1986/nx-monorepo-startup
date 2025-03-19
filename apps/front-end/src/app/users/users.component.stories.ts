import type { Meta, StoryObj } from '@storybook/angular';
import { UsersComponent } from './users.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<UsersComponent> = {
  component: UsersComponent,
  title: 'UsersComponent',
};
export default meta;
type Story = StoryObj<UsersComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/users works!/gi)).toBeTruthy();
  },
};
