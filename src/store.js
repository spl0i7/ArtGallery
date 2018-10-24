import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    selectedOwners: [],
    ownerCollection : []
  },
  mutations: {
    change(state, selectedOwners) {
      state.selectedOwners = selectedOwners;
    },
    setOwner(state,  data){
      state.ownerCollection = data;
    }

  },
  getters: {
    selectedOwners: state => state.selectedOwners,
    ownerCollection: state => state.ownerCollection
  }
});
