<template>
  <form action>
    <div class="personal-info__header">Approbationsurkunde hochladen</div>
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