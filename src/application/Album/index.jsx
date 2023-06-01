import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { CSSTransition } from 'react-transition-group';
import Header from '../../baseUI/header';
import { Container } from './style';

function Album(params) {
  const [showStatus, setShowStatus] = useState(true);
  const navigate = useNavigate();
  const ref = useRef();

  function goback() {
    navigate(-1);
  }

  const handleBack = () => {
    setShowStatus(false);
  };

  return (
    <CSSTransition
      nodeRef={ref}
      in={showStatus}
      timeout={300}
      classNames='fly'
      appear={true}
      unmountOnExit
      onExited={goback}
    >
      <Container>
        <Header title={'返回'} handleClick={handleBack}></Header>
      </Container>
    </CSSTransition>
  );
}

export default Album;
