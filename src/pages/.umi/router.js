import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import { routerRedux } from 'dva/router';



let Router = DefaultRouter;
const { ConnectedRouter } = routerRedux;
Router = ConnectedRouter;


let routes = [
  {
    "path": "/404",
    "exact": true,
    "component": require('../404.js').default
  },
  {
    "path": "/",
    "exact": true,
    "component": require('../index.js').default
  },
  {
    "path": "/car",
    "exact": true,
    "component": require('../car/index.js').default
  },
  {
    "path": "/car/info",
    "exact": true,
    "component": require('../car/info.js').default
  },
  {
    "path": "/car/search",
    "exact": true,
    "component": require('../car/search.js').default
  },
  {
    "path": "/house/chart",
    "exact": true,
    "component": require('../house/chart.js').default
  },
  {
    "path": "/house/chartLabel",
    "exact": true,
    "component": require('../house/chartLabel.js').default
  },
  {
    "path": "/house",
    "exact": true,
    "component": require('../house/index.js').default
  },
  {
    "path": "/house/info",
    "exact": true,
    "component": require('../house/info.js').default
  },
  {
    "path": "/car/chart",
    "exact": true,
    "component": require('../car/chart.js').default
  },
  {
    "path": "/house/total",
    "exact": true,
    "component": require('../house/total.js').default
  },
  {
    "path": "/people/search",
    "exact": true,
    "component": require('../people/search.js').default
  },
  {
    "path": "/login",
    "exact": true,
    "component": require('../login/index.js').default
  },
  {
    "path": "/people/chart",
    "exact": true,
    "component": require('../people/chart.js').default
  },
  {
    "path": "/people/chartLabel",
    "exact": true,
    "component": require('../people/chartLabel.js').default
  },
  {
    "path": "/people",
    "exact": true,
    "component": require('../people/index.js').default
  },
  {
    "path": "/people/info",
    "exact": true,
    "component": require('../people/info.js').default
  }
];


export default function() {
  return (
<Router history={window.g_history}>
  <Route render={({ location }) =>
    renderRoutes(routes, {}, { location })
  } />
</Router>
  );
}
