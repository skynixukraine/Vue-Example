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
    /*font-family: "Sans", sans-serif;*/
    font-family: TheSansB, sans-serif;
    font-size: 18px;
    line-height: 1.55;
    color: $color-rolling-stone;
    font-weight: 400;
    background-color: $color-black-squeeze;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    font-family: "Antiqua", sans-serif;
    line-height: 1.33;
    color: $color-curious-blue;
    font-weight: 700;
    margin: 0 0 16px;
}

h1 {
    font-size: 36px;
    line-height: 46px;
    margin: 0 0 32px;
}

h2 {
    font-size: 36px;
    line-height: 46px;
    font-weight: 800;
    margin: 0 0 32px;
}

h3 {
    font-weight: 400;
    font-size: 24px;
    line-height: 30px;
}

h4 {
    font-weight: 600;
    font-size: 20px;
    line-height: 26px;
}

p {
    margin: 0;
}

a {
    text-decoration: none;
}

button {
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;

    &:active,
    &:focus {
        outline: none;
    }
}

@include tablet {
    h1 {
        font-size: 64px;
        line-height: 76px;
        margin: 0 0 32px;
    }

    h2 {
        font-size: 48px;
        line-height: 64px;
        font-weight: 800;
    }
}

.app {
    overflow-x: hidden;
    overflow-y: auto;
}

/*********************
END: GENERAL
*********************/
/*********************
START: COMPONENTS
*********************/

// page
.page {
    padding-top: 68px;

    &.page--no-padding {
        padding-top: 0;
    }

    @include tablet-big {
        padding-top: 80px;

        &.page--home {
            background: url("~static/images/images/rectangle-right.png") right
                    78.5% no-repeat,
                url("~static/images/images/rectangle-left.png") left bottom
                    no-repeat;
        }
    }
}

// section
.section {
    padding-top: 64px;
    padding-bottom: 64px;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    &.section--fullscreen {
        min-height: 100vh;
    }

    &.section--0-0 {
        padding-top: 0;
        padding-bottom: 0;
    }

    &.section--32-32 {
        padding-top: 32px;
        padding-bottom: 32px;
    }

    &.section--64-64 {
        padding-top: 64px;
        padding-bottom: 64px;
    }

    &.section--0-default {
        padding-top: 0px;
    }

    &.section--default-0 {
        padding-bottom: 0px;
    }

    @include tablet-big {
        padding-top: 112px;
        padding-bottom: 112px;

        &.section--bg-right-1 {
            background-image: url("~static/images/images/rectangle-right.png");
            background-size: auto;
            background-position: right center;
        }

        &.section--bg-left-2 {
            background-image: url("~static/images/images/rectangle-left.png");
            background-size: auto;
            background-position: 0 20%;
        }
    }
}


.section-not-padding {
    padding: 0;
}

.section-header {
    margin-bottom: 32px;

    &__title {
        margin: 0;

        &--white {
            color: $color-white;
        }
    }

    @include tablet {
        margin-bottom: 48px;

        &__title {
            text-align: center;
        }
    }
}

.section-footer {
    text-align: center;
    margin-top: 32px;

    @include tablet {
        margin-top: 48px;
    }
}

.section-scroll-tooltip {
    position: absolute;
    bottom: 10px;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 0 $main_offset;

    &__inner {
        width: 33.33%;
        height: 4px;
        background: $color-white;
        margin: 0 auto;
        border-radius: 10px;
        text-indent: -9999px;
    }

    @include tablet-big {
        bottom: 24px;

        &__inner {
            width: 100%;
            height: 33px;
            max-width: 1120px;
            margin-left: auto;
            margin-right: auto;
            background: none;
            background-image: url("~static/images/icons/mouse-scroll.svg");
            background-position: left center;
            background-repeat: no-repeat;
            font-size: 15px;
            font-weight: 300;
            line-height: 1;
            color: $color-white;
            display: flex;
            align-items: center;
            padding-left: 34px;
            text-indent: 0;
        }
    }
}

