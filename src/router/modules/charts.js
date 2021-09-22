/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout';

const chartRouter = {
  path: '/chars',
  component: Layout,
  name: 'Charts',
  meta: {
    title: '图表统计',
    icon: 'nested'
  },
  children: [
    {
      path: 'liaisons',
      name: 'LiaisonChart',
      component: () => import('@/views/charts/components/LiaisonChart'),
      meta: { title: '联络票' }
    },
    {
      path: 'slip_no',
      name: 'SlipNoQuery',
      component: () => import('@/views/dataquery/components/SlipNoQuery'),
      meta: { title: '联络票查询' }
    }
  ]
};

export default chartRouter;
