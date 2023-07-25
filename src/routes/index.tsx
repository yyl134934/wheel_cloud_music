//routes/index.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import Home from '../application/Home';
import Recommend from '../application/Recommend';
import NoFound from '../application/NoFound';

const Singers = React.lazy(() => import('../application/Singers'));
const Singer = React.lazy(() => import('../application/Singer'));
const Rank = React.lazy(() => import('../application/Rank'));
const Album = React.lazy(() => import('../application/Album'));
const Search = React.lazy(() => import('../application/Search'));

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
      {
        path: '/album/:id',
        element: <Album />,
      },
      {
        path: 'search',
        element: <Search />,
      },
    ],
  },
  {
    path: '*',
    element: <NoFound />,
  },
];

export default pathConfig;
