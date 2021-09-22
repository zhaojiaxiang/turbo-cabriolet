/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout';

const queryRouter = {
  path: '/query',
  component: Layout,
  redirect: '/query/projects',
  name: 'DataQuery',
  meta: {
    title: '数据查询',
    icon: 'nested'
  },
  children: [
    {
      path: 'projects',
      name: 'ProjectQuery',
      component: () => import('@/views/dataquery/components/ProjectQuery'),
      meta: { title: '项目查询' }
    },
    {
      path: 'slip_no',
      name: 'SlipNoQuery',
      component: () => import('@/views/dataquery/components/SlipNoQuery'),
      meta: { title: '联络票查询' }
    },
    {
      path: 'report',
      name: 'Report',
      component: () => import('@/views/dataquery/components/ReportQuery'),
      meta: { title: '报表导出' }
    }
  ]
};

export default queryRouter;
