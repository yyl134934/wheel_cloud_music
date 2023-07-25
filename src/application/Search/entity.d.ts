export interface HotKey {
  first: string;
  second: number;
  third: any;
  iconType: number;
}

export interface HotsResponse {
  code: number;
  result: {
    hots: HotKey[];
  };
}

interface ArtistAbbr {
  id: number;
  name: string;
  picUrl: string;
  alias: string[];
  albumSize: number;
  picId: number;
  fansGroup: null | string;
  img1v1Url: string;
  img1v1: number;
  alia: string[];
  trans: null;
}

export interface AlbumAbbr {
  id: number;
  name: string;
  artist: ArtistAbbr;
  publishTime: number;
  size: number;
  copyrightId: number;
  status: number;
  picId: number;
  mark: number;
}

interface SongAbbr {
  id: number;
  name: string;
  artists: ArtistAbbr[];
  album: AlbumAbbr;
  duration: number;
  copyrightId: number;
  status: number;
  alias: string[];
  rtype: number;
  ftype: number;
  mvid: number;
  fee: number;
  rUrl: null | string;
  mark: number;
}

type Order = 'songs' | 'artists' | 'albums';

export interface SuggestResponse {
  code: number;
  result: {
    order: Order[];
    artists: ArtistAbbr[];
    albums: AlbumAbbr[];
    songs: SongAbbr[];
  };
}

export interface SongDetailsResponse {
  code: number;
  songs: SongAbbr[];
  privileges: any[];
}
