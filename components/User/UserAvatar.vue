<template>
    <div class="user-avatar">
        <img class="user-avatar__image" src="https://www.fillmurray.com/640/360" alt="">
    </div>
</template>

<script>
export default {
    name: 'UserAvatar'
}
</script>

<style lang="scss" scoped>
.user-avatar {
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