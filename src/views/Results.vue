<template>
  <div id="results">
    <Nav>
      <Search v-bind:criteria="search.criteria" 
                v-on:on-search="onSearch">
      </Search>
    </Nav>

    <div class="container">
      <div v-if="search.isSeaching">
          Snow
        <font-awesome-icon icon="snowflake"></font-awesome-icon>
      </div>
      <ul v-else-if="search.results.length > 0" class="items">
        <li v-bind:key="result.id" v-for="result in search.results">
          <Result
            :result="result"
            :config="config"
            v-on:on-add-to-cart="onAddToCart"></Result>
        </li>
      </ul>
      <div v-else class="no-items">
        <h2>Nothing to see here...</h2>
        <h4>Try another search</h4>
        <font-awesome-icon icon="snowflake" size="6x" spin></font-awesome-icon>
      </div>
      <div class="cart">
        <Cart 
          :cart="cart"
          :config="config"
          v-on:on-remove-from-cart="onRemoveFromCart">
        </Cart>
        <div class="formActions">
          <a class="btn primary" v-bind:class="{ disabled: cart.length === 0 }" v-on:click="onProceedToPay">Checkout</a>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import Cart from '@/components/Cart.vue'
import Nav from '@/components/Nav.vue'
import Result from '@/components/Result.vue'
import Search from '@/components/Search.vue'
import _ from 'lodash'

export default {
  name: 'results',
  components: {
    Cart,
    Nav,
    Result,
    Search
  },
  data: function() {
    return {
      cart: this.$store.state.cart,
      config: this.$store.state.config,
      search: this.$store.state.search,
    };
  },
  methods: {
    onSearch: function(criteria) {
      this.$store.dispatch('search', criteria);
    },

    onAddToCart: function(result) {
      const item = {
        item: _.cloneDeep(result),
        quantity: parseInt(this.search.criteria.num, 10),
        duration: parseInt(this.search.criteria.dur, 10)
      };

      this.$store.dispatch('addToCart', item);
    },

    onRemoveFromCart: function(item) {
      this.$store.dispatch('removeFromCart', item);
    },

    onProceedToPay: function() {
      this.$router.push('billing-info');
    }
  }
}
</script>

<style lang="scss" scoped>
  #results {
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: #F9F9FA;

    .btn {
    }

    .container {
      display: flex;
      flex-direction: row;

      .items, .no-items {
        width: 750px;
        list-style: none;
        margin:0;
        padding: 0;
      }

      .no-items {
        text-align: center;
      }

      .cart {
        display: flex;
        flex-direction: column;
      }

      .formActions {
        margin: 1rem;
        display: flex;
        * {
          flex-grow: 1;
        }
      }
    }
  }
</style>
