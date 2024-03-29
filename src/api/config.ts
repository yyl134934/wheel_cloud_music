import axios from 'axios';

export const baseUrl = `https://${process.env.REACT_APP_DOMAIN}/`;

//axios 的实例及拦截器配置
const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.response.use(
  (res) => res.data,
  (err) => {
    console.log(err, '网络错误');
  },
);

interface Category {
  name: string;
  key: string;
}
// 歌手种类
export const categoryTypes: Category[] = [
  {
    name: '华语男',
    key: '1001',
  },
  {
    name: '华语女',
    key: '1002',
  },
  {
    name: '华语组合',
    key: '1003',
  },
  {
    name: '欧美男',
    key: '2001',
  },
  {
    name: '欧美女',
    key: '2002',
  },
  {
    name: '欧美组合',
    key: '2003',
  },
  {
    name: '日本男',
    key: '6001',
  },
  {
    name: '日本女',
    key: '6002',
  },
  {
    name: '日本组合',
    key: '6003',
  },
  {
    name: '韩国男',
    key: '7001',
  },
  {
    name: '韩国女',
    key: '7002',
  },
  {
    name: '韩国组合',
    key: '7003',
  },
  {
    name: '其他男歌手',
    key: '4001',
  },
  {
    name: '其他女歌手',
    key: '4002',
  },
  {
    name: '其他组合',
    key: '4003',
  },
];

type TypeAndArea = {
  type: number;
  area: number;
};

export type CategoryId =
  | '1001'
  | '1002'
  | '1003'
  | '2001'
  | '2002'
  | '2003'
  | '6001'
  | '6002'
  | '6003'
  | '7001'
  | '7002'
  | '7003'
  | '4001'
  | '4002'
  | '4003';
//新接口category字段已废弃，改为type&area
export const categoryMap = new Map<CategoryId, TypeAndArea>([
  ['1001', { type: 1, area: 7 }],
  ['1002', { type: 2, area: 7 }],
  ['1003', { type: 3, area: 7 }],
  ['2001', { type: 1, area: 96 }],
  ['2002', { type: 2, area: 96 }],
  ['2003', { type: 3, area: 96 }],
  ['6001', { type: 1, area: 8 }],
  ['6002', { type: 2, area: 8 }],
  ['6003', { type: 3, area: 8 }],
  ['7001', { type: 1, area: 16 }],
  ['7002', { type: 2, area: 16 }],
  ['7003', { type: 3, area: 16 }],
  ['4001', { type: 1, area: 0 }],
  ['4002', { type: 2, area: 0 }],
  ['4003', { type: 3, area: 0 }],
]);

interface Alpha {
  key: string;
  name: string;
}

// 歌手首字母
export const alphaTypes: Alpha[] = [
  {
    key: 'A',
    name: 'A',
  },
  {
    key: 'B',
    name: 'B',
  },
  {
    key: 'C',
    name: 'C',
  },
  {
    key: 'D',
    name: 'D',
  },
  {
    key: 'E',
    name: 'E',
  },
  {
    key: 'F',
    name: 'F',
  },
  {
    key: 'G',
    name: 'G',
  },
  {
    key: 'H',
    name: 'H',
  },
  {
    key: 'I',
    name: 'I',
  },
  {
    key: 'J',
    name: 'J',
  },
  {
    key: 'K',
    name: 'K',
  },
  {
    key: 'L',
    name: 'L',
  },
  {
    key: 'M',
    name: 'M',
  },
  {
    key: 'N',
    name: 'N',
  },
  {
    key: 'O',
    name: 'O',
  },
  {
    key: 'P',
    name: 'P',
  },
  {
    key: 'Q',
    name: 'Q',
  },
  {
    key: 'R',
    name: 'R',
  },
  {
    key: 'S',
    name: 'S',
  },
  {
    key: 'T',
    name: 'T',
  },
  {
    key: 'U',
    name: 'U',
  },
  {
    key: 'V',
    name: 'V',
  },
  {
    key: 'W',
    name: 'W',
  },
  {
    key: 'X',
    name: 'X',
  },
  {
    key: 'Y',
    name: 'Y',
  },
  {
    key: 'Z',
    name: 'Z',
  },
];

export const HEADER_HEIGHT = 45;

// 播放模式
export const playMode = {
  sequence: 0,
  loop: 1,
  random: 2,
};

export type PlayModeType = typeof playMode;
export type PlayModeKeys = keyof typeof playMode;

export { axiosInstance };
