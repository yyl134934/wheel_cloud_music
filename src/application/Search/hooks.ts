import { useQuery } from '@tanstack/react-query';
import { getSongDetailRequest, getSuggestListRequest } from './api';

function useSuggest(keywords: string) {
  const { data: { result } = { result: { albums: [], songs: [], artists: [] } }, isLoading } = useQuery({
    queryKey: ['suggest', { keywords: keywords }],
    queryFn: () => getSuggestListRequest(keywords),
    refetchOnWindowFocus: false,
    enabled: !!keywords,
  });

  return { isLoading, albums: result?.albums, songs: result?.songs, artists: result?.artists };
}

function useSongDetails(id: string = '', insertSongInPlayList: (song: any) => void) {
  const { data: { songs } = { songs: [] }, isLoading } = useQuery({
    queryKey: ['songsDetail', { id }],
    queryFn: () => getSongDetailRequest(id),
    refetchOnWindowFocus: false,
    enabled: !!id,
    onSuccess(data) {
      if (!data?.songs?.length) {
        return;
      }
      insertSongInPlayList(data?.songs?.[0]);
    },
  });

  return { isLoading, song: songs?.[0] };
}

export { useSuggest, useSongDetails };
