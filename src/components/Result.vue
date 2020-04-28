<template>
  <div class="result">
    <div class="image">
      <img v-bind:src="item.imageUrl"/>
    </div>
    <div class="details">
      <div class="title">
        <span class="heading">
          {{ item.title }}
        </span>
        <span class="price">
          {{ cfg.ccy.symbol}}{{ item.price }} per {{ item.units}}
        </span>
      </div>
      <span class="location">{{ item.location }}</span>
      <Rating v-bind:rating="item.rating"></Rating>
      <span class="description">{{ item.description }}</span>
      <div class="availability">
        <span>{{ item.availableFrom }}</span> - <span>{{ item.availableTo }}</span>
      </div>
      <People v-bind:people="item.availableQuantity"></People>
      <div class="book">
        <a class="btn"  v-on:click="onAddToCart">Add to Cart</a>
      </div>
    </div>
  </div>
</template>

<script>

import Rating from '@/components/Rating.vue'
import People from '@/components/People.vue'

export default {
  name: 'Result',
  components: {
    Rating,
    People
  },
  props: {
    result: Object,
    config: Object
  },
  data: function() {
    return {
      item: this.result,
      cfg: this.config
    }
  },
  methods: {
    onAddToCart: function() {
      this.$emit('on-add-to-cart', this.item);
    }
  }
}
</script>

<style lang="scss">
  .result {
    display: flex;
    padding: 1rem;
    background: #fff;
    border-radius: 2px;
    margin: 1rem;
    width: 650px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all .35s cubic-bezier(.25,.8,.25,1);
    display: flex;
    flex-flow: row wrap;

    .image {
      overflow: hidden;
      max-width: 285px;

      img {
        height: 200px;
        min-width:285px;
      }
    }

    .details {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-self: stretch;
      padding-left: 1rem;
      flex-grow: 1;

      .title {
        display: flex;
        justify-content: space-between;

        .heading {
          font-size: 1.4rem;
          font-weight: 600;
        }
        .price {
          font-size: 1.2rem;
          font-weight: 400;
        }
      }

      h3 {
        padding: 0;
        margin: 0;
      }

      .location {
          color: rgba(0,0,0,0.75);
          font-style: italic;
          font-weight: 600;
      }

      .description {
        font-style: italic;
        margin: 1rem 0;
        padding: 0.5rem;
        border-left: solid 2px #ddd;
      }

      .availability {
        font-size: 0.9rem;
        label {
          color: rgba(0,0,0,0.75);
          font-style: italic;
        }
        span {
          font-weight: 600;
        }
      }

      .location, .description, .availability {
        display: block;
      }

      .book {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: flex-end;
        flex-grow: 1;
        button {
          padding: 10px;
        }
      }
    }

    &:hover {
      box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    }
  }
</style>

