<template>
  <v-container>
    <!-- Loading spinner -->
    <v-layout row>
      <v-dialog v-model="loading" persistent fullscreen>
        <v-container fill-height>
          <v-layout row justify-center align-center>
            <v-progress-circular indeterminate :size="70" :width="7" color="secondary"></v-progress-circular>
          </v-layout>
        </v-container>
      </v-dialog>
    </v-layout>

    <!-- Explore posts button -->
    <v-flex xs12 mt-2 mb-3>
      <v-layout column wrap v-if="!loading" align-center>
        <v-btn class="secondary" to="/posts" large dark>
          Explore posts
        </v-btn>
      </v-layout>
    </v-flex>

    <!-- Carousel -->
    <v-flex xs12>
      <v-carousel v-if="!loading && posts.length > 0" v-bind="{ 'cycle': true }" interval="3000">
        <v-carousel-item @click.native="goToPost(post._id)" v-for="post in posts" :key="post._id" :src="post.imageUrl">
          <h1 id="carousel__title" align="Center">{{ post.title }}</h1>
        </v-carousel-item>
      </v-carousel>
    </v-flex>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'home',
  created() {
    this.handleGetCarouselPosts();
  },
  computed: {
    // posts() {
    //   return this.$store.getters.posts;
    // },
    // loading() {
    //   return this.$store.getters.loading;
    // }
    ...mapGetters(["loading", "posts"])
  },
  data() {
    return {
      
    }
  },
  methods: {
    handleGetCarouselPosts() {
      // Reach out to vuex store
      this.$store.dispatch("getPosts");
    },
    goToPost(postId) {
      this.$router.push(`/posts/${postId}`);
    }
  }
}
</script>

<style>
  #carousel__title {
    position: absolute;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.3);
    color: white;
    border-radius: 5px 5px 0 0;
    padding: 0.5em;
    margin: 0 auto;
    bottom: 50px;
    left: 0;
    right: 0;
  }
</style>