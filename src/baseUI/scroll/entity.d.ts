export interface ScrollProps {
  direction: 'vertical' | 'horizontal'; // 滚动的方向
  click: Function; // 点击事件
  refresh: boolean; // 是否刷新
  onScroll: Function; // 滑动触发的回调函数
  pullUp: Function; // 上拉加载逻辑
  pullDown: Function; // 下拉加载逻辑
  pullUpLoading: boolean; // 是否显示上拉 loading 动画
  pullDownLoading: boolean; // 是否显示下拉 loading 动画
  bounceTop: boolean; // 是否支持向上吸顶
  bounceBottom: boolean; // 是否支持向下吸底
}
