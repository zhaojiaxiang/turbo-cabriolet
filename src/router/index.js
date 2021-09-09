import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  },
  {
    path: '/workbench',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/workbench/index'),
        name: 'Workbench',
        meta: { title: 'Workbench', icon: 'el-icon-menu', noCache: true }
      }
    ]
  },
  {
    path: '/checkouts',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/checkouts/index'),
        name: 'Checkouts',
        meta: { title: 'Checkouts', icon: 'el-icon-document', noCache: true }
      }
    ]
  },
  {
    path: '/project/overview',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        component: () => import('@/views/projects/components/ProjectOverview'),
        name: 'ProjectOverview',
        meta: { title: 'ProjectOverview', icon: 'el-icon-document', noCache: true }
      }
    ]
  },
  {
    path: '/project/qa',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        component: () => import('@/views/projects/components/ProjectMclQaTestList'),
        name: 'ProjectMclQaTestList',
        meta: { title: 'Project QA', icon: '', noCache: true }
      }
    ]
  },
  {
    path: '/project/pcl/class1',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        component: () => import('@/views/projects/components/ProjectPclQaClass1'),
        name: 'ProjectPclQaClass1',
        meta: { title: 'Project PCL Class1', icon: '', noCache: true }
      }
    ]
  },
  {
    path: '/project/pcl/class2',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        component: () => import('@/views/projects/components/ProjectPclQaClass2'),
        name: 'ProjectPclQaClass2',
        meta: { title: 'Project PCL Class2', icon: '', noCache: true }
      }
    ]
  },
  {
    path: '/project/pcl/list',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        component: () => import('@/views/projects/components/ProjectPclQaList'),
        name: 'ProjectPclQaList',
        meta: { title: 'Project PCL List', icon: '', noCache: true }
      }
    ]
  },
  {
    path: '/qa',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/qa/index'),
        name: 'QA',
        meta: { title: 'QA', icon: '', noCache: true }
      }
    ]
  },
  {
    path: '/qa/test/list',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        component: () => import('@/views/qa/components/QaMclTestIndex'),
        name: 'QAMclTestList',
        meta: { title: 'QA MCL List', icon: '', noCache: true }
      }
    ]
  },
  {
    path: '/qa/content_text',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        component: () => import('@/views/common/QaContentText'),
        name: 'QaContentText',
        meta: { title: 'QA Proof', icon: '', noCache: true }
      }
    ]
  },
  {
    path: '/task/test',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        component: () => import('@/views/workbench/components/TaskTest'),
        name: 'TaskTest',
        meta: { title: 'Task Test', icon: '', noCache: true }
      }
    ]
  },
  {
    path: '/task/test/pcl/class1',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        component: () => import('@/views/workbench/components/TaskPclTestClass1'),
        name: 'TaskPclTestClass1',
        meta: { title: 'Task Pcl Class1', icon: '', noCache: true }
      }
    ]
  },
  {
    path: '/task/test/pcl/class2',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        component: () => import('@/views/workbench/components/TaskPclTestClass2'),
        name: 'TaskPclTestClass2',
        meta: { title: 'Task Pcl Class2', icon: '', noCache: true }
      }
    ]
  },
  {
    path: '/task/test/pcl/list',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        component: () => import('@/views/workbench/components/TaskPclTestList'),
        name: 'TaskPclTestList',
        meta: { title: 'Task Pcl List', icon: '', noCache: true }
      }
    ]
  },
  {
    path: '/task/approval',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        component: () => import('@/views/common/QaContentText'),
        name: 'QaContentText',
        meta: { title: 'QA Proof', icon: '', noCache: true }
      }
    ]
  },
  {
    path: '/task/confirm',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        component: () => import('@/views/common/QaContentText'),
        name: 'QaContentText',
        meta: { title: 'QA Proof', icon: '', noCache: true }
      }
    ]
  },
  {
    path: '/task/release',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        component: () => import('@/views/common/QaContentText'),
        name: 'QaContentText',
        meta: { title: 'QA Proof', icon: '', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  nestedRouter,
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
