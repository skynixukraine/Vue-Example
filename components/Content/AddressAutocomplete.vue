<template>
	<vue-google-autocomplete
			id = "map"
			classname = "input"
			:placeholder = "placeholder"
			:value = "value"
			@placechanged = "onChange" />
</template>

<script>
    import VueGoogleAutocomplete from "~/node_modules/vue-google-autocomplete";

    export default {
        props      : {
            placeholder : {
                type    : String,
                default : ""
            },
            value : {
                type    : String,
                default : ""
            }
        },
        components : {
            VueGoogleAutocomplete
        },
        methods    : {
            onChange(eventData){
                this.$emit("place-change", eventData);
            }
            
        }
    }
</script>

<style lang = "scss">


</style>
