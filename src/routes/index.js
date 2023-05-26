//routes/index.js
import React from 'react';
import Home from '../application/Home';
import Recommend from '../application/Recommend';
import Singers from '../application/Singers';
import Rank from '../application/Rank';
import NoFound from '../application/NoFound';

export const pathConfig=[
        {
          path: "/",
          exact: true,
          element: <Home />,
        },
        {
          path: "/recommend",
          element: <Recommend/>
        },
        {
          path: "/singers",
          element: <Singers/>
        },
        {
          path: "/rank",
          element: <Rank/>
        },
        {
          path: "*",
          element: <NoFound/>
        }
      ];

export default pathConfig;
