<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "app"
  }
</script>


<style lang="scss">
  body, html {
    height: 100%;
    margin: 0;
  }

  #app {
    font-family: 'Roboto', sans-serif;
    height: 100%;
    display: flex;

    > div {
      flex-grow: 1;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .1s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .logo {
    font-family: 'Syncopate', sans-serif;
    font-size: 2rem;
    color: #fff;

    span{
      text-shadow: 0.2rem 0.2rem 0.6rem #fff;
    }
    img {
      padding: 10px;
      height: 40px;;
    }
  }

  input, select {
    align-self: flex-start;
    margin: 0 10px 0 0;
    padding: 0.6rem;
    border-radius: 0.1rem;
    font-size: 1.1rem;
    border: none;
    transition: box-shadow .35s;
    height: 3rem;
    box-sizing: border-box;
    font-family: 'Open Sans Condensed', sans-serif;
  }

  input:focus, select:focus {
    outline: none;
    box-shadow: 0.1rem 0.1rem 0.2rem #5A6585;
  }

  a.btn{
    display:inline-block;
    padding:0.7em 1.4em;
    margin:0 0.3em 0.3em 0;
    border-radius:0.15em;
    box-sizing: border-box;
    text-decoration:none;
    font-family:'Roboto',sans-serif;
    text-transform:uppercase;
    font-weight:400;
    color:#FFFFFF;
    background-color:#5A6585;
    box-shadow:inset 0 -0.6em 0 -0.35em rgba(0,0,0,0.17);
    text-align:center;
    position:relative;
    cursor: pointer;

    &.primary {
      background-color:#FA4B01;
      padding: 20px;
    }

    &.disabled {
      pointer-events: none;
      cursor: default;
      text-decoration: none;
      opacity: 0.75;
    }
  }

  a.btn:active{
    top:0.1em;
  }

</style>