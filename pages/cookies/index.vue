<template>
    <div class="page">
        <div class = "section cookie-section"
             :style = "{ backgroundImage: `url(${require('~/static/images/bg/abstract-bg-new.webp')})`}">
            <div class = "container container__mobile-adaptation">
                <h1>Wie verwenden wir Cookies?</h1>
            </div>
        </div>



        <div class="container section--cookies">
            <div class = "table">
                <div class = "table__content">
                    <div class = "table__header">
                        <div class = "table__header-item table__header-item_id">Name</div>
                        <div class = "table__header-item">Provider</div>
                        <div class = "table__header-item">Purpose</div>
                        <div class = "table__header-item table__header-item_enquiry-date">Cookie type and duration</div>
                    </div>
                    <div class = "table__main table__main-items" v-for="(item, index) in this.$t('cookie')" :key="'cookie-' + index">
                        <div class = "table__main-item" data-title="Name">{{item.name}}</div>
                        <div class = "table__main-item" data-title="Provider">{{item.provider}}</div>
                        <div class = "table__main-item" data-title="Purpose">{{item.purpose}}
                        </div>
                        <div class = "table__main-item" data-title="duration">{{item.duration}}</div>
                    </div>

                </div>
            </div>

            <p class="text-block">
                The names of these cookies may change, for technical reasons (
                <strong>particularly __Secure-3PAPISID</strong>,
                <strong>__Secure-3PSID</strong>,
                <strong>__Secure-APISID</strong>,
                <strong>__Secure-HSID</strong>,
                <strong>__Secure-SSID</strong>)
            </p>
            <div class="button-block">
                <a
                        href="https://cookiesandyou.com/"
                        class="link link--button link--button-mobile-large link--button-gradient"
                        target="_blank">
                    Was sind Cookies?
                </a>
                <button type = "button"
                        class = "button-remove-cookie control-btn--cancel"
                        @click = "removeCookie">Remove Browser Cookie
                </button>
            </div>

        </div>
    </div>
</template>

<script>
    import localStorage from '~/mixins/localStorage';

    export default {
        mixins : [
            localStorage,
        ],
        methods: {
            removeCookie(){
                let cookies = document.cookie.split(";");

                for (let i = 0; i < cookies.length; i++) {
                    let cookie = cookies[i];
                    let eqPos = cookie.indexOf("=");
                    let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
                }
                this.setObjLocalStorage('', 'vue-cookie-accept-decline-cookie');
            }
        }
    }
</script>
<style lang="scss">
    .cookie-section{
        margin: 0 0 32px 0;
        padding: 0;

        @include tablet-big{
            margin: 0 0 60px 0;
        }
    }
    .section{
        &--cookies{

            @include tablet-big {
                padding-top: 51px;
                padding-bottom: 51px;
            }
        }
    }
    .table{
        &__main-items{
            cursor: default;
            background-color: #ffffff;

            &:hover{
                width: 100%;
                cursor: default;
            }
            @include tablet {
                &:after {
                    width: 100%;
                }
            }
        }
        &__header{
            &:after {
                width: 100%;
            }
        }
    }
    .text-block{
        padding: 10px 0 40px 0;
    }
    .button-block{
        text-align: center;
    }
    .button-remove-cookie{
        width: auto;
        border: none;
        display: inline-block;
        padding: 20px 45px 15px 45px;
        min-width: 265px;
        font-size: 16px;
        text-align: center;
        line-height: 21px;
        font-weight: 600;
        border-radius: 4px;
        text-transform: uppercase;
        letter-spacing: .14em;
        margin: 10px 0 0 0;
    }
    @include tablet{

        .button-block{
             margin-top: 48px;
        }
    }

</style>