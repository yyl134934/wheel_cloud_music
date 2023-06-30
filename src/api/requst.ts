/**
 * 获取歌曲URL
 * @param {string} id 歌曲id
 * @returns
 */
export const getSongUrl = (id = '') => {
  return `http://music.163.com/song/media/outer/url?id=${id}.mp3`;
};
