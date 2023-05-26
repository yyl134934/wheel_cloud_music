//routes/index.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import Home from '../application/Home';
import Recommend from '../application/Recommend';
import Singers from '../application/Singers';
import Rank from '../application/Rank';
import NoFound from '../application/NoFound';

export const pathConfig = [
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '',
        element: <Navigate to='/recommend' replace={true} />,
      },
      {
        path: 'recommend',
        element: <Recommend />,
      },
      {
        path: 'singers',
        element: <Singers />,
      },
      {
        path: 'rank',
        element: <Rank />,
      },
    ],
  },
];

export default pathConfig;
