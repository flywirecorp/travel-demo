<template>
  <div class="rating">
    <font-awesome-icon icon="star" v-for="index in r" :key="index"></font-awesome-icon>
  </div>
</template>

<script>
export default {
  name: 'Rating',
  data: function() {
    return {
      r: this.rating,
    };
  },
  props: {
    rating: Number
  }
}
</script>

<style lang="scss">

  .rating {
    display: flex;
    justify-content: flex-start;
    font-size: 0.8rem;
    color: #FA4B01;
  }
</style>