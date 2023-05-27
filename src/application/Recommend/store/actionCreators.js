import { fromJS } from 'immutable';
import { getBannerRequest, getRecommendListRequest } from '../../../api/requst';
import * as actionTypes from './constants';

export const changeBanner = (data) => ({
  type: actionTypes.CHANGE_BANNER,
  data: fromJS(data),
});

export const changeRecommendList = (data) => ({
  type: actionTypes.CHANGE_RECOMMEDLIST,
  data: fromJS(data),
});

export const getBannerList = () => {
  console.info('【action】请求轮播图数据！');
  return (dispatch) => {
    getBannerRequest()
      .then((data) => {
        dispatch(changeBanner(data.banners));
      })
      .catch((err) => {
        console.error('轮播图数据传输错误：', err);
      });
  };
};

export const getRecommendList = () => {
  console.info('【action】请求推荐列表数据！');
  return (dispatch) => {
    getRecommendListRequest()
      .then((data) => {
        dispatch(changeRecommendList(data.result));
      })
      .catch((err) => {
        console.error('推荐列表数据传输错误：', err);
      });
  };
};
