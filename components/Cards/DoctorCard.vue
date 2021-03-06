<template>
	<div class = "doctor-card" :class = "{'doctor-card--is-preview' : isPreview}">
		<NuxtLink :to = "linkToDoctorProfile" class = "link--card doctor-card__photo">
			<img :src = "doctor.photo || require('~/static/images/images/placeholder_doctor_man_img.jpg')"
				 class = "doctor-card__photo__img"
				 alt = "doctor_image">
		</NuxtLink>
		<div class = "doctor-card__main">
			<div class = "doctor-card__main--title-container">
				<div class = "doctor-card__main--name">
					<div class = "doctor-card__main--name_title">{{doctor.title.name || ""}}
						<NuxtLink :to = "linkToDoctorProfile" class = "doctor-card__main--name_full">
							{{ doctor.first_name ? doctor.last_name ? `${doctor.first_name} ${doctor.last_name}` :
							doctor.first_name : "" }}
						</NuxtLink>
					</div>
				
				</div>
			<!--	<div class = "doctor-card__main--price">
					{{ `${doctor.enquire_price} €` || "" }}
				</div> -->
			</div>
			<!-- <div class = "doctor-card__main--description">
				{{ doctor.short_description || !isPreview && doctor.description || "" }}
			</div> -->
			<div class = "doctor-card__main--location" v-if = "doctor.location || doctor.region">
				{{ doctor.location && doctor.location.city || doctor.region && doctor.region.name }}
			</div>
			<NuxtLink v-if = "isPreview" :to = "linkToDoctorProfile" class = "doctor-card__main--start-enquiry-btn link--button link--button-blue">
				{{ this.$t('page-hautarzt.button') }}
				</NuxtLink>
		</div>
	</div>
</template>

<script>
    import modal from '~/mixins/modal'

    export default {
        mixins   : [
            modal,
        ],
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
                if(!(this.doctor.first_name && this.doctor.last_name)) return "/";

                const regexp_spaces = /[\s]/g;

                return this.$routes.hautarzt.path + "/" +
                    this.doctor.first_name.trim().replace(regexp_spaces, "-") + "_" +
                    this.doctor.last_name.trim().replace(regexp_spaces, "-");
            }
        },
        methods  : {
            startDiagnosticChat(){
                this.$store.commit("diagnosticChat/SET_DOCTOR_ID_FOR_START_DIAGNOSTIC_CHAT", this.doctor.id);
                this.$router.push(this.$routes.forschung.path);
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
		height          : 100%;
		
		&__photo {
			width            : 100%;
			position         : relative;
			overflow         : hidden;
			max-width        : $size;
			max-height       : $size;
			border-radius    : $border-radius $border-radius 0 0;
			background-color : $color-black-squeeze;
			
			@include tablet {
				max-width : none;
			}
			
			&__img {
				top             : 0;
				left            : 0;
				width           : 100%;
				height          : 100%;
				position        : absolute;
				object-fit      : cover;
				transition      : $transition;
				object-position : center;
			}
			
			&:after {
				content        : "";
				display        : block;
				padding-bottom : 100%;
			}
		}
		
		&__main {
			$padding : 2%;
			width            : 100%;
			padding          : 0 $padding;
			max-width        : $size;
			border-radius    : 0 0 $border-radius $border-radius;
			background-color : $color-white;
			display          : flex;
			flex-direction   : column;
			flex             : 1 1 auto;
			
			&--title-container {
				width           : 100%;
				padding         : 5% 0 $padding 5%;
				display         : flex;
				flex-direction  : row;
				justify-content : space-between;
			}
			
			&--name {
				min-height      : 90px;
				color           : $color-river-bed;
				font-size       : 24px;
				font-style      : normal;
				font-weight     : 400;
				line-height     : 30px;
				text-decoration : none;
				font-family     : $TheAntiquaB;
				
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
				flex-shrink   : 0;
			}
			
			&--description {
				flex            : 1 0 auto;
				padding         : 5% 0 $padding 5%;
				font-size       : 15px;
				font-style      : normal;
				text-align      : left;
				line-height     : 22px;
				font-family     : $TheSansB;
				font-weight     : 400;
				text-decoration : none;
				flex-grow       : 2;
				color           : $color-rolling-stone;
				
				&:hover {text-decoration : none;}
			}
			
			&--location {
				color       : $color-price;
				padding     : 5% 0 6% 5%;
				font-size   : 18px;
				font-style  : normal;
				font-weight : 500;
				line-height : 23px;
				word-wrap   : break-word;
				
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
				.links {
					color: $color-white;
					left: 0;
				}
			}
			
			&--start-enquiry-btn {
				border        : none;
				margin        : 0 #{-$padding};
				border-radius : 0 0 $border-radius $border-radius;
				&::before {
					border-radius : 0 0 $border-radius $border-radius;
				}
				
				&::before {
					border-radius : 0 0 $border-radius $border-radius;
				}
				&:hover {
					border-radius : 0 0 $border-radius $border-radius;
				}
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
			}
		}
	}
</style>