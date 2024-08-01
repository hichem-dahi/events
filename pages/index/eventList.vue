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
  padding: 128px 0 32px 0;

  @media screen and (max-width: 600px) {
    padding: 88px 0 24px 0;
  }
}

.title {
  font-weight: bold;
  font-size: 60px;

  @media screen and (max-width: 600px) {
    font-size: 48px;
  }
}

.filter {
  display: flex;
  padding-bottom: 32px;
}
</style>