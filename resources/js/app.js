import Vue from 'vue';
import App from './views/App';
import router from './router.js';

import axios from 'axios';
import VueAxios from 'vue-axios';

import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';

import Paginate from 'vuejs-paginate';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

Vue.use(VueAxios, axios);
Vue.component('multiselect', Multiselect);
Vue.component('paginate', Paginate);
Vue.component('loading', Loading);

new Vue({
    el: '#app',
    components: { App },
    router,
});
