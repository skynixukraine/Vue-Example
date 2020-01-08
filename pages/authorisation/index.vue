<template>
    <div class="page">
        <div class="section">
            <div class="container">
                <button class="link link--button link--button-white" @click="setCurrentTab('signin')">Sign In</button>
                <button class="link link--button link--button-white" @click="setCurrentTab('signup')">Sign Up</button>
                <template v-if="currentTab === 'signin'">
                    <SigninForm />
                </template>
                <template v-if="currentTab === 'signup'">
                    <SignupForm />
                </template>
                <button>Forgot Password?</button>
            </div>
        </div>
    </div>
</template>

<script>
import SigninForm from "~/components/Authorization/SigninForm"
import SignupForm from "~/components/Authorization/SignupForm"

export default {
    data() {
        return {
            currentTab: 'signin',
        }
    },
    methods: {
        setCurrentTab(tabName) {
            this.currentTab = tabName
        },
    },
    components: {
        SigninForm,
        SignupForm,
    }
}
</script>