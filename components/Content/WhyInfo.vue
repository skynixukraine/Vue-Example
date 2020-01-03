<template>
    <div class="why-info">
        <div class="why-info__item">
            <h2 class="why-info__title">Warum ist die Hautarzt Online Beratung wichtig?</h2>
            <img class="why-info__image" :src="require('~/static/images/images/iphonehand.jpg')" alt="iphone and hand">
        </div>
        <div class="why-info__item">
            <p>Online Hautarzt – AppDoc wurde in kooperativer Zusammenarbeit von Heidelberger Hautärzten sowie Wissenschaftlern des Nationalen Centrums für Tumorerkrankungen konzipiert und durch das lokale Technologieunternehmen Smart Health Heidelberg GmbH umgesetzt. Bei AppDoc befunden ausschließlich Hautfachärzte aus Heidelberg mit mindestens 20 Jahren Berufserfahrung Ihr Hautproblem.</p>
            <p v-show="isTextShow || windowWidth >= 720">AppDoc ist zu 100% ein deutsches Produkt und der einzige von einer Landesärztekammer genehmigte Online-Hautarzt-Service bundesweit. Informationen und Fotos von Ihrem Hautproblem können Sie sowohl über die AppDoc Apps für Android & iPhones, sowie über die Webform zur Befundung einsenden. Sie erhalten innerhalb weniger Stunden (maximal 24h) eine qualifizierte Einschätzung, um was es sich handelt. Dank der Handlungsempfehlung wissen Sie zudem, was Sie wegen Ihres Hautproblems tun können. Etwa 70% unserer Patienten müssen nicht mehr in die Praxis.</p>
            <p v-show="isTextShow || windowWidth >= 720">Die Plattform wird sowohl durch eine interne, als auch durch eine externe wissenschaftliche Evaluation stetig verbessert und optimiert. Auf dieser Seite finden Sie mehr Informationen über die Personen hinter AppDoc. In den AppStores für iPhones und Android-Smartphones können Sie die Bewertungen unserer zufriedenen Patienten nachlesen.</p>
            <button class="button-more-less" @click="onToggleText" v-if="windowWidth < 720">Weiterlesen</button>
        </div>
    </div>
</template>

<script>
// mixins
import window from '~/mixins/window'

export default {
    mixins: [window],
    data() {
        return {
            isTextShow: false
        }
    },
    watch: {
        windowWidth(width) {
            if (width >= 720) {
                this.isTextShow = false
            }
        }
    },
    methods: {
        onToggleText() {
            this.isTextShow = !this.isTextShow
        }
    }
}
</script>

<style lang="scss" scoped>
.why-info {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    &__item {
        width: 100%;

        &:first-child {
            margin-bottom: 32px;
        }

        p {
            margin-bottom: 30px;

            &:last-child {
                margin-bottom: 0;
            }
        }
    }

    &__image {
        max-width: 100%;
        display: block;
        position: relative;
        z-index: 1;
    }


    @include tablet {

        &__item {
        
            &:first-child {
                width: 42.857%;
                margin-bottom: 0;
            }

            &:last-child {
                width: 51.428%;
            }
        }
    }
}
</style>