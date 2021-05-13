import Vue from 'vue'
import App from './App.vue'
import * as directives from "./directives/index";
import '@/assets/css/main.css'
import VModal from 'vue-js-modal'
import Vuelidate from 'vuelidate'
import Multiselect from 'vue-multiselect'

// define global directives
Vue.directive('click-outside', directives.clickOutside)

// register globally
Vue.component('multiselect', Multiselect)
Vue.use(VModal, { componentName: 'Modal' })
Vue.use(Vuelidate)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
