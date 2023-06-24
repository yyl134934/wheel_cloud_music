//routes/index.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import Home from '../application/Home';
import Recommend from '../application/Recommend';
import Singers from '../application/Singers';
import Singer from '../application/Singer';
import Rank from '../application/Rank';
import Album from '../application/Album';
import NoFound from '../application/NoFound';

export const pathConfig = [
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '',
        element: <Navigate to='recommend' replace={true} />,
      },
      {
        path: 'recommend',
        element: <Recommend />,
        children: [
          {
            path: ':id',
            element: <Album />,
          },
        ],
      },
      {
        path: 'singers',
        element: <Singers />,
        children: [
          {
            path: ':id',
            element: <Singer />,
          },
        ],
      },
      {
        path: 'rank',
        element: <Rank />,
        children: [
          {
            path: ':id',
            element: <Album />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NoFound />,
  },
];

export default pathConfig;
