export interface RankResponed {
  code: string;
  list: Rank[];
}

export interface Rank {
  subscribers: any[];
  subscribed: any;
  creator: any;
  artists: any;
  tracks: any[];
  updateFrequency: string;
  backgroundCoverId: number;
  backgroundCoverUrl: string | null;
  titleImage: number;
  coverText: string | null;
  titleImageUrl: string | null;
  coverImageUrl: string | null;
  iconImageUrl: string | null;
  englishTitle: string | null;
  opRecommend: boolean;
  recommendInfo: any;
  socialPlaylistCover: any;
  subscribedCount: number;
  cloudTrackCount: number;
  adType: number;
  trackNumberUpdateTime: number;
  userId: number;
  createTime: number;
  highQuality: boolean;
  specialType: number;
  coverImgId: number;
  coverImgUrl: string;
  newImported: boolean;
  anonimous: boolean;
  updateTime: number;
  trackCount: number;
  commentThreadId: string;
  totalDuration: number;
  trackUpdateTime: number;
  privacy: number;
  playCount: number;
  description: string;
  ordered: boolean;
  tags: any[];
  status: number;
  name: string;
  id: number;
  coverImgId_str: string;
  ToplistType: string;
}
