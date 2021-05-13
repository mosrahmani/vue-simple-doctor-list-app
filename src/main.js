import Vue from 'vue'
import App from './App.vue'
import '@/assets/css/main.css'
import VModal from 'vue-js-modal'
import Vuelidate from 'vuelidate'
import Multiselect from 'vue-multiselect'

// register globally
Vue.component('multiselect', Multiselect)
// register globally
Vue.use(VModal, { componentName: 'Modal' })
Vue.use(Vuelidate)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
