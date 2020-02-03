<template>
    <div class = "doctor-card" :class = "{'doctor-card--is-preview' : isPreview}">
        <header class = "doctor-card__photo">
            <NuxtLink :to = "linkToDoctorProfile" class = "link--card">
                <img :src = "doctor.photo || require('~/static/images/images/placeholder_doctor_man_img.jpg')"
                     alt = "doctor_image" class = "doctor-card__photo__img">
            </NuxtLink>
        </header>
        <div class = "doctor-card__main">
            <div class = "doctor-card__main doctor-card__main--title-container">
                <div class = "doctor-card__main--name">
                    <div class = "doctor-card__main--name_title">{{doctor.title.name || ""}}
                    </div>
                    <NuxtLink :to = "linkToDoctorProfile" class = "doctor-card__main--name_full">
                        {{ doctor.first_name ? doctor.last_name ? `${doctor.first_name} ${doctor.last_name}` : ""}}
                    </NuxtLink>
                </div>
                <div class = "doctor-card__main--price" v-if = "!isPreview">
                    {{ doctor.enquire_price || "" }}
                </div>
            </div>
            <div class = "doctor-card__main--description" v-if = "!isPreview">
                {{ doctor.description || "" }}
            </div>
            <div class = "doctor-card__main--location">
                {{ doctor.location ? doctor.location.city || "" : "" }}
            </div>
            <button class = "doctor-card__main--start-enquiry-btn link--button link--button-blue"
                    v-if = "isPreview"
                    @click.stop = "onClickStartEnquiry">
                Anfrage starten
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        props    : {
            doctor    : {
                type     : Object,
                required : true
            },
            isPreview : {
                type    : Boolean,
                default : false
            }
        },
        computed : {
            linkToDoctorProfile(){
                if(!(this.doctor.title && this.doctor.first_name && this.doctor.last_name)) return "/"

                const regexp_spaces = /[\s]/g

                return this.doctor.title.trim().replace(".", "").replace(regexp_spaces, "-") + "__" +
                        this.doctor.first_name.trim().replace(regexp_spaces, "-") + "_" +
                        this.doctor.last_name.trim().replace(regexp_spaces, "-")
            }
        },
        methods  : {
            onClickStartEnquiry(){
                alert("Work logic not yet implemented");
            }
        }
    }
</script>

<style lang = "scss" scoped>
    $size : 352px;
    $border-radius : 16px;

    .doctor-card {
        display         : flex;
        align-items     : center;
        flex-direction  : column;
        justify-content : center;

        &__photo {
            width         : 100%;
            overflow      : hidden;
            max-width     : $size;
            max-height    : $size;
            line-height   : 0;
            border-radius : $border-radius $border-radius 0 0;

            &__img {
                width           : 100%;
                height          : 100%;
                object-fit      : cover;
                transition      : $transition;
                object-position : center;
            }
        }

        &__main {
            $padding : 2%;
            width            : 100%;
            padding          : 0 $padding;
            max-width        : $size;
            border-radius    : 0 0 $border-radius $border-radius;
            background-color : $color-white;

            &--title-container {
                width           : 100%;
                padding         : 5% 0 $padding 5%;
                display         : flex;
                flex-direction  : row;
                justify-content : space-between;
            }

            &--name {
                color           : $color-river-bed;
                font-size       : 24px;
                font-style      : normal;
                font-weight     : 300;
                line-height     : 30px;
                text-decoration : none;

                &_full {
                    color : inherit;
                }
            }

            &--price {
                color         : $color-price;
                font-size     : 18px;
                text-align    : right;
                font-style    : normal;
                font-weight   : 500;
                line-height   : 23px;
                padding-right : 10px;
            }

            &--description {
                color           : $color-river-bed;
                padding         : 5% 0 $padding 5%;
                font-style      : normal;
                font-size       : 15px;
                text-align      : left;
                line-height     : 22px;
                font-family     : TheSansB, sans-serif;
                font-weight     : 500;
                text-decoration : none;

                &:hover {text-decoration : none;}
            }

            &--location {
                color       : $color-price;
                padding     : 5% 0 6% 5%;
                font-size   : 18px;
                font-style  : normal;
                font-weight : 500;
                line-height : 23px;

                &:before {
                    width            : 18px;
                    float            : left;
                    height           : 22px;
                    content          : "";
                    display          : inline-block;
                    margin-right     : 10px;
                    background-image : url("~static/images/icons/location_marker.svg");
                }
            }

            &--start-enquiry-btn {
                border        : none;
                margin        : 0 #{-$padding};
                border-radius : 0 0 $border-radius $border-radius;
            }
        }

        .link--card:hover {
            transform : none;

            .doctor-card__photo__img {
                transform : scale(1.1);
            }
        }

        &, &__main, &__main--name_title, &__main--name_full, &__main--price, &__main--city, &__main--city-name {
            &:hover {
                text-decoration : none;
            }
        }

        &--is-preview {
            flex      : 1 0 auto;
            min-width : 100%;

            .doctor-card {
                &__main {
                    flex           : 1 0 auto;
                    display        : flex;
                    flex-direction : column;

                    @include tablet {
                        max-width : none;
                    }
                }

                &__photo {
                    @include tablet {
                        max-width  : none;
                        max-height : none;
                    }
                }
            }

            .link--card {
                flex    : 1 0 auto;
                display : flex;
            }
        }
    }
</style>