
const routes = [
  {
    path: '/',
    component: () => import('layouts/HomeLayout.vue'),
    // meta: { requiresAuth: true },
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },
  {
    path: '/features',
    component: () => import('layouts/HomeLayout.vue'),
    children: [
      { path: '', component: () => import('pages/FeaturesPage.vue') }
    ]
  },



  {
    path: '/no-gops',
    name: 'no-gops',
    component: () => import('layouts/HomeLayout.vue'),
    children: [
      { path: '', component: () => import('pages/NoGops.vue') }
    ]
  },
  {
    path: '/spi/:goodsAndServiceItem',
    meta: { requiresAuth: true },
    component: () => import('layouts/HomeLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Item.vue') }
    ]
  },
  {
    path: '/tools/DCA-Calculator',
    meta: { requiresAuth: true },
    component: () => import('layouts/HomeLayout.vue'),
    children: [
      { path: '', component: () => import('pages/DCACalculator.vue') }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
