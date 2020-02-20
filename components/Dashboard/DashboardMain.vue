<template>
    <div class="dashboard-main">
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
.dashboard-main {
  flex: 1;
  padding: $main_offset;

  @include desktop-l {
    padding: 40px 32px;
  }
}
</style>