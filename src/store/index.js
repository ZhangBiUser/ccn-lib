 
import Vue from 'vue'
import Vuex from 'vuex'
 

// initial state
const state = {
    loadings: false,
};

// getters
const getters = {};

// actions
const actions = {};

// mutations
const mutations = {switch_Loading: (state, payload) => {
    state.loadings = payload;
},};

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
         
    },
    state,
    getters,
    mutations,
    actions,
    strict: process.env.NODE_ENV !== 'production'
});