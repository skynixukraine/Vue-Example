<template>
    <div class="user-avatar user-avatar__container" v-if="isLogin">
        <img 
            class="user-avatar__image"
            :src = "userAvatar"
            alt="user-avatar"
            v-if="userAvatar"
        >
        <div v-else class="user-avatar__no-image">
        </div>
        <div class="user-avatar__text" v-if="!userAvatar">
            <p>{{userNameAbbreviation}}</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            firstName: 'MaximilianMaximilian',
            lastName: 'ShvarzmullerShvarzmuller',
            isLogin: true,
            userAvatar: 'https://i.ya-webdesign.com/images/anonymous-png-avatar-17.png'
        }
    },
    methods: {
        getFirstLetter(string){
            return string.slice(0, 1).toUpperCase();
        }
    },
    computed: {
        userNameAbbreviation() {
            return `${this.getFirstLetter(this.firstName)}${this.getFirstLetter(this.lastName)}`
        },
        isDashboard (){
            return this.$route.name === "dashboard";
        },
    }
}
</script>

<style lang="scss" scoped>
.user-avatar {
    display: flex;
    align-items: center;

    &__container{
        position: relative;
    }
    
    &__image {
        width: 48px;
        height: 48px;
        min-width: 48px;
        border-radius: 50%;

        @include tablet-big {
            width: 64px;
            height: 64px;
            min-width: 64px;
        }
    }


    &__no-image {
        width: 48px;
        height: 48px;
        min-width: 48px;
        border-radius: 50%;
        background-color: green;

        @include tablet-big {
            width: 64px;
            height: 64px;
            min-width: 64px;
        }
    }


    &__text{
        position: absolute;
        left: 23%;
        display: flex;
        flex-direction: row;
        font-style: normal;
        font-weight: 520;
        font-size: 18px;
        line-height: 26px;
        color: $color-white;

        @include tablet-big {
            top:29%;
            font-size: 24px;
            line-height: 31px;
        }
    }

}
</style>