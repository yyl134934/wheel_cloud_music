import React from 'react';
import ProgressCircle from '../baseUI/progress-circle/index';

export default {
  title: 'BaseUI/ProgressCircle',
  component: ProgressCircle,
  tags: ['autodocs'],
};

export const ZeroPercent = () => <ProgressCircle radius={40} percent={0} />;
export const FiftyPercent = () => <ProgressCircle radius={40} percent={0.5} />;
export const HundredPercent = () => <ProgressCircle radius={40} percent={1} />;
