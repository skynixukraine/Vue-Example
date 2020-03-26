<template>
	<div class = "table">
		<div class = "table__content">
			<div class = "table__header">
				<div class = "table__header-item">Question</div>
				<div class = "table__header-item enquiries-id__answer">Answer</div>
			</div>
			<div class = "table__main">
				<div class = "table__main-items" v-for = "(answer, index) in getAnswers" :key = "index">
					<div class = "table__main-item" data-title="Question">{{answer.message.title}}</div>
                    <div class = "edit-answer-area__upload-image__user-image-container"
                         v-if = "isImage(getType(answer))">
                        <img :src="getValue(answer)" v-bind:alt="pic">
                    </div>
                    <div class = "table__main-item enquiries-id__answer" data-title="Answer" v-else>{{getValue(answer)}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
    export default {
        data(){
            return {
                model: {
                    status: this.$store.state.enquires.doctorEnquire.status,
                },
            };
        },
        computed   : {
            getAnswers() {
                return this.$store.state.enquires.doctorEnquire.answers;
            },
        },
        methods  : {
            getEnquire() {
                return this.$store.state.enquires.doctorEnquire;
            },
            getValue(answer) {
                return answer.message_option !== null ? answer.message_option.value : answer.value;
            },
            getType(answer) {
                return answer.message.type;
            },
            isImage(type) {
                return type === 'IMAGE';
            }
        }
    }
</script>