<template>
  <div id="billingInfo">
    <Nav>
    </Nav>
    <div class="container">
      <div class="capture">
        <h2>Billing Info
          <small>Please enter the following details to complete your booking with Flywire Travel!</small>
        </h2>
        <div class="formGroup">
          <div class="formInput">
            <label for="firstName">First Name</label>
            <input name="firstName" v-model="billingInfo.firstName"/>
          </div>
          <div class="formInput">
            <label for="lastName">Last Name</label>
            <input name="lastName" v-model="billingInfo.lastName"/>
          </div>
        </div>
        <div class="formInput">
          <label for="email">Email</label>
          <input name="email" v-model="billingInfo.email"/>
        </div>
        <div class="formInput">
          <label for="phone">Phone</label>
          <input name="phone" v-model="billingInfo.phone"/>
        </div>
        <div class="formInput">
          <label for="address">Address</label>
          <input name="address" v-model="billingInfo.address"/>
        </div>
        <div class="formInput">
          <label for="city">Town/City</label>
          <input name="city" v-model="billingInfo.city"/>
        </div>
        <div class="formInput">
          <label for="country">Country</label>
          <select name="country" v-model="billingInfo.country">
            <option value="FR">France</option>
            <option value="RO">Romania</option>
            <option value="ES">Spain</option>
            <option value="GB">United Kingdom</option>
            <option value="US">United States</option>
          </select>
        </div>
        <div class="formAction">
          <a class="btn" v-on:click="onContinue">Continue</a>
        </div>
        <div class="formErrors">
          <ul>
            <li v-bind:key="error.id" v-for="error in billingInfo.errors">
              {{ error.msg }}
            </li>
          </ul>
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
  name: 'billing-info',
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

    onContinue: function() {
      const payload = this.billingInfo;

      this.$store.dispatch('saveBillingInfo', payload)
        .then(() => {
          this.$router.push('checkout');
        });
    }
  }
}
</script>

<style lang="scss" scoped>
  #billingInfo {
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: #F9F9FA;

    h2 {
      small {
        display:block;
        padding-top:5px;
        font-size:0.85rem;
        font-weight: normal;
        font-style: italic;
      }
    }

    .container {
      display: flex;
      flex-direction: row;

      .capture {
        display: flex;
        flex-direction: column;
        min-width: 750px;
        padding: 1rem;
        border-radius: 2px;
        margin: 1rem;
        width: 250px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

        .formGroup {
          display: flex;
        }

        .formInput {
          flex-grow: 1;
          margin-right: 10px;
          label {
            display: block;
            font-size: 0.8rem;
            color: rgba(0,0,0,0.65);
          }

          * {
            width: 100%;
          }
        }

        .formAction {
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
