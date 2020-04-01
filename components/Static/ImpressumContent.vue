<template>
    <div>
        <div class = "impressum-block">
            <div class = "impressum-block__header" @click = "openTab" id = "q1">
                <h3 class = "impressum-block__title">{{ this.$t('page-impressum.q1.question')}}</h3>
                <svg class = "icon icon__small" width = "20" height = "20" viewBox = "0 0 20 20" fill = "none" xmlns = "http://www.w3.org/2000/svg">
                    <path d = "M10 11.4883L14.9609 6.52344C15.3281 6.15625 15.9219 6.15625 16.2852 6.52344C16.6484 6.89062 16.6484 7.48437 16.2852 7.85156L10.6641 13.4766C10.3086 13.832 9.73828 13.8398 9.37109 13.5039L3.71094 7.85547C3.52734 7.67187 3.4375 7.42969 3.4375 7.19141C3.4375 6.95312 3.52734 6.71094 3.71094 6.52734C4.07812 6.16016 4.67187 6.16016 5.03516 6.52734L10 11.4883Z" fill = "#247EE5" />
                </svg>
            </div>
            <div class = "impressum-block__content-wrap">
                <p class = "impressum-block__paragraph">{{ this.$t('page-impressum.q1.p1') }}</p>
            </div>
        </div>
        <div class = "impressum-block">
            <div class = "impressum-block__header" @click = "openTab" id = "q2">
                <h3 class = "impressum-block__title">{{ this.$t('page-impressum.q2.question')}}</h3>
                <svg class = "icon icon__small" width = "20" height = "20" viewBox = "0 0 20 20" fill = "none" xmlns = "http://www.w3.org/2000/svg">
                    <path d = "M10 11.4883L14.9609 6.52344C15.3281 6.15625 15.9219 6.15625 16.2852 6.52344C16.6484 6.89062 16.6484 7.48437 16.2852 7.85156L10.6641 13.4766C10.3086 13.832 9.73828 13.8398 9.37109 13.5039L3.71094 7.85547C3.52734 7.67187 3.4375 7.42969 3.4375 7.19141C3.4375 6.95312 3.52734 6.71094 3.71094 6.52734C4.07812 6.16016 4.67187 6.16016 5.03516 6.52734L10 11.4883Z" fill = "#247EE5" />
                </svg>
            </div>
            <div class = "impressum-block__content-wrap">
                <p class = "impressum-block__paragraph">{{ this.$t('page-impressum.q2.p1') }}</p>
            </div>
        </div>
        <div class = "impressum-block">
            <div class = "impressum-block__header" @click = "openTab" id = "q3">
                <h3 class = "impressum-block__title">{{ this.$t('page-impressum.q3.question')}}</h3>
                <svg class = "icon icon__small" width = "20" height = "20" viewBox = "0 0 20 20" fill = "none" xmlns = "http://www.w3.org/2000/svg">
                    <path d = "M10 11.4883L14.9609 6.52344C15.3281 6.15625 15.9219 6.15625 16.2852 6.52344C16.6484 6.89062 16.6484 7.48437 16.2852 7.85156L10.6641 13.4766C10.3086 13.832 9.73828 13.8398 9.37109 13.5039L3.71094 7.85547C3.52734 7.67187 3.4375 7.42969 3.4375 7.19141C3.4375 6.95312 3.52734 6.71094 3.71094 6.52734C4.07812 6.16016 4.67187 6.16016 5.03516 6.52734L10 11.4883Z" fill = "#247EE5" />
                </svg>
            </div>
            <div class = "impressum-block__content-wrap">
                <p class = "impressum-block__paragraph">{{ this.$t('page-impressum.q3.p1') }}</p>
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
                const wrapper    = document.querySelector(`#${event.currentTarget.id} + .impressum-block__content-wrap`);
                const element    = wrapper.parentNode;
                const openedTabs = document.querySelectorAll(`.impressum-block__content-wrap--open, .impressum-block--open`);
                const icon       = document.querySelector(`#${event.currentTarget.id} > .icon`);

                wrapper.classList.toggle('impressum-block__content-wrap--open');
                wrapper.parentNode.classList.toggle('impressum-block--open');
                icon.classList.toggle('icon--active');

                if(element.classList.contains('impressum-block--open')){
                    setTimeout(this.scrollToElement, 300, element);
                }

                [].forEach.call(openedTabs, function(item){
                    if(item.classList.contains('impressum-block--open')){
                        item.classList.remove('impressum-block--open');
                        item.getElementsByTagName('svg')[0].classList.remove('icon--active')
                    } else{
                        item.classList.remove('impressum-block__content-wrap--open')
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

    .impressum-block {
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

                .impressum-block__paragraph { opacity : 1; }
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