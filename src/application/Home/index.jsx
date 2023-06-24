import React from 'react';
import { Top, Tab, TabItem } from './style';
import { NavLink, Outlet } from 'react-router-dom';
// import Player from '../Player';
import { useCallback } from 'react';

function Home(props) {
  const hasActivate = useCallback(({ isActive }) => (isActive ? 'selected' : ''), []);

  return (
    <div>
      <Top>
        <span className='iconfont menu'>&#xe65c;</span>
        <span className='title'>NETEASE</span>
        <span className='iconfont search'>&#xe62b;</span>
      </Top>
      <Tab>
        <NavLink to={'recommend'} className={hasActivate}>
          <TabItem>
            <span>推荐</span>
          </TabItem>
        </NavLink>
        <NavLink to={'singers'} className={hasActivate}>
          <TabItem>
            <span>歌手</span>
          </TabItem>
        </NavLink>
        <NavLink to={'rank'} className={hasActivate}>
          <TabItem>
            <span>排行榜</span>
          </TabItem>
        </NavLink>
      </Tab>
      {/* 渲染子路由 */}
      <Outlet />
      {/* <Player></Player> */}
    </div>
  );
}

export default React.memo(Home);
