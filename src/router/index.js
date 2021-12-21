import { createRouter, createWebHistory } from 'vue-router';
import localCache from '@/utils/localCache';

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('@/views/main/main.vue'),
    children: [
      {
        path: '/overview',
        name: 'Overview',
        component: () => import('@/views/overview.vue')
      },
      {
        path: '/users',
        name: 'Users',
        component: () => import('@/views/users.vue')
      },
      {
        path: '/technology',
        name: 'Technology',
        component: () => import('@/views/technology.vue')
      },
      {
        path: '/blog',
        name: 'Blog',
        component: () => import('@/views/blog.vue')
      },
      {
        path: '/check',
        name: 'Check',
        component: () => import('@/views/check.vue')
      },
      {
        path: '/label',
        name: 'Label',
        component: () => import('@/views/label.vue')
      },
      {
        path: '/recycleBin',
        name: 'RecycleBin',
        component: () => import('@/views/recycleBin.vue')
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/about.vue')
      }
    ],
    redirect: '/overview'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/notFound.vue')
  }
];

const router = createRouter({
  routes,
  history:createWebHistory()
});

// 守卫
router.beforeEach((to) => {
  if (to.path !== '/login') {
    const loginStatus = localCache.getCache('loginStatus');
    if (loginStatus !== 'success') {
      return '/login';
    }
  }

  if (to.path === '/main') {
    return firstMenu.url;
  }
});

export default router;
