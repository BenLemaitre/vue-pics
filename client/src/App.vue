<template>
  <v-app style="background: #E3E3EE">
      <!-- Side navbar -->
      <v-navigation-drawer app temporary fixed v-model="sideNav">
        <v-app-bar color="accent" dark text>
          <v-app-bar-nav-icon @click="toggleSideNav"></v-app-bar-nav-icon>
          <router-link to="/" tag="span" style="cursor: pointer">
            <h1 class="title pl-3">VueShare</h1>
          </router-link>
        </v-app-bar>

        <v-divider></v-divider>

        <v-list tile>
          <v-list-item ripple v-for="item in sideNavItems" :key=item.title :to="item.link">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              {{ item.title }}
            </v-list-item-content>
          </v-list-item>

          <!-- Signout button -->
          <v-list-item ripple v-if="user" @click="handleSignoutUser" to="/signout">
            <v-list-item-icon>
              <v-icon>exit_to_app</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              Signout
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <!-- Horizontal navbar -->
      <v-app-bar fixed color="primary" dark>

        <!-- App title -->
        <v-app-bar-nav-icon @click="toggleSideNav"></v-app-bar-nav-icon>
        <v-toolbar-title class="hidden-xs-only">
          <router-link to="/" tag="span" style="cursor: pointer">
            VueShare
          </router-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <!-- Search input -->
        <v-text-field flex prepend-icon="search" placeholder="Search posts" color="accent" single-line hide-details>
        </v-text-field>

        <v-spacer></v-spacer>

        <!-- Navbar links -->
        <v-toolbar-items class="hidden-xs-only">
          <v-btn text v-for="item in horizontalNavItems" :key="item.title" :to="item.link">
            <v-icon class="hidden-sm-only" left>{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn>

          <!-- Profile button -->
          <v-btn v-if="user" text to="/profile">
            <v-icon class="hidden-sm-only" left>account_box</v-icon>
            <v-badge right color="blue darken2">
              <!-- <span slot="badge">1</span> -->
              Profile
            </v-badge>
          </v-btn>

          <!-- Signout button -->
          <v-btn v-if="user" text @click="handleSignoutUser">
            <v-icon class="hidden-sm-only" left>exit_to_app</v-icon>
            Signout
          </v-btn>

        </v-toolbar-items>
      </v-app-bar>


      <!-- App Content -->
      <main>
        <v-container class="mt-12">
          <transition name="fade">
            <router-view/>
          </transition>

          <!-- Auth snackbar -->
          <v-snackbar v-model="authSnackbar" color="success" :timeout='5000' bottom left>
            <v-icon class="mr-3">check_circle</v-icon>
            <h3>You are now signed in!</h3>
            <v-btn dark text @click="authSnackbar = false">Close</v-btn>
          </v-snackbar>

          <!-- Auth Errors snackbar -->
          <v-snackbar v-if="authError" v-model="authErrorSnackbar" color="info" :timeout='5000' bottom left>
            <v-icon class="mr-3">cancel</v-icon>
            <h3>{{ authError.message }}</h3>
            <v-btn dark text to="/signin">Signin</v-btn>
          </v-snackbar>

        </v-container>
      </main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "App",
  data() {
    return {
      sideNav: false,
      authSnackbar: false,
      authErrorSnackbar: false
    };
  },
  watch: {
    user(newValue, oldValue) {
      // check oldvalue
      if (oldValue === null) {
        this.authSnackbar = true;
      }
    },
    authError(value) {
      if (value !== null) {
        this.authErrorSnackbar = true;
      }
    }
  },
  computed: {
    ...mapGetters(['authError', 'user']),
    horizontalNavItems() {
      let items = [
        { icon: "chat", title: "Posts", link: "/posts" },
        { icon: "lock_open", title: "Sign In", link: "/signin" },
        { icon: "create", title: "Sign Up", link: "/signup" }
      ];

      if (this.user) {
        items = [
          { icon: "chat", title: "Posts", link: "/posts" },
        ]
      }

      return items;
    },
    sideNavItems() {
      let items = [
        { icon: "chat", title: "Posts", link: "/posts" },
        { icon: "lock_open", title: "Sign In", link: "/signin" },
        { icon: "create", title: "Sign Up", link: "/signup" }
      ];

      if (this.user) {
        items = [
            { icon: "chat", title: "Posts", link: "/posts" },
            { icon: "stars", title: "Create Post", link: "/post/add" },
            { icon: "account_box", title: "Profile", link: "/profile" },
          ]
      }

      return items;
    }
  },
  methods: {
    handleSignoutUser() {
      this.$store.dispatch('signoutUser');
    },
    toggleSideNav() {
      this.sideNav = !this.sideNav;
    }
  }
};
</script>

<style>
  .fade-enter-active,
  .fade-leave-active {
    /* transition-property: all; */
    transition-property: opacity;
    transition-duration: 0.25s
  }

.fade-enter-active {
  transition-delay: 0.25s;
}

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
    /* transform: translateY(-25px); */
  }
</style>