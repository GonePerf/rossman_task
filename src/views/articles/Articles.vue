<template>
  <div class="articles">
      <Search :maxLength="13" :placeholder="'Wpisz kod artykułu...'" v-on:search="filterByCode" />
      <button @click="searchA">Szukaj</button>
      <table>
          <tr>
              <td class="name"><b>Nazwa</b> </td>
              <td><b>Kod Artykułu</b></td>
              <td><b>Cena</b></td>
              <td><b>Stok</b></td>
          </tr>
          <template>
            <tr v-if="article">
                <td class="name">{{ article.name }}</td>
                <td>{{ article.code }}</td>
                <td>{{ article.price }} zł</td>
                <td>{{ article.stock }}</td>
            </tr>
            <tr v-if="error">
                <td colspan="4">{{ error }}</td>
            </tr>
          </template>
          
      </table>
  </div>
</template>

<script>
import store from '@/store/index'
import { mapActions } from 'vuex'
import Search from '@/components/Search'

export default {
    components: {
        Search
    },
    data() {
        return {
            article: null,
            search: '',
            error: null
        }
    },
    methods: {
        ...mapActions([
            'getArticle'
        ]),
        async searchA() {
            this.error = null
            this.article = null
            try {
                await this.getArticle(this.search)
            } catch(err) {
                this.error = 'Brak artykułu o podanym kodzie'
            } finally {
                if(!this.error) {
                    this.article = store.getters.article
                }
                else {
                    this.error = 'Brak artykułu o podanym kodzie'
                    this.article = null
                }
            }
        },
        filterByCode(code) {
            this.search = code
            
        },
    },
}
</script>

<style>

</style>