<template>
	<div class = "auto-height">
		<textarea class = "auto-height__textarea input"
				  type = "textarea"
				  name = "textarea"
				  autocomplete = "off"
				  ref = "textarea"
				  :placeholder = "placeholder_text"
				  @input = "onInput">{{ value }}</textarea>
		<div v-if = "isMaxLengthCorrect"
			 class = "auto-height__limit"
			 :class = "{'auto-height__limit--enough': value.length === maxLength}">
			<var class = "auto-height__limit__current-length">{{ value.length }}</var>
			<span class = "auto-height__limit__max-length">{{ maxLength }}</span>
		</div>
		<div class = "auto-height__hidden">
			<div class = "auto-height__textarea-div input" ref = "textareadiv"></div>
		</div>
	</div>
</template>

<script>
    export default {
        props    : {
            placeholder_text : {
                type    : String,
                default : "",
            },
            content          : {
                type    : String,
                default : "",
            },
            maxLength        : {
                type    : Number,
                default : null
            }
        },
        mounted(){
            this.value = this.content + "";
            this.onInput();
        },
        data(){
            return {
                value : ""
            }
        },
        computed : {
            isMaxLengthCorrect(){
                return typeof this.maxLength === "number" && this.maxLength === this.maxLength; // Not NaN
            }
        },
        methods  : {
            onInput(event){
                let newValue = this.$refs.textarea.value;
                this.value   = newValue;

                if(this.isMaxLengthCorrect && this.value.length > this.maxLength){
                    newValue                  = newValue.slice(0, this.maxLength);
                    this.value                = newValue;
                    this.$refs.textarea.value = newValue;
                }

                this.$refs.textareadiv.innerText = newValue;
                this.$refs.textarea.style.height = this.$refs.textareadiv.scrollHeight + "px";

                event && this.$emit("change", newValue);
            }
        }
    }
</script>

<style lang = "scss" scoped>
	$min-height : 56px;
	
	.auto-height {
		width          : 100%;
		display        : flex;
		flex-direction : column;
		
		&__textarea {
			resize         : none;
			overflow       : hidden;
			min-height     : $min-height;
			padding-top    : 8px;
			padding-bottom : 5px;
			
			@include phone-big {
				$padding : 15px;
				padding-top    : $padding;
				padding-bottom : $padding;
			}
			
			&-div {
				@extend .auto-height__textarea;
				
				width       : 100%;
				height      : 100%;
				margin      : 0;
				font-size   : 100%;
				font-family : inherit;
				line-height : 1.15;
			}
		}
		
		&__hidden {
			width    : 100%;
			opacity  : 0;
			z-index  : -1;
			position : absolute;
		}
		
		&__limit {
			$font-size : .75em;
			right     : 0;
			bottom    : $font-size * -2;
			position  : absolute;
			font-size : $font-size;
			
			&__current-length {
				display    : inline-block;
				font-style : normal;
				transition : $transition;
				
				&:after {
					content : " /";
				}
			}
			
			&__max-length {
				transition : $transition;
			}
			
			&--enough {
				color : $color-alert-red;
			}
		}
	}
</style>