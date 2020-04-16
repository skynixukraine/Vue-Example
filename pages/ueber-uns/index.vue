<template>
    <div class="page">
        <div class = "section ueber-uns-section"
             :style = "{ backgroundImage: `url(${require('~/static/images/bg/abstract-bg-new.jpg')})`}"
        >
            <div class = "container container__mobile-adaptation">
                <h1 class ="ueber-uns-title title">{{this.$t('ueber-uns.head.title1')}}</h1>
                <h3 class ="ueber-uns-h3">{{this.$t('ueber-uns.head.title2')}}</h3>
                <h3 class ="ueber-uns-h3">{{this.$t('ueber-uns.head.title3')}}</h3>
            </div>
        </div>
        <div class="container">
            <p class="ueber-uns-block__paragraph">
                {{this.$t('ueber-uns.p1_1')}}
                <a href="https://www.nct-heidelberg.de/das-nct/newsroom/pressemitteilungen/details/fachaerztliche-diagnose-mit-appdoc-verdaechtige-hautflecken-digital-ueberpruefen-lassen.html" class="link link--small-blue">
                    {{this.$t('ueber-uns.p1_a1')}}
                </a>
                {{this.$t('ueber-uns.p1_2')}}
            </p>
            <h3 class = "ueber-uns-block__title">{{ this.$t('ueber-uns.title1')}}</h3>
            <div class = "ueber-uns-block-title-row">
                <div class = "ueber-uns-block__left"></div>
                <h3 class = "ueber-uns-block__title">{{ this.$t('ueber-uns.title2')}}</h3>
            </div>

            <div class = "ueber-uns-card">
                <div class = "ueber-uns-card__left">
                    <img class="ueber-uns-block__photo"
                         :src = "require('~/static/images/photo-1.jpg')"
                         alt = "photo" />
                </div>
                <div class = "ueber-uns-card__right">
                    
                    <p class="ueber-uns-block__paragraph">
                        <span class="ueber-uns-block__name">{{this.$t('ueber-uns.p3_1')}}</span><br>
                        {{this.$t('ueber-uns.p3_2')}}<br>
                        {{this.$t('ueber-uns.p3_3')}}
                    </p>
                    <p class="ueber-uns-block__paragraph">
                        {{this.$t('ueber-uns.p2')}}
                    </p>
                </div> 
            </div>
        
        <div class = "ueber-uns-card-group">
            <div class = "ueber-uns-block-title-row">
                <div class = "ueber-uns-block__left"></div>
                <h3 class = "ueber-uns-block__title">{{ this.$t('ueber-uns.title3')}}</h3>
            </div>
               
            <div class = "ueber-uns-card">
                <div class = "ueber-uns-card__left">
                    <img class="ueber-uns-block__photo"
                         :src = "require('~/static/images/photo-2.jpg')"
                          alt = "photo" />
                </div>
                <div class = "ueber-uns-card__right">
                    
                    <p class="ueber-uns-block__paragraph">
                       <span class="ueber-uns-block__name">{{this.$t('ueber-uns.p5_1')}}</span><br>
                        {{this.$t('ueber-uns.p5_2')}}<br>
                        {{this.$t('ueber-uns.p5_3')}}
                    </p>
                    <p class="ueber-uns-block__paragraph">
                        {{this.$t('ueber-uns.p4_1')}}
                        <a href="https://online-hautarzt.net" class="link link--small-blue">
                            {{this.$t('ueber-uns.p4_a1')}}
                        </a>
                        {{this.$t('ueber-uns.p4_2')}}
                    </p>
                </div> 
            </div>

            <div class = "ueber-uns-card">
                <div class = "ueber-uns-card__left">
                    <img class="ueber-uns-block__photo"
                        :src = "require('~/static/images/photo-3.jpg')"
                        alt = "photo" />
                </div>
                <div class = "ueber-uns-card__right">
                    <p class="ueber-uns-block__paragraph">
                        <span class="ueber-uns-block__name">{{this.$t('ueber-uns.p7_1')}}</span><br>
                        {{this.$t('ueber-uns.p7_2')}}<br>
                        {{this.$t('ueber-uns.p7_3')}}
                    </p>
                    <p class="ueber-uns-block__paragraph">
                        {{this.$t('ueber-uns.p6')}}
                    </p>
                </div> 
            </div>  
        </div>       

        <div class = "ueber-uns-block-title-row">
                <div class = "ueber-uns-block__left-last"></div>
                <h3 class = "ueber-uns-block__title">{{ this.$t('ueber-uns.title4')}}</h3>
        </div>

        <div class = "ueber-uns-card">
                <div class = "ueber-uns-card__left">
                    <img class="ueber-uns-block__photo"
                        :src = "require('~/static/images/photo-4.jpg')"
                        alt = "photo" />
                </div>
                <div class = "ueber-uns-card__right">
                   <p class="ueber-uns-block__paragraph">
                        {{this.$t('ueber-uns.p9_1')}}<br>
                        {{this.$t('ueber-uns.p9_2')}}
                    </p>
                    <p class="ueber-uns-block__paragraph">
                        {{this.$t('ueber-uns.p8')}}
                    </p>
                </div> 
            </div>    
            
            <h3 class = "ueber-uns-block__title">{{ this.$t('ueber-uns.title5')}}</h3>
            <p class="ueber-uns-block__paragraph">
                {{this.$t('ueber-uns.p10')}}
                <NuxtLink :to = "$routes.hautarzt.path" class = "link link--small-blue">
                    {{this.$t('ueber-uns.p10_a1')}}
                </NuxtLink>
            </p>

        </div>
    </div>
</template>

<script>
export default {
    head(){
            return {title : this.$t("ueber-uns.head.title")}
        },
    async fetch ({ app, store, error }) {
        // if token exist and user empty - load User object        
        if (app.$cookies.get(app.cookie.names.token) && store.getters['user/USER'] === null) {
            await store.dispatch('user/LOAD_USER', { id: app.$cookies.get(app.cookie.names.tokenId), token: app.$cookies.get(app.cookie.names.token) })
                .catch(error => {
                    app.$cookies.remove(app.cookie.names.token)
                    app.$cookies.remove(app.cookie.names.tokenId)
                })
        }
    },
}
</script>
<style lang = "scss">
    .ueber-uns-block__left-last {
        width: 56%;
    }

    .ueber-uns-block-title-row {
        display: flex;
        width: 100%;
    }
    .ueber-uns-block__left {
        width: 50%;
    }

    .ueber-uns-card {
        display: flex;
        width: 100%;
        margin-bottom: 50px;
        &__left {
            text-align: center;
        }
        &__left, 
        &__right {
            width: 50%;
        }
    }

    .ueber-uns-section .ueber-uns-h3{
		color: white;
	}

    .ueber-uns-section .title{
        color: white;
    }
    .page{
        padding-top: 64px;

        @include tablet-big{
            padding-top: 68px;
        }
    }

    .ueber-uns-section{
        margin: 0 0 32px 0;
        padding: 0;

        @include tablet-big{
            margin: 0 0 60px 0;
        }
    }
    .ueber-uns-block{
        &__paragraph{
            margin-bottom: 20px;
        }
        &__name {
            font-weight: 600;
        }
        &__title{
            margin: 35px 0 25px 0;
        }
        &__photo{
            width: 100%;
            max-width: 220px;
            height: auto;
            display: inline-block;
        }
        @include tablet-max{
            &__title{
                margin: 25px 0 15px 0;
            }
        }
    }


</style>