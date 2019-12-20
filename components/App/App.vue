<template lang="html">
    <div class="app">
        <slot></slot>
    </div>
</template>

<style lang="scss">
/*********************
START: GENERAL
*********************/
body {
    font-family: 'Sans', sans-serif;
    font-size: 18px;
    line-height: 1.55;
    color: #7A7D84;
    font-weight: 400;
}

h1, h2, h3, h4, h5, h6 {
    font-family: 'Antiqua', serif;
    line-height: 1.33;
    color: #247EE5;
    font-weight: 700;
    margin: 0 0 16px;
}

h1 {
    font-size: 64px;
    line-height: 76px;
    margin: 0 0 32px;
}

h2 {
    font-size: 48px;
    line-height: 64px;
}

h3 {
    font-weight: 600;
    font-size: 24px;
    line-height: 30px;
}

p {
    margin: 0;
}

a {
    text-decoration: none;
}


/*********************
END: GENERAL
*********************/
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