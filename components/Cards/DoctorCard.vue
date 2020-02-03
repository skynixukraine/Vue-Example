<template>
    <NuxtLink :to = "'/'"
              class = "link link--card">
        <div class = "doctor-card">
            <header class = "doctor-card__header">
                <div class = "doctor-card__header--image">
                    <img :src = "doctor.photo || require('~/static/images/images/placeholder_doctor_man_img.jpg')"
                         alt = "doctor_image">
                </div>
            </header>
            <div class = "doctor-card__main">
                <div class = "doctor-card__main doctor-card__main--title-container">
                    <div class = "doctor-card__main--name">
                        <div class = "doctor-card__main--name_title">{{doctor.title.name}}</div>
                        <span class = "doctor-card__main--name_full">
                            {{ `${doctor.first_name} ${doctor.last_name}` }}
                        </span>
                    </div>
                    <div class = "doctor-card__main--price">
                        {{ doctor.enquire_price}}
                    </div>
                </div>
                <div class = "doctor-card__main--description">
                    {{ doctor.short_description || "" }}
                </div>
                <div class = "doctor-card__main--city">
                    <div class = "doctor-card__main--city-location">
                        <img :src = "require('~/static/images/icons/location_marker.svg')" alt = "location_mark">
                    </div>
                    <div class = "doctor-card__main--city-name">
                        {{ doctor.location ? doctor.location.city || "Doctor 'location.city' empty in Data Base" : "Doctor 'location' empty in Data Base" }}
                    </div>
                </div>
            </div>
        </div>
    </NuxtLink>
</template>

<script>
    export default {
        props : {
            doctor : {
                type     : Object,
                required : true
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

        &__header {
            width      : 100%;
            max-width  : $size;
            max-height : $size;

            &--image {
                position : relative;

                &:after {
                    content        : "";
                    display        : block;
                    padding-bottom : 100%;
                }

                img {
                    top             : 0;
                    left            : 0;
                    width           : 100%;
                    height          : 100%;
                    position        : absolute;
                    object-fit      : cover;
                    border-radius   : $border-radius $border-radius 0 0;
                    object-position : center;
                }
            }
        }

        &__main {
            width            : 100%;
            padding          : 0 2%;
            max-width        : $size;
            border-radius    : 0 0 $border-radius $border-radius;
            background-color : $color-white;

            &--title-container {
                width           : 100%;
                padding         : 5% 0 2% 5%;
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
                padding         : 5% 0 2% 5%;
                font-style      : normal;
                font-size       : 15px;
                text-align      : left;
                line-height     : 22px;
                font-family     : TheSansB, sans-serif;
                font-weight     : 500;
                text-decoration : none;

                &:hover {text-decoration : none;}
            }

            &--city {
                display        : flex;
                padding        : 5% 0 6% 5%;
                flex-wrap      : nowrap;
                flex-direction : row;

                &-name {
                    color        : $color-price;
                    font-size    : 18px;
                    font-style   : normal;
                    font-weight  : 500;
                    line-height  : 23px;
                    padding-left : 10px
                }
            }
        }

        &, &__main, &__main--name_title, &__main--name_full, &__main--price, &__main--city, &__main--city-name {
            &:hover {
                text-decoration : none;
            }
        }
    }
</style>