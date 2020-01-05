<template>
    <v-container mt-5 pt-5>

        <!-- Add Post title -->
        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <h1 align="center" class="primary--text">Add Post</h1>
            </v-flex>
        </v-layout>

        <!-- Add Post form -->
        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <v-form @submit.prevent="handleAddPost" v-model="isFormValid" lazy-validation ref="form" align="center">
                    
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

                    <v-layout row>
                        <v-flex xs12>
                            <v-btn :loading="loading"  :disabled="!isFormValid || loading" color="info" type="submit">
                                <span slot="loader" class="custom-loader">
                                    <v-icon light>cached</v-icon>
                                </span>
                                Submit
                            </v-btn>
                        </v-flex>
                    </v-layout>

                </v-form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'AddPost',
    data() {
        return {
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
        ...mapGetters(['user', 'loading'])
    },
    methods: {
        handleAddPost() {
            if (this.$refs.form.validate()) {
                //add post
                this.$store.dispatch('addPost', {
                    title: this.title,
                    imageUrl: this.imageUrl,
                    categories: this.categories,
                    description: this.description,
                    creatorId: this.user._id
                });
                this.$router.push("/");
            }
        }
    }
}
</script>