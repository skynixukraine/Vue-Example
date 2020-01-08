<template>
    <div class="breadcrumbs">
        <div class="breadcrumbs__item" v-for="(crumb, index) in breadcrumbs" :key="index">
            <template v-if="crumb.hasOwnProperty('to') && index === 0">
                <nuxt-link class="breadcrumbs__link breadcrumbs__link--home" :to="crumb.to">
                    <svg viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 19.9999H4C3.73478 19.9999 3.48043 19.8946 3.29289 19.707C3.10536 19.5195 3 19.2651 3 18.9999V9.99992H0L10.327 0.61192C10.5111 0.444398 10.7511 0.351562 11 0.351562C11.2489 0.351563 11.4889 0.444398 11.673 0.61192L22 9.99992H19V18.9999C19 19.2651 18.8946 19.5195 18.7071 19.707C18.5196 19.8946 18.2652 19.9999 18 19.9999ZM5 17.9999H17V8.15692L11 2.70292L5 8.15692V17.9999ZM7 13.9999H15V15.9999H7V13.9999Z"/>
                    </svg>
                </nuxt-link>
            </template>
            <template v-if="crumb.hasOwnProperty('to') && index > 0">
                <nuxt-link class="breadcrumbs__link" :to="crumb.to">{{ crumb.text }}</nuxt-link>
            </template>
            <template v-if="!crumb.hasOwnProperty('to')">
                <span class="breadcrumbs__text">{{ crumb.text }}</span>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        breadcrumbs: {
            type: Array,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
.breadcrumbs {
    display: flex;

    &__item {
        margin-right: 3px;
        font-size: 15px;
        line-height: 19px;

        &:first-child {
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;

            & > * {
                border-top-left-radius: 4px;
                border-bottom-left-radius: 4px;
            }
        }

        &:last-child {
            margin-right: 0;
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;

            & > * {
                border-top-right-radius: 4px;
                border-bottom-right-radius: 4px;
            }
        }
    }

    &__link {
        display: flex;
        background-color: $color-matisse;
        padding: 13px 14px 11px;
        color: $color-white;
        transition: all 200ms ease-in-out;

        svg {
            width: 22px;
            height: 19px;
            fill: $color-white;
        }

        &:hover {
            background-color: $color-mercury;
            color: $color-matisse;

            svg {
                fill: $color-matisse;
            }
        }

        &--home {
            width: 43px;
        }
    }

    &__text {
        display: flex;
        background-color: $color-mercury;
        padding: 13px 14px 11px;
        color: $color-matisse;
    }
}
</style>