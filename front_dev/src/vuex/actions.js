import * as types from './mutation-types';

export const loading = ({ commit }, showOrHide) => {
    commit(types.LOADING, showOrHide);
};

export const theme = ({ commit }, theme) => {
    commit(types.THEME, theme);
};
