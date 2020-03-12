<template>
	<div class = "custom-input">
		<label class = "custom-input__label">
		<span class = "custom-input__label__txt"
			  :class = "{'custom-input__label__txt--is-required': isRequired}"
			  v-if = "labelTxt">{{ labelTxt }}</span>
			<input type = "password"
				   ref = "password"
				   :placeholder = "placeholder"
				   :name = "name"
				   class = "custom-input__input"
				   @blur = "onBlur"
				   @focus = "onFocus"
				   @input = "onChange"
				   @change = "onChange"
				   @keyup.stop = "onChange">
			<img v-if = "isToggle"
				 class = "custom-input__password-type-toggle"
				 :src = "require('~/static/images/icons/eye-icon.svg')"
				 alt = "eye-icon"
				 @click = "onTogglePasswordVisibility" />
		</label>
		<transition name = "main-animation">
			<span v-if = "errors[name]" class = "custom-input__error">{{ errors[name] }}</span>
		</transition>
	</div>
</template>

<script>
    import validator from "~/mixins/validator";

    export default {
        props   : {
            placeholder : {
                type    : String,
                default : "Passwort"
            },
            isRequired  : {
                type    : Boolean,
                default : false
            },
            isToggle    : {
                type    : Boolean,
                default : false
            },
            isValidate    : {
                type    : Boolean,
                default : true
            },
            labelTxt    : {
                type    : String,
                default : ""
            },
            name        : {
                type    : String,
                default : "password"
            }
        },
        mixins  : [
            validator,
        ],
        methods : {
            onFocus(event){
                this.$emit("focus", event);
            },
            onBlur(event){
                this.isValidate && this.validatePassword(event);
                this.isValidate && this.$forceUpdate();
                this.$emit("blur", event);
            },
            onChange(event){
                if(this.errors.hasOwnProperty(this.name)){
                    delete this.errors[this.name];
                    this.$forceUpdate();
                }
                
                this.$emit("change", event);
            },
            onTogglePasswordVisibility(){
                this.$refs.password.type = this.$refs.password.type === "password" ?
                    this.$refs.password.type = "text" :
                    this.$refs.password.type = "password";
            }
        }
    }
</script>

<style lang = "scss" scoped>
	.custom-input {
		$toggle_icon_width : 22px;
		display        : flex;
		align-items    : flex-start;
		flex-direction : column;
		
		&__input {
			padding-right : $main_offset + $toggle_icon_width;
		}
		
		&__error {
			$font_size : .75em;
			position    : static;
			text-align  : left;
			margin-top  : $main_offset / 4;
			line-height : $font_size * 1.5;
		}
		
		&__password-type-toggle {
			top      : calc(50% + 5px);
			right    : $main_offset / 2;
			position : absolute;
		}
	}
</style>