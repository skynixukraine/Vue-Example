<template>
    <modal
        name="register-success"
        transition="nice-modal-fade"
        :width="500"
        :height="'auto'"
        :delay="100"
        :adaptive="true"
        :class="'modal'"
    >
        <button class="modal__close-button" @click="closeModal('register-success')"></button>
        <header class="modal__header">
            <h3 class="modal__title">Register Success</h3>
        </header>
        <div class="modal__main">
            <p>Мы отправили вам письмо с подтверждением на указанный email.</p>
        </div>
        <footer class="modal__footer">
            <div class="modal__footer-item">
                <button class="link link--button link--button-blue">Отправить письмо повторно</button>
            </div>
        </footer>
    </modal>
</template>

<script>
// mixins
import modal from '~/mixins/modal'

export default {
    mixins: [modal]
}
</script>