/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const liaisonsRouter = {
  path: '/liaison',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Liaison',
  meta: {
    title: 'Liaison',
    icon: 'component'
  },
  children: [
    {
      path: 'keyboard',
      component: () => import('@/views/charts/keyboard'),
      name: 'KeyboardChart',
      meta: { title: 'Keyboard Chart', noCache: true }
    },
    {
      path: 'line',
      component: () => import('@/views/charts/line'),
      name: 'LineChart',
      meta: { title: 'Line Chart', noCache: true }
    },
    {
      path: 'mix-chart',
      component: () => import('@/views/charts/mix-chart'),
      name: 'MixChart',
      meta: { title: 'Mix Chart', noCache: true }
    }
  ]
}

export default liaisonsRouter
