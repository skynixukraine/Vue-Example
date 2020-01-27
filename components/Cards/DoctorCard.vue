<template>
    <NuxtLink :to="'/'" class="link link--card">
        <div class="doctor-card">
            <header class="doctor-card__header" >
                <div class="doctor-card__header--image">
                    <img src="https://placeimg.com/352/480/people?t=1579768204582" alt="doctor_image">
                </div>
            </header>
            <div class="doctor-card__main">
               <div class="doctor-card__main doctor-card__main--title-container">
                    <div class="doctor-card__main--title">
                        {{doctor.name}}
                    </div>
                    <div class="doctor-card__main--price">
                            {{ doctor.price}} &euro; 
                    </div>
                </div> 
                <div class="doctor-card__main--description">
                    {{ doctor.description}}
                </div>
                <div class="doctor-card__main--city ">
                    <div class="doctor-card__main--city-location">
                        <img :src="require('~/static/images/icons/location_marker.svg')" alt="location_mark">
                    </div>
                    <div class="doctor-card__main--city-name">{{ doctor.address.city }}</div>
                </div>
            </div>
        </div>
    </NuxtLink>
</template>

<script>
export default {
    props: {
        doctor: {
            type: Object,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>


.doctor-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &__header{
        max-width: 352px;
        width: 100%;
        max-height: 352px;

        &--image{
            position: relative;

            &:after{
                content: "";
                display: block;
                padding-bottom: 100%;
            }

            img{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: center;
                border-radius: 16px 16px 0 0;
            }
        }
    }

    &__main{
        width: 100%;
        max-width: 352px;
        padding: 0 2%;
        background-color: $color-white;
        border-radius: 0 0 16px 16px;


        &--title-container{
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding: 5% 0 2% 5%;

            
        }

            &--title{
                font-style: normal;
                font-weight: 360;
                font-size: 24px;
                line-height: 30px;
                color: $color-river-bed;
                text-decoration: none;
            }

            &--price{
                font-style: normal;
                font-weight: 520;
                font-size: 18px;
                line-height: 23px;
                text-align: right;
                color:$color-price;
                padding-right: 10px;
            }
        

        &--description{
            font-family: TheSansB;
            font-style: normal;
            font-weight: 500;
            font-size: 15px;
            line-height: 22px;
            color: $color-river-bed;
            text-align: left;
            text-decoration: none;
            padding: 5% 0 2% 5%;
                &:hover{text-decoration: none;}
        }

        &--city{
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            padding: 5% 0 6% 5%;

            &-name{
                font-style: normal;
                font-weight: 500;
                font-size: 18px;
                line-height: 23px;
                color: $color-price;
                padding-left: 10px
            }
        }
    }
}


</style>