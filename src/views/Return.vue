<template>
  <div id="return" v-bind:class="{ success: result.status == 'success' || result.status == 'pending' }">
    <div class="result">
      <h1>{{ result.status }}</h1>
      <span>Your payment reference is <b>{{ result.reference }}</b></span>
      <div class="formActions">
        <a class="btn primary" v-on:click="onDone" v-if="result.status == 'success' || result.status == 'pending'">Home</a>
        <a class="btn primary" v-on:click="onReturnToCheckout" v-if="result.status != 'success' && result.status != 'pending'">Try Again</a>
      </div>
    </div>
  </div>
</template>

<script>

function getQueryStringValue (key) {
    var val = decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[.+*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
    if (!val) {
        /* eslint-disable */
        console.warn("Key '" + key + "' is not present in the URL query string.");
        /* eslint-enable */
    }
    return val;
}

export default {
  name: 'return',
  computed: {
    result: function() {
      return {
        status: getQueryStringValue('status'),
        reference: getQueryStringValue('reference')
      }
    }
  },
  methods: {
    onDone: function() {
      this.$store.dispatch('clearCart', {})
        .then(()=> {
          this.$router.push('/');
        })
    },
    onReturnToCheckout: function() {
      this.$router.push('billing-info');
    }
  }
}
</script>


<style lang="scss">
  #return {
      background-image: url("../assets/fail.jpg");
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      display: flex;
      flex-direction: column;
      padding-top: 10rem;
      align-items: center;

    &.success {
      background-image: url("../assets/success.jpg");
    }

    .result {
      padding-top: 50px;
      display: flex;
      flex-direction: column;
      align-content: center;
      background: #fff;
      border-radius: 100%;
      width: 20rem;
      height: 20rem;
      text-align: center;

      .formActions {
        margin: 40px;
      }
    }

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
