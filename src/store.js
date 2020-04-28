import Vue from 'vue'
import Vuex from 'vuex'
import dataService from './services/DataService'
import _ from 'lodash'
import moment from 'moment';

Vue.use(Vuex)

//
// code: 'EUR',
// symbol: '€'
//
const store = new Vuex.Store({
  state: {
    config: {
      ccy: {
        code: 'USD',
        symbol: '$'
      },
      portalCode: 'DTT'
    },
    search: {
      isSearching: true,
      criteria: {
        s: '',
        dep: moment().add(1, 'M').format("YYYY-MM-DD"),
        dur: 10,
        num: 2
      },
      results: []
    },
    cart: [],
    billingInfo: {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      country: "",
      email: "",
      phone: "",
      errors: []
    },
  },
  getters: {
    cartTotal: (state) => {
        return _.chain(state.cart)
            .map(b => (b.item.price * b.quantity * b.duration))
            .sum()
            .value();
    },
    cartHasNoItems: (state) => {
      return state.cart.length === 0;
    }
  },
  mutations: {
    load(state, savedState) {
      this.replaceState(Object.assign(state, savedState));
    },

    startSearch(state, payload) {
      state.search.isSearching = true;
      state.search.criteria.s = payload.s;
      state.search.criteria.dep = payload.dep;
      state.search.criteria.dur = payload.dur;
      state.search.criteria.num = payload.num;

      state.search.results.splice(0);
    },

    stopSearch(state, payload) {
      _.forEach(payload.results, result => {
        state.search.results.push(result);
      });

      state.search.isSearching = false;
    },

    addToCart(state, payload) {
      const booking = _.find(state.cart, existingBooking => {
        return existingBooking.id == payload.id;
      });

      if (booking) {
        booking.duration += parseInt(payload.duration, 10);
      } else {
        state.cart.push(payload);
      }
    },

    removeFromCart(state, payload) {
      const idx = _.findIndex(state.cart, existingBooking => {
        return existingBooking.id == payload.id;
      });

      if (idx >= 0) {
        state.cart.splice(idx, 1);
      }
    },

    saveBillingInfo: (state, payload) => {
      state.billingInfo.errors = [];
      state.billingInfo.firstName = payload.firstName;
      state.billingInfo.lastName = payload.lastName;
      state.billingInfo.address = payload.address;
      state.billingInfo.city = payload.city;
      state.billingInfo.country = payload.country;
      state.billingInfo.email = payload.email;
      state.billingInfo.phone = payload.phone;
    },

    checkout: (state) => {
      state.billingInfo.errors = [];
    },

    saveCheckoutErrors: (state, payload) => {
      state.billingInfo.errors = payload;
    },

    clearCart(state) {
      state.cart.splice(0);
    }
  },
  actions: {
    load: ({commit}) => {
      if (sessionStorage.getItem('store')) {
        commit('load', JSON.parse(sessionStorage.getItem('store')));
      }
    },

    search: ({commit}, payload) => {
      new Promise((resolve) => {
        commit('startSearch', payload);

        setTimeout(function() {
          const results = dataService.search(payload);

          commit('stopSearch', { results: results })

          resolve();
        }, 500);
      })
    },

    addToCart: ({commit}, payload) => {
      new Promise((resolve) => {
        payload.id = payload.item.id + payload.item.availableFrom + payload.item.availableTo;

        commit('addToCart', payload);

        resolve();
      })
    },

    removeFromCart: ({commit}, payload) => {
      new Promise((resolve) => {
        commit('removeFromCart', payload);

        resolve();
      })
    },

    saveBillingInfo: ({commit}, payload) => {
      new Promise((resolve) => {
        commit('saveBillingInfo', payload);

        resolve();
      })
    },

    checkout: ({commit}) => {
      new Promise((resolve) => {
        commit('checkout');

        resolve();
      })
    },

    saveCheckoutErrors: ({commit}, payload) => {
      new Promise((resolve) => {
        commit('saveCheckoutErrors', payload);

        resolve();
      })
    },

    clearCart: ({commit}) => {
      new Promise((resolve) => {
        commit('clearCart');

        resolve();
      })
    }
  }
});

store.subscribe((mutation, state) => {
  sessionStorage.setItem('store', JSON.stringify(state));
});

export default store;