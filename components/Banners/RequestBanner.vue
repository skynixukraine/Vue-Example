<template>
    <div class="request-banner" :style="`background-image: url(${require('~/static/images/bg/abstract-bg-2.jpg')})`">
        <h2 class="request-banner__title">{{ $t('headers.start-your-request-now') }}</h2>
        <NuxtLink :to="$routes.home.path" class="link link--button link--button-white" exact>{{ $t('links.learn-more') }}</NuxtLink>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.request-banner {
    padding: 48px 20px;
    text-align: center;
    border-radius: 20px;
    background-position: center bottom;
    background-repeat: no-repeat;
    background-size: cover;

    &__title {
        color: $color-white;
        margin-bottom: 32px;
    }
}
</style>