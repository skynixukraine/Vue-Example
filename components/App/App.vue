<template lang="html">
    <div class="app">
        <slot></slot>
    </div>
</template>

<style lang="scss">
/*********************
START: GENERAL
*********************/
body {
    font-family: 'Sans', sans-serif;
    font-size: 18px;
    line-height: 1.55;
    color: $color-text-primary;
    font-weight: 400;
}

h1, h2, h3, h4, h5, h6 {
    font-family: 'Antiqua', serif;
    line-height: 1.33;
    color: $color-text-secondary;
    font-weight: 700;
    margin: 0 0 16px;
}

h1 {
    font-size: 64px;
    line-height: 76px;
    margin: 0 0 32px;
}

h2 {
    font-size: 48px;
    line-height: 64px;
}

h3 {
    font-weight: 600;
    font-size: 24px;
    line-height: 30px;
}

h4 {
    font-weight: 600;
    font-size: 18px;
    line-height: 28px;
}

p {
    margin: 0;
}

a {
    text-decoration: none;
}
/*********************
END: GENERAL
*********************/
/*********************
START: COMPONENTS
*********************/
// section
.section {
    padding-top: 112px;
    padding-bottom: 112px;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    &--fullscreen {
        min-height: 100vh;
    }

    &--without-paddings {
        padding-top: 0;
        padding-bottom: 0;
    }

    &--64 {
        padding-top: 64px;
        padding-bottom: 64px;
    }

    &--0-default {
        padding-top: 0px; 
    }
}

.section-header {
    margin-bottom: 48px;
 
    &__title {
        text-align: center;
        margin: 0;

        &--white {
            color: $color-white;
        }
    }
}

.section-footer {
    text-align: center;
    margin-top: 48px;
}

.section-scroll-tooltip {
    position: absolute;
    bottom: 24px;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;

    &__inner {
        width: 100%;
        height: 33px;
        max-width: 1120px;
        margin-left: auto;
        margin-right: auto;
        background-image: url('~static/images/icons/mouse-scroll.svg');
        background-position: left center;
        background-repeat: no-repeat;
        font-size: 15px;
        font-weight: 300;
        line-height: 1;
        color: $color-white;
        display: flex;
        align-items: center;
        padding-left: 34px;
    }
}



// container
.container {
    width: 100%;
    max-width: 1160px;
    padding: 0 20px;
    margin-right: auto;
    margin-left: auto;
}



// list
.list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;

    &__item {
        margin: 0 0 24px;
    }

    &--d3 {

        .list__item {
            flex: 0 0 100%;
        }
    }

    &--d4 {

        .list__item {
            flex: 0 0 100%;
        }
    }

    @include phone-big {

        &--d4 {

            .list__item {
                flex: 0 0 50%;
            }
        }
    }

    @include tablet {

        &--d3 {

            .list__item {
                flex: 0 0 33.33%;
            }
        }
    }

    @include tablet-big {

        &--d3 {

            .list__item {
                flex: 0 0 33.33%;
            }
        }

        &--d4 {

            .list__item {
                flex: 0 0 25%;
            }
        }
    }
}



// link
.link {
    display: inline;

    :hover {
        text-decoration: underline;
    }

    &--button {
        display: inline-block;
        text-align: center;
        padding: 20px 31px 16px;
        border-radius: 5px;
        font-size: 16px;
        line-height: 21px;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 1px;

        &-white {
            background: $color-white;
            color: $color-blue;
        }

        &-blue {
            background: $color-gradient-blue;
            color: $color-white;
        }
    }

    &--card {
        display: block;
        transition: all 200ms ease-in-out;

        &:hover {
            transform: translateY(-5px);
        }
    }
}
/*********************
END: COMPONENTS
*********************/

</style>