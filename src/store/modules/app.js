import { Login } from '@/api/login'
import { setToken, setUsername, getUsername, removeToken, removeUsername } from '@/utils/app'
const state = {
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
    count: 10,
    username: getUsername('username') || '',
    token: ''
}
console.log(getUsername('username'))
const getters = {
    counts: state => {
        return state.count
    }
}
const mutations = {
    SET_COLLAPSE(state) {
        state.isCollapse = !state.isCollapse
        sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))

    },
    SET_COUNT(state, value) {
        state.count = value;
    },
    SET_TOKEN(state, value) {
        state.token = value
    },
    SET_USERNAME(state, value) {
        state.username = value
    }
}
const actions = {
    set_collapse({ commit }, data) {
        commit('SET_COLLAPSE');
    },
    login({ commit }, requsetData) {
        let pro = new Promise((resolve, reject) => {
            Login(requsetData).then(res => {
                let data = res.data.data;
                commit('SET_USERNAME', data.username)
                commit('SET_TOKEN', data.token)
                setToken(data.token)
                setUsername(data.username)
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
        return pro
    },
    exit({ commit }) {
        return new Promise((resolve, reject) => {
            removeToken()
            removeUsername()
            commit('SET_TOKEN', '')
            commit('SET_USERNAME', '')
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}



// const app = {
//     state: {
//         isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
//         count: 10
//     },
//     getters: {
//         counts: state => {
//             return state.count
//         }
//     },
//     mutations: {
//         SET_COLLAPSE(state) {
//             state.isCollapse = !state.isCollapse
//             sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))

//         },
//         SET_COUNT(state, value) {
//             state.count = value;
//         }
//     },
//     actions: {
//         set_collapse({ commit }, data) {
//             commit('SET_COLLAPSE');
//         }
//     }
// }
// export default app;