import React from 'react';
import Horizon from '../baseUI/horizon-item/index';

const list = [
  {
    key: '-1',
    name: 'All',
  },
  {
    key: '0',
    name: 'Hiphop',
  },
  {
    key: '1',
    name: 'Electronic',
  },
  {
    key: '2',
    name: 'Pop',
  },
  {
    key: '3',
    name: 'Rock',
  },
  {
    key: '4',
    name: 'Metal',
  },
  {
    key: '5',
    name: 'Folk',
  },
  {
    key: '6',
    name: 'Classical',
  },
];

export default {
  title: 'BaseUI/Horizon',
  component: Horizon,
  argTypes: {
    handleClick: { action: 'clicked' },
  },
  tags: ['autodocs'],
};

const Template = (args) => <Horizon {...args} />;

export const Default = Template.bind({});
Default.args = {
  list,
};

export const Selected = Template.bind({});
Selected.args = {
  list,
  oldVal: '0',
};

export const WithTitle = Template.bind({});
WithTitle.args = {
  list,
  title: 'Music Categories',
};

export const WithClick = Template.bind({});
WithClick.args = {
  list,
  title: 'Music Categories',
  oldVal: '0',
};
