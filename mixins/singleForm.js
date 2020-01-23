// mixins
import validator from "~/mixins/validator"

const DEFAULT_BACKUPED_VALUE = ''
const DEFAULT_IS_EDIT_MODE = false
const DEFAULT_IS_FORM_SENDING = false

export default {
    mixins: [
        validator,
    ],

    data() {
        return {
            backupedValue: DEFAULT_BACKUPED_VALUE,
            isEditMode: DEFAULT_IS_EDIT_MODE,
            isFormSending: DEFAULT_IS_FORM_SENDING,
        }
    },

    methods: {
        toogleIsEditMode() {
            this.isEditMode = !this.isEditMode
        },

        backupValue() {
            this.backupedValue = this.value
        },

        setIsFormSending(isFormSending) {
            this.isFormSending = isFormSending
        },

        onClickEdit() {
            this.backupValue()
            this.toogleIsEditMode()
        },

        onClickCancel() {
            this.toogleIsEditMode()
        },
    }
}