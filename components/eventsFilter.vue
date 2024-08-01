<template>
  <div ref="eventsFilter" class="events-filter" 
    @mouseover="openMenu = true" 
    @mouseleave="openMenu = false"
    > 
    <div class="select">
      <div>{{ title }}</div> 
      <nuxt-icon name="chevron-down" filled></nuxt-icon>
    </div>
    <div v-if="openMenu" ref="menu" class="menu">
      <div class="item" 
        :class="{'active': active && isSelectedItem(item)}" 
        v-for="(item, i) in items" 
        :key="i" 
        @click="selectItem(item)">{{ item }}
      </div>
    </div> 
  </div>
</template>
<script setup lang="ts">
defineProps<{title: string, items: string[]}>()
const selected = defineModel<string>()

const menu = ref<HTMLElement>()
const eventsFilter = ref<HTMLElement>()
const openMenu = ref(false)

const active = computed(() => !!selected.value)

function selectItem(item: string) {
  if(isSelectedItem(item)) 
    selected.value = '';
  else 
    selected.value = item;
}

const isSelectedItem = (item: string ) => selected.value === item

const setMenuPosition = async () => {
  await nextTick()
  if (!menu.value || !eventsFilter.value) return

  const filterEl = document.querySelector('.filter')
  if (!filterEl) return
  const filterRect = filterEl.getBoundingClientRect()
  const eventsFilterRect = eventsFilter.value.getBoundingClientRect()
  
  // Set the menu width to match the viewport width, accounting for the position of the filter element to avoid overlap
  menu.value.style.width = `calc(100vw - ${filterRect.left * 2}px)`;
  await nextTick();

  const menuWidth = menu.value.scrollWidth
  const screenWidth = window.outerWidth
  const leftEdge = eventsFilterRect.left - filterRect.left
  
  // Adjust menu's margin based on overflow
  if (leftEdge + menuWidth > screenWidth) {
    menu.value.style.marginLeft = `-${leftEdge}px`
  } else {
    menu.value.style.marginLeft = '0';
  }
};

onMounted(() => {
  window.addEventListener('resize', async () => await setMenuPosition())
})

onUnmounted(()=> {
  window.removeEventListener('resize', async () => await setMenuPosition())
})

watch(openMenu, async (newVal) => {
  if (newVal) {
    await setMenuPosition();
  }
})
</script>
<style>
.events-filter {
  display: flex;
  flex-direction: row;
  position: relative;
  margin-right: 1.78rem;

  @media screen and (max-width: 600px) {
    font-size: 0.67rem; 
  }
}

.events-filter:hover {
  color: #9747FF;
  border-color: #9747FF;
}

.select {
  display: flex;
  align-items: center;
  padding: 0.44rem 0.89rem;
  border-bottom: 0.03rem solid; 
  background-color: #ffffff;
  cursor: pointer;
}

.icon {
  padding-left: 0.56rem; 
}

.menu {
  position: absolute;
  background-color: #ffffff;
  top: 100%;
  left: 0%;
  z-index: 3;
  box-shadow: 0px 0.44rem 0.89rem 0px rgba(0, 0, 0, 0.2); 
  padding: 0.44rem 1.78rem; 
  color: #000000;
  max-width: 480px; 
  box-sizing: border-box; 

  @media screen and (max-width: 600px) {
    font-size: 0.78rem; 
    padding: 0.44rem 0.89rem; 
    max-width: 360px;
  }
}

.item {
  padding: 0.67rem 0;

  @media screen and (max-width: 600px) {
    padding: 0.44rem 0; 
  }
}

.active {
  color: #9747FF;
  border-color: #9747FF;
}

.nuxt-icon svg {
  margin-bottom: 0;
  font-size: 1.5rem;
}
</style>