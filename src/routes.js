import React from 'react';
import Loadable from 'react-loadable'
import DefaultLayout from './containers/DefaultLayout';

function Loading(){
  return <div>Loading...</div>
}


const Dashboard = Loadable({
  loader: () => import('./views/Dashboard/Dashboard.js'),
  loading: Loading,
});

const Roles = Loadable({
  loader: () => import('./views/Roles/Roles.js'),
  loading: Loading,
});

const Faq = Loadable({
  loader: () => import('./views/Faq/FaqCategoryParent.js'),
  loading: Loading,
});

const User = Loadable({
  loader: () => import('./views/User/userComponent.js'),
  loading: Loading,
});

const Template = Loadable({
  loader: () => import('./views/Template/Template.js'),
  loading: Loading,
});

const Froala = Loadable({
  loader: () => import('./views/Froala/Froala.js'),
  loading: Loading,
});


const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/faq', name: 'Faq', component: Faq },
  { path: '/froala', name: 'Faq', component: Froala },
  { path: '/user', name: 'User', component: User },
  { path: '/roles', name: 'Roles', component: Roles },
  { path: '/template', name: 'Template', component: Template },
];

export default routes;
