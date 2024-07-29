<template>
  <div class="container">
    <div class="wrapper">
      <div class="header">
        <div class="title">Programme and tickets</div>
      </div>
      <div class="filter">
        <eventsFilter title="Location" :items="[...locations.values()]" v-model="selectedLocation" />
        <eventsFilter title="Category" :items="[...categories.values()]" v-model="selectedCategory" />
      </div>
      <div class="events-list">
        <template v-for="event in filteredEvents" :key="event.id">
          <eventItem :event="event"/>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGetEvents } from '~/composables/useGetEvents';

const { data: events, execute } = useGetEvents()
execute()

const selectedLocation = ref('')
const selectedCategory = ref('')

const locations = computed(() => new Set(events.value?.map(item => item.location)))
const categories = computed(() => new Set(events.value?.map(item => item.category)))
const filteredEvents = computed(() => events.value?.filter(item => 
  item.category.includes(selectedCategory.value) && 
  item.location.includes(selectedLocation.value)))

</script>
<style>
.container {
  width: 84%;
  margin: 0 auto;
  @media screen and (max-width: 600px) {
    min-width: 100%;
  }
}

.wrapper {
  @media screen and (max-width: 600px) {
    margin: 0 8px;
  }
}

.events-list {
  margin: 0 8px;
  @media screen and (max-width: 600px) {
    margin: 24px 0 0 0;
  }
}

.header {
  padding: 8rem 0 2rem 0;
}

.title {
  font-weight: bold;
  font-size: 3.33rem;

  @media screen and (max-width: 600px) {
    font-size: 2.5rem;
  }
}

.filter {
  display: flex;
  padding-bottom: 32px;
}
</style>