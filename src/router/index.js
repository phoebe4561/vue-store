import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/admin',
    component: () => import('../views/backend/DashBoard.vue'),
    children: [
      {
        path: '',
        name: '後台首頁',
        component: () => import('../views/backend/Index.vue'),
        meta: {
          title: '管理儀錶板',
        },
      },
      {
        path: 'products',
        name: '商品管理',
        component: () => import('../views/backend/Products.vue'),
        meta: {
          title: '商品管理',
        },
      },
      {
        path: 'orders',
        name: '訂單管理',
        component: () => import('../views/backend/Orders.vue'),
        meta: {
          title: '訂單管理',
        },
      },
      {
        path: 'articles',
        name: '文章管理',
        component: () => import('../views/backend/Articles.vue'),
        meta: {
          title: '文章管理',
        },
      },
      {
        path: 'coupons',
        name: '優惠券管理',
        component: () => import('../views/backend/Coupons.vue'),
        meta: {
          title: '優惠券管理',
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
