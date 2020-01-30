<template>
    <NuxtLink :to="$routes.dashboard.path" exact>
        <div 
            class="header-user-info" v-if="$store.getters['user/USER']"
            :class="{ 'header-user-info-dashboard': isDashboard }"
        
        >
            <div 
                class="header-user-info__text">
                <div 
                    class="header-user-info__item"
                    :class="{ 'header-user-info__item-dashboard': isDashboard }"
                >
                    {{ 
                        $store.getters['user/USER'].first_name && $store.getters['user/USER'].last_name ? 
                        $store.getters['user/USER'].first_name + " " + $store.getters['user/USER'].last_name : 
                        $store.getters['user/USER'].email 
                    }}
                </div>
                <div class="header-user-info__item__is-active-user" v-if="isActiveUser">
                    <p>Active</p>
                </div>
            </div>  
            <div class="header-user-info__item">
                <UserAvatar />
            </div>
        </div>
    </NuxtLink>
</template>

<script>
import UserAvatar from "~/components/User/UserAvatar";

export default {
    data() {
        return {
            isLogin: true,
        }
    },
    computed: {
        links() {
            return [
                {
                    to: this.$routes.dashboard.path,
                }
            ]
        },

        isDashboard (){
            return this.$route.name === "dashboard";
        },

        isActiveUser(){
            return this.$store.getters['user/USER'] && this.$store.getters['user/USER'].status  !== 'ACTIVATED'
        }
    },
    components: {
        UserAvatar
    }
}
</script>

<style lang="scss" scoped>
.header-user-info {
    width: 100%;
    max-width: 300px;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row-reverse;
    background: $color-stratos;
    transition: left 200ms ease-in-out;

    &-dashboard{
        background: $color-white;
    }

    &__text{
        font-size: 18px;
        line-height: 20px;
        padding-left: 10px;
    }

    &__item {
        margin-bottom: 16px;
        margin-bottom: 0;
        display: block;
        font-weight: 400;
        text-decoration: none;
        color: $color-white;
        
        // hide user name
        &:first-child{
            display: none;
        
            @media (min-width: #{1130px}) {
                display: flex;
            }
        }

        &:last-child {
            margin-bottom: 0;
        }

        &__is-active-user {
            display: none;
            color: $color-user-is-active;
            font-size: 14px;

            @media (min-width: #{1130px}) {
                display: flex;
            }
        }

        &-dashboard{
            font-style: normal;
            font-weight: 520;
            font-size: 18px;
            color: $color-rolling-stone;
        }
    }

    @include tablet-big {
        background: transparent;
        padding: 0;
    
        &__item {
            &:last-child {
                margin-right: 0;
            }
        }
    }
}
</style>