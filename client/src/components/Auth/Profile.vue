<template>
    <v-container fill-height fluid>
        
        <!-- user details card -->
        <v-flex sm6 offset-sm3>
            <v-card class="white--text" color="secondary">
                <v-layout>
                    <v-flex xs5 align="center">
                        <v-img height="125px" contain :src="user.avatar"></v-img>
                    </v-flex>
                    <v-flex xs7>
                        <v-card-title primary-title>
                            <div align="center">
                                <div class="headline">
                                    {{ user.username }}
                                </div>
                                <div class="font-weight-regular">
                                    {{ formatJoinDate(user.joinDate) }}
                                </div>
                                <div class="hidden-xs-only font-weight-thin">
                                    {{ user.favorites.length }} Favorites
                                </div>
                                <div class="hidden-xs-only font-weight-thin">
                                    {{ userPosts.length }} Posts Added
                                </div>
                            </div>
                        </v-card-title>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-flex>

        <!-- Favorite posts -->
        <v-container v-if="!userFavorites.length">
            <v-layout row wrap v-if="!userFavorites.length">
                <v-flex xs12>
                    <h2 align="center">You have no favorites yet. Go and add some!</h2>
                </v-flex>
            </v-layout>
        </v-container>

        <v-container class="mt-3" v-else>
            <v-flex xs12>
                <h2 class="font-weight-light" align="center">Favorited
                    <span class="font-weight-regular">
                        ({{ userFavorites.length }})
                    </span>
                </h2>
            </v-flex>
            <v-layout row wrap>
                <v-flex xs12 sm6 v-for="favorite in userFavorites" :key="favorite._id">
                    <v-card class="mt-3 ml-1 mr-2" hover>
                        <v-img @click="goToPost(favorite._id)" height="30vh" :src="favorite.imageUrl"></v-img>
                        <v-card-text align="center">{{ favorite.title }}</v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>

        <!-- Posts created by user -->
        <v-container v-if="!userPosts.length">
            <v-layout row wrap>
                <v-flex xs12>
                    <h2>You have no posts yet. Go on and add some!</h2>
                </v-flex>
            </v-layout>
        </v-container>
        <v-container class="mt-3" v-else>
            <v-flex xs12>
                <h2 class="font-weight-light" align="center">Your Posts
                    <span class="font-weight-regular">({{ userPosts.length }})</span>
                </h2>
            </v-flex>
            <v-layout row wrap>
                <v-flex xs12 sm6 v-for="post in userPosts" :key="post._id">
                    <v-card class="mt-3 ml-1 mr-2" hover>
                        <v-btn @click="loadPost(post)" class="mt-1 mb-1 ml-2 mr-2" color="info" floating fab small dark>
                            <v-icon>edit</v-icon>
                        </v-btn>

                        <v-btn @click="handleDeleteUserPost(post)" class="mt-1 mb-1 ml-2 mr-2" color="error" floating fab small dark>
                            <v-icon>delete</v-icon>
                        </v-btn>

                        <v-img @click="goToPost(post._id)" height="30vh" :src="post.imageUrl"></v-img>
                        <v-card-text>{{ post.title }}</v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>

        <!-- Edit post dialog -->
        <v-dialog xs12 sm6 offset-sm3 persistent v-model="editPostDialog">
            <v-card>
                <v-card-title class="headline grey lighten-2">Update Post</v-card-title>
                <v-container>
                    <v-form @submit.prevent="handleUpdateUserPost" v-model="isFormValid" lazy-validation ref="form" align="center">
                        
                        <!-- Title input -->
                        <v-layout row>
                            <v-flex xs12>
                                <v-text-field :rules="titleRules" v-model="title" label="Post Title" type="text" required>
                                </v-text-field>
                            </v-flex>
                        </v-layout>

                        <!-- Image url -->
                        <v-layout row>
                            <v-flex xs12>
                                <v-text-field :rules="imageRules" v-model="imageUrl" label="Image URL" type="text" required>
                                </v-text-field>
                            </v-flex>
                        </v-layout>

                        <!-- Image Preview -->
                        <v-layout row>
                            <v-flex>
                                <img :src="imageUrl" height="300px">
                            </v-flex>
                        </v-layout>

                        <!-- Categories select -->
                        <v-layout row>
                            <v-flex xs12>
                                <v-select :rules="categoriesRules" v-model="categories" :items="['Art', 'Education', 'Travel', 'Photography', 'Technology']" multiple label="Categories">
                                </v-select>
                            </v-flex>
                        </v-layout>

                        <!-- Description text area -->
                        <v-layout row>
                            <v-flex xs12>
                                <v-textarea :rules="descRules" v-model="description" label="Description" type="text"></v-textarea>
                            </v-flex>
                        </v-layout>

                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn :disabled="!isFormValid" type="submit" class="success--text" text>Update</v-btn>
                            <v-btn class="error--text" text @click="editPostDialog = false">Cancel</v-btn>
                        </v-card-actions>

                    </v-form>
                </v-container>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment';

export default {
    name: 'Profile',
    data() {
        return {
            editPostDialog: false,
            isFormValid: true,
            title: '',
            imageUrl: '',
            categories: [],
            description: '',
            titleRules: [
                title => !!title || 'Title is required',
                title => title.length < 20 || 'Title must have less than 20 characters'
            ],
            imageRules: [
                image => !!image || 'Image is required'
            ],
            categoriesRules: [
                categories => categories.length > 0 || 'At least one category is required'
            ],
            descRules: [
                description => !!description || 'Description is required',
                description => description.length < 200 || 'Description must have less than 200 characters'
            ]
        }
    },
    computed: {
        ...mapGetters(['user', 'userFavorites', 'userPosts'])
    },
    created() {
        this.handleGetUserPosts();
    },
    methods: {
        handleGetUserPosts() {
            this.$store.dispatch('getUserPosts', {
                userId: this.user._id
            });
        },
        handleUpdateUserPost() {
            // update user post
            if (this.$refs.form.validate()) {
                this.$store.dispatch('updateUserPost', {
                    postId: this.postId,
                    userId: this.user._id,
                    title: this.title,
                    imageUrl: this.imageUrl,
                    categories: this.categories,
                    description: this.description
                });
                this.editPostDialog = false;
            }
        },
        handleDeleteUserPost(post) {
            this.loadPost(post, false);
            const deletePost = window.confirm('Are you sure you want to delete this post ?');

            if (deletePost) {
                this.$store.dispatch('deleteUserPost', {
                    postId: this.postId
                });
            }
        },
        loadPost({ _id, title, imageUrl, categories, description }, editPostDialog = true) {
            this.editPostDialog = editPostDialog;
            this.postId = _id;
            this.title = title;
            this.imageUrl = imageUrl;
            this.categories = categories;
            this.description = description;
        },
        goToPost(id) {
            this.$router.push(`/posts/${id}`);
        },
        formatJoinDate(date) {
            return moment(new Date(date)).format('ll');
        }
    }
}
</script>