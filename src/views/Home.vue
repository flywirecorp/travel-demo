<template>
  <div id="home">
    <div class="logo">
      <img src="../assets/swift.png"/>
      <span>TRAVEL</span>
      <img src="../assets/flywire.png"/>
    </div>
    <div class="search">
      <Search v-bind:criteria="criteria" 
              v-on:on-search="onSearch">
      </Search>
    </div>
  </div>
</template>

<script>

import Search from '@/components/Search.vue'

export default {
  name: 'home',
  components: {
    Search
  },
  data: function() {
    return {
      criteria: this.$store.state.search.criteria
    };
  },
  methods: {
    onSearch: function(criteria) {

      this.$store.dispatch('search', criteria)
        .then(()=> {
          this.$router.push('results');
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  #home {
      background-image: url("../assets/mountains.jpg");
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      display: flex;
      flex-direction: column;
      padding-top: 10rem;

    .logo {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #fff;
    }

    .search {
      padding-top: 50px;
      display: flex;
      justify-content: center;
    }
  }
</style>
