<template lang = "html">
	<div class = "app">
		<slot></slot>
	</div>
</template>

<style lang = "scss">
	/*********************
	START: GENERAL
	*********************/
	body {
		/*font-family: "Sans", sans-serif;*/
		font-family      : $TheSansB;
		font-size        : 18px;
		line-height      : 1.55;
		color            : $color-rolling-stone;
		font-weight      : 400;
		background-color : $color-black-squeeze;
	}
	h1, h2, h3, h4, h5, h6 {
		font-family : $TheAntiquaB;
		line-height : 1.33;
		color       : $color-curious-blue;
		font-weight : 700;
		margin      : 0 0 16px;
	}
	h1 {
		font-size   : 36px;
		line-height : 46px;
		margin      : 0 0 32px;
	}
	h2 {
		font-size   : 36px;
		line-height : 46px;
		font-weight : 800;
		margin      : 0 0 32px;
	}
	h3 {
		font-weight : 400;
		font-size   : 24px;
		line-height : 30px;
	}
	h4 {
		font-weight : 600;
		font-size   : 20px;
		line-height : 26px;
	}
	p { margin : 0; }
	a { text-decoration : none; }
	button {
		cursor                      : pointer;
		-webkit-tap-highlight-color : transparent;
		
		&:active, &:focus {
			outline : none;
		}
	}
	@include tablet {
		h1 {
			font-size   : 62px;
			line-height : 76px;
			margin      : 0 0 32px;
		}
		
		h2 {
			font-size   : 48px;
			line-height : 64px;
			font-weight : 800;
		}
	}
	.app {
		display        : flex;
		overflow-x     : hidden;
		overflow-y     : auto;
		min-height     : 100vh;
		flex-direction : column;
		
		&-main { flex : 1 0 auto; }
	}
	/*********************
	END: GENERAL
	*********************/
	/*********************
	START: COMPONENTS
	*********************/
	
	// page
	.page {
		padding-top : 64px;
		
		&.page--no-padding {
			padding-top : 0;
		}
		
		@include tablet-big {
			padding-top : 80px;
			
			&.page--home {
				background : url("~static/images/images/rectangle-right.png") right 78.5% no-repeat,
				url("~static/images/images/rectangle-left.png") left bottom no-repeat;
			}
		}
	}
	// section
	.section {
		$padding : 64px;
		display             : flex;
		position            : relative;
		padding-top         : $padding;
		align-items         : center;
		flex-direction      : column;
		padding-bottom      : $padding;
		justify-content     : center;
		background-size     : cover;
		background-repeat   : no-repeat;
		background-position : center center;
		
		&.section--fullscreen {
			min-height : 100vh;
			padding-top: 130px;
		}

		&.section--fullscreen .container {
			max-width: 1008px;
			padding: 0;
		}
		
		&.section--0-0 {
			padding-top    : 0;
			padding-bottom : 0;
		}
		
		&.section--32-32 {
			$padding : 32px;
			padding-top    : $padding;
			padding-bottom : $padding;
		}
		
		&.section--64-64 {
			padding-top    : $padding;
			padding-bottom : $padding;
			
			.section-footer {
				text-align : center;
				margin-top : 32px;
				
				@include tablet {
					margin-top : 35px;
				}
			}
		}
		
		&.section--0-default {
			padding-top : 0;
		}
		
		&.section--default-0 {
			padding-bottom : 0;
		}
		
		@include tablet-big {
			$padding : 60px;
			padding-top    : $padding;
			padding-bottom : $padding;
			
			&.section--bg-right-1 {
				background-image    : url("~static/images/images/rectangle-right.png");
				background-size     : auto;
				background-position : right center;
			}
			
			&.section--bg-left-2 {
				background-image    : url("~static/images/images/rectangle-left.png");
				background-size     : auto;
				background-position : 0 20%;
			}
		}
	}
	.section-not-padding { padding : 0; }
	.section-header {
		margin-bottom : 32px;
		
		&__title {
			margin : 0;
			
			&--white {
				color : $color-white;
			}
		}
		
		@include tablet {
			margin-bottom : 8px;
			
			&__title {
				text-align : center;
			}
		}
	}
	.section-footer {
		text-align : center;
		margin-top : 32px;
		
		@include tablet {
			margin-top : 8px;
		}
	}
	.section-scroll-tooltip {
		left       : 50%;
		width      : 100%;
		bottom     : 6px;
		padding    : 0 20px;
		opacity    : 1;
		display    : flex;
		position   : absolute;
		transform  : translate(-50%, -50%);
		transition : opacity $transition ease;
		box-sizing : border-box;
		z-index    : 10;
		
		@include tablet {
			position : fixed;
		}
		
		&--off {
			opacity : 0;
		}
		
		&__inner {
			width           : 33.33%;
			margin          : 0 auto;
			height          : 4px;
			display         : flex;
			background      : $color-white;
			align-items     : center;
			text-indent     : -9999px;
			border-radius   : 10px;
			flex-direction  : row;
			justify-content : flex-start;
		}
		
		@include tablet-big {
			&__inner {
				width               : 100%;
				height              : 33px;
				max-width			: 1008px;
				margin-left         : auto;
				margin-right        : auto;
				background          : none;
				//background-image    : url("~static/images/icons/mouse-scroll.svg");
				background-position : left center;
				background-repeat   : no-repeat;
				font-size           : 15px;
				font-weight         : 300;
				line-height         : 1;
				color               : $color-white;
				display             : flex;
				align-items         : center;
				//padding-left        : 34px;
				text-indent         : 0;
			}
		}
	}
	// container
	.container {
		width        : 100%;
		padding      : 0 $main_offset;
		position     : relative;
		max-width    : 1160px;
		margin-left  : auto;
		margin-right : auto;
		
		&-fluid {
			width    : 100%;
			position : relative;
		}
		
		&-big {
			width        : 100%;
			max-width    : 1366px;
			margin-left  : auto;
			margin-right : auto;
		}
		
		&__dots {
			display : none;
		}
		
		&__mobile-adaptation {
			padding : 50px 20px 0 20px;
		}
		
		@include tablet-big {
			&__dots {
				$vertical_offset : -74px;
				$horizontal_offset : -75px;
				display : block;
				
				&--1, &--2, &--3 {
					position : absolute;
				}
				
				&--1 {
					top   : $vertical_offset;
					right : $horizontal_offset;
				}
				
				&--2 {
					left   : $horizontal_offset;
					bottom : $vertical_offset;
				}
				
				&--3 {
					top   : -186px;
					right : 0;
				}
			}
			&__mobile-adaptation {
				padding : 80px;
			}
		}
	}
	// list
	.list {
		margin     : 0;
		padding    : 0;
		display    : flex;
		list-style : none;
		flex-wrap  : wrap;
		
		&__item {
			flex   : 0 0 100%;
			margin : 0 0 32px;
			
			&--last-child {
				margin : 0;
			}
			
			@include tablet {
				margin : 0;
			}
		}
		
		&--d3 {
			flex-wrap : wrap;
			
			.list__item {
				flex    : 0 0 100%;
				padding : 16px;
				@include tablet {
					max-width : 31.33%;
					flex-wrap : nowrap;
				}
			}
		}
		
		&--d4 {
			.list__item {
				flex : 0 0 100%;
			}
		}
		
		@include phone-big {
			&--d4 {
				.list__item {
					flex : 0 0 50%;
				}
			}
		}
		
		@include tablet {
			&--d3 {
				.list__item {
					flex : 0 0 33.33%;
				}
			}
		}
		
		@include tablet-big {
			&--d3 {
				.list__item {
					flex : 0 0 33.33%;
				}
			}
			
			&--d4 {
				.list__item {
					flex : 0 0 25%;
				}
			}
		}
	}
	// link
	.link {
		display    : inline;
		transition : all $transition ease-in-out;
		
		:hover {
			text-decoration : underline;
		}
		
		:focus {
			outline : none;
		}
		&--line {
			font-style     : normal;
			font-weight    : 500;
			font-size      : 15px;
			line-height    : 22px;
			text-transform : none;
			border         : none;
		}
		&--underline {
			text-decoration : underline;
		}
		&--button {
			width          : auto;
			border         : none;
			display        : inline-block;
			padding        : $main_offset 45px 15px 45px;
			min-width      : 265px;
			font-size      : 16px;
			text-align     : center;
			line-height    : 21px;
			font-weight    : 600;
			border-radius  : 4px;
			text-transform : uppercase;
			letter-spacing : .14em;
			
			&-full-width { width : 100% }
			
			&--button-upload { font-weight : 500; }
			
			&-white {
				background : $color-white;
				color      : $color-curious-blue;
				
				&:hover, &:active {
					background : $color-solitude;
				}
			}
			
			&-blue {
				position: relative;
				z-index: 100;
				background : $color-gradient-button-blue;
				color      : $color-white;
				
				&:hover {
					background : $color-torea-bay;
				}
				
				&:active {
					background-attachment : $color-tory-blue;
				} 
			}

			&-gradient::before {
				position: absolute;
				content: "";
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
				color      : $color-white;
				background-image : $color-gradient-blue-light;
				z-index: -1;
				transition: opacity 0.5s easy-in;
				opacity: 0.7;

				&:hover::before, &:active::before {
					background-image : $color-gradient-blue-dark;
					opacity: 1;
				}
			}
			
			&-transparent {
				color      : $color-curious-blue;
				background : $color-transparent;
				
				&:hover, &:active {
					background : $color-solitude;
				}
			}
			
			&-upload {
				color          : rgba(122, 125, 132, .5);
				border         : 1px solid $color-table-border;
				position       : relative;
				font-size      : 18px;
				text-align     : left;
				background     : $color-white;
				box-sizing     : border-box;
				line-height    : 18px;
				border-radius  : 4px;
				text-transform : lowercase;
				letter-spacing : normal;
				
				::first-letter {
					text-transform : uppercase;
				}
				
				p { padding-left : 12px; }
				
				img {
					top      : 12px;
					left     : 11px;
					position : absolute;
				}
			}
			
			&-mobile-large {
				padding : $main_offset 16px 15px;
				
				@media (min-width : #{$screen-phone-irregular-min}) {
					padding : $main_offset 30px 15px;
				}
			}
		}
		
		&--card {
			display : block;
			
			&:hover {
				transform : translateY(-5px);
			}
		}
		
		&--small-blue {
			color         : $color-curious-blue;
			border-bottom : 1px solid $color-terms-text-decoration
		}
	}
	.link.link--button-upload { font-weight : 400; }
	// input
	.input, .select {
		width         : 100%;
		height        : 40px;
		border        : 1px solid $color-table-border;
		background    : $color-white;
		box-sizing    : border-box;
		padding-top   : 4px;
		padding-left  : 6%;
		border-radius : 4px;
		
		&:focus {
			border : 1px solid $color-curious-blue;
		}
		
		@include phone-big {
			height : 56px;
		}
		
		@include tablet {
			padding-left  : $main_offset / 2;
			padding-right : $main_offset / 2;
		}
	}
	.input {
		&::placeholder, &::-webkit-input-placeholder, &::-moz-placeholder, &:-ms-input-placeholder {
			color       : $color-form-input-placeholder;
			font-style  : normal;
			font-weight : 400;
		}
		
		&--hidden {
			top      : -9999px;
			width    : 0;
			height   : 0;
			position : fixed;
		}
	}
	.select {
		padding-right      : 40px;
		-moz-appearance    : none;
		-webkit-appearance : none;
	}
	//table
	.table {
		position      : relative;
		margin-left   : 0;
		margin-bottom : 50px;
		
		@include desktop-l {
			margin-left : -25px;
		}
		
		&__info {
			top         : -57px;
			right       : 0;
			display     : flex;
			position    : absolute;
			align-items : center;
		}
		
		&__info-nav {
			display     : flex;
			align-items : center;
			margin-left : 31px;
		}
		
		&__info-link {
			&:after {
				$size : 20px;
				width   : $size;
				height  : $size;
				display : block;
				content : ' ';
			}
		}
		
		&__info-prev {
			&:after {
				transform        : rotate(90deg);
				background-image : url("~static/images/icons/arrow-down.svg");
			}
		}
		
		&__info-next {
			margin-left : $main_offset;
			
			&:after {
				transform        : rotate(-90deg);
				background-image : url("~static/images/icons/arrow-down.svg");
			}
		}
		
		&__header {
			display        : none;
			position       : relative;
			padding-bottom : $main_offset / 2;
			
			@include tablet {
				display : flex;
			}
			
			&:after {
				right            : 0;
				width            : calc(100% - 15px);
				height           : 9px;
				bottom           : 0;
				content          : ' ';
				position         : absolute;
				background-color : $color-table-border;
				
				@include desktop-l {
					width : calc(100% - 25px);
				}
			}
		}
		
		&__header-item {
			color      : $color-curious-blue;
			padding    : 0 0 5px 15px;
			flex-basis : 25%;
			
			@include tablet {
				display     : flex;
				align-items : center;
			}
			@include desktop-l {
				padding-left : 25px;
			}
			@include desktop-max {
				line-height    : 1;
				white-space    : pre-line;
				vertical-align : middle;
			}
		}
		&__br {
			display : none;
			@include desktop-max {
				display : inline;
			}
		}
		&__main {
			text-align : left;
		}
		
		&__main-items {
			min-height     : 112px;
			color          : $color-rolling-stone;
			display        : flex;
			position       : relative;
			padding-top    : 10px;
			border-radius  : 4px;
			padding-bottom : 10px;
			flex-direction : column;
			
			@include tablet {
				flex-direction : row;
			}
			
			&:after {
				right            : 0;
				width            : 100%;
				height           : 1px;
				bottom           : 0;
				content          : ' ';
				position         : absolute;
				background-color : $color-table-border;
				
				@include tablet {
					width : calc(100% - 25px);
				}
			}
			
			&:hover {
				color            : $color-river-bed;
				cursor           : pointer;
				background-color : $color-white;
			}
		}
		
		&__main-item {
			position     : relative;
			flex-basis   : 25%;
			padding-left : 50%;
			
			@include tablet {
				padding-left : 15px;
			}
			
			@include desktop-l {
				padding-left : 25px;
			}
			@include tablet-max {
				&:not(:last-child) {
					border-bottom : 1px solid #F3F3F3;
				}
			}
			
			&:before {
				top           : 0;
				left          : 6px;
				width         : 45%;
				color         : $color-curious-blue;
				display       : block;
				content       : attr(data-title);
				position      : absolute;
				white-space   : nowrap;
				padding-right : 10px;
				
				@include tablet {
					display : none;
				}
			}
		}
	}
	/*********************
	END: COMPONENTS
	*********************/
	/*********************
	START: CUSTOM BUTTONS
	*********************/
	
	// buttons with icons
	.button-more-less {
		color      : $color-curious-blue;
		cursor     : pointer;
		border     : none;
		padding    : 0;
		display    : inline-block;
		background : none;
		
		&::before {
			$size : 32px;
			width           : $size;
			height          : $size;
			border          : 1px solid rgba(36, 126, 229, .1);
			content         : "+";
			display         : inline-flex;
			font-size       : 28px;
			box-shadow      : 0 20px 80px rgba(208, 208, 208, .25);
			align-items     : center;
			line-height     : 1;
			margin-right    : 8px;
			border-radius   : 50%;
			justify-content : center;
		}
	}
	/*********************
	END: CUSTOM BUTTONS
	*********************/
	
	/*********************
	Cookie banner
	*********************/
	.cookie {
		left             : 50%;
		width            : 100%;
		bottom           : 0;
		padding          : 25px $main_offset;
		z-index          : 10;
		position         : fixed;
		transform        : translateX(-50%);
		border-radius    : 4px;
		background-color : rgba(255, 255, 255, 1);
		
		.cookie__floating__content {
			padding-bottom : 14px;
		}
		
		.cookie__floating__wrap {
			float     : none;
			margin    : 0 auto;
			max-width : 1160px;
			position  : relative;
		}
		
		.cookie__floating__buttons__button {
			color         : white;
			border        : none;
			margin        : 0 $main_offset / 2 0 0;
			padding       : 10px $main_offset 9px;
			font-size     : 16px;
			font-weight   : 500;
			background    : linear-gradient(270deg, #0F44B2 0%, #042052 100%);
			font-family   : $TheSansB;
			border-radius : 5px;
			
			@include tablet {
				margin    : 0 $main_offset 0 0;
				padding   : $main_offset / 2 31px 9px;
				font-size : 18px;
			}
		}
		&__floating__buttons {
			padding : 0 0 0 211px;
			@include tablet {
				padding : 0 0 0 265px;
			}
			@include phone-big-max {
				padding : 45px 0 0;
			}
		}
	}
	.container__dots-svg {
		@include tablet-big {
			width            : 192px;
			height           : 146px;
			position         : absolute;
			background-image : url("~static/images/icons/dots.svg");
		}
		
		&--doc-photo {
			right   : 91.1%;
			bottom  : 75.2%;
			z-index : -1;
		}
		
		&--hand-photo {
			top   : 519px;
			right : 90%;
		}
		
		&--consult-block {
			left   : 1044px;
			bottom : 175px;
		}
	}
	// Custom radio and checkboxes
	.custom {
		&-checkbox, &-radio {
			margin          : 0 #{-$main_offset / 2};
			display         : flex;
			flex-wrap       : wrap;
			justify-content : flex-end;
			
			&__item {
				color       : $color-solitude;
				margin      : $main_offset / 4 $main_offset / 2;
				display     : flex;
				position    : relative;
				align-items : center;
			}
			
			&__input {
				opacity  : 0;
				z-index  : -1;
				position : absolute;
				
				&:checked + .custom-checkbox__label, &:checked + .custom-radio__label {
					background-color : $color-matisse;
					
					.custom-checkbox__label__icon, .custom-radio__label__icon {
						&:before {
							opacity : 1;
						}
					}
				}
			}
			
			&__label {
				$inner_offset : 6px;
				cursor           : pointer;
				display          : flex;
				padding          : $inner_offset * 4 / 3 $main_offset / 2 $inner_offset;
				transition       : $transition;
				align-items      : center;
				border-radius    : 6px;
				background-color : $color-curious-blue;
				
				&__icon {
					$size : 14px;
					width            : $size;
					height           : $size;
					display          : inline-block;
					position         : relative;
					margin-top       : -.125em;
					margin-right     : $inner_offset;
					background-color : white;
					
					&:before {
						top        : 0;
						left       : 0;
						width      : 100%;
						height     : 100%;
						opacity    : 0;
						display    : block;
						position   : absolute;
						transition : $transition;
					}
				}
				
				&:hover { background-color : $color-matisse; }
			}
		}
		
		&-checkbox {
			&__label {
				&__icon {
					border-radius : 2px;
					
					&:before {
						$different_size : 25%;
						top              : $different_size / -2;
						left             : $different_size / -2;
						color            : $color-matisse;
						width            : 100% + $different_size;
						height           : 100% + $different_size;
						content          : "";
						background-image : url("~static/images/icons/checkbox-checked.svg");
					}
				}
			}
		}
		
		&-radio {
			&__label {
				&__icon {
					border-radius : 50%;
					
					&:before {
						$size : 8px;
						top              : calc(50% - #{$size / 2});
						left             : calc(50% - #{$size / 2});
						width            : $size;
						height           : $size;
						content          : " ";
						border-radius    : 50%;
						background-color : $color-matisse;
					}
				}
			}
		}
		
		&-input {
			position : relative;
			
			&__label {
				color          : $color-rolling-stone;
				width          : 100%;
				cursor         : pointer;
				display        : flex;
				position       : relative;
				font-size      : 14px;
				font-style     : normal;
				font-weight    : 500;
				line-height    : 28px;
				align-items    : flex-start;
				flex-direction : column;
				
				@include phone-big {
					font-size : 16px;
				}
				
				@include desktop {
					font-size : 18px;
				}
				
				&__txt {
					&--is-required {
						&:after {
							color   : $color-alert-red;
							content : "*";
							display : inline-block;
						}
					}
				}
			}
			
			&__input {
				width         : 100%;
				height        : 40px;
				border        : 1px solid $color-table-border;
				background    : #FFF;
				box-sizing    : border-box;
				padding-left  : $main_offset / 2;
				border-radius : 4px;
				
				&:focus {
					border : 1px solid $color-curious-blue;
				}
				@include phone-big {
					height : 56px;
				}
			}
			
			&__error {
				$font_size : .75em;
				top         : calc(100% + .25em);
				left        : 0;
				color       : $color-alert-red;
				position    : absolute;
				font-size   : $font_size;
				line-height : $font_size;
			}
		}
	}
	.control-btn {
		color         : $color-black-squeeze;
		border        : none;
		margin        : 0 $main_offset / 2;
		padding       : $main_offset / 2 + 4 $main_offset $main_offset / 2;
		transition    : $transition;
		line-height   : 1;
		border-radius : 4px;
		
		&--cancel {
			@extend .control-btn;
			background-color : transparentize($color-cinnabar, .25);
			
			&:hover {
				background-color : $color-cinnabar;
			}
		}
		
		&--submit {
			@extend .control-btn;
			background-color : transparentize($color-user-is-active, .25);
			
			&.is-disable {
				cursor           : not-allowed;
				pointer-events   : none;
				background-color : $color-rolling-stone;
			}
			
			&:hover {
				background-color : $color-user-is-active;
			}
		}
		
		&--disabled {
			cursor           : not-allowed;
			pointer-events   : none;
			background-color : $color-rolling-stone;
		}
	}
	// Vue transition
	.main-animation-enter-active, .main-animation-leave-active {
		transition : $transition;
	}
	.main-animation-enter, .main-animation-leave-to {
		opacity   : 0;
		transform : translateY(50px);
	}
	//Hide recaptcha badge on all pages @see https://jira.skynix.co/browse/OH-220
	.grecaptcha-badge { opacity : 0;}
</style>