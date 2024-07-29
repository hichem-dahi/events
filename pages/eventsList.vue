<template>
  <h1>Programme and tickets</h1>
  <EventsFilter />
  <template v-for="event in events" :key="event.id">
    <eventItem :event="event" />
  </template>
</template>

<script lang="ts">
import { EventsFilter } from '#build/components';
import { useGetEvents } from '~/composables/useGetEvents';

const { data: events } = useGetEvents()
</script>