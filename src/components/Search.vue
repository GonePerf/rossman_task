<template>
    <div class="search">
        <input type="number" @input="validate" v-model="searchCode" :placeholder="placeholder">
    </div>
</template>

<script>
export default {
    props: [ "maxLength", "placeholder" ],
    data() {
        return {
            searchCode: ''
        }
    },
    methods: {
        validate() {
            if(this.searchCode.length > this.maxLength)
                this.searchCode = this.searchCode.slice(0, this.maxLength)
            this.$emit('search', this.searchCode)
        }
    }
}
</script>

<style>

</style>