import '@babel/polyfill'
import Vue from 'vue'
import vuetify from './plugins/vuetify';
import App from './App.vue'
import router from './router'
import store from './store'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'

Vue.use(VueApollo);

// Setup Apollo client
export const defaultClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

const apolloProvider = new VueApollo({ defaultClient });

Vue.config.productionTip = false

new Vue({
  apolloProvider,
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
