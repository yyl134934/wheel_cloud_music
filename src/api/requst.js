import { axiosInstance, categoryMap } from './config';

export const getBannerRequest = () => {
  return axiosInstance.get('/banner');
};

export const getRecommendListRequest = () => {
  return axiosInstance.get('/personalized');
};

export const getHotSingerListRequest = (count) => {
  return axiosInstance.get(`/top/artists?offset=${count}`);
};

function getSingerParams(category) {
  if (category) {
    const { type, area } = categoryMap.get(category);

    return `type=${type}&area=${area}`;
  }
  return '';
}

export const getSingerListRequest = (category, alpha, count) => {
  if (!category && !alpha) {
    return getHotSingerListRequest(count);
  }
  const paramsStr = getSingerParams(category);
  return axiosInstance.get(`/artist/list?${paramsStr}&initial=${alpha.toLowerCase()}&offset=${count}`);
};

export const getRankListRequest = () => {
  return axiosInstance.get(`/toplist/detail`);
};

export const getAlbumDetailRequest = (id) => {
  return axiosInstance.get(`/playlist/detail?id=${id}`);
};

export const getSingerInfoRequest = (id) => {
  return axiosInstance.get(`/artists?id=${id}`);
};

export const getSongUrl = (id) => {
  return `http://music.163.com/song/media/outer/url?id=${id}.mp3`;
};
