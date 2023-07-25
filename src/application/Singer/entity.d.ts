export interface SingerResponed {
  code: string;
  artist: { picUrl: string };
  hotSongs: HotSong;
}

export interface HotSong {
  al: {
    picUrl?: string;
  };
  name: string;
  ar: string[];
}
