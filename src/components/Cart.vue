  <template>
  <div id="cart">
    <h2>
      Your Trip
    </h2>
    <ul v-if="cart.length > 0">
      <li v-bind:key="booking.id" v-for="booking in bookings">
        <a v-on:click="onRemoveItem(booking)">
          <font-awesome-icon icon="times-circle"></font-awesome-icon>
        </a>
        <span class="title">{{ booking.item.title }} {{ cfg.ccy.symbol }}{{ booking.duration * booking.item.price * booking.quantity }}</span>
        <span class="price">{{ booking.duration }} {{ booking.item.units }}(s) @ {{ cfg.ccy.symbol }}{{ booking.item.price }} for {{ booking.quantity }} people</span>
        <span class="dates">{{ booking.item.availableFrom }} - {{ booking.item.availableTo }}</span>
      </li>
      <li>
        <span class="total">Total {{ cfg.ccy.symbol }}{{total}}</span>
      </li>
    </ul>
    <div v-else>
      Add some items to your cart
    </div>
  </div>
</template>

<script>

export default {
  name: 'Cart',
  props: {
    cart: Array,
    config: Object
  },
  data: function() {
    return {
      bookings: this.cart,
      cfg: this.config
    }
  },
  computed: {
    total() {
      return this.$store.getters.cartTotal
    }
  },
  methods: {
    onRemoveItem: function(item) {
      this.$emit('on-remove-from-cart', item);
    },
    onProceedToPay: function() {
      this.$emit('on-proceed-to-pay', {});
    }
  }
}
</script>

<style lang="scss">
  #cart {
    display: flex;
    padding: 1rem;
    flex-direction: column;

    background: #f1f1f1;
    border-radius: 2px;
    margin: 1rem;
    width: 250px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

    h2 {
      margin: 0 0 1rem 0;
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      width: 100%;


      li {
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        border-top: solid 1px rgba(0,0,0,0.24);
        padding: 1rem 0;

        a {
          align-self: flex-start;
          cursor: pointer;
          opacity: 0.25;
          transition: opacity .35s;

          &:hover {
            opacity: 1;
          }
        }


        .title {
          display: block;
          font-weight: 500;
          font-size: 1.2rem;
        }

        .dates {
          font-size: 0.8rem;
          color: rgba(0,0,0,0.75);
          font-style: italic;
        }
      }
    }

    .total {
      display: block;
      padding: 1rem 0;font-weight: 600;
        font-size: 1.2rem;
    }
  }
</style>

