import React from 'react';
import { Marquee } from '../baseUI/marquee';

export default {
  title: 'baseUI/Marquee',
  component: Marquee,
};

const Template = (args) => <Marquee {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
};
