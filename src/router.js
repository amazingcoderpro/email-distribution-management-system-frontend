import Vue from 'vue'
import Router from 'vue-router'
import Notfount from './components/404.vue'
import Login from './views/login.vue'
import LayOut from './views/LayOut'

import Home from './views/Home/Home'
import MyContent from './views/Home/MyContent'
import List from './views/list'


Vue.use(Router)
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/Home',
    },
    {
      path: '/LayOut',
      name: 'LayOut',
      component: LayOut,
      children: [
        { path: '/Home', name: 'Home', component: Home },
        { path: '/MyContent', name: 'MyContent', component: MyContent },
        { path: '/List', name: 'List', component: List },
        
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
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
  let user = localStorage.user;
  let shopString = getQueryString("shop");
  if(user){
    user = JSON.parse(user);
  }
  if(to.path == "/login" || to.path == "/shopfy_regist" || to.path == "/privacy" || to.path == "/aut_state" || to.path == "/EmailPage"  ){
    next()
  }else{
    next()
      // if(isLogin) {
      //   if(user && shopString && user.username != shopString){  
      //     localStorage.removeItem('eleToken')
      //     localStorage.removeItem("user");
      //     router.push('/login')
      //     // next('/login')
      //   }else{
      //     next()
      //   }
      // }else{
      //   next('/login')
      // }
  }
});
export function getQueryString(key){
  var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
  var result = window.location.search.substr(1).match(reg);
  return result ? decodeURIComponent(result[2]) : null;
}

export default router;