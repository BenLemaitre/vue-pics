<template>
    <v-container mt-5 pt-5>

        <!-- Sign up title -->
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

        <!-- Sign up form -->
        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <v-card color="accent" dark>
                    <v-container pl-8 pr-8>
                        <v-form @submit.prevent="handleSignupUser" v-model="isFormValid" lazy-validation ref="form" align="center">

                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field :rules="usernameRules" v-model="username" prepend-icon="face" label="Username" type="text" required>
                                    </v-text-field>
                                </v-flex>
                            </v-layout>

                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field :rules="emailRules" v-model="email" prepend-icon="email" label="Email" type="email" required>
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
                                    <v-text-field :rules="passwordRules" v-model="passwordConfirmation" prepend-icon="gavel" label="Confirm Password" type="password" required>
                                    </v-text-field>
                                </v-flex>
                            </v-layout>

                            <v-layout row>
                                <v-flex xs12>
                                    <v-btn :loading="loading"  :disabled="!isFormValid || loading" color="info" type="submit">
                                        <span slot="loader" class="custom-loader">
                                            <v-icon light>cached</v-icon>
                                        </span>
                                        Signup
                                    </v-btn>
                                    <h3>Already have an account ?
                                        <router-link to="/signin">Signin</router-link>
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
    name: 'Signup',
    data() {
        return {
            isFormValid: true,
            username: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            usernameRules: [
                // check username
                username => !!username || 'Username is required',
                // less than 10 chars
                username => username.length < 15 || 'Username cannot be more than 15 characters'
            ],
            emailRules: [
                // check username
                email => !!email || 'Username is required',
                email => /.@+./.test(email) || 'Email must be valid'
            ],
            passwordRules: [
                // check password
                password => !!password || 'Password is required',
                // At least 6 chars
                password => password.length >= 4 || 'Password must be at least 4 characters',
                confirmation => confirmation === this.password || 'Passwords must match'
            ]
        }
    },
    watch: {
        user(value) {
            if (value) {
                this.$router.push("/");
            }
        }
    },
    computed: {
        ...mapGetters(['error', 'loading', 'user'])
    },
    methods: {
        handleSignupUser() {
            if (this.$refs.form.validate()) {
                this.$store.dispatch('signupUser', {
                    username: this.username,
                    email: this.email,
                    password: this.password
                });
            }
        }
    }
}
</script>