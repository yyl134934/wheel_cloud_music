import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import style from '../../assets/global-style';
import { prefixStyle } from './../../api/utils';

const ProgressBarWrapper = styled.div`
  height: 30px;
  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);
    .progress {
      position: absolute;
      height: 100%;
      background: ${style['theme-color']};
    }
    .progress-btn-wrapper {
      position: absolute;
      left: -15px;
      top: -13px;
      width: 30px;
      height: 30px;
      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid ${style['border-color']};
        border-radius: 50%;
        background: ${style['theme-color']};
      }
    }
  }
`;

interface ProgressBarProps {
  percent: number;
  percentChange: Function;
}

interface Touch {
  initiated: boolean; //initial 为 true 表示滑动动作开始了
  startX?: number; // 滑动开始时横向坐标
  left?: number; // 当前 progress 长度
}

const initailTouch: Touch = {
  initiated: false,
  startX: 0,
  left: 0,
};

function ProgressBar(props: ProgressBarProps) {
  const { percent = 0 } = props;
  const { percentChange } = props;

  const progressBar = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const progressBtn = useRef<HTMLDivElement>(null);
  const [touch, setTouch] = useState<Touch>(initailTouch);

  const transform = prefixStyle('transform') as string as any;

  const progressBtnWidth = 4;

  // 处理进度条的偏移
  const _offset = (offsetWidth: number) => {
    if (progress.current) {
      progress.current.style.width = `${offsetWidth}px`;
    }
    if (progressBtn.current) {
      progressBtn.current.style.transform = `translate3d(${offsetWidth}px, 0, 0)`;
    }
  };

  const _changePercent = () => {
    if (progressBar.current && progress.current) {
      const barWidth = progressBar.current.clientWidth - progressBtnWidth;
      const curPercent = progress.current.clientWidth / barWidth; // 新的进度计算
      percentChange(curPercent); // 把新的进度传给回调函数并执行
    }
  };

  const progressTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const startTouch: Touch = {
      initiated: true,
      startX: e.touches[0].pageX,
      left: progress.current?.clientWidth || 0,
    };
    setTouch(startTouch);
  };

  const progressTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!touch.initiated) return;
    // 滑动距离
    const deltaX = e.touches[0].pageX - (touch.startX || 0);
    const barWidth = (progressBar.current?.clientWidth || 0) - progressBtnWidth;
    const offsetWidth = Math.min(Math.max(4, (touch.left || 0) + deltaX), barWidth);
    _offset(offsetWidth);
  };

  const progressTouchEnd = (e: any) => {
    setTouch({ initiated: false });
    _changePercent();
  };

  const progressClick = (e: any) => {
    const rect = progressBar.current?.getBoundingClientRect();
    const offsetWidth = e.pageX - (rect?.left || 0);
    _offset(offsetWidth);
    _changePercent();
  };

  //监听percent
  useEffect(() => {
    if (percent >= 0 && percent <= 1 && !touch.initiated) {
      const barWidth = (progressBar.current?.clientWidth || 0) - progressBtnWidth;
      const offsetWidth = percent * barWidth;
      if (progress.current) {
        progress.current.style.width = `${offsetWidth}px`;
      }
      if (progressBtn.current) {
        progressBtn.current.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`;
      }
    }
  }, [percent]);

  return (
    <ProgressBarWrapper>
      <div className='bar-inner' ref={progressBar} onClick={progressClick}>
        <div className='progress' ref={progress}></div>
        <div
          className='progress-btn-wrapper'
          ref={progressBtn}
          onTouchStart={progressTouchStart}
          onTouchMove={progressTouchMove}
          onTouchEnd={progressTouchEnd}
        >
          <div className='progress-btn'></div>
        </div>
      </div>
    </ProgressBarWrapper>
  );
}

export default ProgressBar;
