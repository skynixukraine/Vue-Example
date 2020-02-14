<template>
	<div class = "page">
		<div class = "section">
			<div class = "container">
				<h1>Forshung / чат</h1>
				<div class = "chat-container" v-if = "messages">
					<transition-group name = "fade" tag = "div">
						<div v-for = "(item, index) in messages" :key = "`message_${index}`"
							 class = "message"
							 :id = "`message_${index}`"
							 :class = "{'message--is-me': !item.questioner}">
							<div class = "message__container">
								<span class = "message__questioner">{{ item.questioner || "Me" }}</span>
								<h4 class = "message__title" v-if = "item.title">{{ item.title }}</h4>
								<div class = "message__content">
									<div v-if = "item.contentForChat && item.type === QUESTION_TYPES.uploadImg"
										 v-html = "item.contentForChat"></div>
									<span v-else-if = "item.contentForChat && item.contentForChat !== QUESTION_TYPES.bodySelect">{{ item.contentForChat }}</span>
									<div v-else-if = "item.contentForChat === QUESTION_TYPES.bodySelect">
										<BodyParts :clickable = false :selectedParts = selectedBodyParts />
									</div>
									<span v-else-if = "item.content">{{ item.content }}</span>
								</div>
							</div>
						</div>
					</transition-group>
				</div>
				<transition name = "fade">
					<div class = "user-actions-area"
						 :class = "{'is-wait-loading': !isUserActionArea}"
						 v-if = "lastQuestionData && !isQuestionsOver">
						<div class = "user-actions-area__wrapper">
							<div class = "user-actions-area__content">
								<!--Multi select-->
								<div class = "user-actions-area__multi-select"
									 ref = "lastMultiSelect"
									 v-if = "lastQuestionData.type && lastQuestionData.type === QUESTION_TYPES.multiSelect">
									<div class = "user-actions-area__multi-select__item"
										 v-for = "(option, index) in lastQuestionData.options"
										 :key = "`message_${lastQuestionData.id}__multi-select_${option.id}`">
										<input type = "checkbox"
											   :id = "`message_${lastQuestionData.id}__multi-select_${option.id}`"
											   :value = "option.id"
											   :data-index = "index"
											   class = "user-actions-area__multi-select__input"
											   @change = "onChangeLastMultiSelect">
										<label :for = "`message_${lastQuestionData.id}__multi-select_${option.id}`"
											   class = "user-actions-area__multi-select__label">
											<span class = "user-actions-area__multi-select__label__icon"></span>
											{{ option.value }}
										</label>
									</div>
								</div>
								<!--Radio-->
								<div class = "user-actions-area__radio"
									 ref = "lastRadio"
									 v-if = "lastQuestionData.type && lastQuestionData.type === QUESTION_TYPES.radio">
									<div class = "user-actions-area__radio__item"
										 v-for = "(option, index) in lastQuestionData.options"
										 :key = "`message_${lastQuestionData.id}__multi-select_${option.id}`">
										<input type = "radio"
											   name = "radio"
											   :id = "`message_${lastQuestionData.id}__multi-select_${option.id}`"
											   :value = "option.id"
											   :data-index = "index"
											   class = "user-actions-area__radio__input"
											   @change = "onChangeLastRadio">
										<label :for = "`message_${lastQuestionData.id}__multi-select_${option.id}`"
											   class = "user-actions-area__radio__label">
											<span class = "user-actions-area__radio__label__icon"></span>
											{{ option.value }}
										</label>
									</div>
								</div>
								<!--Input Text-->
								<div class = "user-actions-area__input-text"
									 v-if = "lastQuestionData.type === QUESTION_TYPES.inputText">
									<textarea ref = "lastInputText"
											  class = "user-actions-area__input-text__textarea"
											  @change = "onInputText"
											  @paste = "onInputText"
											  @input = "onInputText"
											  @keyup = "onInputText"
									></textarea>
									<div ref = "autoHeight"
										 class = "user-actions-area__input-text__auto-height"></div>
								</div>
								<!--Select body part-->
								<div class = "user-actions-area__select-body-part"
									 v-if = "lastQuestionData.type === QUESTION_TYPES.bodySelect">
									<div class = "user-actions-area__select-body-part__parts">
										<BodyParts @select-body-part = "onSelectBodyPart"
												   :selectedParts = selectedBodyParts />
									</div>
								</div>
								<!--Upload image-->
								<div class = "user-actions-area__upload-image"
									 v-if = "lastQuestionData.type === QUESTION_TYPES.uploadImg">
									<input type = "file"
										   accept = ".jpeg, .jpg, .png"
										   class = "user-actions-area__upload-image__input"
										   ref = "lastUploadImgInput"
										   @change = "onUploadFile">
									<div class = "user-actions-area__upload-image__user-image-container"
										 v-html = "lastUploadedImg.fileHTML"
										 v-if = "lastUploadedImg.fileHTML"
										 @click = "$refs.lastUploadImgInput.click()"></div>
								</div>
							</div>
							<transition name = "fade">
								<div class = "user-actions-area__submit-btn__wrapper">
									<button v-if = "lastQuestionData.type"
											class = "user-actions-area__submit-btn"
											:class = "{
												'is-disable': lastQuestionData.type === QUESTION_TYPES.multiSelect && !lastMultiSelectSelectedValuesIndexes || lastQuestionData.type === QUESTION_TYPES.radio && !lastSelectedRadioIndex || lastQuestionData.type === QUESTION_TYPES.inputText && !lastInputTextText || lastQuestionData.type === QUESTION_TYPES.bodySelect && !selectedBodyParts.length,
												'is-text': lastQuestionData.type === QUESTION_TYPES.inputText,
												'is-upload-photo': lastQuestionData.type === QUESTION_TYPES.uploadImg && !lastUploadedImg.file
											}"
											@click.stop = "onUserSubmit()">
										{{ lastQuestionData.type === QUESTION_TYPES.uploadImg && !lastUploadedImg.file ? "select upload img" : lastQuestionData.button }}
									</button>
									<button v-else class = "user-actions-area__submit-btn" @click = "onStart">{{ this.FIRST_QUESTION_DATA.button }}
									</button>
									<transition name = "fade">
										<div class = "user-actions-area__errors-message"
											 v-if = "lastUploadedImg.errorMessage">
											{{ lastUploadedImg.errorMessage }}
										</div>
									</transition>
								</div>
							</transition>
						</div>
					</div>
				</transition>
				<transition name = "fade">
					<div class="personal-info" v-if="isQuestionsOver">
						<h2>Your personal information</h2>
						<div class="personal-info__field">
							<label class="personal-info__label">
								<input type = "text" name="first_name" class="personal-info__input personal-info__input--text">
							</label>
						</div>
						<div class="personal-info__field">
							<label class="personal-info__label">
								<input type = "text" name="last_name" class="personal-info__input personal-info__input--text">
							</label>
						</div>
						<div class="personal-info__field">
							<label class="personal-info__label personal-info__label--for-radio">
								<input type = "radio" value="woman" name="gender" class="personal-info__input personal-info__input--radio">
							</label>
							<label class="personal-info__label personal-info__label--for-radio">
								<input type = "radio" value="man" name="gender" class="personal-info__input personal-info__input--radio">
							</label>
						</div>
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
								   :selectedParts = notConfirmSelectedBodyParts />
					</div>
					<footer class = "select-body-part-modal__footer">
						<button class = "select-body-part-modal__submit" @click.stop = "confirmBodySelectParts">
							Confirm
						</button>
						<button class = "select-body-part-modal__cancel" @click = "cancelBodySelectParts">Cancel
						</button>
					</footer>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
    import validator from "~/mixins/validator";
    import BodyParts from "~/components/Content/BodyParts";
    import diagnosticChatApi from "~/services/api/DiagnosticChat";

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
            BodyParts
        },
        data(){
            return {
                // Data for 'body select' question type
                showedBodyHalf              : "",
                selectedBodyParts           : [],
                isShowSelectBodyPartModal   : false,
                notConfirmSelectedBodyParts : [],

                // Data for last actions user
                lastUploadedImg                      : {
                    file         : null,
                    fileHTML     : "",
                    errorMessage : "",
                },
                lastInputTextText                    : "",
                lastSelectedRadioIndex               : null, // Array, что бы не делать проверки по typeof на number, ибо может быть 0 и 0 это норма
                lastMultiSelectSelectedValuesIndexes : null,

                messages              : [],
                questions             : [],
                userAnswers           : [],
                isQuestionsOver       : false,
                isUserActionArea      : false,
                nextQuestionsId_queue : [],

                // Constants, do not edit this values in code, please
                FIRST_QUESTION_DATA : {
                    button         : "lets start",
                    questioner     : "first message",
                    contentForChat : "Are you ready?",
                },
                QUESTION_TYPES      : {
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
            isSafari(){
                return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
            },
            isIOS(){
                return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
            },
            body(){
                return document.querySelector("body");
            },
            footer(){
                return document.querySelector("main + footer");
            }
        },
        mounted(){
            // this.messages.push(this.FIRST_QUESTION_DATA);
            // this.questions.push(this.FIRST_QUESTION_DATA);
            this.onStart()
            setTimeout(() => {
                this.isUserActionArea = true;
            }, ANIMATION_DURATION);
        },
        methods    : {
            forbidScroll(){
                if(this.isSafari || this.isIOS){
                    this.body.setAttribute("style", "position: fixed;");
                } else{
                    this.body.setAttribute("style", "overflow: hidden;");
                }
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
            confirmBodySelectParts(){
                this.selectedBodyParts         = this.notConfirmSelectedBodyParts.slice();
                this.isShowSelectBodyPartModal = false;
                this.allowScroll();
            },
            cancelBodySelectParts(){
                this.isShowSelectBodyPartModal = false;
                this.allowScroll();
            },
            onSelectBodyPart(eventData){
                if(eventData.targetPartId){ // Add or delete part
                    if(eventData.isAddNewPart){ // Add new part
                        this.notConfirmSelectedBodyParts.push(eventData.targetPartId);
                    } else{ // Delete part
                        for(let i = 0, newNotConfirmSelectedBodyParts = []; i < this.notConfirmSelectedBodyParts.length; i++){
                            if(this.notConfirmSelectedBodyParts[i] === eventData.targetPartId){
                                this.notConfirmSelectedBodyParts = newNotConfirmSelectedBodyParts.concat(this.notConfirmSelectedBodyParts.slice(i + 1, this.notConfirmSelectedBodyParts.length));
                                break;
                            } else{
                                newNotConfirmSelectedBodyParts.push(this.notConfirmSelectedBodyParts[i]);
                            }
                        }
                    }
                } else{ // Open modal
                    this.showedBodyHalf              = eventData.halfPart;
                    this.notConfirmSelectedBodyParts = this.selectedBodyParts.slice();

                    this.isShowSelectBodyPartModal = true;
                    this.forbidScroll();
                }
            },
            onChangeLastMultiSelect(){
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
            onChangeLastRadio(event){
                this.lastSelectedRadioIndex = [event.target.getAttribute("data-index")];
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
                    that.lastUploadedImg.file     = file;
                    that.lastUploadedImg.fileHTML = `<img class="user-uploaded-img" src="${e.target.result}"/>`;
                    
                    setTimeout(() => {
                        that.scrollToBottom();
					}, ANIMATION_DURATION);
                };

                reader.readAsDataURL(file);
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

                        this.lastSelectedRadioIndex = null;
                        break;
                    }
                    case this.QUESTION_TYPES.uploadImg:{
                        if(!this.lastUploadedImg.file){ // Chose file
                            this.$refs.lastUploadImgInput.click();
                            return;
                        } else{
                            if(this.lastUploadedImg.errorMessage || !this.lastUploadedImg.file || !this.lastUploadedImg.fileHTML){ return; }

                            userAnswerData.type           = this.QUESTION_TYPES.uploadImg;
                            userAnswerData.contentForChat = this.lastUploadedImg.fileHTML;

                            this.lastUploadedImg.file         = null;
                            this.lastUploadedImg.fileHTML     = "";
                            this.lastUploadedImg.errorMessage = "";
                        }
                        break;
                    }
                    case this.QUESTION_TYPES.inputText:{
                        userAnswerData.contentForChat = this.$refs.lastInputText.value;
                        this.lastInputTextText        = "";
                        break;
                    }
                    case this.QUESTION_TYPES.bodySelect:{
                        userAnswerData.contentForChat = this.QUESTION_TYPES.bodySelect;
                        break;
                    }
                    case this.QUESTION_TYPES.multiSelect:{
                        let contentForChat = "";

                        for(let i = 0; i < this.lastMultiSelectSelectedValuesIndexes.length; i++){
                            contentForChat += `${this.lastQuestionData.options[this.lastMultiSelectSelectedValuesIndexes[i]].value}, `;

                            if(this.lastQuestionData.options[this.lastMultiSelectSelectedValuesIndexes[i]].next_message_id){
                                this.nextQuestionsId_queue.push(this.lastQuestionData.options[this.lastMultiSelectSelectedValuesIndexes[i]].next_message_id);
                            }
                        }
                        contentForChat = contentForChat.slice(0, -2) + ".";

                        userAnswerData.contentForChat             = contentForChat;
                        this.lastMultiSelectSelectedValuesIndexes = [];
                        break;
                    }
                    default:{
                        console.error("Invalid 'lastQuestionData.type' \n\n 'this.lastQuestionData' = ", this.lastQuestionData);
                    }
                }

                if(this.lastQuestionData.next_message_id){
                    this.nextQuestionsId_queue.push(this.lastQuestionData.next_message_id);
                }
                
                this.messages.push(userAnswerData);
                this.userAnswers.push(userAnswerData);
				
                if(this.nextQuestionsId_queue.length === 0){
                    this.isQuestionsOver = true;
                    setTimeout(() => {
                        this.scrollToBottom();
					}, ANIMATION_DURATION);
				}else{
					setTimeout(() => {
						this.loadNextQuestion();
					}, ANIMATION_DURATION);
				}
            },
            onInputText(){
                // Autoheight
                this.$refs.autoHeight.innerHTML       = this.$refs.lastInputText.value;
                this.$refs.lastInputText.style.height = this.$refs.autoHeight.clientHeight + 10 + "px";

                this.lastInputTextText = this.$refs.lastInputText.value;
            },
            loadNextQuestion(){
                this.isUserActionArea = false;

                let nextQuestionId = this.nextQuestionsId_queue.length ?
                    this.nextQuestionsId_queue.shift() :
                    this.questions[this.questions.length - 1].next_message_id;

                diagnosticChatApi.loadNextQuestion(nextQuestionId).then((response) => {
                    this.questions.push(response.data.data);
                    this.messages.push(response.data.data);
                    this.scrollToBottom();

                    setTimeout(() => {
                        if(this.lastQuestionData.type === this.QUESTION_TYPES.inputText){
                            this.$refs.lastInputText.value = "";
                        }

                        this.scrollToBottom();
                        this.isUserActionArea = true;
                    }, ANIMATION_DURATION);
                });
            },
            onStart(){
                this.isUserActionArea = false;

                setTimeout(() => {
                    this.messages.push({
                        contentForChat : this.FIRST_QUESTION_DATA.button
                    });

                    setTimeout(() => {
                        diagnosticChatApi.loadFirsQuestion().then((response) => {
                            this.questions.push(response.data.data);
                            this.messages.push(response.data.data);

                            setTimeout(() => {
                                this.scrollToBottom();
                                this.isUserActionArea = true;
                            }, ANIMATION_DURATION);
                        });
                    }, ANIMATION_DURATION);
                }, ANIMATION_DURATION);
            },
        }
    }
