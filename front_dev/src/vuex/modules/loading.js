import * as types from '../mutation-types';

// initial state
const state = {
    loading: false
};

// mutations
const mutations = {
    [types.LOADING](state, showOrHide) {
        state.loading = showOrHide;
    }
};

export default {
    state,
    mutations
};
