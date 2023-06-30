import { axiosInstance } from '../../api/config';
import { AlbumResponed } from './entity';

/**
 * 获取歌单详情
 * @param {string} id 歌单、专辑、排行榜id
 * @returns
 */
export const getAlbumDetailRequest = (id = ''): Promise<AlbumResponed> => {
  return axiosInstance.get(`/playlist/detail?id=${id}`);
};
