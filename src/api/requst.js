import { axiosInstance, categoryMap } from './config';

/**
 * 获取轮播图
 * @returns banner
 */
export const getBannerRequest = () => {
  return axiosInstance.get('/banner');
};

/**
 * 获取推荐歌单
 * @returns data
 */
export const getRecommendListRequest = () => {
  return axiosInstance.get('/personalized');
};

/**
 * 热门歌手
 * @param {number} offset 偏移数量 , 用于分页 , 默认 为 0
 * @returns
 */
export const getHotSingerListRequest = (offset = 0) => {
  return axiosInstance.get(`/top/artists?offset=${offset}`);
};

/**
 * 适应接口变更——category拆分为type&area
 * @param {string} category 分类
 * @returns {string} paramsStr
 */
function getSingerParams(category = '') {
  if (category) {
    const { type, area } = categoryMap.get(category);

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
export const getSingerListRequest = (category = '', alpha = '', offset = 0) => {
  if (!category && !alpha) {
    return getHotSingerListRequest(offset);
  }
  const paramsStr = getSingerParams(category);
  return axiosInstance.get(`/artist/list?${paramsStr}&initial=${alpha.toLowerCase()}&offset=${offset}`);
};

/**
 * 获取排行榜
 * @returns
 */
export const getRankListRequest = () => {
  return axiosInstance.get(`/toplist/detail`);
};

/**
 * 获取歌单详情
 * @param {string} id 歌单、专辑、排行榜id
 * @returns
 */
export const getAlbumDetailRequest = (id = '') => {
  return axiosInstance.get(`/playlist/detail?id=${id}`);
};

/**
 * 获取歌手信息
 * @param {string} id 歌手id
 * @returns
 */
export const getSingerInfoRequest = (id = '') => {
  return axiosInstance.get(`/artists?id=${id}`);
};

/**
 * 获取歌曲URL
 * @param {string} id 歌曲id
 * @returns
 */
export const getSongUrl = (id = '') => {
  return `http://music.163.com/song/media/outer/url?id=${id}.mp3`;
};
