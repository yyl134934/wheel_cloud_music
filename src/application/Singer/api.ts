import { axiosInstance } from '../../api/config';
import { SingerResponed } from './entity';

/**
 * 获取歌手信息
 * @param {string} id 歌手id
 * @returns
 */
export const getSingerInfoRequest = (id = ''): Promise<SingerResponed> => {
  return axiosInstance.get(`/artists?id=${id}`);
};
