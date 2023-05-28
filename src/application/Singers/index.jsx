import React, { useState } from 'react';
import Horizon from '../../baseUI/horizon-item';
import { categoryTypes, alphaTypes } from '../../api/config';
import { NavContainer } from './style';

function Singers(params) {
  let [category, setCategory] = useState('');
  let [alpha, setAlpha] = useState('');

  let handleUpdateAlpha = (val) => {
    setAlpha(val);
  };

  let handleUpdateCatetory = (val) => {
    setCategory(val);
  };

  return (
    <NavContainer>
      <Horizon
        list={categoryTypes}
        title={'分类 (默认热门):'}
        handleClick={handleUpdateCatetory}
        oldVal={category}
      ></Horizon>
      <Horizon list={alphaTypes} title={'首字母:'} handleClick={handleUpdateAlpha} oldVal={alpha}></Horizon>
    </NavContainer>
  );
}

export default React.memo(Singers);
