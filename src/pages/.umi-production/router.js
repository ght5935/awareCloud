import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import { routerRedux } from 'dva/router';
import _dvaDynamic from 'dva/dynamic';


let Router = DefaultRouter;
const { ConnectedRouter } = routerRedux;
Router = ConnectedRouter;


let routes = [
  {
    "path": "/404",
    "exact": true,
    "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: 'src__pages__404' */'../404.js'),
  
})
  },
  {
    "path": "/",
    "exact": true,
    "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: 'src__pages__index' */'../index.js'),
  
})
  },
  {
    "path": "/car",
    "exact": true,
    "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'src__pages__car__models__car.js' */'F:/WorkNew/awareCloudWeb/src/pages/car/models/car.js')
],
  component: () => import(/* webpackChunkName: 'src__pages__car__index' */'../car/index.js'),
  
})
  },
  {
    "path": "/car/info",
    "exact": true,
    "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'src__pages__car__models__car.js' */'F:/WorkNew/awareCloudWeb/src/pages/car/models/car.js')
],
  component: () => import(/* webpackChunkName: 'src__pages__car__info' */'../car/info.js'),
  
})
  },
  {
    "path": "/car/search",
    "exact": true,
    "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'src__pages__car__models__car.js' */'F:/WorkNew/awareCloudWeb/src/pages/car/models/car.js')
],
  component: () => import(/* webpackChunkName: 'src__pages__car__search' */'../car/search.js'),
  
})
  },
  {
    "path": "/house/chart",
    "exact": true,
    "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'src__pages__house__models__house.js' */'F:/WorkNew/awareCloudWeb/src/pages/house/models/house.js')
],
  component: () => import(/* webpackChunkName: 'src__pages__house__chart' */'../house/chart.js'),
  
})
  },
  {
    "path": "/house/chartLabel",
    "exact": true,
    "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'src__pages__house__models__house.js' */'F:/WorkNew/awareCloudWeb/src/pages/house/models/house.js')
],
  component: () => import(/* webpackChunkName: 'src__pages__house__chartLabel' */'../house/chartLabel.js'),
  
})
  },
  {
    "path": "/house",
    "exact": true,
    "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'src__pages__house__models__house.js' */'F:/WorkNew/awareCloudWeb/src/pages/house/models/house.js')
],
  component: () => import(/* webpackChunkName: 'src__pages__house__index' */'../house/index.js'),
  
})
  },
  {
    "path": "/house/info",
    "exact": true,
    "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'src__pages__house__models__house.js' */'F:/WorkNew/awareCloudWeb/src/pages/house/models/house.js')
],
  component: () => import(/* webpackChunkName: 'src__pages__house__info' */'../house/info.js'),
  
})
  },
  {
    "path": "/car/chart",
    "exact": true,
    "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'src__pages__car__models__car.js' */'F:/WorkNew/awareCloudWeb/src/pages/car/models/car.js')
],
  component: () => import(/* webpackChunkName: 'src__pages__car__chart' */'../car/chart.js'),
  
})
  },
  {
    "path": "/house/total",
    "exact": true,
    "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'src__pages__house__models__house.js' */'F:/WorkNew/awareCloudWeb/src/pages/house/models/house.js')
],
  component: () => import(/* webpackChunkName: 'src__pages__house__total' */'../house/total.js'),
  
})
  },
  {
    "path": "/people/search",
    "exact": true,
    "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'src__pages__people__models__people.js' */'F:/WorkNew/awareCloudWeb/src/pages/people/models/people.js')
],
  component: () => import(/* webpackChunkName: 'src__pages__people__search' */'../people/search.js'),
  
})
  },
  {
    "path": "/login",
    "exact": true,
    "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: 'src__pages__login__index' */'../login/index.js'),
  
})
  },
  {
    "path": "/people/chart",
    "exact": true,
    "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'src__pages__people__models__people.js' */'F:/WorkNew/awareCloudWeb/src/pages/people/models/people.js')
],
  component: () => import(/* webpackChunkName: 'src__pages__people__chart' */'../people/chart.js'),
  
})
  },
  {
    "path": "/people/chartLabel",
    "exact": true,
    "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'src__pages__people__models__people.js' */'F:/WorkNew/awareCloudWeb/src/pages/people/models/people.js')
],
  component: () => import(/* webpackChunkName: 'src__pages__people__chartLabel' */'../people/chartLabel.js'),
  
})
  },
  {
    "path": "/people",
    "exact": true,
    "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'src__pages__people__models__people.js' */'F:/WorkNew/awareCloudWeb/src/pages/people/models/people.js')
],
  component: () => import(/* webpackChunkName: 'src__pages__people__index' */'../people/index.js'),
  
})
  },
  {
    "path": "/people/info",
    "exact": true,
    "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import(/* webpackChunkName: 'src__pages__people__models__people.js' */'F:/WorkNew/awareCloudWeb/src/pages/people/models/people.js')
],
  component: () => import(/* webpackChunkName: 'src__pages__people__info' */'../people/info.js'),
  
})
  },
  {
    "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: 'src__pages__404' */'../404.js'),
  
})
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
