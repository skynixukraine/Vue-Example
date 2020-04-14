<template>
	<label class = "custom-input__label">
		<gmap-autocomplete :class = "'custom-input__input'"
						   :placeholder = "placeholder"
						   :value = "value"
						   @place_changed = "onChange"
						   @input="onInput"/>
	</label>
</template>

<script>
    export default {
        props   : {
            placeholder : {
                type    : String,
                default : ""
            },
            value       : {
                type    : String,
                default : ""
            }
        },
        methods : {
            onChange(eventData){
                this.$emit("place_change", eventData);
            },
            onInput(eventData){
                this.$emit("input", eventData);
            }
        }
    }
</script>

<style lang = "scss">

</style>
