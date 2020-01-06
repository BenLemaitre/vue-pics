<template>
    <v-container mt-5 pt-5>

        <!-- Sign in title -->
        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <h1 align="center">Welcome back!</h1>
            </v-flex>
        </v-layout>
        
        <!-- Error alert -->
        <v-layout v-if="error" row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <form-alert :message="error.message"></form-alert>
            </v-flex>
        </v-layout>

        <!-- Sign in form -->
        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <v-card color="accent" dark>
                    <v-container pl-8 pr-8>
                        <v-form @submit.prevent="handleSigninUser" v-model="isFormValid" lazy-validation ref="form" align="center">

                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field :rules="usernameRules" v-model="username" prepend-icon="face" label="Username" type="text" required>
                                    </v-text-field>
                                </v-flex>
                            </v-layout>

                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field :rules="passwordRules" v-model="password" prepend-icon="extension" label="Password" type="password" required>
                                    </v-text-field>
                                </v-flex>
                            </v-layout>

                            <v-layout row>
                                <v-flex xs12>
                                    <v-btn :loading="loading"  :disabled="!isFormValid || loading" color="secondary" type="submit">
                                        <span slot="loader" class="custom-loader">
                                            <v-icon light>cached</v-icon>
                                        </span>
                                        Signin
                                    </v-btn>
                                    <h3>Don't have an account ?
                                        <router-link color="white" to="/signup">Signup</router-link>
                                    </h3>
                                </v-flex>
                            </v-layout>

                        </v-form>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {

    name: 'Signin',
    data() {
        return {
            isFormValid: true,
            username: '',
            password: '',
            usernameRules: [
                // check username
                username => !!username || 'Username is required',
                // less than 10 chars
                username => username.length < 15 || 'Username must be less than 15 characters'
            ],
            passwordRules: [
                // check password
                password => !!password || 'Password is required',
                // At least 6 chars
                password => password.length >= 4 || 'Password must be at least 4 characters'
            ]
        }
    },
    computed: {
        ...mapGetters(['user', 'error', 'loading'])
    },
    watch: {
        user(value) {
            // if user changes to object => redirect to homepage
            if (value) {
                this.$router.push("/");
            }
        }
    },
    methods: {
        handleSigninUser() {
            if (this.$refs.form.validate()) {
                this.$store.dispatch('signinUser', {
                    username: this.username,
                    password: this.password
                });
            }
        }
    }
}
</script>

<style>
.custom-loader {
    animation: loader 1s infinite;
    display: flex;
}

@-moz-keyframes loader {
from {
    transform: rotate(0);
}
    to {
        transform: rotate(360deg);
    }
}
@-webkit-keyframes loader {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
@-o-keyframes loader {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
@keyframes loader {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>