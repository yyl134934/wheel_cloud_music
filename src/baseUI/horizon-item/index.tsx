import React, { useRef, useEffect } from 'react';
import Scroll from '../scroll/index';
import { List, ListItem } from './style';

// 首先考虑接受的参数
//list 为接受的列表数据
//oldVal 为当前的 item 值
//title 为列表左边的标题
//handleClick 为点击不同的 item 执行的方法

interface HorizonProps {
  list: any[];
  oldVal: string;
  title: string;
  handleClick: (val: string) => void;
}

const initailHorizon: HorizonProps = { list: [], oldVal: '', title: '', handleClick: () => {} };

function Horizon(props: HorizonProps = initailHorizon) {
  const { list, oldVal, title } = props;
  const { handleClick } = props;

  // 加入声明
  const categoryRef = useRef<any>();

  //   加入初始化内容宽度的逻辑;
  useEffect(() => {
    let categoryDOM = categoryRef.current;
    let tagElems = categoryDOM?.querySelectorAll('span') || [];
    let totalWidth = 0;
    Array.from(tagElems).forEach((ele: any) => {
      totalWidth += ele.offsetWidth;
    });
    if (categoryDOM) {
      categoryDOM.style.width = `${totalWidth}px`;
    }
  }, []);

  return (
    <Scroll direction={'horizontal'}>
      <div ref={categoryRef}>
        <List>
          <span>{title}</span>
          {list.map((item) => {
            return (
              <ListItem
                key={item.key}
                className={`${oldVal === item.key ? 'selected' : ''}`}
                onClick={() => handleClick(item.key)}
              >
                {item.name}
              </ListItem>
            );
          })}
        </List>
      </div>
    </Scroll>
  );
}

export default React.memo(Horizon);
