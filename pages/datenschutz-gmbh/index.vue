<template>
    <div class="page">
        <div class = "section gmbh-section"
             :style = "{ backgroundImage: `url(${require('~/static/images/bg/abstract-bg-new.jpg')})`}"
        >
            <div class = "container container__mobile-adaptation">
                <h1 class ="gmbh-title title">
                    {{this.$t('page-gmbh.caption')}} 
                </h1>
                <h3 class ="gmbh-h3">{{this.$t('page-gmbh.subtext')}}</h3>
            </div>
        </div>
        <div class="container">
            <p class="gmbh-block__paragraph">
                {{this.$t('page-gmbh.p1')}} 
            </p>
            <p class="gmbh-block__paragraph">
                {{this.$t('page-gmbh.p2')}} 
            </p>
            <p class="gmbh-block__paragraph">
                {{this.$t('page-gmbh.p3')}} 
            </p>
            <p class="gmbh-block__paragraph">
                {{this.$t('page-gmbh.p4_1')}} <br>
                {{this.$t('page-gmbh.p4_2')}}<br>
                {{this.$t('page-gmbh.p4_3')}}<br>
                {{this.$t('page-gmbh.p4_4')}}
            </p>
            <h3 class = "ueber-uns-block__title">{{this.$t('page-gmbh.title1')}}</h3>
            <p class="gmbh-block__paragraph">
                {{this.$t('page-gmbh.p5_1')}}<br>
                {{this.$t('page-gmbh.p5_2')}}<br>
                {{this.$t('page-gmbh.p5_3')}}<br>
                {{this.$t('page-gmbh.p5_4')}}<br>
                {{this.$t('page-gmbh.p5_5')}}<br>
                {{this.$t('page-gmbh.p5_6')}}<br>
                {{this.$t('page-gmbh.p5_7')}}<br>
                {{this.$t('page-gmbh.p5_8')}}<br>
                {{this.$t('page-gmbh.p5_9')}}
                <a href="mailto:" class="link link--small-blue">{{this.$t('page-gmbh.p5_a9')}}</a>            
            </p>
            <p class="gmbh-block__paragraph">
                {{this.$t('page-gmbh.p6_1')}}
                <a href="https://online-hautarzt.de/privacy-hautarzt" class="link link--small-blue">
                {{this.$t('page-gmbh.p6_a1')}}
                </a><br>
                {{this.$t('page-gmbh.p6_2')}}
            </p>
            <h3 class = "ueber-uns-block__title">
                {{this.$t('page-gmbh.title2')}}
            </h3>
            <p class="gmbh-block__paragraph">
                {{this.$t('page-gmbh.p7_1')}}<br>
                <ul>
                    <li>{{this.$t('page-gmbh.p7_2')}}</li>
                    <li>{{this.$t('page-gmbh.p7_3')}}</li>
                    <li>{{this.$t('page-gmbh.p7_4')}}</li>
                    <li>{{this.$t('page-gmbh.p7_5')}}</li>
                    <li>{{this.$t('page-gmbh.p7_6')}}</li>
                    <li>{{this.$t('page-gmbh.p7_7')}}</li>
                    <li>{{this.$t('page-gmbh.p7_8')}}</li>
                </ul>
            </p>
            <h3 class = "ueber-uns-block__title">
                {{this.$t('page-gmbh.title3')}}
            </h3>
            <p class="gmbh-block__paragraph">
                {{this.$t('page-gmbh.p8')}}
            </p>
            <p class="gmbh-block__paragraph">
                {{this.$t('page-gmbh.p9_1')}}<br> 
                {{this.$t('page-gmbh.p9_2')}}
            </p>
            <h3 class = "ueber-uns-block__title">
                {{this.$t('page-gmbh.p10')}}
            </h3>
            <p class="gmbh-block__paragraph">
                {{this.$t('page-gmbh.p11_1')}}<br><br>
                <ul>
                    <li>{{this.$t('page-gmbh.p11_2')}}</li>
                    <li>{{this.$t('page-gmbh.p11_3')}}</li> 
                </ul>
                {{this.$t('page-gmbh.p11_4')}}<br><br>
                {{this.$t('page-gmbh.p11_5')}}
            </p>
            <h3 class = "ueber-uns-block__title">
                {{this.$t('page-gmbh.title4')}}
            </h3>
            <p class="gmbh-block__paragraph">
                {{this.$t('page-gmbh.p12')}}
            </p>
            <p class="gmbh-block__paragraph">
                {{this.$t('page-gmbh.p13')}}
            </p>
            <p class="gmbh-block__paragraph">
                {{this.$t('page-gmbh.p14')}}
            </p>
            <p class="gmbh-block__paragraph">
                {{this.$t('page-gmbh.p15')}}
            </p>
            <h3 class = "ueber-uns-block__title">
                {{this.$t('page-gmbh.title5')}}
            </h3>
            <p class="gmbh-block__paragraph">
            {{this.$t('page-gmbh.p16')}}            
            </p>
            <p class="gmbh-block__paragraph">
            {{this.$t('page-gmbh.p17')}}            
            </p>
            <p class="gmbh-block__paragraph">
            {{this.$t('page-gmbh.p18')}}            
            </p>
            <h3 class = "ueber-uns-block__title">
            {{this.$t('page-gmbh.title6')}}            
            </h3>
            <p class="gmbh-block__paragraph">
                {{this.$t('page-gmbh.p19')}} 
            </p>
            <p class="gmbh-block__paragraph">
                {{this.$t('page-gmbh.p20')}} 
            </p>
            <h3 class="ueber-uns-block__title">
                {{this.$t('page-gmbh.title7')}} 
            </h3>
            <p class="gmbh-block__paragraph">
                {{this.$t('page-gmbh.p21')}} 
            </p>
            <p class="gmbh-block__paragraph">
                {{this.$t('page-gmbh.p22')}} 
            </p>
            <p class="gmbh-block__paragraph">
                {{this.$t('page-gmbh.p23')}} 
            </p>
            <h3 class="ueber-uns-block__title">
                {{this.$t('page-gmbh.title8')}} 
            </h3>
            <p class="gmbh-block__paragraph">
            <span class="black-title">{{this.$t('page-gmbh.p24_1')}}</span><br>
            {{this.$t('page-gmbh.p24_2')}}<br>
            {{this.$t('page-gmbh.p24_3')}}<br>
            {{this.$t('page-gmbh.p24_4')}}<br>
            {{this.$t('page-gmbh.p24_5')}}<br>
            {{this.$t('page-gmbh.p24_6')}}
            </p>
            <p class="gmbh-block__paragraph">
                <span class="black-title">{{this.$t('page-gmbh.p25_1')}}</span><br>
                {{this.$t('page-gmbh.p25_2')}}
            </p>
            <p class="gmbh-block__paragraph">
                <span class="black-title">{{this.$t('page-gmbh.p26_1')}}</span><br>
                {{this.$t('page-gmbh.p26_2')}}<br>
                {{this.$t('page-gmbh.p26_2')}}
            </p>
            <p class="gmbh-block__paragraph">
                <span class="black-title">
                {{this.$t('page-gmbh.p27_1')}}
                </span><br>
                {{this.$t('page-gmbh.p27_2')}}<br>
                {{this.$t('page-gmbh.p27_3')}}<br><br>
                {{this.$t('page-gmbh.p27_4')}}<br>
                {{this.$t('page-gmbh.p27_5')}}<br>
                {{this.$t('page-gmbh.p27_6')}}<br>
                {{this.$t('page-gmbh.p27_7')}}<br>
                {{this.$t('page-gmbh.p27_8')}}<br><br>
                {{this.$t('page-gmbh.p27_9')}}
                <a href="https://stripe.com/de/terms" class="link link--small-blue">
                {{this.$t('page-gmbh.p27_a9')}}
                </a><br>
                {{this.$t('page-gmbh.p27_10')}}
                <a href="https://stripe.com/dpa/legal" class="link link--small-blue">
                {{this.$t('page-gmbh.p27_a10')}}
                </a>
            </p>
            <p class="gmbh-block__paragraph">
                <span class="black-title">
                {{this.$t('page-gmbh.p28_1')}}
                </span><br>
                {{this.$t('page-gmbh.p28_2')}}
                <a href="https://www.klarna.com/sofort/datenschutz" class="link link--small-blue">
                {{this.$t('page-gmbh.p28_a2')}}
                </a>
            </p>
            <p class="gmbh-block__paragraph">
                <span class="black-title">
                {{this.$t('page-gmbh.p29_1')}}
                </span><br>
                {{this.$t('page-gmbh.p29_2')}}<br>
                {{this.$t('page-gmbh.p29_3')}}<br>
                {{this.$t('page-gmbh.p29_4')}}<br>
                {{this.$t('page-gmbh.p29_5')}}<br>
                {{this.$t('page-gmbh.p29_6')}}<br>
                <a href="https://www.giropay.de/rechtliches/datenschutz-agb/" class="link link--small-blue">
                {{this.$t('page-gmbh.p29_a6')}}
                </a>
            </p>
            <p class="gmbh-block__paragraph">
                <span class="black-title">
                {{this.$t('page-gmbh.p30_1')}}
                </span><br>
                {{this.$t('page-gmbh.p30_2')}}
                <a href="https://www.privacyshield.gov/participant?id=a2zt0000000TOWQAA4&status=Active" class="link link--small-blue">
                {{this.$t('page-gmbh.p30_a2')}}
                </a><br>
                {{this.$t('page-gmbh.p30_3')}}<br>
                {{this.$t('page-gmbh.p30_4')}}<br>
                {{this.$t('page-gmbh.p30_5')}}
                <a href="https://aws.amazon.com/blogs/security/aws-gdpr-data-processing-addendum/" class="link link--small-blue">
                {{this.$t('page-gmbh.p30_a5')}}
                </a>
            </p>
            <p class="gmbh-block__paragraph">
                <span class="black-title">
                 {{this.$t('page-gmbh.p31_1')}}
                </span><br>
                 {{this.$t('page-gmbh.p31_2')}}

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
    
    .gmbh-section {
        .gmbh-title {
            font-family: $TheAntiquaB;
            font-size: 30px;
            @include tablet {
                font-size: 48px;
            }
        }
    }

    .gmbh-section .gmbh-h3{
		color: white;
	}

    .gmbh-section .title{
        color: white;
    }
    .page{
        padding-top: 64px;

        @include tablet-big{
            padding-top: 68px;
        }
    }

    .gmbh-section{
        margin: 0 0 32px 0;
        padding: 0;

        @include tablet-big{
            margin: 0 0 60px 0;
        }
    }
    .gmbh-block{
        &__paragraph{
            margin-bottom: 20px;
            .black-title {
                color: black;
            }
        }
        ul {
                list-style: disc outside;
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