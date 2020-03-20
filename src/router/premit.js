import router from './index'
import { getToken, removeToken, removeUsername } from '@/utils/app'
import store from '../store/index'
const whiterRouter = ['/login'] //白名单

router.beforeEach((to, from, next) => {
    if (getToken()) {
        console.log('存在')
        if (to.path == '/login') {
            removeToken()
            removeUsername()
            store.commit('SET_TOKEN', "")
            store.commit('SET_USERNAME', "")
            next()
        } else {
            next()
        }

    } else {
        console.log('不存在', to.path)
        if (whiterRouter.indexOf(to.path) !== -1) { //白名单判断
            next()
        } else {
            next('/login') //next 带路径和不带路径的区别在于next('/login')的是循环走beforeEach,next()不循环
        }
    }
})