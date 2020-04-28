<template>
  <div id="checkout">
    <Nav>
    </Nav>
    <div class="container">
      <div class="billingInfo">
        <div class="title">
          <h2>Confirm &amp; Pay
            <small>Please confirm your details and then click Pay to make your payment via Flywire</small>
          </h2>
          <a class="btn" v-on:click="onEditDetails">Edit Details</a>
        </div>
        <div class="infoGroup">
          <div class="infoDetail">
            <label>Name</label>
            <span>{{ billingInfo.firstName }} {{ billingInfo.lastName }}</span>
          </div>
        </div>

        <div class="infoGroup">
          <div class="infoDetail">
            <label>Contact</label>
            <span>{{ billingInfo.email }}</span>
            <span> {{ billingInfo.phone }}</span>
          </div>
        </div>

        <div class="infoGroup">
          <div class="infoDetail">
            <label>Address</label>
            <span>{{ billingInfo.address }}</span>
            <span> {{ billingInfo.city }}</span>
            <span> {{ billingInfo.country }}</span>
          </div>
        </div>

        <div class="actions">
          <a class="btn primary" v-on:click="onPay">Pay</a>
        </div>
      </div>
      <div class="cart">
        <Cart
          :cart="cart"
          :config="config"
          v-on:on-remove-from-cart="onRemoveFromCart">
        </Cart>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'
import Cart from '@/components/Cart.vue'

export default {
  name: 'checkout',
  components: {
    Nav,
    Cart
  },
  data: function() {
    return {
      cart: this.$store.state.cart,
      config: this.$store.state.config,
      billingInfo: this.$store.state.billingInfo,

      recipientCode: this.$store.state.config.portalCode,
      returnUrl: location.origin + "/#/return",

      errors: []
    };
  },
  computed:
  {
    amount: function() {
      return this.$store.getters.cartTotal;
    }
  },
  beforeCreate: function(){
    if (this.$store.getters.cartTotal === 0) {
      this.$router.push('/results');
    }
  },
  methods: {
    onRemoveFromCart: function(item) {
      const thatStore = this.$store;

      this.$store.dispatch('removeFromCart', item)
        .then(()=> {
          if (thatStore.getters.cartTotal === 0) {
            this.$router.push('/results');
          }
        })
    },

    onEditDetails: function() {
      this.$router.push('/billing-info');
    },

    onPay: function() {

      this.$store.dispatch('checkout')
        .then(() => {
          const config = {
            env: 'demo',
            amount: this.$store.getters.cartTotal,
            recipientCode: this.$store.state.config.portalCode,
            returnUrl: location.origin + location.pathname + "#/return",
            recipientFields: {
              test_field: 'Travel Demo Payment'
            }
          };

          Object.assign(config, this.billingInfo);

          const that = this;
          config.onInvalidInput = function(errs) {
            
            that.$store.dispatch('saveCheckoutErrors', errs)
              .then(() => {
                that.$router.push('/billing-info');
              })
          };

          window.FlywirePayment.initiate(config).render()
        });
    }
  }
}
</script>

<style lang="scss" scoped>
  #checkout {
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: #F9F9FA;

    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      h2 {
        display: inline-block;
        small {
          display:block;
          padding-top:5px;
          font-size:0.85rem;
          font-weight: normal;
          font-style: italic;
        }
      }
    }

    .container {
      display: flex;
      flex-direction: row;

      .billingInfo {
        display: flex;
        flex-direction: column;
        min-width: 750px;
        padding: 1rem;
        border-radius: 2px;
        margin: 1rem;
        width: 250px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

        .infoGroup {
          display: flex;
          margin-bottom: 15px;
        }

        .infoDetail {
          label {
            display: block;
            font-size: 0.8rem;
            color: rgba(0,0,0,0.65);
          }
          span {
            display: block;
          }
        }

        .actions {
          margin-top: 20px; 
          display: flex;
          * {
            flex-grow: 1;
          }
        }
      }
    }
  }
</style>
