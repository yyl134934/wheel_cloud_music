export interface LyricResponse {
  sgc: boolean;
  sfy: boolean;
  qfy: boolean;
  lrc: {
    version: number;
    lyric: string;
  };
  klyric: {
    version: number;
    lyric: string;
  };
  tlyric: {
    version: number;
    lyric: string;
  };
  romalrc: {
    version: number;
    lyric: string;
  };
  code: number;
}
