import { axiosInstance } from 'src/api/config';
import { HotsResponse, SongDetailsResponse, SuggestResponse } from './entity';

export const getHotKeyWordsRequest = (): Promise<HotsResponse> => {
  return axiosInstance.get('/search/hot');
};

export const getSuggestListRequest = (query: string): Promise<SuggestResponse> => {
  return axiosInstance.get(`/search/suggest?keywords=${query}`);
};

export const getResultSongsListRequest = (query: string) => {
  return axiosInstance.get(`/search?keywords=${query}`);
};

export const getSongDetailRequest = (id: string): Promise<SongDetailsResponse> => {
  return axiosInstance.get(`/song/detail?ids=${id}`);
};
