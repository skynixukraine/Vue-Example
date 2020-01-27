<template lang="html">
    <div class="personal-info">
        <div class="personal-info__column">
            <div class="personal-info__item">
                <PersonalInfoFormTitle />
            </div>
            <div class="personal-info__item">
                <PersonalInfoFormFirstName />
            </div>
            <div class="personal-info__item">
                <PersonalInfoFormLastName />
            </div>
            <div class="personal-info__item">
                <PersonalInfoFormSpecialization />
            </div>
        </div>
        <div class="personal-info__column"></div>
        <div class="personal-info__column"></div>
    </div>
</template>

<script>
import PersonalInfoFormTitle from "~/components/PersonalInfo/PersonalInfoFormTitle"
import PersonalInfoFormFirstName from "~/components/PersonalInfo/PersonalInfoFormFirstName"
import PersonalInfoFormLastName from "~/components/PersonalInfo/PersonalInfoFormLastName"
import PersonalInfoFormSpecialization from "~/components/PersonalInfo/PersonalInfoFormSpecialization"

export default {
    components: {
        PersonalInfoFormTitle,
        PersonalInfoFormFirstName,
        PersonalInfoFormLastName,
        PersonalInfoFormSpecialization,
    }
}
</script>

<style lang="scss">
.single-form-header {
    display: flex;
    justify-content: space-between;
}

.single-form-footer {
    color: $color-cinnabar;
}
</style>