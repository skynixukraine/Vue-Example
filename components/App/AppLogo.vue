<template>
    <NuxtLink :to="$routes.home.path" class="link app-logo__link">
        <div class="app-logo">
            <div
                class="app-logo__image"
                :class="{ 'app-logo__image-dashboard': isDashboard }"
            ></div>
            <div 
                class="app-logo__text"
                :class="{ 'app-logo__text-dashboard': isDashboard }"
            >{{ $t('links.logo-link') }}</div>
        </div>
    </NuxtLink>
</template>


<script>
export default {
    computed: {
        isDashboard (){
            return this.$route.name === "dashboard";
        }
    }
}
</script>

<style lang="scss" scoped>
.app-logo {
    display: flex;
    align-items: center;

    &__image, &__image-dashboard{
        width: 48px;
        height: 48px;
        min-width: 48px;
        background-image: url("~static/images/icons/logo.svg");
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;

        &-dashboard{
            background-image: url("~static/images/icons/logo_blue.svg");
        }
    }

    &__text {
        width: 150px;
        margin-left: 10px;
        font-family: $TheAntiquaB;
        color: $color-white;
        font-size: 18px;
        line-height: 1.3;
        font-weight: bold;

        &-dashboard{
            color: $color-curious-blue;
        }
    }

    &__link {
        :hover {
            text-decoration: none;
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
        & .app-logo__image, .app-logo__image-dashboard{
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