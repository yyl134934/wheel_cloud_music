import React from 'react';
import Scroll from '../baseUI/scroll';

export default {
  title: 'BaseUI/Scroll',
  component: Scroll,
};

const Template = (args) => {
  const { children } = args;
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      const scrollInstance = scrollRef.current.getBScroll();
      // 模拟滚动
      setTimeout(() => {
        scrollInstance && scrollInstance.scrollTo(0, -100);
      }, 1000);
    }
  }, []);

  return (
    <div style={{ height: '300px' }}>
      <Scroll {...args} ref={scrollRef}>
        {children}
      </Scroll>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  direction: 'vertical',
  click: true,
  refresh: true,
  pullUpLoading: false,
  pullDownLoading: false,
  bounceTop: true,
  bounceBottom: true,
  pullUp: () => {
    console.log('pull up');
  },
  pullDown: () => {
    console.log('pull down');
  },
  onScroll: (scroll) => {
    console.log('scroll', scroll);
  },
  children: (
    <div>
      <div style={{ height: '800px', background: 'red' }}>Scroll Content 1</div>
      <div style={{ height: '800px', background: 'blue' }}>Scroll Content 2</div>
    </div>
  ),
};
