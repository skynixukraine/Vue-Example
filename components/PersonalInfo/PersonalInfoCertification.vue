<template>
  <form action>
    <div class="personal-info__header">Facharztzeugnis hochladen</div>
    <div class="personal-info__upload">
      <div class="personal-info__upload-image">
        <img
          class="personal-info__upload-src"
          :src="require('~/static/images/images/img-add.jpg')"
          alt="single-form"
        />
        <button class="personal-info__upload-buttom">
          <img :src="require('~/static/images/icons/close-icon.svg')" alt="personal info close" />
        </button>
      </div>
      <div class="personal-info__upload-image">
        <img
          class="personal-info__upload-src"
          :src="require('~/static/images/images/img-add.jpg')"
          alt="personal-info"
        />
        <button class="personal-info__upload-buttom">
          <img :src="require('~/static/images/icons/close-icon.svg')" alt="personal info close" />
        </button>
      </div>
    </div>
    <input
      class="input input--hidden"
      type="file"
      name="degree"
      ref="degree"
      @change="onDegreeUpload"
    />
    <button
      class="link link--button link--button-full-width link--button-upload"
      type="button"
      @click="addFileDegree"
    >
      <img
        class="paper-fastener-button-image"
        :src="require('~/static/images/icons/paper-fastener-button-icon.svg')"
        alt="paper-fastener-button"
      />
      <p>Choose file</p>
    </button>
  </form>
</template>