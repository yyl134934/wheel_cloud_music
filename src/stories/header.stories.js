import React from 'react';
import Header from '../baseUI/header/index';

export default {
  title: 'BaseUI/Header',
  component: Header,
  argTypes: {
    handleClick: { action: 'clicked' },
  },
  tags: ['autodocs'],
};

const Template = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const WithTitle = Template.bind({});
WithTitle.args = {
  title: 'This is a title',
};

export const WithClick = Template.bind({});
WithClick.args = {
  handleClick: () => alert('click back'),
};

export const WithMarquee = Template.bind({});
WithMarquee.args = {
  title: 'This is a long long long long long long long long long long long long long long title',
  isMarquee: true,
};
