<template>
  <div class="item__item-elements">
    <div class="item__img-wrapper">
      <img :src="itemData.Poster" :alt="'poster: '+itemData.Title" class="item__img">
    </div>
    <div class="item__data-wrapper">
      <span class="item__name"><label>Name:</label>{{itemData.Title}}</span>
      <span class="item__year"><label>Year:</label>{{itemData.Year}}</span>
      <span class="item__type"><label>Type:</label>{{itemData.Type}}</span>
      <!--<span class="item__imdbid"><label>ID:</label>{{itemData.imdbID}}</span>-->
    </div>
  </div>
</template>

<script>
  export default {
    name: "ucItem",
    props: ['itemData']
  }
</script>

<style lang="scss" scoped>
  //@import '../styles/vars';
  @import '../styles/funcs';

  .item__ {
    &img-wrapper {
      background: #fff;
      position: relative;
      height: 200px;
      max-width: 180px;
    }
    &data-wrapper {
      padding-left: 20px;
      padding-top: 10px;
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    &item-elements {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
    }
    &name,
    &year,
    &imdbid,
    &type {
      display: block;
      line-height: 1.8rem;
    }
    &name {
      margin-bottom: auto;
    }
    &img {
      @include WeqH(calc(100% - 30px));
      //width: calc(100% - 20px);
      //height: calc(100% - 30px);
      position: absolute;
      top: 15px;
      left: 15px;
      object-fit: cover;
      //object
      //width: 100%;
      //height: auto;
    }
  }
  label {
    width: 65px;
    display: inline-block;
    font-weight: 600;
    color: #8b0000;
  }
  @media screen and (max-width: 400px) {
    .item__ {
      &img-wrapper {
        margin: 0 auto;
      }
      &item-elements {
        display: block;
        height: 100%;
      }
    }
  }
</style>
