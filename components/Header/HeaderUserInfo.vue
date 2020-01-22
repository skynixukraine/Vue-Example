<template>
    <div class="header-user-info">
        <div class="header-user-info__item">
            {{ firstName }} {{ lastName }}
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
            firstName: 'Maximilian',
            lastName: 'Shvarzmuller'
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
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row-reverse;
    background: $color-stratos;
    transition: left 200ms ease-in-out;

    &__item {
        margin-bottom: 16px;
        padding-left: 10px;
        margin-bottom: 0;
        display: block;
        font-size: 16px;
        font-weight: 400;
        color: $color-white;
        text-decoration: none;
        color: $color-white;

        &:first-child{
            display: none;
        
        @media (min-width: #{1130px}) {
            display: flex;
        }
    }

        &:last-child {
            margin-bottom: 0;
        }
    }

    @include tablet-big {
        // position: static;
        background: transparent;
        padding: 0;
        // flex-direction: row-reverse;
    
        &__item {
            &:last-child {
                margin-right: 0;
            }
        }
    }
}
</style>