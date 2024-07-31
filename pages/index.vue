<template>
  <div class="container">
    <NuxtPage />
  </div>
</template>
<script setup lang="ts">
const router = useRouter()

onMounted(() => {
  router.push('/eventlist')
})
</script>
<style>
.container {
  width: 84%;
  margin: 0 auto;
  
  @media screen and (max-width: 600px) {
    min-width: 100%;
  }
}
</style>
