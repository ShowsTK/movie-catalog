<template>
  <div>
  <input type="text" class="search-field" @input.prevent="onInput($event.target.value)" autofocus placeholder="input title (min 3 symbols)">
  </div>
</template>

<script>
  import {HTTP} from '../config';

  export default {
    name: "ucSearchBox",
    props: ['opts'],
    data() {
      return {
        searchedData: '',
        //queryString: '',
        inputText: ''/*,
        countResult: ''*/
      }
    },
    methods: {
      onInput(text) {
        let timer = setTimeout(() => {
          //this.makeStringParams(text);
          if(this.inputText === text && text.length > 2) {
            let params = {};
            params.s = text;
            HTTP.request({params})
              .then(response => this.searchedData = response.data)
              .then(() => {
                this.$emit('userOnInput', this.searchedData, text);
              })
              .catch(error => console.log(error));
          }
        }, 150);
        this.inputText = text;
      },
      makeStringParams(...parData) {
        this.queryString = this.opts.baseURL + '?apikey=' + this.opts.api_key;
        if(this.opts.options) {
          for(let par in this.opts.options) {
            let part = par;
            //console.log(part);
            //if(par.required) {
              this.queryString += '&' + par + '=' + parData[0]
            //}
          }
        }
      }
    }
  }
</script>

<style scoped>
.search-field {
  width: 90%;
  height: 25px;
}
</style>

Batman
