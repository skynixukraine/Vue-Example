<template>
	<div class = "auto-height">
		<textarea class = "auto-height__textarea input"
				  type = "textarea"
				  name = "textarea"
				  autocomplete = "off"
				  ref = "textarea"
				  :placeholder = "placeholder_text"
				  @input = "onInput">{{ inner_value }}</textarea>
		<div v-if = "isMaxLengthCorrect"
			 class = "auto-height__limit"
			 :class = "{'auto-height__limit--enough': inner_value.length === maxLength}">
			<var class = "auto-height__limit__current-length">{{ inner_value.length }}</var>
			<span class = "auto-height__limit__max-length">{{ maxLength }}</span>
		</div>
		<div class = "auto-height__hidden">
			<div class = "auto-height__textarea-div input" ref = "autoheightContainer"></div>
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
            value            : {
                type    : String,
                default : "",
            },
            maxLength        : {
                type    : Number,
                default : null
            },
            minHeight        : {
                type    : String,
                default : ""
            }
        },
        mounted(){
            this.inner_value = this.value + "";
            if(this.minHeight){
                this.$refs.textarea.style.minHeight = this.minHeight;
                this.$refs.autoheightContainer.style.minHeight = this.minHeight;
			}
            this.onInput();
        },
        data(){
            return {
                inner_value : ""
            }
        },
        computed : {
            isMaxLengthCorrect(){
                return typeof this.maxLength === "number" && this.maxLength === this.maxLength; // Not NaN
            }
        },
        methods  : {
            onInput(event){
                if(event){
					let newValue     = this.$refs.textarea.value;
					this.inner_value = newValue;
	
					if(this.isMaxLengthCorrect && this.inner_value.length > this.maxLength){
						newValue                        = newValue.slice(0, this.maxLength);
						this.inner_value                = newValue;
						this.$refs.textarea.value = newValue;
					}
	
					this.$refs.autoheightContainer.innerText = newValue;
					this.$refs.textarea.style.height = this.$refs.autoheightContainer.scrollHeight + "px";
	
					this.$emit("change", newValue);
				}
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