<template>
    <div class="page">
        <div class="section section--cookies">
            <div class="container">
                <h1>Wie verwenden wir Cookies?</h1>



                <div class = "table">
                    <div class = "table__content">
                        <div class = "table__header">
                            <div class = "table__header-item table__header-item_id">Name</div>
                            <div class = "table__header-item">Service</div>
                            <div class = "table__header-item">Purpose</div>
                            <div class = "table__header-item table__header-item_enquiry-date">Cookie type and duration</div>
                        </div>
                        <div class = "table__main table__main-items">
                            <div class = "table__main-item" data-title="Name">1P_JAR</div>
                            <div class = "table__main-item" data-title="Service">google.com</div>
                            <div class = "table__main-item" data-title="Purpose">
                                These cookies are set via embedded youtube-videos. They register anonymous statistical data
                                on for example how many times the video is displayed and what settings are used for playback.
                                This data can also be used to present targeted ads to the user.
                                No sensitive data is collected unless you log in to your google account,
                                in that case your choices are linked with your account.
                            </div>
                            <div class = "table__main-item" data-title="duration">1 month</div>
                        </div>


                        <div class = "table__main table__main-items">
                            <div class = "table__main-item" data-title="Name">NID</div>
                            <div class = "table__main-item" data-title="Service">google.com</div>
                            <div class = "table__main-item" data-title="Purpose">
                                These cookies are set via embedded youtube-videos. They register anonymous statistical
                                data on for example how many times the video is displayed and what settings are used for
                                playback. This data can also be used to present targeted ads to the user.
                                No sensitive data is collected unless you log in to your google account,
                                in that case your choices are linked with your account.
                            </div>
                            <div class = "table__main-item" data-title="duration">6 month</div>
                        </div>
                        <div class = "table__main table__main-items">
                            <div class = "table__main-item" data-title="Name">OGPC</div>
                            <div class = "table__main-item" data-title="Service">google.com</div>
                            <div class = "table__main-item" data-title="Purpose">
                                These cookies are used by Google to store preferences and user information each time they
                                visit web pages containing geographical maps of Google Maps.
                            </div>
                            <div class = "table__main-item" data-title="duration">1 month</div>
                        </div>
                        <div class = "table__main table__main-items">
                            <div class = "table__main-item" data-title="Name">HSID, SSID, APISID, SAPISID</div>
                            <div class = "table__main-item" data-title="Service">Google Targeting / Advertising</div>
                            <div class = "table__main-item" data-title="Purpose">
                                HSID, SSID, APISID and SAPISID cookies enable Google to collect user information for
                                videos hosted by YouTube.
                            </div>
                            <div class = "table__main-item" data-title="duration">1 - 10 years</div>
                        </div>
                        <div class = "table__main table__main-items">
                            <div class = "table__main-item" data-title="Name">APISID, NID, SID, 1P_JAR, SIDCC, CONSENT</div>
                            <div class = "table__main-item" data-title="Service">Google Targeting / Advertising</div>
                            <div class = "table__main-item" data-title="Purpose">
                                These cookies are used by Google to display personalized advertisements on Google sites,
                                based on recent searches and previous interactions, including Google Maps.
                            </div>
                            <div class = "table__main-item" data-title="duration">1 - 10 years</div>
                        </div>
                        <div class = "table__main table__main-items">
                            <div class = "table__main-item" data-title="Name">
                                __stripe_mid, __stripe_sid, __stripe_orig_props
                            </div>
                            <div class = "table__main-item" data-title="Service">Stripe Payment Processor</div>
                            <div class = "table__main-item" data-title="Purpose">
                                Stripe is used to making credit card payments. Stripe uses a cookie to remember who you
                                are and to enable Online Hautarzt vor Ort to process payments without storing any credit
                                card information on its own servers. The main purpose of this cookie is: Functionality
                            </div>
                            <div class = "table__main-item" data-title="duration">1 year</div>
                        </div>
                        <div class = "table__main table__main-items">
                            <div class = "table__main-item" data-title="Name">cid</div>
                            <div class = "table__main-item" data-title="Service">Stripe Payment Processor</div>
                            <div class = "table__main-item" data-title="Purpose">
                                Stripe is used to making credit card payments. Stripe uses a cookie to
                                remember who you are and to enable Online Hautarzt vor Ort to process payments without
                                storing any credit card information on its own servers. The main purpose of this cookie
                                is: Functionality
                            </div>
                            <div class = "table__main-item" data-title="duration">session</div>
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