import React, { Suspense } from 'react';
import { Top, Tab, TabItem } from './style';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Player from '../Player';
import { useCallback } from 'react';

function Home() {
  const navigate = useNavigate();

  const hasActivate = useCallback(({ isActive }: { isActive: boolean }) => (isActive ? 'selected' : ''), []);

  const handleSearch = () => {
    navigate('/search');
  };

  return (
    <div>
      <Top>
        <span className='iconfont menu'>&#xe65c;</span>
        <span className='title'>NETEASE</span>
        <span className='iconfont search' onClick={handleSearch}>
          &#xe62b;
        </span>
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
      <Suspense>
        <Outlet />
      </Suspense>
      <Player></Player>
    </div>
  );
}

export default React.memo(Home);
