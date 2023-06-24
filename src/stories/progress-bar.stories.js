import React from 'react';
import ProgressBar from '../baseUI/progress-bar/index';

export default {
  title: 'BaseUI/ProgressBar',
  component: ProgressBar,
  argTypes: {
    percent: {
      control: {
        type: 'range',
        min: 0,
        max: 1,
        step: 0.01,
      },
    },
    percentChange: { action: 'percentChange' },
  },
  tags: ['autodocs'],
};

const Template = (args) => <ProgressBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  percent: 0.3,
};

export const WithTouch = Template.bind({});
WithTouch.args = {
  percent: 0.3,
};
WithTouch.decorators = [
  (storyFn) => (
    <div style={{ height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{storyFn()}</div>
  ),
];
WithTouch.parameters = { controls: { hideNoControlsWarning: true } };
WithTouch.story = {
  decorators: [
    (Story) => {
      const percentChange = (newPercent) => {
        console.log(newPercent);
      };
      return <Story percent={0.3} percentChange={percentChange} />;
    },
  ],
};
