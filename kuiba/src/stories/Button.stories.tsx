import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import  {Button}  from '../components/Button/button';

export default {
  title: 'Example/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} >Hello World</Button>;

export const Primary = Template.bind({});

Primary.args = {
  disabled: false,
  btnType: 'primary',
};