// container
.container {
    width: 100%;
    max-width: 1160px;
    padding: 0 $main_offset;
    margin-right: auto;
    margin-left: auto;
    position: relative;
    
    &-big {
        width: 100%;
        max-width: 1366px;
        margin-right: auto;
        margin-left: auto;
    }

    &__dots {
        display: none;
    }

    @include tablet-big {
        &__dots {
            display: block;

            &--1 {
                position: absolute;
                top: -74px;
                right: -75px;
            }

            &--2 {
                position: absolute;
                bottom: -74px;
                left: -75px;
            }

            &--3 {
                position: absolute;
                top: -186px;
                right: 0;
            }
        }
    }
}


// list
.list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;

    &__item {
        flex: 0 0 100%;
        margin: 0 0 32px;

        &:last-child {
            margin: 0;
        }
    }

    &--d3 {
        .list__item {
            flex: 0 0 100%;
            padding: 16px;
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
    transition: all $transition ease-in-out;

    :hover {
        text-decoration: underline;
    }

    :focus {
        outline: none;
    }

    &--button {
        width: auto;
        min-width: 265px;
        display: inline-block;
        text-align: center;
        padding: $main_offset 31px 16px;
        border-radius: 5px;
        font-size: 16px;
        line-height: 21px;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 2px;
        border-width: 1px;
        border-style: solid;

        &-full-width {
            width: 100%
        }


        &-white {
            background: $color-white;
            color: $color-curious-blue;
            border-color: $color-white;

            &:hover {
                background: $color-solitude;
            }

            &:active {
                background: $color-solitude;
            }
        }

        &-blue {
            background: $color-gradient-button-blue;
            color: $color-white;
            border-color: $color-torea-bay;

            &:hover {
                background: $color-torea-bay;
            }

            &:active {
                background-attachment: $color-tory-blue;
            }
        }

        &-gradient {
            background: $color-gradient-blue-light;
            color: $color-white;
            border-color: $color-gradient-blue-light;

            &:hover {
                background: $color-gradient-blue-dark;
            }

            &:active {
                background: $color-gradient-blue-dark;
            }
        }

        &-transparent {
            background: $color-transparent;
            color: $color-curious-blue;
            border-color: $color-transparent;

            &:hover {
                background: $color-solitude;
            }

            &:active {
                background: $color-solitude;
            }
        }

        &-upload {
                position: relative;
                text-align: left;
                background: $color-white;
                border: 2px solid $color-curious-blue;
                box-sizing: border-box;
                border-radius: 4px;
                color: rgba(122, 125, 132, 0.5);
                font-size: 18px;
                text-transform: lowercase;
                line-height: 18px;
                letter-spacing: normal;

                ::first-letter {
                    text-transform: uppercase;
                }

                p {
                    padding-left: 12px;
                }
                img {
                    position: absolute;
                    top: 12px;
                    left: 11px;
                }
            }
        
        &-mobile-large{
            padding: $main_offset 16px 16px;

            @media (min-width: #{$screen-phone-irregular-min}) {
            padding: $main_offset 31px 16px;
            }
        }
    }

    &--card {
        display: block;

        &:hover {
            transform: translateY(-5px);
        }
    }

    &--small-blue{
        color:$color-curious-blue;
        border-bottom: 1px solid $color-terms-text-decoration
    }
}

// input
.input, .select {
    width: 100%;
    height: 40px;
    background: $color-white;
    border: 2px solid $color-curious-blue;
    box-sizing: border-box;
    border-radius: 4px;
    padding-left: 6%;

    @include phone-big {
        height: 56px;
    }
}
.input{
        &::placeholder {
            color: $color-form-input-placeholder;
            font-style: normal;
            font-weight: 500;
        }

        &::-webkit-input-placeholder {
            color: $color-form-input-placeholder;
            font-style: normal;
            font-weight: 500;
        }

        &::-moz-placeholder {
            color: $color-form-input-placeholder;
            font-style: normal;
            font-weight: 500;
        }/* Firefox 19+ */

        &:-moz-placeholder {
            color: $color-form-input-placeholder;
            font-style: normal;
            font-weight: 500;
            }/* Firefox 18- */
            
        &:-ms-input-placeholder {
            color: $color-form-input-placeholder;
            font-style: normal;
            font-weight: 500;
        }
    &--hidden {
        width: 0;
        height: 0;
        position: fixed;
        top: -9999px;
    }
}

 .select {
    -moz-appearance    : none;
    -webkit-appearance : none;
}
 
 
 //table
.table {
    position      : relative;
    margin-bottom : 50px;
    margin-left   : 0px;
    
    @include  desktop-l {
        margin-left   : -25px;
    }
    
    &__info {
        top         : -57px;
        right       : 0;
        display     : flex;
        position    : absolute;
        align-items : center;
        
        &-nav {
            display     : flex;
            align-items : center;
            margin-left : 31px;
        }
        
        &-link {
            &:after {
                $size : 20px;
                width   : $size;
                height  : $size;
                display : block;
                content : ' ';
            }
        }
        
        &-prev {
            &:after {
                transform        : rotate(90deg);
                background-image : url("~static/images/icons/arrow-down.svg");
                
            }
        }
        
        &-next {
            margin-left : $main_offset;
            
            &:after {
                transform        : rotate(-90deg);
                background-image : url("~static/images/icons/arrow-down.svg");
            }
        }
    }
    
    &__header {
        display        : none;
        position       : relative;
        padding-bottom : 10px;
        
		@include tablet {
			display    : flex;
		}
        
        &:after {
            right            : 0;
            width            : calc(100% - 15px);
            height           : 9px;
            bottom           : 0;
            content          : ' ';
            position         : absolute;
            background-color : $color-table-border;
            
            @include  desktop-l {
                width        : calc(100% - 25px);
            }
        }
        
        &-item {
            color      : $color-curious-blue;
            padding    : 0px 0px 5px 15px;
            flex-basis : 25%;
            
            @include  desktop-l {
                padding-left : 25px;
            }
        }
    }
    
    &__main {
		text-align: left;
        &-items {
            color          : $color-rolling-stone;
            display        : flex;
            position       : relative;
            min-height     : 57px;
            padding-top    : 10px;
            border-radius  : 4px;
            padding-bottom : 10px;
			flex-direction : column;
	
			@include tablet {
				flex-direction : row;
			}
			
            &:after {
                right            : 0;
                width            : calc(100% - 25px);
                height           : 1px;
                bottom           : 0;
                content          : ' ';
                position         : absolute;
                background-color : $color-table-border;
            }
            
            &:hover {
                color            : $color-river-bed;
                cursor           : pointer;
                background-color : $color-white;
            }
        }
        
        &-item {
            flex-basis   : 25%;
            padding-left : 15px;
            
            @include  desktop-l {
                padding-left : 25px;
            }
        }
    }
    
    
}

/*********************
END: COMPONENTS
*********************/
/*********************
START: CUSTOM BUTTONS
*********************/

// buttons with icons
.button-more-less {
    display: inline-block;
    background: none;
    border: none;
    color: $color-curious-blue;
    cursor: pointer;
    padding: 0;

    &::before {
        content: "+";
        display: inline-flex;
        justify-content: center;
        align-items: center;
        line-height: 1;
        font-size: 28px;
        width: 32px;
        height: 32px;
        border: 1px solid rgba(36, 126, 229, 0.1);
        box-shadow: 0px 20px 80px rgba(208, 208, 208, 0.25);
        border-radius: 50%;
        margin-right: 8px;
    }
}
/*********************
END: CUSTOM BUTTONS
*********************/
</style>