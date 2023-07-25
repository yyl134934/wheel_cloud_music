import LyricParser from '../utils/lyric-parser';

it('歌词解析测试', () => {
  const lyricStr = '[01:01.100]这是名字\n[01:02.10]这是名字\n[01:03.300]这是名字';
  const lyricParser = new LyricParser(lyricStr);

  expect(lyricParser.lyricList.length).toBe(3);
  expect(lyricParser.lyricList).toStrictEqual([
    {
      time: 60 * 1000 + 1000 + 100,
      txt: '这是名字',
    },
    {
      time: 60 * 1000 + 2 * 1000 + 10,
      txt: '这是名字',
    },
    {
      time: 60 * 1000 + 3 * 1000 + 300,
      txt: '这是名字',
    },
  ]);
});
