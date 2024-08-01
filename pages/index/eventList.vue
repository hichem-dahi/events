<template>
  <div class="wrapper">
    <div class="header">
      <div class="title">Programme and tickets</div>
    </div>
    <div class="filter">
      <eventsFilter title="Location" :items="[...locations.values()]" v-model="selected.location" />
      <eventsFilter title="Category" :items="[...categories.values()]" v-model="selected.category" />
    </div>
    <div class="events-list">
      <template v-for="event in filteredEvents" :key="event.id">
        <eventItem :event="event"/>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGetEvents } from '~/composables/useGetEvents';
import { useEventsFiltersStore } from '~/store/useEventsFiltersStore';
import { useEventsStore } from '~/store/useEventsStore';

const eventsStore = useEventsStore()
const { selected } = useEventsFiltersStore()

const { data: events, isSuccess, isError, errorMessage, execute } = useGetEvents()
execute()

// Using Sets to computes unique locations and categories from the event data.
const locations = computed(() => new Set(eventsStore.events.map(item => item.location)))
const categories = computed(() => new Set(eventsStore.events.map(item => item.category)))

const filteredEvents = computed(() => eventsStore.events.filter(item => 
  item.category.includes(selected.category) && 
  item.location.includes(selected.location)))

// Watches the `isSuccess` and 'isError' reactive property to determine if the API call was successful.
watch(isSuccess, (isSuccess) => {
  if(isSuccess && events.value) 
    eventsStore.events = events.value
})

watch(isError, (isError) => {
  if(isError)
   throw new Error(errorMessage.value)
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

.wrapper {
  @media screen and (max-width: 600px) {
    margin: 0 0.44rem; 
  }
}

.events-list {
  margin: 0 0.44rem; 

  @media screen and (max-width: 600px) {
    margin: 1.33rem 0 0 0; 
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
  padding-bottom: 1.78rem; 
}

</style>