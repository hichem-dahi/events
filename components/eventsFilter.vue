<template>
  <div class="events-filter" 
    @mouseover="openMenu = true" 
    @mouseleave="openMenu = false"
    @click="openMenu != openMenu"> 
    <div class="select">
      <div>{{ title }}</div> 
      <nuxt-icon name="chevron-down" filled></nuxt-icon>
    </div>
      <div v-if="openMenu" class="menu-wrapper">
        <div class="menu">
          <div 
            class="item" 
            :class="{'active': active && isSelectedItem(item)}" 
            v-for="(item, i) in items" 
            :key="i" 
            @click="selectItem(item)">{{ item }}
          </div>
        </div>
      </div> 
  </div>
</template>
<script setup lang="ts">
defineProps<{title: string, items: string[]}>()
const selected = defineModel<string>()

const openMenu = ref(false)
const active = computed(() => !!selected.value)

function selectItem(item: string) {
  if(isSelectedItem(item)) 
    selected.value = '';
  else 
    selected.value = item;
}

const isSelectedItem = (item: string ) => selected.value === item
</script>
<style>
.events-filter {
  display: flex;
  flex-direction: row;
  position: relative;
  margin-right: 32px;

  @media screen and (max-width: 600px) {
    font-size: 12px;
  }
}

.events-filter:hover {
  color: #9747FF;
  border-color: #9747FF;
}

.select {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border-bottom: 0.5px solid;
  background-color: #ffffff;
  cursor: pointer;
}

.icon {
  padding-left: 1rem;
}

.menu-wrapper {
  position: absolute;
  background-color: #ffffff;
  top: 100%;
  left: 0%;
  z-index: 3;
  min-width: 448px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);

  @media screen and (max-width: 600px) {
    width: 360px;
  }
}

.menu {
  padding: 8px 32px;
  color: #000000;
  
  @media screen and (max-width: 600px) {
    font-size: 14px;  
    padding: 8px 16px;
  }
}

.item {
  padding: 12px 0;

  @media screen and (max-width: 600px) {
    padding: 8px 0;
  }
}

.active {
  color: #9747FF;
  border-color: #9747FF;
}

.nuxt-icon svg{
  margin-bottom: 0;
  font-size: 1.5rem;
}
</style>