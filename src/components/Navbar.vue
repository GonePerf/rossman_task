<template>
  <div class="nav">
      <div class="logo">
          <img src="../assets/logo.png" alt="">
      </div>
      <h3>&copy; Konrad Gumienny</h3>
      <div class="links">
          <router-link :to="{ name: 'Articles' }" class="link">Articles</router-link>
          <router-link :to="{ name: 'Boxes' }" class="link">Boxes</router-link>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>