<template>
    <div class="user-avatar">
        <img class="user-avatar__image" src="https://cdn1.iconfinder.com/data/icons/ninja-things-1/720/ninja-background-512.png" alt="user-avatar">
    </div>
</template>

<script>
export default {
    name: 'UserAvatar'
}
</script>

<style lang="scss" scoped>
.user-avatar {
    display: flex;
    align-items: center;
    
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
}
</style>