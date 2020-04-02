<template>
	<div class = "table">
		<div class = "table__content">
			<div class = "table__header">
				<div class = "table__header-item">Question</div>
				<div class = "table__header-item enquiries-id__answer">Answer</div>
			</div>
			<div class = "table__main">
				<div class = "table__main-items" v-for = "(answer, index) in getAnswers" :key = "index">
					<div class = "table__main-item" data-title="Question">{{getQuestion(answer)}}</div>
					<div class = "table__main-item enquiries-id__answer" data-title="Answer" v-if = "isImage(getType(answer))">
                    <div class = "edit-answer-area__upload-image__user-image-container">
                        <img :src="getValue(answer)" @click="openModal($modals.openImageModal)">
                    </div>
					</div>
					<div class = "table__main-item enquiries-id__answer" data-title="Answer" v-else-if = "isBoby(getType(answer))">
						<div class = "body-parts body-parts--answer" ref = "bodyAnswer">
							<div class = "body-parts__half front"
								 data-half-part = "front">
								<svg xmlns = "http://www.w3.org/2000/svg"
									 data-half-part = "front"
									 width = "364"
									 height = "850"
									 viewBox = "0 0 364 850"
									 preserveAspectRatio = "xMidYMid meet"
									 id = "front">
									<g>
										<path data-name = "F 14 L" id = "F_14_L"
											  d = "M197.3,619.4c52.5,13.3,45.1-14.4,48-52.3C212.7,596.6,182.6,559.6,197.3,619.4z" />
										<path data-name = "F 12 L" id = "F_12_L" d = "M359.1,462.7c-19-49-81.6-59.7-49.2,8.1c5.1,7.6,6.2,30.8,13.4,19.7c-0.9,4.5,8.5,22.4,8.7,8.5
		c1.8,8.5,6.2,6.2,6.2,6.2c3.5,0-1-14.9,0.7-10.3c11.6,17.5,6.7-20.5,4.5-22.9c-0.5-2.1-3.1-19.7-1.4-16.4
		C345.5,462.1,359.3,476.2,359.1,462.7z" />
										<path data-name = "F 9 L" id = "F_09_L"
											  d = "M321.4,385.2c-9.8,7.2-21.3,12.6-33.4,15C297.3,438.5,336.3,421.1,321.4,385.2z" />
										<path data-name = "F 7 L" id = "F_07_L"
											  d = "M320.8,380c-11.4-66.4,0.3-68.7-56.1-48.2C266.1,358.7,283.8,421,320.8,380z" />
										<path data-name = "F 6 L" id = "F_06_L"
											  d = "M296.4,293.3c-2-13.9-25.4,0.6-37.5,6.5c3.5,12.2,5.4,15.3,5.6,28C276.8,325.1,318.1,317.4,296.4,293.3z" />
										<path data-name = "F 4 L" id = "F_04_L"
											  d = "M210,164.5c59.9,11.4,31.4,98.4,37.2,145.6c-14.6-0.5-39.8-8.2-62.3-6.8C191.9,283.6,164.8,153.9,210,164.5z"
										/>
										<path data-name = "F 3 L" id = "F_03_L"
											  d = "M227.1,137.8c41.9,13,79.3,36.3,24.2,72.2c0.1-33.6-19-40.7-43.7-52.2C191.5,129.7,193.9,114.9,227.1,137.8z"
										/>
										<path data-name = "F 1 L" id = "F_01_L" d = "M201.8,111.2c15.1-20.7,8.9-26.5,21.8-41.5c1.7-2.5,5.5-17.9-2.5-12.4c7.3-27.6-20.9-52.8-36.3-48.6
		C191.6,11.7,167.7,162.2,201.8,111.2z" />
										<path data-name = "F 16 R" id = "F_16_R" d = "M139.6,777.8c-22.9-7.7-13.7,23.8-30.4,33.8c-7.7,6.7-14.8,18.8-1.6,22.5C137.7,867.2,175.9,773.7,139.6,777.8
		z" />
										<path data-name = "F 14 R" id = "F_14_R" d = "M149.4,581.6c-11.3-0.6-24-10.7-31-14.5c6.6,21.4-10.6,58.2,26.4,54.9c26,2.1,22.7-8.3,25.8-35.7
		C172.1,578.3,155.4,584.8,149.4,581.6z" />
										<path data-name = "F 13 R" id = "F_13_R" d = "M166.3,439.6c-10.4-19.1-40-17.1-55.3-24.3c1.9,34.7-21.1,155.8,39.9,163.4c38.5,15.4,19.4-69.3,26.7-79.1
		C178.4,476.7,186.1,458.3,166.3,439.6z" />
										<path data-name = "F 11" id = "F_11" d = "M181.9,413.4c-10.2-0.7-41.2,5.6-30.5,8.8c12.4-3.1,21,29.2,30.5,26.1c2.7,0,7.5,0.5,12.9-11.3
		C213.4,412.2,227.2,420.5,181.9,413.4z" />
										<path data-name = "F 10 R" id = "F_10_R"
											  d = "M179.9,409.4c8.1-52.2-28.4-23.5-62.6-39.6C95.1,432.9,139.1,415.9,179.9,409.4z" />
										<path data-name = "F 09 R"
											  id = "F_09_R"
											  d = "M42.3,385.2c-14.8,36,24.2,53.3,33.4,15C63.6,397.8,52,392.3,42.3,385.2z" />
										<path data-name = "F 08 R" id = "F_08_R"
											  d = "M178.9,305.8c-61.4,1.8-66.5,1-62.1,60.6C190.9,387.3,179.4,370.3,178.9,305.8z" />
										<path data-name = "F 08 R 1" id = "F_08_R_1_"
											  d = "M247,366.4c4.4-59.6-0.7-58.8-62.1-60.6C184.3,370.3,172.8,387.3,247,366.4z" />
										<path data-name = "F 06 R" id = "F_06_R"
											  d = "M67.3,293.3c-21.7,24,19.6,31.8,31.9,34.5c0.2-12.7,2.1-15.8,5.6-28C92.7,293.9,69.3,279.5,67.3,293.3z" />
										<path data-name = "F 05 R" id = "F_05_R"
											  d = "M107.7,285.1c3.9-19.2,1.2-35.7,3.1-67.4c-50.9-69.3-24.9,36.7-42,65.9C78.4,281.6,108.8,306.9,107.7,285.1z"
										/>
										<path data-name = "F 04 R" id = "F_04_R" d = "M153.8,164.5c-59.9,11.4-31.4,98.4-37.2,145.6c14.6-0.5,39.8-8.2,62.3-6.8C171.9,283.6,199,153.9,153.8,164.5z
		" />
										<path data-name = "F 03 R" id = "F_03_R" d = "M136.6,137.8c-41.9,13-79.3,36.3-24.2,72.2c-0.1-33.6,19-40.7,43.7-52.2C172.2,129.7,169.8,114.9,136.6,137.8z
		" />
										<path data-name = "F 02" id = "F_02"
											  d = "M181.9,166.4c37,2.4,10.1-19.8,12.4-44.5c-7.5,4.9-17.3,4.9-24.8,0C171.8,146.5,144.8,168.7,181.9,166.4z" />
										<path data-name = "F 01 R" id = "F_01_R" d = "M146.1,78.4c8,10.3,3.7,22.2,19,36.6c29.1,39.6,7.4-105.3,13.8-106.2c-13.5-3.4-45.3,18.7-35.5,48.2
		C131.7,53.5,139.9,74.3,146.1,78.4z" />
										<path data-name = "F 12 L 1 " id = "F_12_L_1_" d = "M19.1,455.6c3.6,0.8-13.8,57.2,3.1,39.3c1.7-4.6-2.8,10.3,0.7,10.3c0,0,4.5,2.3,6.2-6.2
		c0.1,14,9.6-3.9,8.7-8.5c7.2,11.1,8.2-12.1,13.4-19.7C83.6,403,21,413.7,2,462.7C1.8,476.2,15.7,462.1,19.1,455.6z" />
										<path data-name = "F 07 L 1 " id = "F_07_L_1_"
											  d = "M99,331.8c-56.3-20.6-44.6-18.2-56.1,48.2C79.9,421,97.5,358.7,99,331.8z" />
										<path data-name = "F 05 R 1 " id = "F_05_R_1_"
											  d = "M295,282.6c-17.1-29.2,8.9-135.2-42-65.9c1.9,31.7-0.8,48.2,3.1,67.4C255.2,305.9,285.5,280.6,295,282.6z"
										/>
										<path data-name = "F 10 R 1 " id = "F_10_R_1_"
											  d = "M247.3,370c-34.2,16.1-70.7-12.7-62.6,39.6C225.5,416.1,269.4,433.1,247.3,370z" />
										<path data-name = "F 13 R 1 " id = "F_13_R_1_" d = "M185.7,499.5c7.4,9.9-11.8,94.6,26.7,79.1c61.1-7.6,38.1-128.7,39.9-163.4c-15.3,7.2-44.9,5.2-55.3,24.3
		C177.3,458.3,185,476.7,185.7,499.5z" />
										<path data-name = "F 15 L 1 " id = "F_15_L_1_" d = "M167.3,623.5c-25.9,9.8-55.9-17.8-48,21.9c0.8,44.8,12,84.3,12.9,126.5
		C176.6,798.3,162.5,656.3,167.3,623.5z" />
										<path data-name = "F 15 L 2 " id = "F_15_L_2_" d = "M230.9,771.9c0.9-42.2,12.1-81.7,12.9-126.5c7.8-39.7-22.2-12.1-48-21.9
		C200.6,656.3,186.4,798.3,230.9,771.9z" />
										<path data-name = "F 16 R 1 " id = "F_16_R_1_"
											  d = "M251.3,834c13.2-3.7,6.1-15.8-1.6-22.5c-16.7-10-7.4-41.5-30.4-33.8C183.1,773.7,221.2,867.2,251.3,834z" />
									</g>
								</svg>
							</div>
							<div class = "body-parts__half back"
								 data-half-part = "back">
								<svg xmlns = "http://www.w3.org/2000/svg"
									 data-half-part = "back"
									 width = "364"
									 height = "850"
									 viewBox = "0 0 364 850"
									 preserveAspectRatio = "xMidYMid meet"
									 id = "back">
									<g>
										<path data-name = "B 16 R" id = "B_16_R" d = "M249.7,792.4c-3.8-4.6-10.5-7.5-16.5-8.7c-5.4-28.8-8.8,0-27.9-6c3.4,23.6-11.8,42.3,5,52
		C223,822.6,249.7,807.2,249.7,792.4z" />
										<path data-name = "B 15 R" id = "B_15_R" d = "M204.7,767.1c-0.6,14.3,17.3,2.2,26.8-7.2c5.2-26.3,16.1-100.6,12-129.5c-2.7-7.5-36.8,12.3-48.1,2.4
		C190.8,684.1,208.4,713.3,204.7,767.1z" />
										<path data-name = "B 14 R" id = "B_14_R"
											  d = "M195.7,626.8c12.6,9.6,42.3,3.1,47.1-8.8c-1.5-13.2-1.4-20,0.4-31.8C197.6,597.2,185,565.4,195.7,626.8z" />
										<path data-name = "B 13 R" id = "B_13_R" d = "M254.7,451.6c-12.8,29.9-54,17.9-71.2,16.3c8.6,27.3-22.3,147.6,60.5,112.3C251.9,534.7,255.3,492,254.7,451.6
		z" />
										<path data-name = "B 10 R" id = "B_10_R"
											  d = "M254.1,422.2c-5.9-66.1-5.1-56.1-70.1-47.5c0,0,0,87.4,0,87.4C213.9,478,264.9,463.5,254.1,422.2z" />
										<path data-name = "B 14 L" id = "B_14_L"
											  d = "M120.7,585.5c1.9,12,2.1,19.1,0.5,32.5c4.8,11.9,34.5,18.4,47.1,8.8C179,565.6,166.6,598.1,120.7,585.5z" />
										<path data-name = "B 13 L" id = "B_13_L"
											  d = "M179.3,466.5c-21.2,10-59.7,7.4-70.3-14c0.4,42.9,2.8,81.8,11,127.8C203.3,615,173.8,492.3,179.3,466.5z" />
										<path data-name = "B 12 L" id = "B_12_L" d = "M32.6,424.6c-7.2,5.7-48.5,62.3-16.4,37.2c0.6,8.6-10.9,39.4,1.8,34.8c1.9,0.5-1,6.6,2.3,6.4
		c17.4-2.6,20.6-8.4,24.8-29.3C55.8,455.4,64,419.1,32.6,424.6z" />
										<path data-name = "B 10 L" id = "B_10_L"
											  d = "M180,374.7c-83.8-13.1-60-12.8-70.7,65.3c5.5,32.5,46.8,32.2,68.9,22.7C182.3,465.1,179,375.1,180,374.7z" />
										<path data-name = "B 09 L" id = "B_09_L" d = "M35.7,417.8c11.2,6.6,25,15.4,27.8-3.4C49.5,414.8,37.6,397,35.7,417.8z" />
										<path data-name = "B 08 L" id = "B_08_L" d = "M180,280.6c-81.9-3-48.5,19.6-60.5,77C205.4,396.3,175.1,335.1,180,280.6z" />
										<path data-name = "B 07 L" id = "B_07_L"
											  d = "M55.9,316.8c-8.8,18.4-11.3,54.9-15.7,84c34.9,31.2,40.7-34.7,53.1-58C102.3,322.7,67.4,329.9,55.9,316.8z" />
										<path data-name = "B 06 L" id = "B_06_L"
											  d = "M66.5,276.5c-11.6,38-7,45.2,28.2,49.1C102.8,295.9,106.3,271.2,66.5,276.5z" />
										<path data-name = "B 05 L" id = "B_05_L"
											  d = "M112.8,238.7c-48.2-57.3-37.8-13.6-45.5,32.2C112.4,278.4,104.3,283,112.8,238.7z" />
										<path data-name = "B 04 L" id = "B_04_L" d = "M180,136.1c-31.5-4.8-16.7,34.1-41.4,38.1c-44.2,14.7-11.5,72.7-17.5,109.1c11.3-2.8,30.6-6.5,58.9-6.8V136.1z
		" />
										<path data-name = "B 03 L" id = "B_03_L"
											  d = "M114,232.2c-13.7-69.2,19.6-43,38.3-80.3c9.4-19.4-77.6,5.4-75.7,46.8C78.9,212.3,107,215.7,114,232.2z" />
										<path data-name = "B 02" id = "B_02" d = "M182,131.1c33.5,11.7,26.5-12.6,0-18.6C155.5,118.5,148.5,142.8,182,131.1z" />
										<path data-name = "B 01 L" id = "B_01_L" d = "M180,24.4c-14.1-3.5-44.9,19.2-35.7,48.6c-13,0.3,0.7,19.7,5.6,24.6c5.8,28.4,7.5,19.8,30.1,10.9
		C180,108.6,180,24.4,180,24.4z" />
										<path data-name = "B 08 L 1 " id = "B_08_L_1_"
											  d = "M245.4,357.2c-11.9-57.3,21.5-79.9-60.5-77C189.8,334.7,159.5,395.9,245.4,357.2z" />
										<path data-name = "B 01 L 1 " id = "B_01_L_1_" d = "M184,108.6c22.6,8.9,24.2,17.5,30.1-10.9c4.9-4.9,18.6-24.3,5.6-24.6c9.3-29.4-21.6-52.1-35.7-48.6
		C184,24.4,184,108.6,184,108.6z" />
										<path data-name = "B 04 L 1 " id = "B_04_L_1_"
											  d = "M184.2,276.6c28.3,0.3,47.7,4,58.9,6.8c-6-36.5,26.7-94.4-17.5-109.1c-24.7-4-10-42.9-41.4-38.1V276.6z" />
										<path data-name = "B 06 L 1 " id = "B_06_L_1_"
											  d = "M270.6,325.7c35.2-3.9,39.8-11.1,28.2-49.1C259,271.2,262.5,295.9,270.6,325.7z" />
										<path data-name = "B 03 L 1 " id = "B_03_L_1_" d = "M286.9,198.8c1.9-41.4-85.2-66.2-75.7-46.8c18.7,37.2,52,11,38.3,80.3C256.5,215.7,284.5,212.3,286.9,198.8
		z" />
										<path data-name = "B 05 L 1 " id = "B_05_L_1_"
											  d = "M297.6,269.9c-7.6-45.8,2.8-89.5-45.5-32.2C260.6,282,252.6,277.4,297.6,269.9z" />
										<path data-name = "B 07 L 1 " id = "B_07_L_1_" d = "M269.8,342.8c12.3,23.3,18.2,89.1,53.1,58c-4.4-29.1-6.9-65.6-15.7-84C295.6,329.9,260.8,322.7,269.8,342.8
		z" />
										<path data-name = "B 12 L 1 " id = "B_12_L_1_" d = "M315.3,473.7c4.2,20.9,7.5,26.7,24.8,29.3c3.4,0.2,0.5-5.9,2.3-6.4c12.8,4.6,1.2-26.2,1.8-34.8
		c32.1,25.1-9.2-31.5-16.4-37.2C296.5,419.1,304.6,455.4,315.3,473.7z" />
										<path data-name = "B 09 L 1 " id = "B_09_L_1_"
											  d = "M298.6,414.4c2.8,18.8,16.6,10,27.8,3.4C324.5,397,312.7,414.8,298.6,414.4z" />
										<path data-name = "B 14 R 1 " id = "B_16_R_1_" d = "M154.1,829.6c16.8-9.7,1.6-28.4,5-52c-19.1,5.9-22.5-22.8-27.9,6c-6,1.2-12.7,4.1-16.5,8.7
		C114.8,807.2,141.5,822.6,154.1,829.6z" />
										<path data-name = "B 14 R 1 " id = "B_15_R_1_" d = "M169.4,633.8c-11.4,10-45.5-9.9-48.1-2.4c-4.2,28.8,6.8,103.2,12,129.5c9.5,9.4,27.4,21.5,26.8,7.2
		C156.4,714.3,174,685.1,169.4,633.8z" />
									</g>
								</svg>
							</div>
						</div>
					</div>
					<div class = "table__main-item enquiries-id__answer" data-title="Answer" v-else> {{getValue(answer)}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
    import modal from '~/mixins/modal'
    export default {
        mixins : [
            modal,
        ],
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
        mounted(){
            let answers = this.$store.state.enquires.doctorEnquire.answers;
            let answer_body = "";
            let body_parts = this.$refs.bodyAnswer;
            answers.map((answer, index)=> {
                if(answer.message.type === 'BODY-SELECT') {
                    answer_body = answer.value;
					return answer_body
				}
			})
			if(answer_body !==""){
                answer_body = answer_body.replace(/\s*"\s*/g, "").replace(/\s*]\s*/g, "").substring(1);
                answer_body = answer_body.split(',');
            }
            if(body_parts !== undefined){
                body_parts.map((body, index) =>{
                    if(body !== null){
                        answer_body.map((elem, index) =>{
                            let elem_parts = body.querySelector(`#${elem}`);
                            if(elem_parts !== null){
                                elem_parts.style.fill = "red";
                            }
                        })
                    }
                })
            }
        
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
            getQuestion(answer) {
                let question = answer.message.content
                question = question.replace(/(&nbsp;|<\/?[^>]+>)/g,'');
                return question;
            },
            isImage(type) {
                return type === 'IMAGE';
            },
            isBoby(type) {
               
                return type === 'BODY-SELECT';
            },
			
        }
    }
</script>

<style lang = "scss" scoped>
	.body-parts--answer {
		display: flex;
		
		svg {
			width: 70%;
			height: auto;
			fill: $color-stratos;
		}
	}
	</style>