<template>
  <div class="full-item-info">
    <div v-for="data in infoList">
      <span class="full-item-info__title">{{data}}:</span>
      <span class="full-item-info__data">{{infoData[data]}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ucItemFullInfo",
    props: ['infoData'],
    data() {
      return {
        infoList: [
          'Title',
          'Year',
          'Director',
          'Actors',
          'Country',
          'Genre',
          'Type',
          'Language',
          'Runtime',
          'Released',
          'Plot'
        ]
      }
    }
  }
</script>

<style scoped lang="scss">
.full-item-info {
  @import '../styles/vars';

  padding: 10px;
  background: darken($base-color-back, 5%);
  font-size: 0.8em;
  line-height: 1.5em;
  border: 2px solid #fff;
  &__title, &__data {
    display: inline-block;
  }
  &__title {
    width: $width-info_block / 6;
    text-align: end;
    vertical-align: top;
    color: #00fffb;
    padding-right: 10px;
  }
  &__data {
    width: 5 * $width-info_block / 6;
  }
}
</style>