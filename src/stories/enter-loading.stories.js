import EnterLoading from '../baseUI/loading/enter-loading';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: 'BaseUI/EnterLoading',
  component: EnterLoading,
  tags: ['autodocs'],
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Show = {
  args: {
    show: true,
  },
};

export const Default = () => <EnterLoading />;
