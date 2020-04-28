<template>
    <div id="nav">
        <router-link class="logo" tag="div" to="/">
          <img src="../assets/swift.png"/>
          <span>TRAVEL</span> 
        </router-link>
        <div class="criteria">
          <slot></slot>
        </div>
        <div class="logo">
          <img src="../assets/flywire.png"/>
        </div>
    </div>
</template>


<script>

export default {
  name: 'Nav'
}
</script>

<style lang="scss" scoped>
    #nav {
      background-image: linear-gradient(to bottom, #5A6585, #77788D);
      transition: text-shadow .35s;
      display: flex;
      justify-content: space-between;
      width: 100%;
      box-shadow: 5px 0 5px rgba(23,35,44,.25);
      min-height: 80px;

      .logo {
        display: flex;
        align-items: center;
        cursor: pointer;
      }

      .criteria {
        width: 100%;
        padding:1rem;
      }
    }

    #nav:hover {
      text-shadow: 0.2rem 0.2rem 0.6rem #fff;
    }
</style>
