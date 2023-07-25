import { axiosInstance } from '../../api/config';
import { LyricResponse } from './entity';

export const getLyricRequest = (id: string = ''): Promise<LyricResponse> => {
  return axiosInstance.get(`/lyric?id=${id}`);
};
