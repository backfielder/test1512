import * as types from '../mutation-types';

// initial state
const state = {
    theme: 'light'  // light  dark
};

// mutations
const mutations = {
    [types.THEME](state, theme) {
        state.theme = theme;
    }
};

export default {
    state,
    mutations
};
