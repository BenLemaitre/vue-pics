import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'

import { defaultClient as apolloClient } from '../main';

import { GET_POSTS, SIGNIN_USER, GET_CURRENT_USER, SIGNUP_USER, ADD_POST } from '../queries';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: [],
    user: null,
    loading: false,
    error: null,
    authError: null
  },
  mutations: {
    setPosts: (state, payload) => {
      state.posts = payload;
    },
    setUser: (state, payload) => {
      state.user = payload;
    },
    setLoading: (state, payload) => {
      state.loading = payload;
    },
    setError: (state, payload) => {
      state.error = payload;
    },
    setAuthError: (state, payload) => {
      state.authError = payload;
    },
    clearUser: state => (state.user = null),
    clearError: state => (state.error = null)
  },
  actions: {
    getCurrentUser: ({ commit }) => {
      commit('setLoading', true);
      apolloClient.query({
        query: GET_CURRENT_USER
      }).then(({ data }) => {
        commit('setLoading', false);
        commit('setUser', data.getCurrentUser);
      }).catch(err => {
        console.error(err);
        commit('setLoading', false);
      });
    },
    getPosts: ({ commit }) => {
      commit('setLoading', true);
      // use ApolloClient to fire getPosts query
      apolloClient
        .query({
          query: GET_POSTS
        }).then(({data}) => {
          //Get data from actions to state via mutations
          //Commit will pass data from actions to mutation functions
          commit('setPosts', data.getPosts);
          commit('setLoading', false);
        }).catch(err => {
          console.error(err);
          commit('setLoading', false);
        })
    },
    signupUser: ({ commit }, payload) => {
      // display errors 
      commit('clearError');
      commit('setLoading', true);

      apolloClient
        .mutate({
          mutation: SIGNUP_USER,
          variables: payload
        }).then(({data}) => {
          commit('setLoading', false);
          // store token to local storage
          localStorage.setItem('token', data.signupUser.token);
          // make sure created method is run in main.js => reload page
          router.go();
        }).catch(err => {
          commit('setLoading', false);
          commit('setError', err);
        })
    },
    signinUser: ({ commit }, payload) => {
      // display errors 
      commit('clearError');
      commit('setLoading', true);
      // clear token
      localStorage.setItem('token', '');

      apolloClient
        .mutate({
          mutation: SIGNIN_USER,
          variables: payload
        }).then(({data}) => {
          commit('setLoading', false);
          // store token to local storage
          localStorage.setItem('token', data.signinUser.token);
          // make sure created method is run in main.js => reload page
          router.go();
        }).catch(err => {
          commit('setLoading', false);
          commit('setError', err);
        })
    },
    signoutUser: async ({ commit }) => {
      // clear user in state
      commit('clearUser')
      // remove token in localStorage
      localStorage.setItem('token', '');
      // end session
      await apolloClient.resetStore();
      // redirect to home
      router.push('/');
    },
    addPost: ({ commit }, payload) => {
      apolloClient
        .mutate({
          mutation: ADD_POST,
          variables: payload,
          update: (cache, { data: { addPost } }) => {
            //  Read the query we want to update
            const data = cache.readQuery({ query: GET_POSTS });
            // Create updated data
            data.getPosts.unshift(addPost);
            // Update data back to query
            cache.writeQuery({
              query: GET_POSTS,
              data
            });
          },
          // ensures data is added immediately as specified
          optimisticResponse: {
            __typename: 'Mutation',
            addPost: {
              __typename: 'Post',
              _id: -1,
              ...payload
            }
          }
        }).then(({ data }) => {
          console.log(data.addPost);
        }).catch(err => {
          console.error(err);
        })
    }
  },
  getters: {
    posts: state => state.posts,
    user: state => state.user,
    loading: state => state.loading,
    error: state => state.error,
    authError: state => state.authError
  },
  modules: {
  }
})
