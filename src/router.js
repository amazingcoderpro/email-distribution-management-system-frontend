import Vue from 'vue'
import Router from 'vue-router'
import Notfount from './components/404.vue'
import Login from './views/login.vue'
import Index from './views/index'
import Dashboard from './views/dashboard'

// special
import AutState from './views/special/aut_state'
import ShopfyRegist from './views/special/shopfy_regist.vue'
import Privacy from './views/special/privacy.vue'


// Newsletters
import NewsletterList from './views/Newsletters/NewsletterList'

//Flows
import FlowList from './views/Flows/FlowList'
import Browse_Abandonment from './views/Flows/Browse_Abandonment'
// Customers
import SegmentList from './views/Customers/SegmentList'
import SegmentAdd from './views/Customers/SegmentAdd'

// Integration
import Integration from './views/Integration/Integration'

// ImageLibrary

import ImageList from './views/ImageLibrary/ImageList'



Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [
        { path: '/dashboard', name: 'dashboard', component: Dashboard },
        { path: '/NewsletterList', name: 'NewsletterList', component: NewsletterList },
        { path: '/FlowList', name: 'FlowList', component: FlowList },
        { path: '/Browse_Abandonment',name:'Browse_Abandonment',component:Browse_Abandonment},




        { path: '/SegmentList', name: 'SegmentList', component: SegmentList },
        { path: '/SegmentAdd', name: 'SegmentAdd', component: SegmentAdd },
        { path: '/Integration', name: 'Integration', component: Integration },
        { path: '/ImageList', name: 'ImageList', component: ImageList },
        
        
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/shopfy_regist',
      name: 'shopfy_regist',
      component: ShopfyRegist
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: Privacy
    },
    
    {
      path: '/aut_state',
      name: 'aut_state',
      component: AutState
    },
    {
      path: '*',
      name: '/404',
      component: Notfount
    },
  ]
})


router.beforeEach((to,from,next) =>{
  const isLogin = localStorage.eleToken ? true : false;
  if(to.path == "/login" || to.path == "/shopfy_regist" || to.path == "/privacy" || to.path == "/aut_state" ){
    next()
  }else{
    if(isLogin) {
      next()
      }else{
        next('/login')
      }
   }
});


export default router;