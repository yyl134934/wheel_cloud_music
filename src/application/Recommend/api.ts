import { axiosInstance } from '../../api/config';
import { BannerResponed, RecommendResponed } from './entity';
/**
 * 获取轮播图
 * @returns banner
 */
export const getBannerRequest = (): Promise<BannerResponed> => {
  return axiosInstance.get('/banner');
};

/**
 * 获取推荐歌单
 * @returns data
 */
export const getRecommendListRequest = (): Promise<RecommendResponed> => {
  return axiosInstance.get('/personalized');
};
