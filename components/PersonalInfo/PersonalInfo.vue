<template lang="html">
    <div>
        <div class="personal-info">
            <div class="personal-info__items">
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
                        <PersonalInfoFormPhone />
                    </div>
                    <div class="personal-info__item">
                        <PersonalInfoFormSpecialization />
                    </div>
                    <div class="personal-info__item">
                      <PersonalInfoEmail />
                    </div>
                    <div class="personal-info__item">
                      <PersonalInfoPassword />
                    </div>
                </div>
                <div class="personal-info__column personal-info__column_big">
                    <div class="personal-info__item">
                      <PersonalInfoMedicalDegree />
                    </div>
                    <div class="personal-info__item personal-info__item_big">
                      <PersonalInfoCertification />
                    </div>
                    <div class="personal-info__item">
                      <PersonalInfoAddress />
                    </div>
                    <div class="personal-info__item">
                      <PersonalInfoRegion />
                    </div>
                    <div class="personal-info__item">
                      <PersonalInfoLanguages />
                    </div>
                    <div class="personal-info__item">
                      <PersonalInfoBio />
                    </div>
                    <div class="personal-info__item">
                      <PersonalInfoBioShort />
                    </div>
                </div>
                <div class="personal-info__column personal-info__column-image">
                    <PersonalInfoImage />
                </div>
            </div>
            <div class="personal-info__items">
                <div class="personal-info__column">
                    <div class="personal-info__item">
                        <template>
                            <button class="link link--button link--button-full-width link--button-gradient personal-info__item-link">REQUEST APPROVAL</button>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <div class="personal-text">
            <p>Please fill in all information in order to request Administrator’s approval and appear in search on Online Hautarzt.</p>
            <p>Once approved, you will be able to add your bank details and begin servicing your patients through Online Hautarzt platform.</p>
        </div>
        <div class="personal-link">
            <div class="personal-info__items">
                <div class="personal-info__column personal-link__column">
                    <button class="link link--button link--button-full-width link--button-gradient personal-info__item-link">PAUSE/UNPAUSE MY ACCOUNT</button>
                </div>
                <div class="personal-info__column personal-link__column">
                    <button class="link link--button link--button-full-width link--button-gradient personal-info__item-link">DELETE MY ACCOUNT</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import PersonalInfoFormTitle from "~/components/PersonalInfo/PersonalInfoFormTitle";
import PersonalInfoFormFirstName from "~/components/PersonalInfo/PersonalInfoFormFirstName";
import PersonalInfoFormLastName from "~/components/PersonalInfo/PersonalInfoFormLastName";
import PersonalInfoFormPhone from "~/components/PersonalInfo/PersonalInfoFormPhone";
import PersonalInfoFormSpecialization from "~/components/PersonalInfo/PersonalInfoFormSpecialization";
import PersonalInfoMedicalDegree from "~/components/PersonalInfo/PersonalInfoMedicalDegree";
import PersonalInfoCertification from "~/components/PersonalInfo/PersonalInfoCertification";
import PersonalInfoAddress from "~/components/PersonalInfo/PersonalInfoAddress";
import PersonalInfoRegion from "~/components/PersonalInfo/PersonalInfoRegion";
import PersonalInfoLanguages from "~/components/PersonalInfo/PersonalInfoLanguages";
import PersonalInfoBio from "~/components/PersonalInfo/PersonalInfoBio";
import PersonalInfoBioShort from "~/components/PersonalInfo/PersonalInfoBioShort";
import PersonalInfoEmail from "~/components/PersonalInfo/PersonalInfoEmail";
import PersonalInfoPassword from "~/components/PersonalInfo/PersonalInfoPassword";
import PersonalInfoImage from "~/components/PersonalInfo/PersonalInfoImage";

export default {
  components: {
    PersonalInfoFormTitle,
    PersonalInfoFormFirstName,
    PersonalInfoFormLastName,
    PersonalInfoFormPhone,
    PersonalInfoFormSpecialization,
    PersonalInfoMedicalDegree,
    PersonalInfoCertification,
    PersonalInfoAddress,
    PersonalInfoRegion,
    PersonalInfoLanguages,
    PersonalInfoBio,
    PersonalInfoBioShort,
    PersonalInfoEmail,
    PersonalInfoPassword,
    PersonalInfoImage
  }
};
</script>

<style lang="scss">
.personal-info {
  margin-bottom: 40px;

  &__items {
    display: flex;
    flex-wrap: wrap;
    margin: 30px 0 20px 0;
  }

  &__column {
    flex: 0 0 100%;
    order: 2;

    @include tablet {
      flex: 0 0 50%;
      padding-right: 33px;
    }

    @include desktop {
      flex: 0 0 28.5%;
    }

    &-image {
      padding-right: 0;
      flex: 0 0 100%;
      order: 1;

      @include desktop {
        flex: 0 0 28.5%;
        padding-left: 15px;
        order: 3;
      }
    }

    &_big {
      @include desktop {
        flex: 0 0 36.5%;
      }
    }
  }

  &__item {
    margin-bottom: 15px;
    width: 100%;

    @include desktop {
      max-width: 256px;
    }

    &_big {
      @include desktop {
        max-width: 335px;
      }

      .link {
        @include desktop {
          max-width: 256px;
        }
      }
    }

    &-link {
      padding-left: 20px;
      padding-right: 20px;
    }
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;

    &-title {
      font-size: 14px;

      @include phone-big {
        font-size: 16px;
      }

      @include tablet-big {
        font-size: 18px;
      }
    }
  }

  &__main {
    position: relative;

    &-select {
      position: relative;

      &:after {
        content: "";
        $size: 20px;
        position: absolute;
        top: 0;
        right: 16px;
        bottom: 0;
        display: block;
        width: $size;
        height: $size;
        margin: auto;
        pointer-events: none;
        background-image: url("~static/images/icons/arrow-down.svg");
      }
    }
  }

  &__nav-buttom {
    padding: 0;
    font-size: 15px;
    line-height: 22px;
    color: $color-curious-blue;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid rgba(36, 126, 229, 0.2);
  }

  &__avatar {
    position: relative;
    border-radius: 50%;
    overflow: hidden;
    max-width: 256px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;

    @include phone-big {
      margin-left: 0;
      margin-right: 0;
    }

    &-image {
      width: 100%;
    }

    &-add {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 10px;
      background-color: rgba(0, 0, 0, 0.24);
    }
  }

  &__upload {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;

    &-image {
      position: relative;
      width: 50%;
      padding-right: 10px;
    }

    &-src {
      max-width: 130px;
      max-height: 90px;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 4px;
    }

    &-buttom {
      $size: 24px;
      position: absolute;
      top: 0;
      right: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: $size;
      height: $size;
      background-color: $color-close;
      border-radius: 50%;
      border: none;
    }
  }

  &__footer {
    color: $color-cinnabar;
  }
}

.personal-text {
  max-width: 555px;

  p {
    margin-bottom: 30px;
  }
}

.personal-link {
  &__column {
    margin-bottom: 20px;
  }
}

.check-icon,
.eye-icon {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  right: 15px;
  cursor: pointer;
}

.textarea {
  padding-top: 15px;
}

</style>
