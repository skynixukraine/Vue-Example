<template lang="html">
    <div class="app">
        <slot></slot>
    </div>
</template>

<style lang="scss">
body {
  font-family: 'Sans';
}
/*********************
START: COMPONENTS
*********************/
// link
.link {
  display: inline;

  :hover {
    text-decoration: underline;
  }

  &--button {
    display: inline-block;
    text-align: center;
    padding: 10px 30px;

    &-white {
      background: #f5f5f5;
      color: blue;
    }

    &-blue {
      background: blue;
      color: #FFF;
    }
  }

  &--card {
    display: block;
    transition: all 200ms ease-in-out;

    &:hover {
      transform: translateY(-5px);
    }
  }
}

// block link
.block-link {
  display: block;
}
/*********************
END: COMPONENTS
*********************/

</style>