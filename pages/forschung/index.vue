<template>
	<div class = "page">
		<div class = "section" :class = "{'section--is-editing-message': editingData}">
			<div class = "container">
				<div class = "chat-container" v-if = "messages">
					<transition-group name = "main-animation" tag = "div">
						<div v-for = "(item, chat_message_index) in messages" :key = "`message_${chat_message_index}`"
							 class = "message"
							 :class = "{
								 'message--is-me': !item.questioner,
								 'message--is-body': item.type === QUESTION_TYPES.bodySelect,
								 'message--is-delete': false,
								 'message--is-editing': editingData && item.message_id === editingData.message_id,
								 'message--editing-question': editingData && messages[chat_message_index] && messages[chat_message_index].id === editingData.message_id
							 }"
							 :id = "`message_${chat_message_index}`">
							<transition name = "edit-animation">
								<div class = "edit-answer-area"
									 :class = "{'is-for-input-text': editingData.type === QUESTION_TYPES.inputText}"
									 v-if = "editingData && item.message_id === editingData.message_id">
									<div class = "edit-answer-area__wrapper"
										 :class = "{'is-for-input-text': editingData.type === QUESTION_TYPES.inputText}">
										<!--Multi select-->
										<div class = "custom-checkbox"
											 ref = "editMultiSelect"
											 v-if = "editingData.type && editingData.type === QUESTION_TYPES.multiSelect">
											<div class = "custom-checkbox__item"
												 v-for = "(option, index) in questions[editingData.message_index].options"
												 :key = "`edit-message_${editingData.message_id}__multi-select_${option.id}`">
												<input type = "checkbox"
													   :id = "`edit-message_${editingData.message_id}__multi-select_${option.id}`"
													   :value = "option.id"
													   v-model = "editingData.selectedOptions"
													   :data-index = "index"
													   class = "custom-checkbox__input">
												<label :for = "`edit-message_${editingData.message_id}__multi-select_${option.id}`"
													   class = "custom-checkbox__label">
													<span class = "custom-checkbox__label__icon"></span>
													{{ option.value }}
												</label>
											</div>
										</div>
										<!--Radio-->
										<div class = "custom-radio"
											 ref = "editRadio"
											 v-if = "editingData.type && editingData.type === QUESTION_TYPES.radio">
											<div class = "custom-radio__item"
												 v-for = "(option, index) in questions[editingData.message_index].options"
												 :key = "`edit-message_${editingData.message_index}__radio_${option.id}`">
												<input type = "radio"
													   name = "edit-answer-area-radio"
													   :id = "`edit-message_${editingData.message_index}__radio_${option.id}`"
													   :value = "option.id"
													   v-model = "editingData.selectedOption[0]"
													   :data-index = "index"
													   class = "custom-radio__input">
												<label :for = "`edit-message_${editingData.message_index}__radio_${option.id}`"
													   class = "custom-radio__label">
													<span class = "custom-radio__label__icon"></span>
													{{ option.value }}
												</label>
											</div>
										</div>
										<!--Input Text-->
										<div class = "edit-answer-area__input-text"
											 v-if = "editingData.type === QUESTION_TYPES.inputText">
											<AutoHeight @change = "onInputText"
														:maxLength = "255"
														:value = "userAnswers[editingData.message_index].contentForChat" />
										</div>
										<!--Select body part-->
										<div class = "edit-answer-area__select-body-part"
											 v-if = "editingData.type === QUESTION_TYPES.bodySelect">
											<div class = "edit-answer-area__select-body-part__parts">
												<BodyParts @select-body-part = "onSelectBodyPart"
														   :selectedParts = editingData.selectedBodyParts />
											</div>
										</div>
										<!--Upload image-->
										<div class = "edit-answer-area__upload-image"
											 v-if = "editingData.type === QUESTION_TYPES.uploadImg">
											<input type = "file"
												   accept = ".jpeg, .jpg, .png"
												   class = "edit-answer-area__upload-image__input"
												   ref = "editUploadImgInput"
												   @change = "onUploadFile">
											<div class = "edit-answer-area__upload-image__user-image-container"
												 v-html = "editingData.fileHTML"
												 v-if = "editingData.fileHTML"
												 @click = "$refs.editUploadImgInput[0].click()"></div>
										</div>
										<div class = "edit-answer-area__controls">
											<button type = "button"
													class = "control-btn--cancel"
													@click = "onEditMessageCancel">Cancel
											</button>
											<button type = "button"
													class = "control-btn--submit"
													:class = "{
														'is-disable': editingData.type === QUESTION_TYPES.multiSelect && !editingData.selectedOptions.length || editingData.type === QUESTION_TYPES.inputText && !editingData.contentForChat,
														'is-text': lastQuestionData.type === QUESTION_TYPES.inputText,
														'is-upload-photo': lastQuestionData.type === QUESTION_TYPES.uploadImg && !lastUploadedImg.file
													}"
													@click = "onEditMessageSubmit">Confirm
											</button>
										</div>
									</div>
								</div>
							</transition>
							<transition name = "edit-animation">
								<div class = "message__container"
									 :class = "{
										 'message__container--hide': editingData && item.message_id === editingData.message_id
									 }">
									<span class = "message__questioner">{{ item.questioner || "Ich" }}</span>
									<div class = "message__content">
										<div v-if = "item.contentForChat && item.type === QUESTION_TYPES.uploadImg"
											 v-html = "item.contentForChat"></div>
										<span v-else-if = "item.contentForChat && item.contentForChat !== QUESTION_TYPES.bodySelect">{{ item.contentForChat }}</span>
										<div v-else-if = "item.selectedBodyParts && item.selectedBodyParts.length || item.contentForChat === QUESTION_TYPES.bodySelect">
											<BodyParts :clickable = false :selectedParts = item.selectedBodyParts />
										</div>
										<span v-else-if = "item.content" v-html = "item.content"></span>
									</div>
									<button v-if = "!editingData && item.message_id"
											type = "button"
											class = "control-btn edit-answer-area__edit-btn"
											@click = "onEditMessageStart(item.message_id)">bearbeiten
									</button>
								</div>
							</transition>
						</div>
					</transition-group>
				</div>
				<transition name = "main-animation">
					<div class = "answer-area"
						 :class = "{'is-wait-loading': !isShowUserAnswerArea}"
						 v-if = "lastQuestionData && !isQuestionsOver">
						<div class = "answer-area__wrapper"
							 :class = "{'is-for-input-text': lastQuestionData.type === QUESTION_TYPES.inputText}">
							<div class = "answer-area__content">
								<!--Multi select-->
								<div class = "custom-checkbox"
									 ref = "lastMultiSelect"
									 v-if = "lastQuestionData.type && lastQuestionData.type === QUESTION_TYPES.multiSelect">
									<div class = "custom-checkbox__item"
										 v-for = "(option, index) in lastQuestionData.options"
										 :key = "`message_${lastQuestionData.id}__multi-select_${option.id}`">
										<input type = "checkbox"
											   :id = "`message_${lastQuestionData.id}__multi-select_${option.id}`"
											   :value = "option.id"
											   :data-index = "index"
											   class = "custom-checkbox__input"
											   @change = "onChangeMultiSelect">
										<label :for = "`message_${lastQuestionData.id}__multi-select_${option.id}`"
											   class = "custom-checkbox__label">
											<span class = "custom-checkbox__label__icon"></span>
											{{ option.value }}
										</label>
									</div>
								</div>
								<!--Radio-->
								<div class = "custom-radio"
									 ref = "lastRadio"
									 v-if = "lastQuestionData.type && lastQuestionData.type === QUESTION_TYPES.radio">
									<div class = "custom-radio__item"
										 v-for = "(option, index) in lastQuestionData.options"
										 :key = "`message_${lastQuestionData.id}__radio_${option.id}`">
										<input type = "radio"
											   name = "answer-area-radio"
											   :id = "`message_${lastQuestionData.id}__radio_${option.id}`"
											   :value = "option.id"
											   :data-index = "index"
											   class = "custom-radio__input"
											   @change = "onChangeRadio">
										<label :for = "`message_${lastQuestionData.id}__radio_${option.id}`"
											   class = "custom-radio__label">
											<span class = "custom-radio__label__icon"></span>
											{{ option.value }}
										</label>
									</div>
								</div>
								<!--Input Text-->
								<div class = "answer-area__input-text"
									 v-if = "lastQuestionData.type === QUESTION_TYPES.inputText">
									<AutoHeight @change = "onInputText"
												:maxLength = "255"
												:key = "`input_text_${lastQuestionData.id}`" />
								</div>
								<!--Select body part-->
								<div class = "answer-area__select-body-part"
									 v-if = "lastQuestionData.type === QUESTION_TYPES.bodySelect">
									<div class = "answer-area__select-body-part__parts">
										<BodyParts @select-body-part = "onSelectBodyPart"
												   :selectedParts = selectedBodyParts />
									</div>
								</div>
								<!--Upload image-->
								<div class = "answer-area__upload-image"
									 v-if = "lastQuestionData.type === QUESTION_TYPES.uploadImg">
									<input type = "file"
										   accept = ".jpeg, .jpg, .png"
										   class = "answer-area__upload-image__input"
										   ref = "lastUploadImgInput"
										   @change = "onUploadFile">
									<div class = "answer-area__upload-image__user-image-container"
										 v-html = "lastUploadedImg.fileHTML"
										 v-if = "lastUploadedImg.fileHTML"
										 @click = "$refs.lastUploadImgInput.click()"></div>
								</div>
							</div>
							<transition name = "main-animation">
								<div class = "answer-area__submit-btn__wrapper">
									<button v-if = "lastQuestionData.type"
											type = "button"
											class = "submit-btn"
											:class = "{
												'is-disable': lastQuestionData.type === QUESTION_TYPES.multiSelect && !lastMultiSelectSelectedValuesIndexes || lastQuestionData.type === QUESTION_TYPES.radio && !lastSelectedRadioIndex || lastQuestionData.type === QUESTION_TYPES.inputText && !lastInputTextText || lastQuestionData.type === QUESTION_TYPES.bodySelect && !selectedBodyParts.length,
												'is-text': lastQuestionData.type === QUESTION_TYPES.inputText,
												'is-upload-photo': lastQuestionData.type === QUESTION_TYPES.uploadImg && !lastUploadedImg.file
											}"
											@click.stop = "onUserSubmit()">
										{{ lastQuestionData.type === QUESTION_TYPES.uploadImg && !lastUploadedImg.file ? "Bild hochladen" : lastQuestionData.button }}
									</button>
									<button v-else class = "submit-btn"
											@click = "onStart"
											type = "button">
										{{ this.firstQuestion.button }}
									</button>
									<transition name = "main-animation">
										<div class = "answer-area__errors-message"
											 v-if = "lastUploadedImg.errorMessage">
											{{ lastUploadedImg.errorMessage }}
										</div>
									</transition>
								</div>
							</transition>
						</div>
					</div>
				</transition>
				<transition name = "main-animation">
					<div class = "personal-info" v-if = "isQuestionsOver">
						<h2>{{ this.$t('page-forschung.feedback-form.title')}}</h2>
						<div class = "personal-info__field">
							<InputText :labelTxt = personalInfoData.firstName.txt
									   :isRequired = true
									   :placeholder = personalInfoData.firstName.txt
									   :name = "'firstName'"
									   @blur = "onPersonalInfoNameBlur" />
							<span class = "error-message" v-show = "errors.firstName">{{ this.errors.firstName }}</span>
						</div>
						<div class = "personal-info__field">
							<InputText :labelTxt = personalInfoData.lastName.txt
									   :isRequired = true
									   :placeholder = personalInfoData.lastName.txt
									   :name = "'lastName'"
									   @blur = "onPersonalInfoNameBlur" />
							<span class = "error-message" v-show = "errors.lastName">{{ this.errors.lastName }}</span>
						</div>
						<div class = "personal-info__field">
							<InputRadio :radioList = "PERSONAL_INFO__RADIO_GENDER"
										:groupTitle = personalInfoData.gender.txt
										:isRequired = true
										@change = "onPersonalInfoChangeGender" />
							<span class = "error-message" v-show = "errors.gender">{{ this.errors.gender }}</span>
						</div>
						<div class = "personal-info__field">
							<label>
								<div class = "personal-info__field__title is-required">{{ this.$t('page-forschung.feedback-form.mobile')}}</div>
								<vue-tel-input id = "vue-tel-input"
											   class="custom-input__input"
											   name = "phone_number"
											   v-bind = "PERSONAL_INFO__PHONE_BIND_PROPS"
											   @blur = "onPersonalInfoPhoneBlur"
											   @input = "onPersonalInfoPhoneChange" />
								<span class = "error-message" v-show = "errors.phone">{{ this.errors.phone }}</span>
							</label>
						</div>
						<div class = "personal-info__field">
							<InputEmail :labelTxt = personalInfoData.mail.txt
										:isRequired = true
										:placeholder = personalInfoData.mail.txt
										:name = "'mail'"
										@blur = "onPersonalInfoMailBlur" />
						</div>
						<div class = "personal-info__field">
							<label>
								<div class = "personal-info__field__title is-required">{{ this.$t('page-forschung.feedback-form.birth')}}</div>
								<input type = "date"
									   class = "input"
									   style = "color: inherit"
									   @change = "onPersonalInfoChangeDateOfBirth"
									   name = "dateOfBirth">
								<span class = "error-message" v-show = "errors.dateOfBirth">{{ this.errors.dateOfBirth }}</span>
							</label>
						</div>
						<button type = "button"
								class = "submit-btn"
								:class = "{'is-disable': !isValidPersonalInfoBlock}"
								@click = "onPersonalInfoSubmit">Next
						</button>
					</div>
				</transition>
				<transition name = "main-animation">
					<div class = "payment-details" v-if = "isQuestionsOver && isPersonalInfoFilled">
						<h3>{{ `Services ${this.targetDoctor.title ? this.targetDoctor.title.name : ""} ${this.targetDoctor.first_name} ${this.targetDoctor.last_name} cost ${this.targetDoctor.enquire_price}` }}</h3>
						<StripePaymentSystem @create-token = "onCreateToken" />
					</div>
				</transition>
			</div>
			<transition name = "modal">
				<div class = "select-body-part-modal" v-if = "isShowSelectBodyPartModal">
					<div class = "select-body-part-modal__main">
						<BodyParts :isClickable = true
								   :showedHalfPart = showedBodyHalf
								   @select-body-part = "onSelectBodyPart"
								   :selectedParts = "editingData ? editingData.notConfirmedSelectedBodyParts : notConfirmedSelectedBodyParts" />
					</div>
					<footer class = "select-body-part-modal__footer">
						<button class = "control-btn--submit" @click.stop = "onConfirmBodySelectParts">Bestätigen</button>
						<button class = "control-btn--cancel" @click.stop = "onCancelBodySelectParts">Abbrechen</button>
					</footer>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
    import modal from "~/mixins/modal";
    import validator from "~/mixins/validator";
    import BodyParts from "~/components/Content/BodyParts";
    import InputText from "~/components/Content/InputText";
    import InputEmail from "~/components/Content/InputEmail";
    import AutoHeight from "~/components/Content/AutoHeight";
    import InputRadio from "~/components/Content/InputRadio";
    import diagnosticChatApi from "~/services/api/DiagnosticChat";
    import StripePaymentSystem from "~/components/Content/StripePaymentSystem";

    const ANIMATION_DURATION = 750; // Must be equal '$animation_duration' in SCSS

    export default {
        async fetch({app, store, error}){
            // if token exist and user empty - load User object
            if(app.$cookies.get(app.cookie.names.token) && store.getters['user/USER'] === null){
                await store.dispatch("user/LOAD_USER", {
                    id    : app.$cookies.get(app.cookie.names.tokenId),
                    token : app.$cookies.get(app.cookie.names.token)
                }).catch(error => {
                    app.$cookies.remove(app.cookie.names.token);
                    app.$cookies.remove(app.cookie.names.tokenId);
                });
            }

            if(store.state.diagnosticChat.doctorIdForStartDiagnosticChat !== null){
                await store.dispatch("diagnosticChat/LOAD_AND_SAVE_DOCTOR_FOR_DIAGNOSTIC_CHAT", {id : store.state.diagnosticChat.doctorIdForStartDiagnosticChat});
            }
        },
        mixins     : [
            validator,
            modal
        ],
        components : {
            BodyParts,
            InputText,
            InputEmail,
            InputRadio,
            AutoHeight,
            StripePaymentSystem,
        },
        data(){
            return {
                questions                   : [],
                editingData                 : null,
                userAnswers                 : [],
                isQuestionsOver             : false,
                isShowUserAnswerArea        : false,
                isPersonalInfoFilled        : false,
                nextQuestionsId_queue       : [],
                scrollOffsetForForbidScroll : 0,

                // Data for 'body select' question type
                showedBodyHalf                : "",
                selectedBodyParts             : [],
                isShowSelectBodyPartModal     : false,
                notConfirmedSelectedBodyParts : [],

                // Data for last actions user
                lastUploadedImg                      : {
                    file         : null,
                    fileHTML     : "",
                    errorMessage : "",
                },
                lastInputTextText                    : "",
                lastSelectedRadioIndex               : null, // Array, что бы не делать проверки по typeof на number, ибо может быть 0
                lastMultiSelectSelectedValuesIndexes : null,

                personalInfoData : {
                    lastName    : {
                        txt     : this.$t('page-forschung.feedback-form.lastName'),
                        value   : "",
                        isValid : false,
                    },
                    firstName   : {
                        txt     : this.$t('page-forschung.feedback-form.firstName'),
                        value   : "",
                        isValid : false,
                    },
                    gender      : {
                        txt     : this.$t('page-forschung.feedback-form.gender'),
                        value   : "",
                        isValid : false,
                    },
                    dateOfBirth : {
                        txt     : this.$t('page-forschung.feedback-form.birth'),
                        value   : "",
                        isValid : false,
                    },
                    phone       : {
                        txt       : this.$t('page-forschung.feedback-form.mobile'),
                        value     : {
                            value   : "",
                            isValid : false,
                        },
                        isValid   : false,
                        eventData : null
                    },
                    mail        : {
                        txt     : this.$t('page-forschung.feedback-form.email'),
                        value   : "",
                        isValid : false,
                    },
                },

                stripeToken : null,

                // Constants, do not edit this values in code, please
                PERSONAL_INFO__RADIO_GENDER     : [
                    {
                        txt   : this.$t('page-forschung.feedback-form.female'),
                        value : "FEMALE"
                    },
                    {
                        txt   : this.$t('page-forschung.feedback-form.male'),
                        value : "MALE"
                    },
                ],
                PERSONAL_INFO__PHONE_BIND_PROPS : {
                    mode                    : "international",
                    maxLen                  : 25,
                    disabled                : false,
                    required                : true,
                    placeholder             : this.$t('page-forschung.feedback-form.typeNumber'),
                    enabledFlags            : true,
                    autocomplete            : "off",
                    defaultCountry          : "",
                    disabledFormatting      : false,
                    enabledCountryCode      : false,
                    validCharactersOnly     : true,
                    disabledFetchingCountry : false,
                },
                QUESTION_TYPES                  : {
                    radio       : "RADIO",
                    uploadImg   : "IMAGE",
                    inputText   : "TEXT",
                    bodySelect  : "BODY-SELECT",
                    multiSelect : "SELECT"
                },
            }
        },
        computed   : {
            lastQuestionData(){
                return this.questions[this.questions.length - 1];
            },
            body(){
                return document.querySelector("body");
            },
            footer(){
                return document.querySelector("main + footer");
            },
            messages(){
                let result = [];

                for(let i = 0; i < this.questions.length; i++){
                    result.push(this.questions[i]);

                    if(this.userAnswers[i]){
                        result.push(this.userAnswers[i]);
                    }
                }

                return result;
            },
            isValidPersonalInfoBlock(){
                let result = true;

                for(let key in this.personalInfoData){
                    if(!this.personalInfoData[key].isValid){
                        result = false;
                    }
                }

                return result;
            },
            targetDoctor(){
                return this.$store.state.diagnosticChat.targetDoctorForDiagnosticChat;
            },
            firstQuestion(){
                if(this.targetDoctor){
                    return {
                        button     : "Okay!",
                        content    : `Willkommen beim Online Hautarzt vor Ort!<br>` +
                            			`In wenigen Minuten leiten wir Ihre Anfrage an ${this.targetDoctor.title ? this.targetDoctor.title.name : ""} ${this.targetDoctor.first_name} ${this.targetDoctor.last_name} weiter.<br>` +
                            			`Damit diese(r) sich ein gutes Bild von Ihrem Hautproblem machen kann, stellen wir Ihnen vorab einige Fragen und lassen Sie Fotos davon aufnehmen.`,
                        questioner : "Online Hautarzt vor Ort",
                    }
                } else{
                    this.$router.replace(this.$routes.hautarzt.path);
                }
            }
        },
        mounted(){
            if(this.firstQuestion){
                this.questions.push(this.firstQuestion);

                setTimeout(() => {
                    this.isShowUserAnswerArea = true;
                }, ANIMATION_DURATION);
            } else{
                this.$router.replace(this.$routes.hautarzt.path);
            }

            this.$root.$on("submitDiagnosticChatConfirmEnquire", this.onSubmitDiagnosticChatConfirmEnquire);
        },
        methods    : {
            forbidScroll(){
                this.scrollOffsetForForbidScroll = window.pageYOffset || document.documentElement.scrollTop;

                this.body.setAttribute("style", `margin-top: -${this.scrollOffsetForForbidScroll}px; top: 0px; left: 0px; width: 100vw; height: 100vh; position: fixed; overflow: hidden;`);
            },
            allowScroll(){
                this.body.setAttribute("style", "");
                window.scrollTo({
                    top      : this.scrollOffsetForForbidScroll,
                    behavior : "auto"
                });
            },
            scrollToBottom(){
                window.scrollTo({
                    top      : +(this.footer.offsetTop - document.documentElement.clientHeight),
                    behavior : "smooth"
                });
            },
            loadNextQuestion(){
                this.isShowUserAnswerArea = false;

                let nextQuestionId = this.nextQuestionsId_queue.length ?
                    this.nextQuestionsId_queue.shift() :
                    this.questions[this.questions.length - 1].next_message_id;

                diagnosticChatApi.loadNextQuestion(nextQuestionId).then((response) => {
                    this.questions.push(response.data.data);
                    this.scrollToBottom();

                    setTimeout(() => {
                        this.isShowUserAnswerArea = true;
                        this.scrollToBottom();
                    }, ANIMATION_DURATION);
                });
            },
            addNextQuestionsIdInQueue(message_id){
                // May be duplicates 'next_message_id' from server API
                let isNewNextMessageId = true;
                for(let i = 0; i < this.questions.length; i++){
                    if(this.questions[i].id && this.questions[i].id === message_id){
                        isNewNextMessageId = false;
                    }
                }

                for(let i = 0; i < this.nextQuestionsId_queue.length; i++){
                    if(this.nextQuestionsId_queue[i] === message_id){
                        isNewNextMessageId = false;
                    }
                }

                isNewNextMessageId && this.nextQuestionsId_queue.push(message_id);
            },
            deleteFromNextQuestionsIdQueue(question_id){
                for(let nextQuestionIterator = 0; nextQuestionIterator < this.nextQuestionsId_queue; nextQuestionIterator++){
                    if(this.nextQuestionsId_queue[nextQuestionIterator] === question_id){
                        this.nextQuestionsId_queue.splice(nextQuestionIterator, 1);
                    }
                }
            },
            deleteQuestion(question_id, isLoadNextQuestion){
                // Удаляем из списков 'questions' и 'answers'
                for(let questionsIterator = 0; questionsIterator < this.questions.length; questionsIterator++){
                    if(this.questions[questionsIterator].id === question_id){
                        this.questions.splice(questionsIterator, 1);
                        if(this.userAnswers[questionsIterator]){
                            this.userAnswers.splice(questionsIterator, 1);
                        }
                    }
                }

                this.deleteFromNextQuestionsIdQueue(question_id);

                setTimeout(() => {
					if(isLoadNextQuestion){
						this.loadNextQuestion();
					} else{
                        return false;
					}
				}, ANIMATION_DURATION);
            },

            // Edit message listeners
            onEditMessageStart(message_id){
                for(let i = 0; i < this.questions.length; i++){
                    // Search edit message index
                    if(this.questions[i].id && this.questions[i].id === message_id){
                        let editingData = {
                            type           : this.questions[i].type,
                            message_id     : this.questions[i].id,
                            message_index  : i,
                            contentForChat : this.questions[i].contentForChat,
                        };

                        switch(editingData.type){
                            case this.QUESTION_TYPES.radio:{
                                editingData.selectedOption = this.userAnswers[editingData.message_index].selectedOption.slice();
                                break;
                            }
                            case this.QUESTION_TYPES.uploadImg:{
                                editingData.fileHTML = this.userAnswers[editingData.message_index].contentForChat;
                                break;
                            }
                            case this.QUESTION_TYPES.inputText:{
                                break;
                            }
                            case this.QUESTION_TYPES.bodySelect:{
                                editingData.selectedBodyParts             = this.userAnswers[editingData.message_index].selectedBodyParts.slice();
                                editingData.notConfirmedSelectedBodyParts = this.userAnswers[editingData.message_index].selectedBodyParts.slice();
                                break;
                            }
                            case this.QUESTION_TYPES.multiSelect:{
                                editingData.selectedOptions = this.userAnswers[editingData.message_index].selectedOption.slice();
                                break;
                            }
                            default:{
                                console.error("Invalid 'lastQuestionData.type' \n\n 'this.lastQuestionData' = ", this.lastQuestionData);
                            }
                        }

                        this.editingData = editingData;
                        return;
                    }
                }
            },
            onEditMessageSubmit(){
                 let editedUserAnswer        = Object.assign({}, this.userAnswers[this.editingData.message_index]);
                const targetEditingQuestion = this.questions[this.editingData.message_index];

                switch(this.editingData.type){
                    case this.QUESTION_TYPES.radio:{
                        for(let optionsIterator = 0, option = targetEditingQuestion.options[0]; optionsIterator < targetEditingQuestion.options.length; optionsIterator++, option = targetEditingQuestion.options[optionsIterator]){

                            if(option.id === this.editingData.selectedOption[0]){
                                editedUserAnswer.contentForChat = option.value + ".";
                                editedUserAnswer.selectedOption = [option.id];

                                if(option.next_message_id){
                                    this.addNextQuestionsIdInQueue(option.next_message_id);
                                }
                            } else{
                                // К предыдущему выбраному radio мог уже загрузиться 'question'
                                // и пользователь мог добавить 'answer'.
                                // Так как предыдущий radio более не актуальны, ищем и удаляем соответствующий 'question' и 'answer'
                                if(option.next_message_id){
                                    this.deleteQuestion(option.next_message_id, option.next_message_id === this.lastQuestionData.id);
                                    this.deleteFromNextQuestionsIdQueue(option.next_message_id);
                                }
                            }
                        }

                        break;
                    }
                    case this.QUESTION_TYPES.multiSelect:{
                        let selectedOption = [],
                            contentForChat = "";

                        for(let allOptionsIterator = 0; allOptionsIterator < targetEditingQuestion.options.length; allOptionsIterator++){
                            for(let selectedOptionIterator = 0; selectedOptionIterator < this.editingData.selectedOptions.length; selectedOptionIterator++){

                                if(this.editingData.selectedOptions[selectedOptionIterator] === targetEditingQuestion.options[allOptionsIterator].id){
                                    contentForChat += `${targetEditingQuestion.options[allOptionsIterator].value}, `;
                                    selectedOption.push(targetEditingQuestion.options[allOptionsIterator].id);

                                    if(targetEditingQuestion.options[allOptionsIterator].next_message_id){
                                        this.addNextQuestionsIdInQueue(targetEditingQuestion.options[allOptionsIterator].next_message_id);
                                    }
                                    break;
                                } else{
                                    // К предыдущим выбраным чекбоксом могли уже загрузить 'question'
                                    // и пользователь мог добавить 'answer'.
                                    // Так как предыдущие чекбоксы более не актуальны, ищем и удаляем соответствующие 'question' и 'answer'
                                    if(targetEditingQuestion.options[allOptionsIterator].next_message_id){
                                        this.deleteQuestion(targetEditingQuestion.options[allOptionsIterator].next_message_id, targetEditingQuestion.options[allOptionsIterator].next_message_id === this.lastQuestionData.id);
                                        this.deleteFromNextQuestionsIdQueue(targetEditingQuestion.options[allOptionsIterator].next_message_id);
                                    }
                                }
                            }
                        }

                        contentForChat = contentForChat.slice(0, -2) + ".";

                        editedUserAnswer.selectedOption = selectedOption.slice();
                        editedUserAnswer.contentForChat = contentForChat;
                        break;
                    }
                    case this.QUESTION_TYPES.uploadImg:{
                        editedUserAnswer.file           = this.editingData.file;
                        editedUserAnswer.contentForChat = this.editingData.fileHTML;
                        break;
                    }
                    case this.QUESTION_TYPES.inputText:{
                        editedUserAnswer.contentForChat = "" + this.editingData.contentForChat;
                        break;
                    }
                    case this.QUESTION_TYPES.bodySelect:{
                        editedUserAnswer.selectedBodyParts = this.editingData.selectedBodyParts.slice();
                        break;
                    }
                    default:{
                        console.error("Invalid 'this.editingData.type' \n\n 'this.editingData' = ", this.editingData);
                    }
                }

                Object.assign(this.userAnswers[this.editingData.message_index], editedUserAnswer);

                this.onEditMessageCancel();
            },
            onEditMessageCancel(){
                this.editingData = null;
            },

            // Answer && Edit area listeners
            onStart(){
                this.isShowUserAnswerArea = false;

                setTimeout(() => {
                    this.userAnswers.push({
                        contentForChat : this.firstQuestion.button
                    });

                    setTimeout(() => {
                        diagnosticChatApi.loadFirsQuestion().then((response) => {
                            this.questions.push(response.data.data);
                            this.scrollToBottom();

                            setTimeout(() => {
                                this.isShowUserAnswerArea = true;
                                this.scrollToBottom();
                            }, ANIMATION_DURATION);
                        });
                    }, ANIMATION_DURATION);
                }, ANIMATION_DURATION);
            },
            onUserSubmit(){
                if(this.lastQuestionData.type !== this.QUESTION_TYPES.uploadImg){
                    this.isShowUserAnswerArea = false;
                }

                let userAnswerData = {
                    message_id : this.lastQuestionData.id,
                    type       : this.lastQuestionData.type
                };

                switch(this.lastQuestionData.type){
                    case this.QUESTION_TYPES.radio:{
                        userAnswerData.contentForChat = this.lastQuestionData.options[this.lastSelectedRadioIndex[0]].value + ".";
                        userAnswerData.selectedOption = [this.lastQuestionData.options[this.lastSelectedRadioIndex[0]].id];

                        if(this.lastQuestionData.options[this.lastSelectedRadioIndex[0]].next_message_id){
                            this.addNextQuestionsIdInQueue(this.lastQuestionData.options[this.lastSelectedRadioIndex[0]].next_message_id);
                        }

                        this.lastSelectedRadioIndex = null;
                        break;
                    }
                    case this.QUESTION_TYPES.uploadImg:{
                        if(!this.lastUploadedImg.file){ // Chose file
                            this.$refs.lastUploadImgInput.click();
                            return;
                        } else{ // Submit
                            if(this.lastUploadedImg.errorMessage || !this.lastUploadedImg.file || !this.lastUploadedImg.fileHTML){ return; }

                            userAnswerData.file           = this.lastUploadedImg.file;
                            userAnswerData.type           = this.QUESTION_TYPES.uploadImg;
                            userAnswerData.contentForChat = this.lastUploadedImg.fileHTML;

                            this.lastUploadedImg.file         = null;
                            this.lastUploadedImg.fileHTML     = "";
                            this.lastUploadedImg.errorMessage = "";
                        }
                        break;
                    }
                    case this.QUESTION_TYPES.inputText:{
                        userAnswerData.contentForChat = this.lastInputTextText;
                        this.lastInputTextText        = "";
                        break;
                    }
                    case this.QUESTION_TYPES.bodySelect:{
                        userAnswerData.contentForChat    = this.QUESTION_TYPES.bodySelect;
                        userAnswerData.selectedBodyParts = this.selectedBodyParts.slice();

                        this.selectedBodyParts             = [];
                        this.notConfirmedSelectedBodyParts = [];

                        break;
                    }
                    case this.QUESTION_TYPES.multiSelect:{
                        let selectedOption = [],
                            contentForChat = "";

                        for(let i = 0; i < this.lastMultiSelectSelectedValuesIndexes.length; i++){
                            contentForChat += `${this.lastQuestionData.options[this.lastMultiSelectSelectedValuesIndexes[i]].value}, `;
                            selectedOption.push(this.lastQuestionData.options[this.lastMultiSelectSelectedValuesIndexes[i]].id);

                            if(this.lastQuestionData.options[this.lastMultiSelectSelectedValuesIndexes[i]].next_message_id){
                                this.addNextQuestionsIdInQueue(this.lastQuestionData.options[this.lastMultiSelectSelectedValuesIndexes[i]].next_message_id);
                            }
                        }
                        contentForChat = contentForChat.slice(0, -2) + ".";

                        userAnswerData.selectedOption             = selectedOption;
                        userAnswerData.contentForChat             = contentForChat;
                        this.lastMultiSelectSelectedValuesIndexes = [];
                        break;
                    }
                    default:{
                        console.error("Invalid 'lastQuestionData.type' \n\n 'this.lastQuestionData' = ", this.lastQuestionData);
                    }
                }

                if(this.lastQuestionData.next_message_id){
                    this.addNextQuestionsIdInQueue(this.lastQuestionData.next_message_id);
                }

                this.userAnswers.push(userAnswerData);

				setTimeout(() => {
					if(this.nextQuestionsId_queue.length){
						this.loadNextQuestion();
					} else{
						this.isQuestionsOver = true;
						
						setTimeout(() => {
							this.scrollToBottom();
						}, ANIMATION_DURATION * 1.25);
					}
				}, ANIMATION_DURATION * 1.25);
            },
            onSelectBodyPart(eventData){
                const context = this.editingData || this;

                if(eventData.targetPartId){
                    // Add or delete part
                    if(eventData.isAddNewPart){
                        // Add new part
                        context.notConfirmedSelectedBodyParts.push(eventData.targetPartId);
                    } else{
                        // Delete part
                        for(let i = 0, newNotConfirmSelectedBodyParts = []; i < context.notConfirmedSelectedBodyParts.length; i++){
                            if(context.notConfirmedSelectedBodyParts[i] === eventData.targetPartId){
                                context.notConfirmedSelectedBodyParts = newNotConfirmSelectedBodyParts.concat(context.notConfirmedSelectedBodyParts.slice(i + 1, context.notConfirmedSelectedBodyParts.length));
                                break;
                            } else{
                                newNotConfirmSelectedBodyParts.push(context.notConfirmedSelectedBodyParts[i]);
                            }
                        }
                    }
                } else{
                    // Open modal
                    if(!this.isShowSelectBodyPartModal){
                        this.showedBodyHalf                   = eventData.halfPart;
                        context.notConfirmedSelectedBodyParts = context.selectedBodyParts.slice();

                        this.isShowSelectBodyPartModal = true;
                        this.forbidScroll();
                    }
                }
            },
            onConfirmBodySelectParts(){
                if(this.editingData){
                    this.editingData.selectedBodyParts = this.editingData.notConfirmedSelectedBodyParts.slice();
                } else{
                    this.selectedBodyParts = this.notConfirmedSelectedBodyParts.slice();
                }

                this.isShowSelectBodyPartModal = false;
                this.allowScroll();
            },
            onCancelBodySelectParts(){
                this.isShowSelectBodyPartModal = false;
                this.allowScroll();
            },
            onInputText(targetValue){
                if(this.editingData){
                    this.editingData.contentForChat = targetValue;
                } else{
                    this.lastInputTextText = targetValue;
                }
            },
            onUploadFile(event){
                if(!event.target.files[0]){ return; }

                // Clear previously errors
                this.lastUploadedImg.errorMessage = "";

                if(!this.checkFileTypeImage(event.target.files[0].type)){
                    this.lastUploadedImg.errorMessage = this.$t("errors.form.file-type");
                    return;
                }

                if(!this.checkFileSize(event.target.files[0].size / 1024 / 1024)){
                    this.lastUploadedImg.errorMessage = this.$t("errors.form.file-type");
                    return;
                }

                const that = this;
                const file = event.target.files[0];

                let reader = new FileReader();

                reader.onload = function(e){
                    const context = that.editingData ? that.editingData : that.lastUploadedImg;

                    context.file     = file;
                    context.fileHTML = `<img class="user-uploaded-img" src="${e.target.result}"/>`;

                    setTimeout(() => {
                        !that.editingData && that.scrollToBottom();
                    }, ANIMATION_DURATION);
                };

                reader.readAsDataURL(file);
            },
            onChangeMultiSelect(){
                if(this.editingData){ return; }

                let checkedElements = this.$refs.lastMultiSelect.querySelectorAll("input:checked");

                if(checkedElements.length < 1){
                    this.lastMultiSelectSelectedValuesIndexes = null;
                    return;
                }

                let result = [];

                for(let i = 0; i < checkedElements.length; i++){
                    result.push(checkedElements[i].getAttribute("data-index"));
                }

                this.lastMultiSelectSelectedValuesIndexes = result;
            },
            onChangeRadio(event){
                if(this.editingData){ return; }

                this.lastSelectedRadioIndex = [event.target.getAttribute("data-index")];
            },

            // Personal info listeners
            onPersonalInfoNameBlur(event){
                this.personalInfoData[event.target.name].isValid = this.validateName(event);
                this.personalInfoData[event.target.name].value   = event.target.value;

                this.$forceUpdate();
            },
            onPersonalInfoPhoneChange(eventValue, eventData){
                this.personalInfoData.phone.value     = eventValue;
                this.personalInfoData.phone.isValid   = eventData.isValid;
                this.personalInfoData.phone.eventData = eventData;

                if(eventData.isValid){
                    delete this.errors.phone;
                }
            },
            onPersonalInfoPhoneBlur(){
                if(!this.personalInfoData.phone.value){
                    this.errors.phone = this.$t("errors.form.required-field");
                } else if(!this.personalInfoData.phone.isValid){
                    this.errors.phone = this.$t("errors.form.invalid-number");
                }

                this.$forceUpdate();
            },
            onPersonalInfoChangeGender(event){
                if(event.target.value){
                    this.personalInfoData.gender.value   = event.target.value;
                    this.personalInfoData.gender.isValid = true;
                }
            },
            onPersonalInfoChangeDateOfBirth(event){
                this.personalInfoData.dateOfBirth.value = event.target.value;

                this.personalInfoData.dateOfBirth.isValid = (new Date()).getTime() >= (new Date(event.target.value)).getTime();

                if(!this.personalInfoData.dateOfBirth.isValid){
                    this.errors.dateOfBirth = this.$t("errors.form.validation-failed");
                    this.$forceUpdate();
                } else{
                    delete this.errors.dateOfBirth;
                }
            },
            onPersonalInfoMailBlur(event){
                this.personalInfoData.mail.value   = event.target.value;
                this.personalInfoData.mail.isValid = this.validateName(event);

                this.$forceUpdate();
            },
            onPersonalInfoSubmit(){
                if(this.isValidPersonalInfoBlock){
                    this.isPersonalInfoFilled = true;
                    
                    setTimeout(() => {
						this.scrollToBottom();
					}, ANIMATION_DURATION * 2);
                }
            },
            onCreateToken(eventData){
              //  this.stripeToken = eventData.token.id;
                this.openModal(this.$modals.diagnosticChatConfirmEnquire);
            },
            onSubmitDiagnosticChatConfirmEnquire(){
                let data = new FormData();

                data.append("code", this.stripeToken);
                data.append("email", this.personalInfoData.mail.value);
                data.append("gender", this.personalInfoData.gender.value);
                data.append("doctor_id", this.targetDoctor.id);
                data.append("last_name", this.personalInfoData.lastName.value);
                data.append("first_name", this.personalInfoData.firstName.value);
                data.append("phone_number", this.personalInfoData.phone.value);
                data.append("country_code", this.personalInfoData.phone.eventData.country.dialCode);
                data.append("date_of_birth", this.personalInfoData.dateOfBirth.value);

                for(let i = 1, answer = null; answer = this.userAnswers[i++];){

                    switch(answer.type){
                        case this.QUESTION_TYPES.radio:{
                            data.append(`answers[${answer.message_id}]`, answer.selectedOption[0]);

                            break;
                        }
                        case this.QUESTION_TYPES.uploadImg:{
                            data.append(`answers[${answer.message_id}]`, "image");
                            data.append(`image`, answer.file);

                            break;
                        }
                        case this.QUESTION_TYPES.inputText:{
                            data.append(`answers[${answer.message_id}]`, answer.contentForChat);

                            break;
                        }
                        case this.QUESTION_TYPES.bodySelect:{
                            data.append(`answers[${answer.message_id}]`, JSON.stringify(answer.selectedBodyParts));

                            break;
                        }
                        case this.QUESTION_TYPES.multiSelect:{
                            data.append(`answers[${answer.message_id}]`, JSON.stringify(answer.selectedOption));

                            break;
                        }
                    }
                }

                diagnosticChatApi.createEnquires(data).then((response) => {
                    let enquireId = response.data.data.id;
                    diagnosticChatApi.sendSmsCode(enquireId).then((response) => {
                        this.openModal(this.$modals.chatConfirmCodeMobile, 
                            "Confirm code", 
                            "We've sent a verification code to your phone number. Please enter this code below:");
                    });
                }).catch((error) => {
                    this.openModal(this.$modals.defaultModal, error.message, "Etwas ist schief gelaufen!");
                });
            }
        },
        beforeDestroy(){
            this.$root.$off("submitDiagnosticChatConfirmEnquire", this.onSubmitDiagnosticChatConfirmEnquire);
        }
    }
