import React from 'react';
import Toast from '../baseUI/toast';

export default {
  title: 'BaseUI/Toast',
  component: Toast,
  argTypes: {
    text: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component: '这是一个简单的Toast组件，用于在页面上显示消息通知。',
      },
    },
  },
};

const Template = (args) => {
  const toastRef = React.useRef(null);

  const handleClick = () => {
    console.info('toastRef.current.show:', toastRef.current.show);
    toastRef.current.show();
  };

  return (
    <div>
      <p>背景选择黑色</p>
      <button onClick={handleClick}>触发Toast</button>
      <Toast ref={toastRef} {...args} />
    </div>
  );
};

export const BasicUsage = Template.bind({});

BasicUsage.args = {
  text: '这是一个Toast!',
};

BasicUsage.storyName = '基本用法';
