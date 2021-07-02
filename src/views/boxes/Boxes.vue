<template>
  <div class="articles">
      <Search :maxLength="6" :placeholder="'Wpisz kod boxa...'" v-on:search="setCode" />
      <button @click="searchBox">Szukaj</button>
      <table v-if="storedBoxes.length > 0">
          <tr>
              <td class="name"><b>Kod Boxa</b> </td>
              <td><b>Szerokość</b></td>
              <td><b>Wysokość</b></td>
              <td><b>Głębokość</b></td>
              <td>Usuń</td>
          </tr>
          <template v-for="box in storedBoxes" >
            <tr :key="box.BoxCode">
                <td class="name">{{ box.BoxCode }}</td>
                <td>{{ box.Width }}</td>
                <td>{{ box.Height }}</td>
                <td>{{ box.Depth }}</td>
                <td><button class="remove" @click="removeFromStored(box)">-</button></td>
            </tr>
          </template>
          
      </table>
      <table>
          <tr>
              <td class="name"><b>Kod Boxa</b> </td>
              <td><b>Szerokość</b></td>
              <td><b>Wysokość</b></td>
              <td><b>Głębokość</b></td>
              <td>Dodaj</td>
          </tr>
          <template v-if="box" >
            <tr>
                <td class="name">{{ box.BoxCode }}</td>
                <td>{{ box.Width }}</td>
                <td>{{ box.Height }}</td>
                <td>{{ box.Depth }}</td>
                <td><button class="add" @click="addToStored(box)">+</button></td>
            </tr>
          </template>
          <tr v-if="error">
                <td colspan="4">{{ error }}</td>
          </tr>
          
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
            box: null,
            error: null,
            storedBoxes: [],
            search: ''
        }
    },
    methods: {
        ...mapActions([
            'getBox'
        ]),
        setCode(code) {
            this.search = code
        },
        addToStored(box) {
            
            if(this.storedBoxes.indexOf(box) === -1) {
                this.storedBoxes.push(box)
                localStorage.setItem('storedBoxes', JSON.stringify(this.storedBoxes))
            }
            else {
                alert('Ten box jest już na liście')
            }
            
        },
        removeFromStored(box) {
            let index = this.storedBoxes.indexOf(box)
            this.storedBoxes.splice(index, 1)
            localStorage.setItem('storedBoxes', JSON.stringify(this.storedBoxes))
        },
        async searchBox() {
            this.error = null
            this.box = null
            try {
                await this.getBox(this.search)
            } catch(err) {
                this.error = 'Brak boxa o podanym kodzie'
            } finally {
                if(!this.error) {
                    this.box = store.getters.box
                }
                else {
                    this.error = 'Brak boxa o podanym kodzie'
                    this.box = null
                }
            }
        }
    },
    async mounted() {
        
        if(JSON.parse(localStorage.getItem("storedBoxes")))
        {
            this.storedBoxes = JSON.parse(localStorage.getItem("storedBoxes"));
        }
            
    }
}
</script>

<style>

</style>