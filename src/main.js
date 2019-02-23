import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import vueHeadful from 'vue-headful'

Vue.config.productionTip = false
Vue.component('vue-headful', vueHeadful)

Vue.use(BootstrapVue)

new Vue({
  render: h => h(App),
}).$mount('#app')
