import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import queryRouter from './modules/dataquery'
import chartRouter from './modules/charts'

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
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: '',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: '????????????', icon: 'user', noCache: true }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/workbench/index'),
        name: 'Workbench',
        meta: { title: '?????????', icon: 'el-icon-menu', noCache: false, affix: true }
      }
    ]
  },
  {
    path: '/dashboard',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '?????????', icon: 'dashboard', noCache: true }
      }
    ]
  },
  {
    path: '/checkouts',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/checkouts/index'),
        name: 'Checkouts',
        meta: { title: '????????????', icon: 'el-icon-document', noCache: true }
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
        meta: { title: '????????????', icon: 'el-icon-document', noCache: true }
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
        meta: { title: '??????-QA', icon: '', noCache: true }
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
        meta: { title: '??????-PCL??????1', icon: '', noCache: true }
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
        meta: { title: '??????-PCL??????2', icon: '', noCache: true }
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
        meta: { title: '??????-PCL??????2-??????', icon: '', noCache: true }
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
        meta: { title: 'QA-??????', icon: '', noCache: true }
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
        meta: { title: '??????', icon: '', noCache: true }
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
        meta: { title: '??????', icon: '', noCache: true }
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
        meta: { title: '??????1', icon: '', noCache: true }
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
        meta: { title: '??????2', icon: '', noCache: true }
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
        meta: { title: '??????2-??????', icon: '', noCache: false }
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
        component: () => import('@/views/workbench/components/TaskApproval'),
        name: 'TaskApproval',
        meta: { title: '??????', icon: '', noCache: true }
      }
    ]
  },
  {
    path: '/task/approval/detail',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        component: () => import('@/views/workbench/components/TaskApprovalDetail'),
        name: 'TaskApprovalDetail',
        meta: { title: '??????-??????', icon: '', noCache: true }
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
        component: () => import('@/views/workbench/components/TaskConfirm'),
        name: 'TaskConfirm',
        meta: { title: '??????', icon: '', noCache: true }
      }
    ]
  },
  {
    path: '/task/confirm/detail',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        component: () => import('@/views/workbench/components/TaskConfirmDetail'),
        name: 'TaskConfirmDetail',
        meta: { title: '??????-??????', icon: '', noCache: true }
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
        component: () => import('@/views/workbench/components/TaskRelease'),
        name: 'TaskRelease',
        meta: { title: '??????', icon: '', noCache: true }
      }
    ]
  },
  {
    path: '/report/single',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        component: () => import('@/views/dataquery/components/ReportSingle'),
        name: 'ReportSingle',
        meta: { title: '??????-??????', icon: '', noCache: true }
      }
    ]
  },
  {
    path: '/report/multiple',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        component: () => import('@/views/dataquery/components/ReportMultiple'),
        name: 'ReportMultiple',
        meta: { title: '??????-??????', icon: '', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  queryRouter,
  chartRouter,
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
