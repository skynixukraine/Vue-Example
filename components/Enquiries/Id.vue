<template lang = "html">
  <div class = "enquiries-id">
    <div class = "enquiries-id__main">
      <div class = "diagnosis-id" v-if="this.$store.state.enquires.doctorEnquire.conclusion !== null">
        <div class = "diagnosis-id__title table__header-item">Diagnosis</div>
        <div class = "diagnosis-id__answer table__main-item" >{{getValue()}}</div>
      </div>
      
      <Table />
      
      <div class = "enquiries-id__links">
        <button v-if="getValue() === null"  class = "link link--button link--button-blue link--button-gradient" @click="openModal($modals.sendFindings)">{{ $t('page-enquiries.submit-diagnosis') }}</button>
        <button v-else  class = "link link--button link--button-blue link--button-gradient" >{{ $t('page-enquiries.finished') }}</button>
      </div>
      
    </div>
    <div class = "enquiries-id__footer">
      <NuxtLink :to = "$routes.enquiries.path" class = "link link--button-transparent">
        {{ $t('page-enquiries.go-back') }}
      </NuxtLink>
    </div>
  </div>
</template>

<script>
    import Table from "~/components/Enquiries/EnquiriesIdTable.vue"
    import modal from '~/mixins/modal'

    export default {
        mixins : [
            modal,
        ],

        components : {
            Table,
        },
        methods  : {
            getValue() {
                let conclusion = this.$store.state.enquires.doctorEnquire.conclusion;
                return conclusion;
            },

        }
    }
</script>


<style lang = "scss">
  .enquiries-id {
    
    .diagnosis-id {
      width: 90%;
      max-width: 900px;
      margin-bottom: 30px;
      @include tablet {
        margin-left: 15px;
      }
      &__title.table__header-item {
        padding: 0;
        margin-bottom: 15px;
      }
      &__answer.table__main-item {
        flex-basis: 100%;
        padding-left: 0;
      }
      
    }
    
    &__answer {
      flex-basis : 75%;
    }
    
    &__main {
      padding-top : 70px;
      
      .table__header-item {
        flex-basis: 50%;
      }
      
      &-items {
        min-height: 40px;
        
      }
    }
    
    .table__main {
      &-item {
        flex-basis: 50%;
        font-weight: 600;
        
        &.enquiries-id__answer {
          font-weight: 100;
        }
      }
    }
    
    .edit-answer-area__upload-image__user-image-container {
      width: 100%;
      margin-top: 5px;
      @include tablet {
        margin-top: 0;
      }
      img {
        width: 100%;
        cursor: pointer;
      }
    }
    
    &__atachments {
      margin-bottom : 50px;
      &-items {
        list-style : none;
      }
      
      &-item {
        margin-bottom : 10px;
      }
      
      &-link {
        color : $color-rolling-stone;
        cursor : pointer;
        border : none;
        background-color: transparent;
        &:after {
          content : ' (download)';
        }
      }
    }
    
    &__links {
      margin-bottom  : 30px;
      display        : flex;
      flex-direction : column;
      @include tablet {
        flex-direction : row;
      }
      
      .link {
        margin-bottom : $main_offset;
        @include tablet {
          margin-right : $main_offset;
        }
      }
    }
  }
</style>
