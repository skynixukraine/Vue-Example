<template>
    <NuxtLink :to="$routes.home.path" class="link app-logo__link">
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
        background-image: url("~static/images/icons/logo.svg");
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
    }

    &__text {
        width: 150px;
        margin-left: 10px;
        font-family: $font-family-secondary;
        color: $color-white;
        font-size: 18px;
        line-height: 1.3;
    }

    &__link {
        &:hover {
            .app-logo__text {
                text-decoration: underline;
            }
        }
    }

    @include phone-big {
        .app-logo {
            &__text {
                width: 100%;
            }
        }
    }

    @include tablet-big {
        & .app-logo__image {
            width: 64px;
            height: 64px;
            min-width: 64px;
        }

        & .app-logo__text {
            font-size: 24px;
        }
    }
}
</style>