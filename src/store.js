import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        selectedOwners : []
    },
    mutations: {
        change(state, selectedOwners) {
          state.selectedOwners = selectedOwners
        }
    },
    getters: {
        selectedOwners: state => state.selectedOwners
    }
})