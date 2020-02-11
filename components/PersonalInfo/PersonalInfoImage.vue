<template>
  <form action>
    <div class="personal-info__item personal-info__avatar">
      <img
        class="personal-info__avatar-image"
        src="https://i.ya-webdesign.com/images/anonymous-png-avatar-17.png"
        alt="personal-avatar"
      />
      <button class="link personal-info__avatar-add">
        <img :src="require('~/static/images/icons/add-avatar.svg')" />
      </button>
    </div>
  </form>
</template>