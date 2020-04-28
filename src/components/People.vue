<template>
  <div class="people">
    <font-awesome-icon icon="male" v-for="index in p" :key="index"></font-awesome-icon>
  </div>
</template>

<script>
export default {
  name: 'People',
  data: function() {
    return {
      p: this.people,
    };
  },
  props: {
    people: Number
  }
}
</script>

<style lang="scss">

  .people {
    display: flex;
    justify-content: flex-start;
    font-size: 1.2rem;
    * {
      padding: 1px;
    }
  }
</style>