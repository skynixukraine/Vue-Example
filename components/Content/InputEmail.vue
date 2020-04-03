<template>
	<div class="custom-input">
		<label class = "custom-input__label">
			<span class = "custom-input__label__txt"
				  :class = "{'custom-input__label__txt--is-required': isRequired}"
				  v-if = "labelTxt">{{ labelTxt }}</span>
			<input type = "email"
				   :placeholder = "placeholder"
				   :name = "name"
				   :value = "inner_value"
				   class = "custom-input__input"
                   @paste = "onPaste"
				   @blur = "onBlur"
				   @focus = "onFocus"
				   @input = "onChange"
				   @change = "onChange"
				   @keyup.stop = "onChange">
			<!-- <transition name = "main-animation">
				<span v-if = "errors[name]" class = "custom-input__error">{{ errors[name] }}</span>
			</transition> -->
		</label>
	</div>
</template>

<script>
    import validator from "~/mixins/validator";

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
                default : "mail"
            },
            value        : {
                type    : String,
                default : ""
            }
        },
        mixins  : [
            validator,
        ],
		data(){
            return {
                inner_value: null
			}
		},
		mounted(){
            this.inner_value = this.value;
		},
        methods : {
            onFocus(event){
                this.$emit("focus", event);
            },
            onBlur(event){
                this.validateEmail(event);
                this.$forceUpdate();
                this.$emit("blur", event);
            },
            onChange(event){
                this.inner_value = event.target.value;
                this.$emit("change", event);
            },
            onPaste(event) {
                event.preventDefault();
            }
        }
    }
</script>