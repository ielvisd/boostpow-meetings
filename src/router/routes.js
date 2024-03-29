const routes = [
  {
    path: '/',
    component: () => import('layouts/HomeLayout.vue'),
    // meta: { requiresAuth: true },
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/:recipeTitle',
    meta: { requiresAuth: true },
    component: () => import('layouts/HomeLayout.vue'),
    children: [{ path: '', component: () => import('pages/ItemPage.vue') }],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
