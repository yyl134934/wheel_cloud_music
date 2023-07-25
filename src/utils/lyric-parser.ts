import { Lyric, DisplayLyric } from '../entity/common';

// 解析 [00:01.997] 这一类时间戳的正则表达式
const timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g;

const PlayState = {
  STATE_PAUSE: 0,
  STATE_PLAYING: 1,
};
type PlayStateType = (typeof PlayState)[keyof typeof PlayState];
export default class LyricParser {
  lrc: string;
  lyricList: Lyric[] = []; // 这是解析后的数组，每一项包含对应的歌词和时间
  handler: (lyric: DisplayLyric) => void; // 回调函数
  state: PlayStateType; // 播放状态
  curLineIndex = 0; // 当前播放歌词所在的行
  startStamp = 0; // 歌曲开始的时间戳
  timer: any; // 定时器

  constructor(lrc: string, hanlder = (lyric: DisplayLyric) => {}) {
    this.lrc = lrc;
    this.handler = hanlder; // 回调函数
    this.state = PlayState.STATE_PAUSE; // 播放状态
    this._initLines();
    this.play();
    this.seek(0);
  }

  private _getTimeStamp(lineInfo: string = '') {
    let timer = timeExp.exec(lineInfo);
    if (!timer) {
      return;
    }
    timer?.shift(); //弹出 '[00:01.997]'
    let [mm, ss, t] = timer as any[]; // mm:00 ss:01 t:997;

    const timestamp = mm * 60 * 1000 + ss * 1000 + ((t || 0) / 10) * 10;

    return timestamp;
  }
  private _getLyricText(lineInfo: string = '') {
    const txt = lineInfo.replace(timeExp, '').trim(); // 现在把时间戳去掉，只剩下歌词文本
    return txt;
  }

  private _formatLyricLines() {
    const lines = this.lrc.split('\n');

    return lines.reduce((summary, curLineInfo) => {
      const timestamp = this._getTimeStamp(curLineInfo);
      const LyricText = this._getLyricText(curLineInfo);
      if (!LyricText || !timestamp) {
        return summary;
      }

      return summary.concat({
        time: timestamp,
        txt: LyricText,
      });
    }, [] as Lyric[]);
  }

  private _initLines() {
    // 解析代码
    this.lyricList = this._formatLyricLines();

    // 根据时间排序
    this.lyricList.sort((a, b) => {
      return a.time - b.time;
    });
  }

  private _findcurLineIndex(time: number) {
    const index = this.lyricList.findIndex((item) => item?.time > time);

    return index > 0 ? index : 1;
  }

  private _callHandler(index: number) {
    if (index < 0) {
      return;
    }
    const curLine = this.lyricList[index];
    this.handler({
      txt: curLine.txt,
      lineNum: index,
    });
  }

  //isSeek 标志位表示用户是否手动调整进度
  private _playRest(isSeek = false) {
    let line = this.lyricList[this.curLineIndex];
    let delay;

    if (isSeek) {
      delay = line.time - (+new Date() - this.startStamp);
    } else {
      // 拿到上一行的歌词开始时间，算间隔
      let preTime = this.lyricList[this.curLineIndex - 1] ? this.lyricList[this.curLineIndex - 1].time : 0;
      delay = line.time - preTime;
    }
    this.timer = setTimeout(() => {
      this._callHandler(this.curLineIndex++);
      if (this.curLineIndex < this.lyricList.length && this.state === PlayState.STATE_PLAYING) {
        this._playRest();
      }
    }, delay);
  }

  //offset 为时间进度，isSeek 标志位表示用户是否手动调整进度
  play(offset = 0, isSeek = false) {
    if (!this.lyricList.length) {
      return;
    }
    this.state = PlayState.STATE_PLAYING;
    // 找到当前所在的行
    this.curLineIndex = this._findcurLineIndex(offset);
    // 现在正处于第 this.curLineIndex-1 行
    // 立即定位，方式是调用传来的回调函数，并把当前歌词信息传给它
    this._callHandler(this.curLineIndex - 1);
    // 根据时间进度判断歌曲开始的时间戳
    this.startStamp = +new Date() - offset;

    if (this.curLineIndex < this.lyricList.length) {
      clearTimeout(this.timer);
      // 继续播放
      this._playRest(isSeek);
    }
  }

  togglePlay(offset: number) {
    if (this.state === PlayState.STATE_PLAYING) {
      this.stop();
    } else {
      this.state = PlayState.STATE_PLAYING;
      this.play(offset, true);
    }
  }

  stop() {
    this.state = PlayState.STATE_PAUSE;
    clearTimeout(this.timer);
  }

  seek(offset: number) {
    this.play(offset, true);
  }
}
