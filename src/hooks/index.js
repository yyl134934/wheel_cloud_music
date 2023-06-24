import { useSelector } from 'react-redux';
import { isEmptyObject } from '../api/utils';

const usePrefixStyle = () => {
  const getVendor = () => {
    // 给 css3 相关属性增加浏览器前缀，处理浏览器兼容性问题
    const elementStyle = document.createElement('div').style;

    // 首先通过 transition 属性判断是何种浏览器
    const transformNames = {
      webkit: 'webkitTransform',
      Moz: 'MozTransform',
      O: 'OTransfrom',
      ms: 'msTransform',
      standard: 'Transform',
    };

    for (const key in transformNames) {
      const name = transformNames[key];
      if (elementStyle[name] !== undefined) {
        return key;
      }
    }

    return '';
  };

  const vendor = getVendor();

  function prefixStyle(style = '') {
    if (vendor === '') {
      return false;
    }

    if (vendor === 'standard') {
      return style;
    }

    return vendor + style.charAt(0).toUpperCase() + style.slice(1);
  }

  return prefixStyle;
};

const usePlaying = () => {
  const { currentSong } = useSelector((state) => state.player);
  return { notPlaying: isEmptyObject(currentSong) };
};

export { usePrefixStyle, usePlaying };
