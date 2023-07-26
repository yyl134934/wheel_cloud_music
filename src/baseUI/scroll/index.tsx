import React, { forwardRef, useState, useRef, useEffect, useImperativeHandle } from 'react';
import BScroll, { BScrollInstance, Options } from 'better-scroll';
import { ScrollContainer, PullDownLoading, PullUpLoading } from './style';
import { EnterLoading, PullLoading } from '../loading';

const Scroll = forwardRef((props: Options, ref) => {
  //better-scroll 实例对象
  const [bScroll, setBScroll] = useState<BScroll>();
  //current 指向初始化 bs 实例需要的 DOM 元素
  const scrollContaninerRef = useRef<HTMLDivElement | null>(null);

  const {
    direction = 'vertical',
    click = true,
    refresh = true,
    pullUpLoading = false,
    pullDownLoading = false,
    bounceTop = true,
    bounceBottom = true,
  } = props;

  const { pullUp, pullDown, onScroll } = props;

  // 一般和 forwardRef 一起使用，ref 已经在 forWardRef 中默认传入
  useImperativeHandle(ref, () => ({
    // 给外界暴露 refresh 方法
    refresh() {
      if (bScroll) {
        bScroll.refresh();
        bScroll.scrollTo(0, 0);
      }
    },
    // 给外界暴露 getBScroll 方法，提供 bs 实例
    getBScroll() {
      if (bScroll) {
        return bScroll;
      }
    },
  }));

  //   初始化BScroll组件
  useEffect(() => {
    const scroll = new BScroll(scrollContaninerRef.current as HTMLDivElement, {
      scrollX: direction === 'horizontal',
      scrollY: direction === 'vertical',
      probeType: 3,
      click: click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom,
      },
    });
    setBScroll(scroll);

    return () => {
      setBScroll(undefined);
      scroll && scroll.destroy();
    };
  }, []);

  // 每次重新渲染都要刷新实例，防止无法滑动:
  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh();
    }
  });

  //   给实例绑定 scroll 事件
  useEffect(() => {
    if (!bScroll || !onScroll) return;
    bScroll.on('scroll', (scroll: BScroll) => {
      onScroll(scroll);
    });

    return () => {
      bScroll.off('scroll');
    };
  }, [onScroll, bScroll]);

  //   进行上拉到底的判断，调用上拉刷新的函数
  useEffect(() => {
    if (!bScroll || !pullUp) return;

    bScroll.on('scrollEnd', () => {
      // 判断是否滑动到了底部
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUp();
      }
    });

    return () => {
      bScroll.off('scrollEnd');
    };
  }, [pullUp, bScroll]);

  //   进行下拉的判断，调用下拉刷新的函数
  useEffect(() => {
    if (!bScroll || !pullDown) return;
    bScroll.on('touchEnd', (pos: BScrollInstance) => {
      // 判断用户的下拉动作
      if (pos.y > 50) {
        pullDown();
      }
    });
    return () => {
      bScroll.off('touchEnd');
    };
  }, [pullDown, bScroll]);

  const PullUpdisplayStyle = pullUpLoading ? { display: '' } : { display: 'none' };
  const PullDowndisplayStyle = pullDownLoading ? { display: '' } : { display: 'none' };

  return (
    <ScrollContainer ref={scrollContaninerRef}>
      {props.children}
      {/* 顶部下拉刷新动画 */}
      <PullDownLoading style={PullDowndisplayStyle}>
        <EnterLoading show={pullDownLoading}></EnterLoading>
      </PullDownLoading>
      {/* 滑到底部加载动画 */}
      <PullUpLoading style={PullUpdisplayStyle}>
        <PullLoading show={pullUpLoading}></PullLoading>
      </PullUpLoading>
    </ScrollContainer>
  );
});

export default Scroll;
