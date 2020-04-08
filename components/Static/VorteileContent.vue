<template>
    <div>
        <div class = "vorteile-block">
            <div class = "vorteile-block__header" @click = "openTab" id = "q1">
                <h3 class = "vorteile-block__title">{{ this.$t('page-vorteile.v1.question')}}</h3>
                <svg class = "icon icon__small" width = "20" height = "20" viewBox = "0 0 20 20" fill = "none" xmlns = "http://www.w3.org/2000/svg">
                    <path d = "M10 11.4883L14.9609 6.52344C15.3281 6.15625 15.9219 6.15625 16.2852 6.52344C16.6484 6.89062 16.6484 7.48437 16.2852 7.85156L10.6641 13.4766C10.3086 13.832 9.73828 13.8398 9.37109 13.5039L3.71094 7.85547C3.52734 7.67187 3.4375 7.42969 3.4375 7.19141C3.4375 6.95312 3.52734 6.71094 3.71094 6.52734C4.07812 6.16016 4.67187 6.16016 5.03516 6.52734L10 11.4883Z" fill = "#247EE5" />
                </svg>
            </div>
            <div class = "vorteile-block__content-wrap">
                <ul class="vorteile-block__list">
                    <li class="vorteile-block__list-item" v-for="(item, index) in this.$t('page-vorteile.v1.li') " :key="index + '-col2'"><span>{{ item }}</span></li>
                </ul>
                <p class = "vorteile-block__paragraph">{{ this.$t('page-vorteile.v1.p1') }}	<NuxtLink :to = "$routes.hautarzt.path" exact>{{ this.$t('page-vorteile.v1.l1') }}</NuxtLink>{{ this.$t('page-vorteile.v1.p2') }}</p>

            </div>
        </div>
        <div class = "vorteile-block">
            <div class = "vorteile-block__header" @click = "openTab" id = "q2">
                <h3 class = "vorteile-block__title">{{ this.$t('page-vorteile.v2.question')}}</h3>
                <svg class = "icon icon__small" width = "20" height = "20" viewBox = "0 0 20 20" fill = "none" xmlns = "http://www.w3.org/2000/svg">
                    <path d = "M10 11.4883L14.9609 6.52344C15.3281 6.15625 15.9219 6.15625 16.2852 6.52344C16.6484 6.89062 16.6484 7.48437 16.2852 7.85156L10.6641 13.4766C10.3086 13.832 9.73828 13.8398 9.37109 13.5039L3.71094 7.85547C3.52734 7.67187 3.4375 7.42969 3.4375 7.19141C3.4375 6.95312 3.52734 6.71094 3.71094 6.52734C4.07812 6.16016 4.67187 6.16016 5.03516 6.52734L10 11.4883Z" fill = "#247EE5" />
                </svg>
            </div>
            <div class = "vorteile-block__content-wrap">
                <p class = "vorteile-block__paragraph">{{ this.$t('page-vorteile.v2.p1') }}</p>
                <p class = "vorteile-block__paragraph">{{ this.$t('page-vorteile.v2.p2') }}<NuxtLink :to = "$routes.registrierung.path" exact>{{ this.$t('page-vorteile.v2.l1') }}</NuxtLink></p>
            </div>
        </div>
        <div class = "vorteile-block">
            <div class = "vorteile-block__header" @click = "openTab" id = "q3">
                <h3 class = "vorteile-block__title">{{ this.$t('page-vorteile.v3.question')}}</h3>
                <svg class = "icon icon__small" width = "20" height = "20" viewBox = "0 0 20 20" fill = "none" xmlns = "http://www.w3.org/2000/svg">
                    <path d = "M10 11.4883L14.9609 6.52344C15.3281 6.15625 15.9219 6.15625 16.2852 6.52344C16.6484 6.89062 16.6484 7.48437 16.2852 7.85156L10.6641 13.4766C10.3086 13.832 9.73828 13.8398 9.37109 13.5039L3.71094 7.85547C3.52734 7.67187 3.4375 7.42969 3.4375 7.19141C3.4375 6.95312 3.52734 6.71094 3.71094 6.52734C4.07812 6.16016 4.67187 6.16016 5.03516 6.52734L10 11.4883Z" fill = "#247EE5" />
                </svg>
            </div>
            <div class = "vorteile-block__content-wrap">
                <p class = "vorteile-block__paragraph">{{ this.$t('page-vorteile.v3.p1') }}<a href = "https://www.nct-heidelberg.de/fuer-patienten/aktuelles/details/titus-brinker-mit-dem-innovationspreis-dermatologie-2019-ausgezeichnet.html">{{ this.$t('page-vorteile.v3.l1') }}</a>{{ this.$t('page-vorteile.v3.p2') }}</p>
            </div>
        </div>
        <div class = "vorteile-block">
            <div class = "vorteile-block__header" @click = "openTab" id = "q4">
                <h3 class = "vorteile-block__title">{{ this.$t('page-vorteile.v4.question')}}</h3>
                <svg class = "icon icon__small" width = "20" height = "20" viewBox = "0 0 20 20" fill = "none" xmlns = "http://www.w3.org/2000/svg">
                    <path d = "M10 11.4883L14.9609 6.52344C15.3281 6.15625 15.9219 6.15625 16.2852 6.52344C16.6484 6.89062 16.6484 7.48437 16.2852 7.85156L10.6641 13.4766C10.3086 13.832 9.73828 13.8398 9.37109 13.5039L3.71094 7.85547C3.52734 7.67187 3.4375 7.42969 3.4375 7.19141C3.4375 6.95312 3.52734 6.71094 3.71094 6.52734C4.07812 6.16016 4.67187 6.16016 5.03516 6.52734L10 11.4883Z" fill = "#247EE5" />
                </svg>
            </div>
            <div class = "vorteile-block__content-wrap">
                <p class = "vorteile-block__paragraph">{{ this.$t('page-vorteile.v4.p1') }}</p>
                <p class = "vorteile-block__paragraph">{{ this.$t('page-vorteile.v4.p2') }}</p>
                <p class = "vorteile-block__paragraph">{{ this.$t('page-vorteile.v4.p3') }}</p>
                <p class = "vorteile-block__paragraph">{{ this.$t('page-vorteile.v4.p4') }}</p>
                <p class = "vorteile-block__paragraph">{{ this.$t('page-vorteile.v4.p5') }}</p>
            </div>
        </div>






    </div>
