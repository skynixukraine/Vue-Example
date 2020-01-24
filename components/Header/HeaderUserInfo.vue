<template>
    <div 
        class="header-user-info" v-if="isLogin"
        :class="{ 'header-user-info-dashboard': isDashboard }"
    >
        <div 
            class="header-user-info__text">
            <div 
                class="header-user-info__item"
                :class="{ 'header-user-info__item-dashboard': isDashboard }"
            >
                {{ firstName }} {{ lastName }}
            </div>
            <div class="header-user-info__item__is-active-user" v-if="isActive">
                <p>Active</p>
            </div>
        
        </div>  
        <div class="header-user-info__item">
            <UserAvatar />
        </div>
    </div>
</template>


<script>
import UserAvatar from "~/components/User/UserAvatar";


export default {
    data() {
        return {
            firstName: 'MaximilianMaximilian',
            lastName: 'ShvarzmullerShvarzmuller',
            isLogin: true,
            // Text if user is active
            isActive: false,
        }
    },
    computed: {
        isDashboard (){
            return this.$route.name === "dashboard";
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
        line-height: 20px
    }

    &__item {
        margin-bottom: 16px;
        padding-left: 10px;
        margin-bottom: 0;
        display: block;
        font-size: 16px;
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
            padding-left: 10px;

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