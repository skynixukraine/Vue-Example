<template>
    <div class="hero-banner">
        <header class="hero-banner__header">
            <h1 class="hero-banner__title">{{ $t('banners.herobanner.title') }}</h1>
        </header>
        <div class="hero-banner__main">
            <p class="hero-banner__text">{{ $t('banners.herobanner.description') }}</p>
        </div>
        <footer class="hero-banner__footer">
            <NuxtLink :to="this.$routes.home.path" class="link link--button link--button-white">{{ $t('links.start-inquiry') }}</NuxtLink>
        </footer>
        <img class="hero-banner__phone" :src="require('~/static/images/images/iphone.png')" alt="iphone" />
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.hero-banner {
    position: relative;

    &__main {
        margin-bottom: 64px;
    }

    &__title {
        color: $color-white;
    }

    &__text {
        font-weight: 400;
        font-size: 20px;
        line-height: 30px;
        color: $color-white;
    }

    &__footer {
        text-align: center;
    }

    &__phone {
        display: none;
    }


    @include tablet-big {

        &__header {
            width: 55%;
        }

        &__main {
            width: 55%;
        }

        &__footer {
            text-align: left;
        }

        &__phone {
            display: block;
            position: absolute;
            top: -30px;
            right: -130px;
        }
    }

    @include desktop {

        &__header {
            width: 60%;
        }

        &__main {
            width: 60%;
        }
    }
}
</style>