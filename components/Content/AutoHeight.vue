<template>
	<div class = "textarea-component">
		<textarea class = "input textarea"
				  type = "textarea"
				  name = "textarea"
				  autocomplete = "off"
				  ref = "textarea"
				  :placeholder = "placeholder_text"
				  @keyup.stop = "onChange"
				  @input = "onChange"
				  @paste = "onChange"
				  @change = "onChange">{{ content }}</textarea>
		<div class = "hidden">
			<div class = "input textarea-div" ref = "textareadiv"></div>
		</div>
	</div>
</template>

<script>
    export default {
        props   : {
            placeholder_text : {
                type    : String,
                default : "",
            },
            content : {
                type    : String,
                default : "",
            }
        },
		mounted(){
            // Clear previously value
            if(!("" + this.content)){
                this.$refs.textareadiv.innerText = "";
			}
            
            this.onChange();
		},
        methods : {
            onChange(event){
                this.$refs.textareadiv.innerText = this.$refs.textarea.value;
                this.$refs.textarea.style.height = this.$refs.textareadiv.scrollHeight + "px";

                event && this.$emit("change", event);
            }
        }
    }
</script>

<style lang = "scss" scoped>
	$min-height : 56px;
	
	.textarea {
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
		
		&-component {
			width   : 100%;
			display : flex;
		}
		
		&-div {
			@extend .textarea;
			
			width       : 100%;
			height      : 100%;
			margin      : 0;
			font-size   : 100%;
			font-family : inherit;
			line-height : 1.15;
		}
	}
	
	.hidden {
		width    : 100%;
		opacity  : 0;
		z-index  : -1;
		position : absolute;
	}
</style>