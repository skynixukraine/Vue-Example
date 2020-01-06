<template>
    <div class="why-info">
        <div class="why-info__item">
            <h2 class="why-info__title">Die Gründung und die Ziele von Online Hautarzt vor Ort</h2>
            <img class="why-info__image" :src="require('~/static/images/images/iphonehand.jpg')" alt="iphone and hand">
        </div>
        <div class="why-info__item">
            <p>Der Online Hautarzt ist ein von der Landesärztekammer bereits im Oktober 2018genehmigtes und mehrfach ausgezeichnetes Modellprojekt, das in kooperativerZusammenarbeit von Heidelberger Hautärzten und Wissenschaftlern des NationalenCentrums für Tumorerkrankungen entwickelt wurde. Bis vor wenigen Monaten war dasAngebot ausschließlich für Hautärzte in Baden-Württemberg zugelassen. Erst im Dezember2019 erhielt das Projekt die Genehmigung der Landesärztekammer, auch Hautärzteaußerhalb Baden-Württembergs aufnehmen zu dürfen. So wurde der bereits lange geplante„Online Hautarzt vor Ort“ möglich. Patienten können nun langfristig auch Hautärzte aus ihrernäheren Umgebung, die sie idealerweise bereits persönlich kennen, für die individuelleFernbehandlung auswählen.</p>
            <p v-show="isTextShow || windowWidth >= 720">Nicht geändert hat sich unser hoher Anspruch an die Beratungsqualität: Nur Hautärzte ausDeutschland mit bestandener Facharztprüfung und vielen Jahren klinischer Erfahrung dürfenIhre Anfragen beantworten. Der Dienst wird zudem intern sowie extern an derUniversitäts-Hautklinik Essen wissenschaftlich evaluiert und stetig verbessert.</p>
            <p v-show="isTextShow || windowWidth >= 720">Auch wollen wir weiterhin Barrieren senken, auch für Geringverdiener: Mit 19,- Euro sind wirder günstigste Anbieter, der fachärztliche Beratungsqualität anbietet. Darüber hinaus sindwir der einzige zugelassene Online-Hautarzt-Dienst aus Deutschland. Der niedrige Preis istmöglich, weil wir die Kosten für den Betrieb dieser Plattform gering halten und denHautärzten den allergrößten Teil dieses Betrages direkt auszahlen können.</p>
            <p v-show="isTextShow || windowWidth >= 720">Zuletzt arbeiten wir nicht – wie die meisten Anbieter – mit internationalenVersandapotheken zusammen, sondern unterstützen die Apotheken vor Ort, die dengrößten Teil der Therapeutika in der Dermatologie zum kleinen Betrag frei verkäuflichanbieten, falls diese überhaupt notwendig sein sollten.</p>
            <p v-show="isTextShow || windowWidth >= 720" style="color:#0F44B2;">Das Modellprojekt Online Hautarzt bleibt somit nachhaltig gutfür alle: Für Patienten, für Hautärzte und für die lokalen Apotheken vor Ort.</p>
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