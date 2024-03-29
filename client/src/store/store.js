import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true, // you cannot modify the state unless via action
    plugins: [
        createPersistedState()
    ],
    state: {
        token: null,
        user: null,
        isUserLoggedIn: false
    },
    mutations: {
        setToken (state, token) {
            state.token = token
            if (token) {
                state.isUserLoggedIn = true
            } else {
                state.isUserLoggedIn = false
            }
        },
        setUser (state, user) {
            state.user = user
        }
    },
    actions: {
        setToken ({commit}, token) {
            commit('setToken', token) // async logic
        },
        setUser ({commit}, user) {
            commit('setUser', user) // async logic
        }
    }
})
