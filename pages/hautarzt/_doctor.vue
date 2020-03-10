<template>
    <div class = "page">
        <div class = "section section--32-32">
            <div class = "container">
                <Breadcrumbs :breadcrumbs = "breadcrumbs" />
            </div>
        </div>
        <div class = "section">
            <div class = "container">
                <div class = "profile">
                    <div class = "profile__photo">
                        <img :src = "doctorData.photo || require('~/static/images/images/placeholder_doctor_man_img.jpg')" alt = "Doctor photo"
                             class = "profile__photo">
                    </div>
                    <div class = "profile__info">
                        <h3 class = "profile__info__title">{{ this.doctorData.title ? this.doctorData.title.name : "" }}</h3>
                        <h1 class = "profile__info__name">{{ `${this.doctorData.first_name} ${this.doctorData.last_name}` }}</h1>
                        <div class = "profile__info__description">{{ this.doctorData.description }}</div>
                        <div class = "profile__info__price">
                            <span class = "profile__info__price__title">Professionelle Einschätzung & Handlungsempfehlung</span>
                            <div class = "profile__info__price__value">{{ `${this.doctorData.enquire_price} €` || "" }}</div>
                        </div>
                        <button class = "profile__info__start-enquiry-btn link--button link--button-blue"
                                @click.stop = "startDiagnosticChat">
                            ANFRAGE STARTEN
                        </button>
                    </div>
                </div>
                <div class = "g-map" v-if = "gMapPosition">
                    <div class = "g-map__location-info" v-if = "doctorData.location">
                        <div>
                            <span v-if = "doctorData.location.postal_code" class = "g-map__postal-code">{{ this.doctorData.location.postal_code }}</span>
                            <span v-if = "doctorData.location.address" class = "g-map__address">{{ this.doctorData.location.address }}</span>
                        </div>
                        <div v-if = "doctorData.location.city" class = "g-map__city">{{ this.doctorData.location.city }}
                        </div>
                        <div v-if = "doctorData.location.state" class = "g-map__state">{{ this.doctorData.location.state }}</div>
                        <div v-if = "doctorData.location.country" class = "g-map__country">{{ this.doctorData.location.country }}</div>
                    </div>
                    <GmapMap :center = "gMapPosition"
                             :zoom = "13"
                             map-type-id = "terrain"
                             style = "width: 100%; height: 100%">
                        <GmapMarker :key = "'gMapMarker_' + index"
                                    v-for = "(m, index) in markers"
                                    :icon = "require('~/static/images/icons/location_marker.svg')"
                                    :position = "m.position"
                                    :clickable = "true"
                                    :draggable = "true"
                                    @click = "center = m.position" />
                    </GmapMap>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import DoctorsApi from "~/services/api/Doctors"

    export default {
        async fetch({app, store, route, error}){
            // if token exist and user empty - load User object
            if(app.$cookies.get(app.cookie.names.token) && store.getters["user/USER"] === null){
                await store.dispatch('user/LOAD_USER', {
                    id    : app.$cookies.get(app.cookie.names.tokenId),
                    token : app.$cookies.get(app.cookie.names.token)
                }).catch(error => {
                    app.$cookies.remove(app.cookie.names.token);
                    app.$cookies.remove(app.cookie.names.tokenId);

                    console.error(error);
                })
            }

            let names = route.params.doctor.split("_");

            await store.dispatch("doctors/LOAD_AND_SAVE_DOCTOR_FOR_PROFILE_PAGE", {
                first_name : names[0],
                last_name  : names[1]
            })
        },
        data(){
            return {
                map          : null,
                gMapPosition : null,
                breadcrumbs  : [
                    {
                        text : this.$t("links.home"),
                        to   : this.$routes.home.path
                    },
                    {
                        text : this.$t("links.hautarzt"),
                        to   : this.$routes.hautarzt.path
                    },
                    {
                        text : this.$route.params.doctor.replace(/[^a-zA-ZА-Я-а-я]/g, " ")
                    }
                ]
            }
        },
        created(){
            // Set coordinates for google map
            (async () => {
                try{
                    if(this.doctorData.location){
                        if(this.doctorData.location.latitude !== null && this.doctorData.location.longitude !== null){
                            this.gMapPosition = {
                                lat : this.doctorData.location.latitude,
                                lng : this.doctorData.location.longitude
                            };
                        } else{
                            DoctorsApi.gMapDecodeAddressToCoords({address : this.doctorData.location.city || this.doctorData.region.name})
                                      .then(coords => {
                                          if(coords){
                                              this.gMapPosition = coords;
                                          }
                                      })
                        }
                    } else{
                        console.warn("Doctors dont have data for generate google maps");
                    }
                } catch(e){
                    console.error("Doctors dont have data for generate google maps");
                }
            })();
        },
        computed : {
            markers(){
                return [{
                    position : this.gMapPosition
                }]
            },
            doctorData(){
                return this.$store.state.doctors.doctorForProfilePage;
            }
        },
        methods  : {
            startDiagnosticChat(){
                this.$store.commit("diagnosticChat/SET_DOCTOR_ID_FOR_START_DIAGNOSTIC_CHAT", this.doctorData.id);
                this.$router.push(this.$routes.forschung.path);
            }
        }
    }
