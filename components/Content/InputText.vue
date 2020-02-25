<template>
	<label class = "input-text__label">
		<span class = "input-text__label__txt"
			  :class = "{'input-text__label__txt--is-required': isRequired}"
			  v-if = "labelTxt">{{ labelTxt }}</span>
		<input type = "text"
			   :placeholder = "placeholder"
			   :name = "name"
			   class = "input-text__input"
			   @blur = "onBlur"
			   @focus = "onFocus"
			   @input = "onChange"
			   @change = "onChange"
			   @keyup.stop = "onChange">
	</label>
</template>

<script>
    export default {
        props   : {
            placeholder : {
                type    : String,
                default : ""
            },
            isRequired  : {
                type    : Boolean,
                default : false
            },
            labelTxt    : {
                type    : String,
                default : ""
            },
            name        : {
                type    : String,
                default : ""
            }
        },
        mounted(){
        },
        data(){
            return {}
        },
        methods : {
            onFocus(event){
                this.$emit("focus", event);
            },
            onBlur(event){
                this.$emit("blur", event);
            },
            onChange(event){
                this.$emit("change", event);
            },
        }
    }
</script>

<style lang = "scss" scoped>
	.input-text {
		&__label {
			color       : $color-rolling-stone;
			cursor      : pointer;
			font-size   : 14px;
			font-style  : normal;
			font-weight : 500;
			line-height : 28px;
			
			@include phone-big {
				font-size : 16px;
			}
			
			@include desktop {
				font-size : 18px;
			}
			
			&__txt {
				&--is-required {
					&:after {
						color   : $color-alert-red;
						content : "*";
						display : inline-block;
						
					}
				}
			}
		}
		
		&__input {
			width         : 100%;
			height        : 40px;
			border        : 2px solid $color-curious-blue;
			background    : #FFF;
			box-sizing    : border-box;
			padding-left  : $main_offset / 2;
			border-radius : 4px;
			
			@include phone-big {
				height : 56px;
			}
		}
	}
</style>