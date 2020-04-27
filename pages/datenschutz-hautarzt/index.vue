<template>
    <div class="page">
        <div class = "section datenschutz-section"
             :style = "{ backgroundImage: `url(${require('~/static/images/bg/abstract-bg-new.jpg')})`}"
        >
            <div class = "container container__mobile-adaptation">
                <h1 class ="datenschutz-title title">{{this.$t('page-datenschutz.caption')}}</h1>
            </div>
        </div>
            <div class="container">
                <p class="datenschutz-block__paragraph">
                {{this.$t('page-datenschutz.p1')}}
                </p>
                <p class="datenschutz-blockk__paragraph">
                {{this.$t('page-datenschutz.p2')}}
                </p>
                <p class="datenschutz-block__paragraph">
                {{this.$t('page-datenschutz.p3')}}
                </p>
                <p class="datenschutz-block__paragraph">
                {{this.$t('page-datenschutz.p4_1')}}<br>
                {{this.$t('page-datenschutz.p4_2')}}<br>
                {{this.$t('page-datenschutz.p4_3')}}<br>
                {{this.$t('page-datenschutz.p4_4')}}<br>
                </p>
                <h3 class = "datenschutz-block__title">{{ this.$t('page-datenschutz.title1')}}</h3>
                <p class="datenschutz-block__paragraph">
                {{this.$t('page-datenschutz.p5')}}
                </p>
                <p class="datenschutz-block__paragraph">
                {{this.$t('page-datenschutz.p6')}}
                </p>
                <p class="datenschutz-block__paragraph">
                {{this.$t('page-datenschutz.p7')}}
                <a href="www.online-hautarzt.de" class="link link--small-blue">
                    {{this.$t('page-datenschutz.p7_a1')}}
                </a>
                </p>
                <h3 class = "datenschutz-block__title">{{ this.$t('page-datenschutz.title2')}}</h3>
                <p class="datenschutz-block__paragraph">
                {{this.$t('page-datenschutz.p8')}}
                </p>
                <p class="datenschutz-block__paragraph">
                    <ul>
                        <li>{{this.$t('page-datenschutz.p9_1')}}</li>
                        <li>{{this.$t('page-datenschutz.p9_2')}}</li>
                        <li>{{this.$t('page-datenschutz.p9_3')}}</li>
                        <li>{{this.$t('page-datenschutz.p9_4')}}</li>
                        <li>{{this.$t('page-datenschutz.p9_5')}}</li>
                        <li>{{this.$t('page-datenschutz.p9_6')}}</li>
                        <li>{{this.$t('page-datenschutz.p9_7')}}</li>
                    </ul>
                </p>
                <h3 class = "datenschutz-block__title">{{ this.$t('page-datenschutz.title3')}}</h3>
                <p class="datenschutz-block__paragraph">
                {{this.$t('page-datenschutz.p10')}}
                </p>
                <p class="datenschutz-block__paragraph">
                {{this.$t('page-datenschutz.p11')}}
                </p>
                <p class="datenschutz-block__paragraph">
                {{this.$t('page-datenschutz.p12')}}<br>
                </p>
                <h3 class = "datenschutz-block__title">{{ this.$t('page-datenschutz.title4')}}</h3>
                <p class="datenschutz-block__paragraph">
                {{this.$t('page-datenschutz.p13')}}
                </p>
                <p class="datenschutz-block__paragraph">
                    <ul>
                        <li>{{this.$t('page-datenschutz.p14_1')}}</li>
                        <li>{{this.$t('page-datenschutz.p14_2')}}</li>
                    </ul>                
                </p>
                <p class="datenschutz-block__paragraph">
                {{this.$t('page-datenschutz.p15')}}
                </p>
                <p class="datenschutz-block__paragraph">
                {{this.$t('page-datenschutz.p16')}}<br>
                </p>
                <h3 class = "datenschutz-block__title">{{ this.$t('page-datenschutz.title5')}}</h3>
                <p class="datenschutz-block__paragraph">
                {{this.$t('page-datenschutz.p17')}}
                </p>
                <p class="datenschutz-block__paragraph">
                {{this.$t('page-datenschutz.p18')}}
                </p>
                <p class="datenschutz-block__paragraph">
                {{this.$t('page-datenschutz.p19')}}
                </p>
                <p class="datenschutz-block__paragraph">
                {{this.$t('page-datenschutz.p20')}}<br>
                </p>
                <h3 class = "datenschutz-block__title">{{ this.$t('page-datenschutz.title6')}}</h3>
                <p class="datenschutz-block__paragraph">
                {{this.$t('page-datenschutz.p21')}}
                </p>
                <p class="datenschutz-block__paragraph">
                {{this.$t('page-datenschutz.p22')}}
                </p>
                <p class="datenschutz-block__paragraph">
                {{this.$t('page-datenschutz.p23')}}<br>
                </p>
                <h3 class = "datenschutz-block__title">{{ this.$t('page-datenschutz.title7')}}</h3>
                <p class="datenschutz-block__paragraph">
                {{this.$t('page-datenschutz.p24')}}
                </p>
                <p class="datenschutz-block__paragraph">
                {{this.$t('page-datenschutz.p25')}}<br>
                </p>
                <h3 class = "datenschutz-block__title">{{ this.$t('page-datenschutz.title8')}}</h3>
                <p class="datenschutz-block__paragraph">
                {{this.$t('page-datenschutz.p26')}}
                </p>
                <p class="datenschutz-block__paragraph">
                {{this.$t('page-datenschutz.p27')}}
                </p>
                <p class="datenschutz-block__paragraph">
                {{this.$t('page-datenschutz.p28')}}<br>
                </p>
                <h3 class = "datenschutz-block__title">{{ this.$t('page-datenschutz.title9')}}</h3>
                <p class="datenschutz-block__paragraph">
                <span class="black-title">{{this.$t('page-datenschutz.p29_1')}}</span><br>
                {{this.$t('page-datenschutz.p29_2')}}
                </p>
                <p class="datenschutz-block__paragraph">
                <span class="black-title">{{this.$t('page-datenschutz.p30_1')}}</span><br>
                {{this.$t('page-datenschutz.p30_2')}}<br>
                </p>
                <p class="datenschutz-block__paragraph">
                <span class="black-title">{{this.$t('page-datenschutz.p31_1')}}</span><br>
                {{this.$t('page-datenschutz.p31_2')}}<br>
                </p>
                <p class="datenschutz-block__paragraph">
                <span class="black-title">{{this.$t('page-datenschutz.p32_1')}}</span><br>
                {{this.$t('page-datenschutz.p32_2')}}<br>
                </p>
                <p class="datenschutz-block__paragraph">
                {{this.$t('page-datenschutz.p33_1')}}<br><br>
                {{this.$t('page-datenschutz.p33_2')}}<br>
                {{this.$t('page-datenschutz.p33_3')}}<br>
                {{this.$t('page-datenschutz.p33_4')}}<br>
                {{this.$t('page-datenschutz.p33_5')}}<br>
                {{this.$t('page-datenschutz.p33_6')}}<br>
                </p>
                <p class="datenschutz-block__paragraph">
                {{this.$t('page-datenschutz.p34_1')}}
                <a href="www.online-hautarzt.de" class="link link--small-blue">
                    {{this.$t('page-datenschutz.p34_a1')}}
                </a><br>
                </p>
                <p class="datenschutz-block__paragraph">
                {{this.$t('page-datenschutz.p35_1')}}
                <a href="www.online-hautarzt.de" class="link link--small-blue">
                {{this.$t('page-datenschutz.p35_a1')}}
                </a><br>
                </p>
                <p class="datenschutz-block__paragraph">
                <span class="black-title">{{this.$t('page-datenschutz.p36_1')}}</span><br>
                {{this.$t('page-datenschutz.p36_2')}}<br>
                {{this.$t('page-datenschutz.p36_3')}}
                <a href="www.online-hautarzt.de" class="link link--small-blue">
                {{this.$t('page-datenschutz.p36_a3')}}
                </a>
                </p>
                <p class="datenschutz-block__paragraph">
                <span class="black-title">{{this.$t('page-datenschutz.p37_1')}}</span><br>
                {{this.$t('page-datenschutz.p37_2')}}<br>
                {{this.$t('page-datenschutz.p37_3')}}<br>
                {{this.$t('page-datenschutz.p37_4')}}<br>
                {{this.$t('page-datenschutz.p37_5')}}
                <a href="www.online-hautarzt.de" class="link link--small-blue">
                 {{this.$t('page-datenschutz.p37_a5')}}
                 </a>
                </p>
                <p class="datenschutz-block__paragraph">
                <span class="black-title">{{this.$t('page-datenschutz.p38_1')}}</span><br>
                {{this.$t('page-datenschutz.p38_2')}}
                <a href="www.online-hautarzt.de" class="link link--small-blue">
                {{this.$t('page-datenschutz.p38_a2')}}
                </a><br>
                {{this.$t('page-datenschutz.p38_3')}}
                <a href="www.online-hautarzt.de" class="link link--small-blue"> 
                {{this.$t('page-datenschutz.p38_a3')}}
                </a><br>
                </p>
                <p class="datenschutz-block__paragraph">
                {{this.$t('page-datenschutz.p38_4')}}<br>
                <a href="www.online-hautarzt.de" class="link link--small-blue">
                {{this.$t('page-datenschutz.p38_a4')}}
                </a><br>
                </p>
                <p class="datenschutz-block__paragraph">
                <span class="black-title">{{this.$t('page-datenschutz.p39')}}</span><br>
                </p>
                <p class="datenschutz-block__paragraph">
                {{this.$t('page-datenschutz.p40')}}<br>
                </p>
            </div>
    </div>
</template>

<script>
export default {
    head(){
            return {title : this.$t("page-datenschutz.head.title")}
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

    .datenschutz-section .datehautarzt-h3{
		color: white;
	}

    .datenschutz-section .title{
        color: white;
    }
    .page{
        padding-top: 64px;

        @include tablet-big{
            padding-top: 68px;
        }
    }

    .datenschutz-section{
        margin: 0 0 32px 0;
        padding: 0;

        @include tablet-big{
            margin: 0 0 60px 0;
        }
    }
    .datenschutz-block{
        &__paragraph{
            margin-bottom: 20px;
            ul {
                list-style: disc outside;
            }
            .black-title {
                color: black;
            }
        }
        &__title{
            margin: 35px 0 25px 0;
        }
        &__photo{
            max-width: 100%;
            height: auto;
            display: block;
            margin: 0 0 25px 0;
        }
        @include tablet-max{
            &__title{
                margin: 25px 0 15px 0;
            }
        }
    }


</style>