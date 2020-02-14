<template>
	<div class = "textarea-component">
		<textarea
				class = "input textarea"
				type = "textarea"
				name = "textarea"
				ref = "textarea"
				:placeholder = "placeholder_text"
				@keydown = "autoHeight"
				@keyup = "autoHeight"
				@input = "autoHeight"
				@paste = "autoHeight"
				@change = "autoHeight"
		>
		</textarea>
		<div class = "hidden">
			<div class = "textarea-div" ref = "textareadiv"></div>
		</div>
	</div>
</template>

<script>
    export default {
        props: {
            placeholder_text: {
                type: String,
                required: false,
                default: ''
            }
        },
        methods : {
            autoHeight(){
                this.$refs.textareadiv.innerText = this.$refs.textarea.value;
                this.$refs.textarea.style.height = this.$refs.textareadiv.scrollHeight + "px";
            }
        }
    }
</script>

<style lang = "scss">
	
	.textarea {
		resize         : none;
		padding-top    : 8px;
		padding-bottom : 5px;
		
		@include phone-big {
			padding-top    : 15px;
			padding-bottom : 15px;
		}
		
		&-component {
			width   : 100%;
			display : flex;
		}
		
		&-div {
			@extend .textarea;
			margin      : 0;
			font-size   : 100%;
			min-height  : 56px;
			font-family : inherit;
			line-height : 1.15;
		}
	}
	
	.hidden {
		opacity  : 0;
		z-index  : -1;
		position : absolute;
	}
	
</style>
