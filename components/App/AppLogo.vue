<template>
    <NuxtLink :to="$routes.home.path" class="link">
        <div class="app-logo">
            <div class="app-logo__image"></div>
            <div class="app-logo__text">{{ $t('links.logo-link') }}</div>
        </div>
    </NuxtLink>
</template>

<style lang="scss" scoped>
.app-logo {
    display: flex;
    align-items: center;

    &__image {
        width: 48px;
        height: 48px;
        min-width: 48px;
        background-image: url('~static/images/icons/logo.svg');
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
    }

    &__text {
        margin-left: 10px;
        font-family: $font-family-secondary;
        color: $color-white;
        font-size: 18px;
        line-height: 1.3;
    }


    @include tablet-big {

        & .logo__image {
            width: 52px;
            height: 52px;
            min-width: 52px;
        }

        & .logo__text {
            font-size: 24px;
        }
    }
}
</style>