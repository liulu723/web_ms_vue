import Vue from 'vue'
import VueRouter from 'vue-router'
import {upperFirst} from 'lodash'
import store from '../store'
import Index from '@/views/index'
Vue.use(VueRouter) 
const paths = [
  'index',
  'login',
  'article',
  'articleAdd/:type'
  ]
  const route = paths.map(path => {
    const name = path.split('/')
    const newPath = name.filter(item => {
      return item != 'index' 
    }).join('/')
    const name1 = name.map(item => {
      if(item !== 'index'&&item.substr(0, 1) !=':'){
        return upperFirst(item)
      }
    })
    const component = () => {
      return import(`@/views/${name[0]}.vue`)
    }
    
    return {
      path: `/${newPath}`,
      name: name1.join(''),
      component
    }
  })
  // console.log(route)
  const routes = [
  {
    path: '/index',
    name:'Index',
    component: Index,
    redirect: '/'
  },
  ...route
]
// console.log(routes)
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to,from,next) =>{
  // console.log(to,from)
  store.dispatch('baseBG',to.name == 'Login'?false:true)
  next()
})
export default router
