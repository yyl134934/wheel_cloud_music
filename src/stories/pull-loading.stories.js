import PullLoading from '../baseUI/loading/pull-loading';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: 'BaseUI/PullLoading',
  component: PullLoading,
  tags: ['autodocs'],
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Show = {
  args: {
    show: true,
  },
};

export const Default = () => <PullLoading />;
