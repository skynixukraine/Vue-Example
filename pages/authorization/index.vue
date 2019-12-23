<template>
    <div class="page">
        <Section>
            <Container>
                <button class="link link--button link--button-white" @click="setCurrentTab('signin')">Sign In</button>
                <button class="link link--button link--button-white" @click="setCurrentTab('signup')">Sign Up</button>
                <template v-if="currentTab === 'signin'">
                    <SigninForm />
                </template>
                <template v-if="currentTab === 'signup'">
                    <SignupForm />
                </template>
            </Container>
        </Section>
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