</script>

<style lang = "scss" scoped>
	$max_width : 400px;
	$border-radius : 20px;
	$animation_duration : .75s;
	
	@mixin main-animation {
		opacity   : 0;
		transform : translateY(50px);
	}
	
	@mixin edit-animation {
		opacity   : 0;
		z-index   : -1;
		transform : translateY(-100%);
	}
	
	@mixin delete-animation {
		width      : 0;
		height     : 0;
		transform  : scale(0);
		font-size  : 0;
		transition : $animation_duration;
	}
	
	@mixin btn--is-disable {
		&.is-disable {
			cursor           : not-allowed;
			pointer-events   : none;
			background-color : $color-rolling-stone;
		}
	}
	
	@mixin container-for-input-text {
		&.is-for-input-text {
			width     : 100%;
			max-width : 100%;
		}
	}
	
	.section {
		background-color: $color-mercury;
		
		&:before {
			transition       : $transition;
			background-color : rgba(0, 0, 0, 0);
		}
		
		&--is-editing-message {
			position : relative;
			
			&:before {
				left             : 0;
				right            : 0;
				width            : 100%;
				height           : 100%;
				content          : "";
				z-index          : 1;
				position         : absolute;
				background-color : rgba(0, 0, 0, .75);
			}
			
			.message {
				&--is-editing {
					z-index  : 2;
					position : relative;
				}
			}
		}
	}
	
	.submit-btn {
		color            : white;
		border           : none;
		padding          : $main_offset / 2 $main_offset;
		margin-top       : $main_offset / 2;
		transition       : $transition;
		border-radius    : $border-radius / 2;
		background-color : transparentize($color-user-is-active, .25);
		
		&:hover { background-color : $color-user-is-active; }
		
		&__wrapper {
			display         : flex;
			justify-content : flex-end;
		}
		
		@include btn--is-disable;
		
		&.is-upload-photo {
			padding-top : 6px;
			
			&:after {
				$size : 24px;
				width               : $size;
				height              : $size;
				margin              : 0 0 -.25em $main_offset / 2;
				content             : "";
				display             : inline-block;
				background-image    : url("~static/images/icons/upload-photo.svg");
				background-repeat   : no-repeat;
				background-position : center;
			}
		}
	}
	
	.chat-container, .answer-area {
		margin    : 0 auto;
		position  : relative;
		max-width : 600px;
	}
	
	.message {
		color         : white;
		display       : flex;
		margin-bottom : $main_offset * 3;
		
		&__container {
			padding          : $main_offset;
			position         : relative;
			max-width        : $max_width;
			transition       : $animation_duration;
			border-radius    : 0 $border-radius $border-radius $border-radius;
			background-color : $color-stratos;
			
			&--hide { @include edit-animation; }
		}
		
		&__questioner {
			$fz : .75em;
			top       : $fz * -2;
			left      : 0;
			color     : black;
			position  : absolute;
			font-size : $fz;
		}
		
		&__title { color : white; }
		
		&--is-editing, &--editing-question {
			z-index  : 1;
			position : relative;
		}
		
		&--is-delete {
			@include delete-animation;
		}
	}
	
	.message--is-me {
		justify-content : flex-end;
		
		.message {
			&__container {
				border-radius : $border-radius 0 $border-radius $border-radius;
				background-color : $color-curious-blue;
			}
			
			&__questioner {
				left  : auto;
				right : 0;
			}
		}
		
		&.message--is-body {
			.message {
				&__container {
					border-radius    : $border-radius 0 $border-radius $border-radius;
					background-color : rgba(1,1,1,0);
				}
			}
		}
	}
	
	.answer-area, .edit-answer-area {
		display         : flex;
		flex-grow       : 1;
		transition      : $animation_duration;
		justify-content : flex-end;
		
		&__wrapper {
			display         : flex;
			max-width       : $max_width;
			flex-direction  : column;
			justify-content : flex-end;
			
			@include container-for-input-text;
		}
		
		&__input-text {
			position      : relative;
			margin-bottom : $main_offset / 2;
			
			&__textarea {
				width       : 100%;
				resize      : none;
				padding     : $main_offset / 2;
				line-height : 1.5;
			}
			
			&__auto-height {
				@extend .answer-area__input-text__textarea;
				z-index  : -1;
				opacity  : 0;
				position : absolute;
			}
		}
		
		&__select-body-part {
			max-width   : 75%;
			margin-left : auto;
			
			&__parts {
				margin  : 0 #{$main_offset / -2};
				display : flex;
			}
		}
		
		&__upload-image {
			position : relative;
			
			&__user-image-container { cursor : pointer; }
			
			&__input {
				opacity  : 0;
				z-index  : -2;
				position : absolute;
			}
		}
		
		&.is-wait-loading {
			@include main-animation;
			cursor         : default;
			pointer-events : none;
		}
		
		.submit-btn { float : right; }
	}
	
	.edit-answer-area {
		position       : absolute;
		flex-wrap      : wrap;
		flex-direction : column;
		
		@include container-for-input-text;
		
		&__controls {
			margin          : $main_offset / 2 #{$main_offset / -2} 0;
			display         : flex;
			flex-direction  : row;
			justify-content : flex-end;
		}
		
		&__edit-btn {
			$transform : translateY(100%);
			color            : $color-torea-bay;
			right            : ($main_offset * -1);
			bottom           : 0;
			display          : flex;
			position         : absolute;
			font-size        : .75em;
			transform        : $transform;
			background-color : transparent;
			
			&:before {
				$size : 18px;
				width            : $size * 3 / 4;
				height           : $size * 3 / 4;
				display          : inline-block;
				content          : "";
				margin-right     : 6px;
				background-image : url("~static/images/icons/edit.svg");
			}
			
			&:hover {
				transform : $transform scale(1.15);
			}
		}
	}
	
	/deep/ .user-uploaded-img {
		width : 100%;
	}
	
	.personal-info, .payment-details {
		margin-top : $main_offset;
		
		@include tablet {
			width      : 75%;
			margin     : 0 auto;
			margin-top : $main_offset * 2;
		}
		
		@include desktop {
			width      : 50%;
			margin-top : $main_offset * 4;
		}
	}
	
	.personal-info {
		&__field {
			position      : relative;
			margin-bottom : $main_offset;
			
			&__title {
				margin-bottom : $main_offset / 4;
			}
		}
	}
	
	.select-body-part-modal {
		$header_height : 64px;
		top              : $header_height;
		right            : 0;
		width            : 100%;
		height           : calc(100vh - #{$header_height});
		z-index          : 5;
		display          : flex;
		padding          : $main_offset 0;
		position         : fixed;
		align-items      : center;
		flex-direction   : column;
        overflow         : hidden;
		background-color : $color-black-squeeze;
		
		&__main {
			$controls_btns_height : 40px;
			height  : calc(100% - #{$main_offset + $controls_btns_height * 2});
			display : flex;
		}
		
		&__footer { margin-top : $main_offset; }
		
		@include tablet-big {
			$header_height : 80px;
			top    : $header_height;
			height : calc(100vh - #{$header_height});
		}
	}
	
	.is-required {
		&:after {
			color       : $color-alert-red;
			content     : "*";
			display     : inline-block;
			margin-left : 6px;
		}
	}
	
	.error-message {
		$size : .75em;
		left      : 0;
		color     : $color-alert-red;
		bottom    : $size * -2;
		position  : absolute;
		font-size : $size;
	}
	
	// Vue transitions
	.main-animation-enter-active, .main-animation-leave-active {
		transition : $animation_duration;
	}
	
	.edit-animation-enter-active, .edit-animation-leave-active {
		transition : $animation_duration;
	}
	
	.edit-animation-enter, .edit-animation-leave-to {
		@include edit-animation;
	}
	
	// modal
	.modal-enter-active, .modal-leave-active {
		transition : $animation_duration;
	}
	
	.modal-enter, .modal-leave-to {
		opacity : 0;
	}
	.vue-tel-input#vue-tel-input {
		border: 1px solid $color-table-border;
	}
</style>