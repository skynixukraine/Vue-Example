<template>
	<div class = "loader"></div>
</template>

<script>
	export default {}
</script>

<style lang = "scss" scoped>
	$max_offset: 3em;
	
	.loader {
		$size: 1em;
		color             : $color-tory-blue;
		width             : $size;
		height            : $size;
		margin            : calc(#{$max_offset + $max_offset}) auto;
		position          : relative;
		font-size         : $size;
		text-indent       : -9999em;
		border-radius     : 50%;
		-webkit-animation : load-animation 1.3s infinite linear;
		animation         : load-animation 1.3s infinite linear;
		-webkit-transform : translateZ(0);
		-ms-transform     : translateZ(0);
		transform         : translateZ(0);
	}
	
	@-webkit-keyframes load-animation {
		0%, 100% {
			box-shadow : 0 #{-$max_offset} 0 0.2em, 2em -2em 0 0em, $max_offset 0 0 -1em, 2em 2em 0 -1em, 0 $max_offset 0 -1em, -2em 2em 0 -1em, #{-$max_offset} 0 0 -1em, -2em -2em 0 0;
		}
		12.5% {
			box-shadow : 0 #{-$max_offset} 0 0, 2em -2em 0 0.2em, $max_offset 0 0 0, 2em 2em 0 -1em, 0 $max_offset 0 -1em, -2em 2em 0 -1em, #{-$max_offset} 0 0 -1em, -2em -2em 0 -1em;
		}
		25% {
			box-shadow : 0 #{-$max_offset} 0 -0.5em, 2em -2em 0 0, $max_offset 0 0 0.2em, 2em 2em 0 0, 0 $max_offset 0 -1em, -2em 2em 0 -1em, #{-$max_offset} 0 0 -1em, -2em -2em 0 -1em;
		}
		37.5% {
			box-shadow : 0 #{-$max_offset} 0 -1em, 2em -2em 0 -1em, $max_offset 0em 0 0, 2em 2em 0 0.2em, 0 $max_offset 0 0em, -2em 2em 0 -1em, #{-$max_offset} 0em 0 -1em, -2em -2em 0 -1em;
		}
		50% {
			box-shadow : 0 #{-$max_offset} 0 -1em, 2em -2em 0 -1em, $max_offset 0 0 -1em, 2em 2em 0 0em, 0 $max_offset 0 0.2em, -2em 2em 0 0, #{-$max_offset} 0em 0 -1em, -2em -2em 0 -1em;
		}
		62.5% {
			box-shadow : 0 #{-$max_offset} 0 -1em, 2em -2em 0 -1em, $max_offset 0 0 -1em, 2em 2em 0 -1em, 0 $max_offset 0 0, -2em 2em 0 0.2em, #{-$max_offset} 0 0 0, -2em -2em 0 -1em;
		}
		75% {
			box-shadow : 0 #{-$max_offset} 0 -1em, 2em -2em 0 -1em, $max_offset 0em 0 -1em, 2em 2em 0 -1em, 0 $max_offset 0 -1em, -2em 2em 0 0, #{-$max_offset} 0em 0 0.2em, -2em -2em 0 0;
		}
		87.5% {
			box-shadow : 0 #{-$max_offset} 0 0, 2em -2em 0 -1em, $max_offset 0 0 -1em, 2em 2em 0 -1em, 0 $max_offset 0 -1em, -2em 2em 0 0, #{-$max_offset} 0em 0 0, -2em -2em 0 0.2em;
		}
	}
	
	@keyframes load-animation {
		0%, 100% {
			box-shadow : 0 #{-$max_offset} 0 0.2em, 2em -2em 0 0em, $max_offset 0 0 -1em, 2em 2em 0 -1em, 0 $max_offset 0 -1em, -2em 2em 0 -1em, #{-$max_offset} 0 0 -1em, -2em -2em 0 0;
		}
		12.5% {
			box-shadow : 0 #{-$max_offset} 0 0, 2em -2em 0 0.2em, $max_offset 0 0 0, 2em 2em 0 -1em, 0 $max_offset 0 -1em, -2em 2em 0 -1em, #{-$max_offset} 0 0 -1em, -2em -2em 0 -1em;
		}
		25% {
			box-shadow : 0 #{-$max_offset} 0 -0.5em, 2em -2em 0 0, $max_offset 0 0 0.2em, 2em 2em 0 0, 0 $max_offset 0 -1em, -2em 2em 0 -1em, #{-$max_offset} 0 0 -1em, -2em -2em 0 -1em;
		}
		37.5% {
			box-shadow : 0 #{-$max_offset} 0 -1em, 2em -2em 0 -1em, $max_offset 0em 0 0, 2em 2em 0 0.2em, 0 $max_offset 0 0em, -2em 2em 0 -1em, #{-$max_offset} 0em 0 -1em, -2em -2em 0 -1em;
		}
		50% {
			box-shadow : 0 #{-$max_offset} 0 -1em, 2em -2em 0 -1em, $max_offset 0 0 -1em, 2em 2em 0 0em, 0 $max_offset 0 0.2em, -2em 2em 0 0, #{-$max_offset} 0em 0 -1em, -2em -2em 0 -1em;
		}
		62.5% {
			box-shadow : 0 #{-$max_offset} 0 -1em, 2em -2em 0 -1em, $max_offset 0 0 -1em, 2em 2em 0 -1em, 0 $max_offset 0 0, -2em 2em 0 0.2em, #{-$max_offset} 0 0 0, -2em -2em 0 -1em;
		}
		75% {
			box-shadow : 0 #{-$max_offset} 0 -1em, 2em -2em 0 -1em, $max_offset 0em 0 -1em, 2em 2em 0 -1em, 0 $max_offset 0 -1em, -2em 2em 0 0, #{-$max_offset} 0em 0 0.2em, -2em -2em 0 0;
		}
		87.5% {
			box-shadow : 0 #{-$max_offset} 0 0, 2em -2em 0 -1em, $max_offset 0 0 -1em, 2em 2em 0 -1em, 0 $max_offset 0 -1em, -2em 2em 0 0, #{-$max_offset} 0em 0 0, -2em -2em 0 0.2em;
		}
	}
</style>