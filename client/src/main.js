import Vue from 'vue'
import vuetify from './plugins/vuetify';
import App from './App.vue'
import router from './router'
import store from './store'

import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'

import FormAlert from './components/Shared/FormAlert'

// Register component globally
Vue.component('form-alert', FormAlert);

Vue.use(VueApollo);

// Setup Apollo client
export const defaultClient = new ApolloClient({
  uri: 'https://vue-pics.herokuapp.com/graphql',
  // include auth token with requests made to backend
  fetchOptions: {
    credentials: 'include'
  },
  request: operation => {
    // check token in local storage
    if (!localStorage.token) {
      localStorage.setItem('token', '');   // prevents errors
    }

    // operation adds the token to an auth header (sent to the backend)
    operation.setContext({
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
  },
  onError: ({ graphQLErrors, networkError }) => {
    if (networkError) {
      console.log('[networkError]', networkError);
    }

    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        console.dir(err);
        if (err.name === "AuthenticationError") {
          // set auth error in state
          store.commit('setAuthError', err);
          // signout user
          store.dispatch('signoutUser');
        }
      }
    }
  }
});

const apolloProvider = new VueApollo({ defaultClient });

Vue.config.productionTip = false

new Vue({
  apolloProvider,
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    // execute getCurrentUser query (check if user is already authenticated)
    this.$store.dispatch('getCurrentUser');
  }
}).$mount('#app')
