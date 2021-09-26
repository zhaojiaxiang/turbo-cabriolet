/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout';

const chartRouter = {
  path: '/chars',
  component: Layout,
  name: 'Charts',
  alwaysShow: true,
  meta: {
    title: '图表统计',
    icon: 'chart'
  },
  children: [
    {
      path: 'liaisons',
      name: 'LiaisonChart',
      component: () => import('@/views/charts/components/LiaisonsChart'),
      meta: { title: '联络票' }
    }
  ]
};

export default chartRouter;
