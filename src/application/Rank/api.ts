import { axiosInstance } from '../../api/config';
import { RankResponed } from './entity';

/**
 * 获取排行榜
 * @returns
 */
export const getRankListRequest = (): Promise<RankResponed> => {
  return axiosInstance.get('/toplist/detail');
};
