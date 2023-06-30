export interface AlbumResponed {
  code: string;
  sharedPrivilege: null;
  resEntrance: null;
  fromUsers: null;
  fromUserCount: number;
  songFromUsers: null;
  trialMode: number;
  playlist: PlayListPartial;
  privileges: any[];
}

type PlayListPartial = Partial<PlayList>;

interface PlayList {
  id: number;
  name: string;
  coverImgId: number;
  coverImgUrl: string;
  coverImgId_str: string;
  adType: number;
  userId: number;
  createTime: number;
  status: number;
  opRecommend: boolean;
  highQuality: boolean;
  newImported: boolean;
  updateTime: number;
  trackCount: number;
  specialType: number;
  privacy: number;
  trackUpdateTime: number;
  commentThreadId: string;
  playCount: number;
  trackNumberUpdateTime: number;
  subscribedCount: number;
  cloudTrackCount: number;
  ordered: boolean;
  description: string;
  tags: string[];
  updateFrequency: string | null;
  backgroundCoverId: number;
  backgroundCoverUrl: string | null;
  titleImage: number;
  titleImageUrl: string | null;
  englishTitle: string | null;
  officialPlaylistType: string | null;
  copied: boolean;
  relateResType: string | null;
  subscribers: any[];
  subscribed: boolean;
  creator: any;
  tracks: any[];
  videoIds: any[] | null;
  videos: any[] | null;
  trackIds: any[];
  bannedTrackIds: any[] | null;
  mvResourceInfos: any[] | null;
  shareCount: number;
  commentCount: number;
  remixVideo: any[] | null;
  sharedUsers: any[] | null;
  historySharedUsers: any[] | null;
  gradeStatus: string;
  score: number | null;
  algTags: any[] | null;
}

interface Album {
  imageUrl: string;
  targetId: number;
  adid: null;
  targetType: number;
  titleColor: string;
  typeTitle: string;
  url: null;
  exclusive: boolean;
  monitorImpress: null;
  monitorClick: null;
  monitorType: null;
  monitorImpressList: null;
  monitorClickList: null;
  monitorBlackList: null;
  extMonitor: null;
  extMonitorInfo: null;
  adSource: null;
  adLocation: null;
  adDispatchJson: null;
  encodeId: string;
  program: null;
  event: null;
  video: null;
  song: null;
  scm: string;
  bannerBizType: string;
}
