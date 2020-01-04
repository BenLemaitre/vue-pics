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
        </v-toolbar-items>
      </v-app-bar>

      <!-- App Content -->
      <main>
        <v-container class="mt-12">
          <transition name="fade">
            <router-view/>
          </transition>
        </v-container>
      </main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      sideNav: false
    };
  },
  computed: {
    horizontalNavItems() {
      return [
        { icon: "chat", title: "Posts", link: "/posts" },
        { icon: "lock_open", title: "Sign In", link: "/signin" },
        { icon: "create", title: "Sign Up", link: "/signup" }
      ];
    },
    sideNavItems() {
      return [
        { icon: "chat", title: "Posts", link: "/posts" },
        { icon: "lock_open", title: "Sign In", link: "/signin" },
        { icon: "create", title: "Sign Up", link: "/signup" }
      ];
    }
  },
  methods: {
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