import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import loading from './modules/loading';
import theme from './modules/theme';
import createLogger from './plugins/logger';

Vue.use(Vuex);

const debug = true;

export default new Vuex.Store({
    actions,
    getters,
    modules: {
        loading,
        theme
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
});
