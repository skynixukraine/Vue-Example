<template>
	<div class="custom-input">
		<label class = "custom-input__label">
			<span class = "custom-input__title"
				  :class = "{'custom-input__title--is-required': isRequired}"
				  v-if = "labelTxt">{{ labelTxt }}</span>
			<input type = "text"
				   :placeholder = "placeholder"
				   :name = "name"
				   :value = "value"
				   class = "custom-input__input"
				   @blur = "onBlur"
				   @focus = "onFocus"
				   @input = "onInput">
		</label>
	</div>
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
            },
            value       : {
                type    : String,
                default : ""
            }
        },
        model   : {
            prop  : "value",
            event : "inner_input"
        },
        methods : {
            onFocus(event){
                this.$emit("focus", event);
            },
            onBlur(event){
                this.$emit("blur", event);
            },
            onInput(event){
                this.$emit("inner_input", event.target.value);
                this.$emit("input", event);
            },
        }
    }
</script>