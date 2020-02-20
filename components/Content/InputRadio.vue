<template>
	<div class = "input-radio">
		<span class = "input-radio__title"
			  v-if = "groupTitle"
			  :class = "{'input-radio__title--is-required': isRequired}">
			{{ groupTitle }}
		</span>
		<div class = "input-radio__content">
			<label class = "input-radio__item input-radio__label"
				   v-for = "(radio, index) in radioList" :key = "`${itemsKeyPrefix}_${index}`">
				<input type = "radio"
					   class = "input-radio__input"
					   :name = "name"
					   :value = "radio.value"
					   @change = "onChange">
				<span class = "input-radio__icon"></span>
				<span class = "input-radio__txt">{{ radio.txt }}</span>
			</label>
		</div>
	</div>
</template>


<script>
    export default {
        props   : {
            radioList      : {
                type     : Array,
                required : true
            },
            isRequired     : {
                type    : Boolean,
                default : false
            },
            groupTitle     : {
                type    : String,
                default : ""
            },
            name           : {
                type    : String,
                default : "radio"
            },
            itemsKeyPrefix : {
                type    : String,
                default : "radio"
            }
        },
        methods : {
            onChange(event){
                this.$emit("change", event);
            },
        }
    }
</script>

<style lang = "scss" scoped>
	.input-radio {
		&__title {
			&--is-required {
				&:after {
					color   : $color-alert-red;
					content : "*";
					display : inline-block;
				}
			}
		}
		
		&__content {
			margin    : 0 #{$main_offset / -1.5};
			display   : flex;
			flex-wrap : wrap;
		}
		
		&__item {
			margin      : $main_offset / 8 $main_offset / 4;
			cursor      : pointer;
			padding     : $main_offset / 4 $main_offset / 2;
			display     : flex;
			position    : relative;
			align-items : center;
		}
		
		&__input {
			opacity  : 0;
			z-index  : -1;
			position : absolute;
			
			&:checked + .input-radio__icon {
				&:before {
					opacity : 1;
				}
			}
		}
		
		&__icon {
			$out_size : 24px;
			width         : $out_size;
			height        : $out_size;
			border        : 2px solid $color-matisse;
			display       : inline-block;
			position      : relative;
			margin-right  : 6px;
			border-radius : 50%;
			
			&:before {
				$inner_size : $out_size * .5;
				top              : calc(50% - #{$inner_size / 2});
				left             : calc(50% - #{$inner_size / 2});
				width            : $inner_size;
				height           : $inner_size;
				content          : " ";
				opacity          : 0;
				display          : block;
				position         : absolute;
				transition       : $transition;
				border-radius    : 50%;
				background-color : $color-matisse;
			}
		}
		
		&_txt {
		
		}
	}
</style>