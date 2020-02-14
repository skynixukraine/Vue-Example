<template>
	<modal :name = "$modals.contactModals"
			transition = "nice-modal-fade"
			:width = "1100"
			:height = "'auto'"
			:delay = "100"
			:adaptive = "true"
			:class = "'modal'">
		<button class = "modal__close-button" @click = "closeModal($modals.contactModals)"></button>
		<header class = "modal__header">
			<h3 class = "modal__title">Communication</h3>
		</header>
		<div class = "modal__main">
			<div class = "table">
				<div class = "table__info">
					<div class = "table__info-count">
						1-50 from 120
					</div>
					<div class = "table__info-nav">
						<NuxtLink class = "table__info-link table__info-prev" to = "/"></NuxtLink>
						<NuxtLink class = "table__info-link table__info-next" to = "/"></NuxtLink>
					</div>
				</div>
				<div class = "table__content">
					<div class = "table__header">
						<div class = "table__header-item">Date</div>
						<div class = "table__header-item">Name</div>
						<div class = "table__header-item  table__item_big">Message</div>
					</div>
					<div class = "table__main">
						<div class = "table__main-items">
							<div class = "table__main-item">hh:mm dd/mm/yy</div>
							<div class = "table__main-item"> doctor name</div>
							<div class = "table__main-item table__item_big"> doctor message</div>
						</div>
						<div class = "table__main-items">
							<div class = "table__main-item">hh:mm dd/mm/yy</div>
							<div class = "table__main-item"> patient name</div>
							<div class = "table__main-item table__item_big"> patient message and/or attachment</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<footer class = "modal__footer">
			<div class = "modal__footer-item">
				<form class = "modal__form">
					<AutoHeight :placeholder_text="'Enter your message ...'" />
					<buttom class = "link link--button link--button-blue link--button-gradient">Send</buttom>
				</form>
			</div>
		</footer>
	</modal>
</template>

<script>
    // mixins
    import modal from '~/mixins/modal';
    import AutoHeight from "~/components/Content/AutoHeight";

    export default {
        components : {
            AutoHeight
        },

        mixins : [
            modal,
        ],
    }
</script>
<style lang = "scss">
	.modal {
		&__form {
			display        : flex;
			align-items    : flex-end;
			flex-direction : column;
			
			@include tablet {
				flex-direction : row;
			}
		}
		
		&__header {
			margin-bottom : 55px;
		}
		
		.table__item_big {
			flex-basis : 50%;
			margin-top : 10px;
			
			@include tablet {
				margin-top : 0;
			}
		}
		
		.table__info {
			top : -45px;
		}
		
		.link {
			margin-top : 10px;
			
			@include tablet {
				margin-top : 0;
			}
		}
		
		.textarea {
			height : 59px;
		}
	}
</style>