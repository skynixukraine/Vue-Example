<template>
    <div class="request-banner" :style="`background: url(${require('~/static/images/bg/abstract-bg-2.jpg')})`">
        <h2>{{ $t('headers.start-your-request-now') }}</h2>
        <NuxtLink :to="$routes.home.path" class="link link--button link--button-white" exact>{{ $t('links.learn-more') }}</NuxtLink>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.request-banner {
    color: $color-white;
}
</style>