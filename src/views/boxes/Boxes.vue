<template>
  <div class="articles">
      <Search :maxLength="6" :placeholder="'Wpisz kod boxa...'" v-on:search="filterByCode" />
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
          <template v-for="box in boxes" >
            <tr v-if="checkCode(box)" :key="box.BoxCode">
                <td class="name">{{ box.BoxCode }}</td>
                <td>{{ box.Width }}</td>
                <td>{{ box.Height }}</td>
                <td>{{ box.Depth }}</td>
                <td><button class="add" @click="addToStored(box)">+</button></td>
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
            boxes: [],
            storedBoxes: [],
            search: ''
        }
    },
    methods: {
        ...mapActions([
            'getBoxes'
        ]),
        filterByCode(code) {
            this.search = code
        },
        checkCode(box) {
            if(this.search.length < 3) return false
            if(box.BoxCode.toString().startsWith(this.search)) return true
            return false
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
        }
    },
    async mounted() {
        let error = null
        try {
            await this.getBoxes()
        } catch(err) {
            console.log(err)
            error = err
        } finally {
            if(!error) {
                this.boxes = store.getters.boxes
            }
        }
        
        if(localStorage.getItem('storedBoxes').length > 0)
        {
            this.storedBoxes = JSON.parse(localStorage.getItem("storedBoxes"));
        }
            
    }
}
</script>

<style>

</style>