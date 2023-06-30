import { CategoryId, axiosInstance, categoryMap } from '../../api/config';
import { SingersResponed } from './entity';

/**
 * 热门歌手
 * @param {number} offset 偏移数量 , 用于分页 , 默认 为 0
 * @returns
 */
export const getHotSingerListRequest = (offset = 0): Promise<SingersResponed> => {
  return axiosInstance.get(`/top/artists?offset=${offset}`);
};

/**
 * 适应接口变更——category拆分为type&area
 * @param {string} category 分类
 * @returns {string} paramsStr
 */
function getSingerParams(category: CategoryId) {
  if (category) {
    const { type, area } = categoryMap.get(category) || {};

    return `type=${type}&area=${area}`;
  }
  return '';
}

/**
 * 歌手分类列表
 * @param {string} category 分类
 * @param {string} alpha 按首字母索引查找参数
 * @param {number} offset 偏移数量 , 用于分页 , 默认 为 0
 * @returns category和alpha都为空：热门歌手；category和alpha其中一个有值：歌手分类
 */
export const getSingerListRequest = (category?: CategoryId, alpha = '', offset = 0): Promise<SingersResponed> => {
  if (!category && !alpha) {
    return getHotSingerListRequest(offset);
  }
  const paramsStr = getSingerParams(category as CategoryId);
  return axiosInstance.get(`/artist/list?${paramsStr}&initial=${alpha.toLowerCase()}&offset=${offset}`);
};
