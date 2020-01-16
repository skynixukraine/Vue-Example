<template>
    <div class="page">
        <div class="section">
            <div class="container">
                <div class="tab-buttons">
                    <button
                        class="link link--button link--button-blue"
                        @click="setCurrentTab('signin')"
                    >Sign In</button>
                    <button
                        class="link link--button link--button-blue"
                        @click="setCurrentTab('signup')"
                    >Sign Up</button>
                </div>
                <!-- <div class="container-forms">
                    <SigninForm />
                    <SignupForm />
                </div>-->

                <div class="container-forms">
                    <template v-if="windowWidth  > 768 || currentTab === 'signin'">
                        <SigninForm />
                    </template>
                    <template v-if="windowWidth  > 768 || currentTab === 'signup'">
                        <SignupForm />
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// Mixins
import windowWidth from "~/mixins/window";
// Components
import SigninForm from "~/components/Authorization/SigninForm";
import SignupForm from "~/components/Authorization/SignupForm";

const DEFAULT_CURRENT_TAB = "signin";

export default {
    mixins: [windowWidth],

    beforeCreate() {
        this.$store.dispatch("user/AUTOLOGIN_USER");
    },
    data() {
        return {
            currentTab: DEFAULT_CURRENT_TAB
        };
    },
    methods: {
        setCurrentTab(tabName) {
            this.currentTab = tabName;
        }
    },
    components: {
        SigninForm,
        SignupForm
    }
};
</script>


<style lang="scss">
.container-forms {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;

    @include desktop {
        justify-content: space-between;
    }
}

.tab-buttons {
    display: flex;
    flex-direction: column;
    align-content: center;
    margin: 0 auto;

    @include tablet {
        display: none;
    }

    .link {
        &--button {
            width: 300px;
            margin: 2% auto;
            border-radius: 4px;

            @include phone-big {
                height: 56px;
                width: 400px;
            }
            @include tablet {
                width: 544px;
            }
        }

        &--button-blue {
            background: linear-gradient(90deg, #0f44b2 0%, #247ee5 100%);
            border: 1px solid #0f44b2;

            &:hover {
                background: linear-gradient(90deg, #0f44b2 0%, #247ee5 100%);
                border: 1px solid #0f44b2;
            }
        }
    }
}
</style>