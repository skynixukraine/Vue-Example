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
								 'message--is-delete': false,
								 'message--is-editing': editingData && item.message_id === editingData.message_id,
								 'message--editing-question': editingData && messages[chat_message_index] && messages[chat_message_index].id === editingData.message_id
							 }"
							 :id = "`message_${chat_message_index}`">
							<transition name = "edit-animation">
								<div class = "edit-answer-area"
									 v-if = "editingData && item.message_id === editingData.message_id">
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
													:content = "userAnswers[editingData.message_index].contentForChat" />
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
							</transition>
							<transition name = "edit-animation">
								<div class = "message__container"
									 :class = "{
										 'message__container--hide': editingData && item.message_id === editingData.message_id
									 }">
									<span class = "message__questioner">{{ item.questioner || "Me" }}</span>
									<h4 class = "message__title" v-if = "item.title">{{ item.title }}</h4>
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
											@click = "onEditMessageStart(item.message_id)">Edit
									</button>
								</div>
							</transition>
						</div>
					</transition-group>
				</div>
				<transition name = "main-animation">
					<div class = "answer-area"
						 :class = "{'is-wait-loading': !isUserActionArea}"
						 v-if = "lastQuestionData && !isQuestionsOver">
						<div class = "answer-area__wrapper">
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
									<AutoHeight @change = "onInputText" :content = "''" />
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
										{{ lastQuestionData.type === QUESTION_TYPES.uploadImg && !lastUploadedImg.file ?
										"select upload img" : lastQuestionData.button }}
									</button>
									<button v-else class = "submit-btn"
											@click = "onStart"
											type = "button">
										{{ this.FIRST_QUESTION_DATA.button }}
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
						<h2>Your personal information</h2>
						<div class = "personal-info__field">
							<InputText :labelTxt = "'First name'"
									   :isRequired = true
									   :placeholder = "'First name'"
									   :name = "'firstName'"
									   @blur = "onPersonalInfoNameBlur" />
							<span class = "error-message" v-show = "errors.firstName">{{ this.errors.firstName }}</span>
						</div>
						<div class = "personal-info__field">
							<InputText :labelTxt = "'Last name'"
									   :isRequired = true
									   :placeholder = "'Last name'"
									   :name = "'lastName'"
									   @blur = "onPersonalInfoNameBlur" />
							<span class = "error-message" v-show = "errors.lastName">{{ this.errors.lastName }}</span>
						</div>
						<div class = "personal-info__field">
							<InputRadio :radioList = "PERSONAL_INFO__RADIO_GENDER"
										:groupTitle = "'Gender'"
										:isRequired = true
										@change = "onPersonalInfoChangeGender" />
							<span class = "error-message" v-show = "errors.gender">{{ this.errors.gender }}</span>
						</div>
						<div class = "personal-info__field">
							<label>
								<div class = "personal-info__field__title is-required">Mobile phone</div>
								<vue-tel-input id = "vue-tel-input"
											   name = "phone_number"
											   v-bind = "PERSONAL_INFO__PHONE_BIND_PROPS"
											   @blur = "onPersonalInfoPhoneBlur"
											   @input = "onPersonalInfoPhoneChange" />
								<span class = "error-message" v-show = "errors.phone">{{ this.errors.phone }}</span>
							</label>
						</div>
						<div class = "personal-info__field">
							<label>
								<div class = "personal-info__field__title is-required">Date of birth</div>
								<input type = "date"
									   class = "input"
									   style = "color: inherit"
									   @change = "onPersonalInfoChangeDateOfBirth"
									   name = "dateOfBirth">
								<span class = "error-message" v-show = "errors.dateOfBirth">{{ this.errors.dateOfBirth }}</span>
							</label>
						</div>
						<div class = "personal-info__field">
							<InputEmail :labelTxt = "'Email Address'"
										:isRequired = true
										:placeholder = "'Email Address'"
										:name = "'mail'"
										@blur = "onPersonalInfoMailBlur" />
							<span class = "error-message" v-show = "errors.mail">{{ this.errors.mail }}</span>
						</div>
						<button type = "button"
								class = "submit-btn"
								:class = "{'is-disable': !isValidPersonalInfo}"
								@click = "onPersonalInfoSubmit">Next
						</button>
					</div>
				</transition>
				<transition name = "main-animation">
					<div class = "payment-details" v-if = "isQuestionsOver && isPersonalInfoFilled">
						<StripePaymentSystem @create-token = "onCreateToken" />
					</div>
				</transition>
			</div>
			<transition name = "modal">
				<div class = "select-body-part-modal" v-if = "isShowSelectBodyPartModal">
					<header class = "select-body-part-modal__header">
						<h2>Select trouble zones</h2>
					</header>
					<div class = "select-body-part-modal__main">
						<BodyParts :isClickable = true
								   :showedHalfPart = showedBodyHalf
								   @select-body-part = "onSelectBodyPart"
								   :selectedParts = "editingData ? editingData.notConfirmedSelectedBodyParts : notConfirmedSelectedBodyParts" />
					</div>
					<footer class = "select-body-part-modal__footer">
						<button class = "control-btn--submit" @click.stop = "onConfirmBodySelectParts">Confirm</button>
						<button class = "control-btn--cancel" @click = "onCancelBodySelectParts">Cancel</button>
					</footer>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
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
                await store.dispatch('user/LOAD_USER', {
                    id    : app.$cookies.get(app.cookie.names.tokenId),
                    token : app.$cookies.get(app.cookie.names.token)
                }).catch(error => {
                    app.$cookies.remove(app.cookie.names.token);
                    app.$cookies.remove(app.cookie.names.tokenId);
                })
            }

            // await store.dispatch("diagnosticChat/LOAD_AND_SAVE_FIRST_MESSAGE");
        },
        mixins     : [
            validator
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
                questions             : [],
                editingData           : null,
                userAnswers           : [],
                isQuestionsOver       : false,
                isUserActionArea      : false,
                isPersonalInfoFilled  : false,
                nextQuestionsId_queue : [],

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
                lastSelectedRadioIndex               : null, // Array, что бы не делать проверки по typeof на number, ибо может быть 0, и 0 это норма
                lastMultiSelectSelectedValuesIndexes : null,

                personalInfoData : {
                    lastName    : {
                        value   : "",
                        isValid : false,
                    },
                    firstName   : {
                        value   : "",
                        isValid : false,
                    },
                    gender      : {
                        value   : "",
                        isValid : false,
                    },
                    dateOfBirth : {
                        value   : "",
                        isValid : false,
                    },
                    phone       : {
                        value   : {
                            value   : "",
                            isValid : false,
                        },
                        isValid : false,
                    },
                    mail        : {
                        value   : "",
                        isValid : false,
                    },
                },

                // Constants, do not edit this values in code, please
                PERSONAL_INFO__RADIO_GENDER     : [
                    {
                        txt   : "woman",
                        value : "woman"
                    },
                    {
                        txt   : "man",
                        value : "man"
                    },
                ],
                PERSONAL_INFO__PHONE_BIND_PROPS : {
                    mode                    : "international",
                    maxLen                  : 25,
                    disabled                : false,
                    required                : true,
                    placeholder             : "Enter a phone number",
                    enabledFlags            : true,
                    autocomplete            : "off",
                    defaultCountry          : "",
                    disabledFormatting      : false,
                    enabledCountryCode      : false,
                    validCharactersOnly     : true,
                    disabledFetchingCountry : false,
                },
                FIRST_QUESTION_DATA             : {
                    button         : "lets start",
                    questioner     : "first message",
                    contentForChat : "Are you ready?",
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
            isValidPersonalInfo(){
                let result = true;

                for(let key in this.personalInfoData){
                    if(!this.personalInfoData[key].isValid){
                        result = false;
                    }
                }

                return result;
            }
        },
        mounted(){
            this.questions.push(this.FIRST_QUESTION_DATA);

            setTimeout(() => {
                this.isUserActionArea = true;
            }, ANIMATION_DURATION);
        },
        methods    : {
            forbidScroll(){
                this.body.setAttribute("style", "overflow: hidden;");
            },
            allowScroll(){
                this.body.setAttribute("style", "");
            },
            scrollToBottom(){
                window.scrollTo({
                    top      : +(this.footer.offsetTop - document.documentElement.clientHeight),
                    behavior : "smooth"
                });
            },
            loadNextQuestion(){
                this.isUserActionArea = false;

                let nextQuestionId = this.nextQuestionsId_queue.length ?
                    this.nextQuestionsId_queue.shift() :
                    this.questions[this.questions.length - 1].next_message_id;

                diagnosticChatApi.loadNextQuestion(nextQuestionId).then((response) => {
                    if(!this.isQuestionsOver && this.lastQuestionData.type === this.QUESTION_TYPES.bodySelect){
                        this.questions.push(response.data.data);

                        setTimeout(() => {
                            this.scrollToBottom();

                            setTimeout(() => {
                                this.scrollToBottom();
                                this.isUserActionArea = true;
                            }, ANIMATION_DURATION);
                        }, ANIMATION_DURATION / 2);
                    } else{
                        this.questions.push(response.data.data);
                        this.scrollToBottom();

                        setTimeout(() => {
                            this.scrollToBottom();
                            this.isUserActionArea = true;
                        }, ANIMATION_DURATION);
                    }
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
            deleteQuestion(question_id){
                for(let questionsIterator = 0; questionsIterator < this.questions.length; questionsIterator++){
                    // Удаляем из очереди загружаемых 'questions'
                    for(let nextQuestionIterator = 0; nextQuestionIterator < this.nextQuestionsId_queue; nextQuestionIterator++){
                        if(this.nextQuestionsId_queue[nextQuestionIterator] === question_id){
                            this.nextQuestionsId_queue.splice(nextQuestionIterator, 1);
                        }
                    }

                    // Удаляем из списков 'questions' и 'answers'
                    if(this.questions[questionsIterator].id === question_id){
                        this.questions.splice(questionsIterator, 1);
                        if(this.userAnswers[questionsIterator]){
                            this.userAnswers.splice(questionsIterator, 1);
                        }
                    }
                }
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
                let editedUserAnswer  = Object.assign({}, this.userAnswers[this.editingData.message_index]);
                const editingQuestion = this.questions[this.editingData.message_index];

                switch(this.editingData.type){
                    case this.QUESTION_TYPES.radio:{
                        for(let optionsIterator = 0, option = editingQuestion.options[0]; optionsIterator < editingQuestion.options.length; optionsIterator++, option = editingQuestion.options[optionsIterator]){

                            if(option.id === this.editingData.selectedOption[0]){
                                editedUserAnswer.contentForChat = option.value + ".";
                                editedUserAnswer.selectedOption = [option.id];

                                if(option.next_message_id){
                                    this.addNextQuestionsIdInQueue(option.next_message_id);
                                }
                            } else{
                                this.deleteQuestion(option.id);
                            }
                        }

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
                    case this.QUESTION_TYPES.multiSelect:{
                        let selectedOption = [],
                            contentForChat = "";

                        for(let allOptionsIterator = 0; allOptionsIterator < editingQuestion.options.length; allOptionsIterator++){
                            for(let selectedOptionIterator = 0; selectedOptionIterator < this.editingData.selectedOptions.length; selectedOptionIterator++){
                                if(this.editingData.selectedOptions[selectedOptionIterator] === editingQuestion.options[allOptionsIterator].id){
                                    contentForChat += `${editingQuestion.options[allOptionsIterator].value}, `;
                                    selectedOption.push(editingQuestion.options[allOptionsIterator].id);

                                    if(editingQuestion.options[allOptionsIterator].next_message_id){
                                        this.addNextQuestionsIdInQueue(editingQuestion.options[allOptionsIterator].next_message_id);
                                    }
                                } else{
                                    // К предыдущим выбраным чекбоксом могли уже загрузить 'question'
                                    // и пользователь мог добавить 'answer'.
                                    // Так как предыдущие чекбоксы более не актуальны, ищем и удаляем соответствующие 'question' и 'answer'

                                    // Сохраняем индекс удаляемого сообщения, иначе из за цикла будет удалятся не только нужное сообщение
                                    let deleteMessageIndex = null;
                                    for(let questionsIterator = 0; questionsIterator < this.questions.length; questionsIterator++){
                                        if(this.questions[questionsIterator].id === editingQuestion.options[allOptionsIterator].next_message_id){
                                            if(!deleteMessageIndex || deleteMessageIndex !== questionsIterator){

                                                deleteMessageIndex = questionsIterator;

                                                this.deleteQuestion(questionsIterator);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        contentForChat = contentForChat.slice(0, -2) + ".";

                        editedUserAnswer.selectedOption = selectedOption.slice();
                        editedUserAnswer.contentForChat = contentForChat;

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
                this.isUserActionArea = false;

                setTimeout(() => {
                    const content = {
                        contentForChat : this.FIRST_QUESTION_DATA.button
                    };

                    this.userAnswers.push(content);

                    setTimeout(() => {
                        diagnosticChatApi.loadFirsQuestion().then((response) => {
                            this.questions.push(response.data.data);

                            setTimeout(() => {
                                this.scrollToBottom();
                                this.isUserActionArea = true;
                            }, ANIMATION_DURATION);
                        });
                    }, ANIMATION_DURATION);
                }, ANIMATION_DURATION);
            },
            onUserSubmit(){
                if(this.lastQuestionData.type !== this.QUESTION_TYPES.uploadImg){
                    this.isUserActionArea = false;
                }

                let userAnswerData = {
                    message_id : this.lastQuestionData.id
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

                if(this.nextQuestionsId_queue.length === 0){
                    this.isQuestionsOver = true;

                    setTimeout(() => {
                        this.scrollToBottom();
                    }, ANIMATION_DURATION * 1.5);
                } else{
                    setTimeout(() => {
                        this.loadNextQuestion();
                    }, ANIMATION_DURATION);
                }
            },
            onSelectBodyPart(eventData){
                const context = this.editingData || this;

                if(eventData.targetPartId){ // Add or delete part
                    if(eventData.isAddNewPart){ // Add new part
                        context.notConfirmedSelectedBodyParts.push(eventData.targetPartId);
                    } else{ // Delete part
                        for(let i = 0, newNotConfirmSelectedBodyParts = []; i < context.notConfirmedSelectedBodyParts.length; i++){
                            if(context.notConfirmedSelectedBodyParts[i] === eventData.targetPartId){
                                context.notConfirmedSelectedBodyParts = newNotConfirmSelectedBodyParts.concat(context.notConfirmedSelectedBodyParts.slice(i + 1, context.notConfirmedSelectedBodyParts.length));
                                break;
                            } else{
                                newNotConfirmSelectedBodyParts.push(context.notConfirmedSelectedBodyParts[i]);
                            }
                        }
                    }
                } else{ // Open modal
                    this.showedBodyHalf                   = eventData.halfPart;
                    context.notConfirmedSelectedBodyParts = context.selectedBodyParts.slice();

                    this.isShowSelectBodyPartModal = true;
                    this.forbidScroll();
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
            onInputText(event){
                if(this.editingData){
                    this.editingData.contentForChat = event.target.value;
                } else{
                    this.lastInputTextText = event.target.value;
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
                this.personalInfoData.phone.value   = eventValue;
                this.personalInfoData.phone.isValid = eventData.isValid;

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
                if(!this.isValidPersonalInfo){ return; }

                this.isPersonalInfoFilled = true;

                setTimeout(() => {
                    this.scrollToBottom();
                }, ANIMATION_DURATION);
            },
            onCreateToken(eventData){
                console.log("token created", eventData);
            }
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
	
	.control-btn {
		color         : $color-black-squeeze;
		border        : none;
		margin        : 0 $main_offset / 2;
		padding       : $main_offset / 2 $main_offset;
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
			
			@include btn--is-disable;
			
			&:hover {
				background-color : $color-user-is-active;
			}
		}
	}
	
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
				
				display          : flex;
				padding          : $inner_offset $main_offset / 2;
				transition       : $transition;
				align-items      : center;
				border-radius    : $border-radius / 4;
				background-color : $color-curious-blue;
				
				&__icon {
					$size : 14px;
					
					width            : $size;
					height           : $size;
					display          : inline-block;
					position         : relative;
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
	}
	
	.section {
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
	
	.message {
		color         : white;
		display       : flex;
		margin-bottom : $main_offset * 2;
		
		&__container {
			padding          : $main_offset;
			position         : relative;
			max-width        : $max_width;
			transition       : $animation_duration;
			border-radius    : 0 $border-radius $border-radius $border-radius;
			background-color : $color-price;
			
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
			}
			
			&__questioner {
				left  : auto;
				right : 0;
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
		}
		
		&__input-text {
			position : relative;
			
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
			
			&__user-image-container {
				cursor : pointer;
			}
			
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
		color          : red;
		display        : flex;
		position       : absolute;
		flex-wrap      : wrap;
		max-width      : $max_width;
		flex-direction : column;
		
		&__controls {
			display         : flex;
			margin-top      : $main_offset / 2;
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
		$header_height : 80px;
		top              : 80px;
		right            : 0;
		width            : 100%;
		height           : calc(100vh - #{$header_height});
		z-index          : 5;
		display          : flex;
		padding          : $main_offset 0;
		position         : fixed;
		align-items      : center;
		flex-direction   : column;
		background-color : $color-black-squeeze;
		
		&__main {
			height  : 75%;
			display : flex;
		}
		
		&__footer {
			margin-top : $main_offset;
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
	
	.main-animation-enter, .main-animation-leave-to {
		@include main-animation;
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
</style>