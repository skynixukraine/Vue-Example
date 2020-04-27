<template>
    <div class="hero-banner">
        <header class="hero-banner__header">
            <h1 class="hero-banner__title" v-bind:class="checkForSqueeze" >{{ $t('banners.herobanner.title') }}</h1>
        </header>
        <div class="hero-banner__main" v-bind:class="checkForSqueeze" >
            <p class="hero-banner__text" v-bind:class="checkForSqueeze" >{{ $t('banners.herobanner.description') }}</p>
        </div>
        <footer class="hero-banner__footer">
            <div class="hero-banner__footer-item">
                <NuxtLink
                    :to="this.$routes.hautarzt.path"
                    class="link link--button link--button-white"
                >{{ $t('links.start-inquiry') }}</NuxtLink>
            </div>
        </footer>
        <img
            class="hero-banner__phone" v-bind:class="checkForSqueeze"
            :src="require('~/static/images/images/iPhone_banner.png')"
            alt="iphone"
        />
    </div>
</template>

<script>
export default {
    computed:{
        checkForSqueeze(){
            const supportClass = 'height-squeeze';
            if (this.isHome()){
                return supportClass;
            } else {
                return ''
            }
        }
    },
    methods: {
        isHome(){
            return this.$route.name === "index";
        }
    }
};
</script>

<style lang="scss" scoped>
.hero-banner {
    position: relative;
    margin-top: 50px;
    @include phone-big-max {
        padding: 0 15px;
		&__title,
		&__text {
			text-align: left;
		}
	}

    @include tablet {
        margin-top: auto;
    }

    &__main {
        margin-bottom: 64px;
    }
    
    &__main.height-squeeze{
        @include height-squeeze{
            margin-top: 30px;
            margin-bottom: 30px;
            width: 60%;
        }
    }

    &__title {
        color: $color-white;
        font-family: $TheAntiquaB;
        
    }
    
    &__title.height-squeeze{
        
        @include height-squeeze{
            margin: 0 0 16px;
            font-size: 60px;
            line-height: 70px;
        }
    }

    &__text {
        font-weight: 400;
        font-size: 19px;
        line-height: 30px;
        color: $color-white;
    }
    
    &__text.height-squeeze{
    
        @include height-squeeze{
            line-height: 1.5;
        }
    }

    &__footer {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        position : relative;
        z-index : 1;
    }

    &__footer-item {
        &:first-child {
            margin-bottom: 16px;
        }
    }

    &__footer-item .link--button {
        max-width: 295px;
    }

    &__phone {
        display: none;
    }
    
    &__phone.height-squeeze{
    
        @include height-squeeze{
            right: -165px;
            top: 0px;
        }
    }


    @include tablet {
        &__footer {
            flex-direction: row;
        }

        &__footer-item {
            &:first-child {
                margin-bottom: 0;
                margin-right: 16px;
            }
        }
    }

    @include tablet-big {
        &__header {
            width: 55%;
        }

        &__main {
            width: 55%;
        }

        &__footer {
            justify-content: flex-start;
        }

        &__phone {
            width: 65%;
            display: block;
            position: absolute;
            right: -191px;
            top: 2px;
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