</script>

<style lang = "scss" scoped>
	$max_width : 400px;
	$border-radius : 20px;
	$animation_duration : .75s;
	
	@mixin message-animation {
		opacity   : 0;
		transform : translateY(50px);
	}
	
	.message {
		color         : white;
		display       : flex;
		margin-bottom : $main_offset * 2;
		
		&__container {
			padding          : $main_offset;
			position         : relative;
			max-width        : $max_width;
			border-radius    : 0 $border-radius $border-radius $border-radius;
			background-color : $color-price;
		}
		
		&__questioner {
			$fz : .75em;
			
			top       : $fz * -2;
			left      : 0;
			color     : black;
			position  : absolute;
			font-size : $fz;
		}
		
		&__title {
			color : white;
		}
		
		&__content {}
		
		&__btn {}
		
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
	
	.user-actions-area {
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
		
		&__submit-btn {
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
			
			&.is-disable {
				cursor           : not-allowed;
				pointer-events   : none;
				background-color : gray;
			}
			
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
		
		&__multi-select, &__radio {
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
				
				&:checked + .user-actions-area__multi-select__label, &:checked + .user-actions-area__radio__label {
					background-color : $color-matisse;
					
					.user-actions-area__multi-select__label__icon, .user-actions-area__radio__label__icon {
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
					$size : .75em;
					
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
		
		&__multi-select {
			&__label {
				&__icon {
					border-radius : 2px;
					
					&:before {
						$different_size : 50%;
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
		
		&__radio {
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
		
		&__input-text {
			position : relative;
			
			&__textarea {
				width       : 100%;
				resize      : none;
				padding     : $main_offset / 2;
				line-height : 1.5;
			}
			
			&__auto-height {
				@extend .user-actions-area__input-text__textarea;
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
			@include message-animation;
			cursor         : default;
			pointer-events : none;
		}
	}
	
	/deep/ .user-uploaded-img {
		width : 100%;
	}
	
	.select-body-part-modal {
		$header_height : 80px;
		top              : 80px;
		right            : 0;
		width            : 100%;
		height           : calc(100vh - #{$header_height});
		cursor           : pointer;
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
		
		&__submit, &__cancel {
			color         : $color-black-squeeze;
			border        : none;
			margin        : 0 $main_offset / 2;
			padding       : $main_offset / 2 $main_offset;
			transition    : $transition;
			line-height   : 1;
			border-radius : 4px;
		}
		
		&__submit {
			background-color : transparentize($color-user-is-active, .25);
			
			&:hover {
				background-color : $color-user-is-active;
			}
		}
		
		&__cancel {
			background-color : transparentize($color-cinnabar, .25);
			
			&:hover {
				background-color : $color-cinnabar;
			}
		}
	}
	
	// Vue transitions
	.fade-enter-active, .fade-leave-active {
		transition : $animation_duration;
	}
	
	.fade-enter, .fade-leave-to {
		@include message-animation;
	}
	
	// modal
	.modal-enter-active, .modal-leave-active {
		transition : $animation_duration;
	}
	
	.modal-enter, .modal-leave-to {
		opacity : 0;
	}
</style>