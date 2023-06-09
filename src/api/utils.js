/**
 * 处理数量单位——万、亿
 * @param {*} count
 * @returns
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
 * @param {*} rankList
 * @returns
 */
export const filterIndex = (rankList) => {
  for (let i = 0; i < rankList.length - 1; i++) {
    if (rankList[i].tracks.length && !rankList[i + 1].tracks.length) {
      return i + 1;
    }
  }
};

// 处理歌手列表拼接歌手名字
export const getName = (list = []) => {
  return list.reduce((prev, { name }, index) => {
    return (prev += index === 0 ? name : '/' + name);
  }, '');
};

// 给 css3 相关属性增加浏览器前缀，处理浏览器兼容性问题
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

export function prefixStyle(style) {
  if (vendor === false) {
    return false;
  }
  if (vendor === 'standard') {
    return style;
  }
  return vendor + style.charAt(0).toUpperCase() + style.slice(1);
}

//转换歌曲播放时间
export const formatPlayTime = (interval) => {
  interval = interval | 0; // |0表示向下取整
  const minute = (interval / 60) | 0;
  const second = (interval % 60).toString().padStart(2, '0');
  return `${minute}:${second}`;
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// 随机算法
export function shuffle(arr) {
  const new_arr = [];

  arr.forEach((item) => {
    new_arr.push(item);
  });

  for (let i = 0; i < new_arr.length; i++) {
    const j = getRandomInt(0, i);
    const t = new_arr[i];
    new_arr[i] = new_arr[j];
    new_arr[j] = t;
  }

  return new_arr;
}

// 找到当前的歌曲索引
export const findIndex = (song, list) => {
  return list.findIndex((item) => {
    return song.id === item.id;
  });
};

export const isEmptyObject = (params) => {
  return typeof params === 'object' && !Object.keys(params).length;
};
