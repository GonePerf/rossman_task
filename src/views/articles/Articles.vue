<template>
  <div class="articles">
      <Search :maxLength="13" :placeholder="'Wpisz kod artykułu...'" v-on:search="filterByCode" />
      <table>
          <tr>
              <td class="name"><b>Nazwa</b> </td>
              <td><b>Kod Artykułu</b></td>
              <td><b>Cena</b></td>
              <td><b>Stok</b></td>
          </tr>
          <template v-for="article in articles" >
            <tr v-if="checkCode(article)" :key="article.code">
                <td class="name">{{ article.name }}</td>
                <td>{{ article.code }}</td>
                <td>{{ article.price }} zł</td>
                <td>{{ article.stock }}</td>
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
            articles: [],
            search: ''
        }
    },
    methods: {
        ...mapActions([
            'getArticles'
        ]),
        filterByCode(code) {
            this.search = code
        },
        checkCode(article) {
            if(this.search.length < 3) return false
            if(article.code.toString().startsWith(this.search)) return true
            return false
        }
    },
    async mounted() {
        let error = null
        try {
            await this.getArticles()
        } catch(err) {
            console.log(err)
            error = err
        } finally {
            if(!error) {
                this.articles = store.getters.articles
            }
        }
        
    }
}
</script>

<style>

</style>