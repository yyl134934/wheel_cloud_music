/**
 * 处理数量单位——万、亿
 * @param {number} count
 * @returns {string} count
 */
export const getCount = (count) => {
  if (count < 0) return;
  if (count < 10000) {
    return count;
  } else if (Math.floor(count / 10000) < 10000) {
    return Math.floor(count / 1000) / 10 + '万';
  } else {
    return Math.floor(count / 10000000) / 10 + '亿';
  }
};

/**
 * 处理数据，找出第一个没有歌名的排行榜的索引
 * @param {Object[]} rankList 排行榜列表
 * @returns {number} index
 */
export const filterIndex = (rankList = []) => {
  for (let i = 0; i < rankList.length - 1; i++) {
    if (rankList[i].tracks.length && !rankList[i + 1].tracks.length) {
      return i + 1;
    }
  }
};

/**
 * 处理歌手列表拼接歌手名字
 * @param {any[]} list
 * @returns {string} singerName
 */
export const getName = (list = []) => {
  return list.reduce((prev, { name }, index) => {
    return (prev += index === 0 ? name : '/' + name);
  }, '');
};

/**
 * 给 css3 相关属性增加浏览器前缀，处理浏览器兼容性问题
 */
let elementStyle = document.createElement('div').style;

let vendor = (() => {
  // 首先通过 transition 属性判断是何种浏览器
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransfrom',
    ms: 'msTransform',
    standard: 'Transform',
  };
  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key;
    }
  }
  return false;
})();

/**
 * 前缀
 * @param {string} style
 * @returns {string|boolean} style
 */
export function prefixStyle(style) {
  if (vendor === false) {
    return false;
  }
  if (vendor === 'standard') {
    return style;
  }
  return vendor + style.charAt(0).toUpperCase() + style.slice(1);
}

/**
 * 转换歌曲播放时间
 * @param {number} interval 秒
 * @returns {string} minute:second
 */
export const formatPlayTime = (interval) => {
  interval = interval | 0; // |0表示向下取整
  const minute = (interval / 60) | 0;
  const second = (interval % 60).toString().padStart(2, '0');
  return `${minute}:${second}`;
};

/**
 * 获取指定范围内的随机数
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @returns {number} random
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * 随机算法
 * @param {any[]} arr 等待被洗牌的数组
 * @returns {any[]} shuffledArr
 */
export function shuffle(arr) {
  const newArr = [];

  arr.forEach((item) => {
    newArr.push(item);
  });

  for (let i = 0; i < newArr.length; i++) {
    const j = getRandomInt(0, i);
    const t = newArr[i];
    newArr[i] = newArr[j];
    newArr[j] = t;
  }

  return newArr;
}

/**
 * @typedef Song 歌曲
 */

/**
 * 找到当前的歌曲索引
 * @param {Song} song
 * @param {Song[]} list
 * @returns {number} index
 */
export const findIndex = (song, list) => {
  return list.findIndex((item) => {
    return song.id === item.id;
  });
};

/**
 * 判断对象是否为空
 * @param {Object} obj 对象
 * @returns {boolean} isEmpty
 */
export const isEmptyObject = (obj) => {
  return typeof params === 'object' && !Object.keys(obj).length;
};