</script>

<style lang = "scss" scoped>
    $border-radius : 20px;
    $desktop_max_height : 502px;

    .page {
        background : linear-gradient(180deg, #042052 0%, #0F44B2 100%);
    }

    // Only content section
    .section:last-child {
        padding-top    : 0;
        padding-bottom : 0;
    }

    .profile {
        color            : $color-river-bed;
        overflow         : hidden;
        border-radius    : $border-radius;
        background-color : $color-mercury;

        @include tablet-big {
            display        : flex;
            flex-direction : row;
        }

        &__photo {
            width   : 100%;
            display : block;

            @include tablet-big {
                flex       : 1 0 35%;
                display    : flex;
                max-width  : 352px;
                max-height : $desktop_max_height;
                object-fit : cover;
            }

            &__img {
                width      : 100%;
                object-fit : cover;

                @include tablet-big {
                    max-height : $desktop_max_height;
                }
            }
        }

        &__info {
            padding : $main_offset / 2 $main_offset $main_offset;

            @include tablet-big {
                $padding_vertical : 40px;
                $padding_horizontal : 32px;

                display        : flex;
                padding        : $padding_vertical $padding_horizontal * 2 $padding_vertical $padding_horizontal;
                flex-direction : column;
            }

            &__title {
                color       : $color-river-bed;
                font-style  : normal;
                font-weight : 600;

                @include tablet-big {
                    margin-bottom : 0;
                }
            }

            &__name {
                font-weight : 800;

                @include tablet-big {
                    font-size     : 48px;
                    line-height   : 64px;
                    margin-bottom : 24px;
                }
            }

            &__price {
                margin-top : $main_offset;

                @include tablet-big {
                    margin-top : 25px;
                }

                &__title {
                    &:after {
                        content : ":";
                    }
                }

                &__value {
                    color       : $color-curious-blue;
                    font-size   : 1.3em;
                    font-weight : 500;
                }
            }

            &__start-enquiry-btn {
                max-width  : 224px;
                margin-top : $main_offset;
                transition : .3s;
                background : $color-torea-bay;

                @include tablet-big {
                    margin-top : 36px;
                }

                &:hover {
                    background : $color-matisse;
                }
            }
        }
    }

    .g-map {
        color    : $color-rolling-stone;
        margin   : $main_offset calc((100vw - 100%) / -2) 0;
        height   : 50vh;
        position : relative;

        @include tablet-big {
            height     : $desktop_max_height;
            margin-top : 64px;
        }

        &__location-info {
            display : none;

            @include tablet-big {
                top           : 64px;
                left          : 9%;
                display       : block;
                z-index       : 1;
                padding       : 34px 24px;
                position      : absolute;
                background    : white;
                box-shadow    : 0 20px 80px rgba(208, 208, 208, .25);
                border-radius : $border-radius;

                &:before {
                    width            : 18px;
                    height           : 22px;
                    content          : "";
                    display          : block;
                    margin-bottom    : 6px;
                    background-image : url("~static/images/icons/location_marker.svg");
                }
            }
        }
    }
</style>