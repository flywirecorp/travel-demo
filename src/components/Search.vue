<template>
  <div id="search">
    <input v-on:keyup.13="onSearch" type="text" v-model="s" placeholder="Search...">
    <input v-on:keyup.13="onSearch" type="date" v-model="dep" placeholder="From...">
    <select v-on:keyup.13="onSearch" v-model="dur" placeholder="For...">
      <option value="1">1 day</option>
      <option value="2">2 days</option>
      <option value="5">5 days</option>
      <option value="7" selected>7 days</option>
      <option value="10">10 days</option>
      <option value="14">14 days</option>
      <option value="21">21 days</option>
    </select>
    <select v-on:keyup.13="onSearch" v-model="num" placeholder="For...">
      <option value="1">1 person</option>
      <option value="2" selected>2 people</option>
      <option value="3">3 people</option>
      <option value="4">4 people</option>
      <option value="5">5 people</option>
      <option value="6">6 people</option>
      <option value="7">7 people</option>
      <option value="8">8 people</option>
      <option value="9">9 people</option>
      <option value="10">10 people</option>
    </select>
    <div class="go">
      <a v-on:click="onSearch">
        Search
        <font-awesome-icon icon="search" flip="horizontal"></font-awesome-icon>
      </a> 
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'Search',
  data: function() {
    return {
      s: this.criteria.s,
      dep: this.criteria.dep,
      dur: this.criteria.dur,
      num: this.criteria.num
    };
  },
  props: {
    criteria: Object
  },
  methods: {
    onSearch: function() {
      const payload = {
        s: this.s,
        dep: this.dep,
        dur: this.dur,
        num: this.num
      };
      this.$emit('on-search', payload);
    },
  }
}
</script>

<style scoped lang="scss">

  #search {
    display: flex;
    justify-content: center;
  }

  input, select {
    border: none;
  }

  input:focus, select:focus {
    outline: none;
    box-shadow: 0.2rem 0.2rem 0.6rem #5A6585;
  }

  .go {
    display: flex;
    color: #fff;
    align-items: center;

    a {
      padding:0 0.5rem 0 1rem;
      font-size: 1.2rem;
      cursor:pointer;
      transition: text-shadow .35s;
    }

    a:hover {
      text-shadow: 0.2rem 0.2rem 0.6rem #fff;
    }
  }

</style>
