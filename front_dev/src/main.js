// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/index';
import axios from 'axios'

import VueI18n from 'vue-i18n'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import utils from './util';
import './util/any'

Vue.use(VueI18n)

Vue.use(iView)

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

router.afterEach(route => {

});

Vue.config.productionTip = false;

Vue.prototype.d = utils.d;
Vue.prototype.base64Encode = utils.base64Encode;
Vue.prototype.axios = axios;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