</template>

<script>
    import StepCard from "~/components/Cards/StepCard";
    import smoothScroll from "~/mixins/smooth-scroll";

    export default {
        methods    : {
            openTab(event){
                const wrapper    = document.querySelector(`#${event.currentTarget.id} + .vorteile-block__content-wrap`);
                const element    = wrapper.parentNode;
                const openedTabs = document.querySelectorAll(`.vorteile-block__content-wrap--open, .vorteile-block--open`);
                const icon       = document.querySelector(`#${event.currentTarget.id} > .icon`);

                wrapper.classList.toggle('vorteile-block__content-wrap--open');
                wrapper.parentNode.classList.toggle('vorteile-block--open');
                icon.classList.toggle('icon--active');

                if(element.classList.contains('vorteile-block--open')){
                    setTimeout(this.scrollToElement, 300, element);
                }

                [].forEach.call(openedTabs, function(item){
                    if(item.classList.contains('vorteile-block--open')){
                        item.classList.remove('vorteile-block--open');
                        item.getElementsByTagName('svg')[0].classList.remove('icon--active')
                    } else{
                        item.classList.remove('vorteile-block__content-wrap--open')
                    }
                });
            },
            scrollToElement(element){
                let space = 90;
                if(window.innerWidth < 768){
                    space -= 20;
                }
                window.scrollTo({
                    top      : element.getBoundingClientRect().top + window.pageYOffset - space,
                    behavior : "smooth"
                });
            }
        },
        components : {
            StepCard
        },
        mixins     : [
            smoothScroll,
        ]
    };
</script>

<style lang = "scss" scoped>

    .vorteile-block {
        padding          : 0 $main_offset 0;
        transition       : background-color .2s cubic-bezier(.4, 0, .6, 1);
        border-top       : 2px solid #E7E8E7;
        margin-bottom    : 0;
        background-color : transparent;

        &:last-child {
            margin        : 0 0 24px 0;
            border-bottom : 2px solid #E7E8E7;

        }
        &--open { background-color : #FFF; }

        &__header {
            cursor          : pointer;
            display         : flex;
            align-items     : center;
            flex-direction  : row;
            justify-content : space-between;

            &:focus { outline : none; }
        }

        &__title {
            margin  : 0;
            padding : 15px 0;
        }

        &__content-wrap {
            overflow   : hidden;
            max-height : 0;
            transition : background-color, max-height .3s cubic-bezier(.4, 0, .6, 1);


            &--open {
                max-height     : 3000px;
                padding-bottom : 12px;

                .vorteile-block__paragraph { opacity : 1; }
            }
        }
        &__list{
            list-style: none;
        }
        &__list-item{
            position: relative;
            margin-bottom: 16px;
            &:before{
                display: inline-block;
                position: absolute;
                left: -30px;
                top: 6px;
                width: 17px;
                height: 14px;
                background-image: url("~static/images/icons/check-icon.svg");
                content: "";
            }
        }
        &__paragraph {
            opacity       : 0;
            transition    : opacity $transition cubic-bezier(.4, 0, .6, 1);
            margin-bottom : $main_offset;

            &:last-child { margin : 0; }
        }
    }
    .icon {
        width      : 100%;
        height     : 100%;
        display    : block;
        transition : transform .2s cubic-bezier(.4, 0, .6, 1), -webkit-transform .2s cubic-bezier(.4, 0, .6, 1);

        &--active {
            transform : rotate(-0.5turn);
        }

        &:active, &:focus {
            outline    : none;
            background : transparent;
        }
    }
    .icon__small {
        $size: 20px;
        width       : $size;
        height      : $size;
        flex-shrink : 0;
    }

</style>