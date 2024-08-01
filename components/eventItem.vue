<template>
  <div class="event-item" 
    @mouseover="active = true" 
    @mouseleave="active = false"
    >
    <div class="date">
      <div class="day" v-html="formattedDateAndTimeHtml[0]"></div>
      <div class="hour" v-html="formattedDateAndTimeHtml[1]"></div>
    </div>
    <div class="info">
      <span class="category"> {{ event.category }}</span>
      <div class="info-box">
        <div class="event-name">{{ event.title }}</div>
        <div class="description">{{ event.description }}</div>
      </div>
      <div class="location">{{ event.location }}</div>
    </div>
    <div class="ticket-box">
      <div>  
        <button :class="{'active-button': active}">
          <div>Buy tickets</div> 
          <nuxt-icon name="shop" filled></nuxt-icon>
        </button>
        <div class="price">{{ event.price }}€</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Event } from '~/models/event';

const props = defineProps<{event: Event}>()
const active = ref(false)

/**
 * Generates HTML strings to display the event's date and time with inline styles.
 * @returns {Array<string>} - Array of HTML strings:
 *   - **Index 0**: HTML string for the formatted date.
 *   - **Index 1**: HTML string for the formatted time.
 */
  const formattedDateAndTimeHtml = computed(() => {
  const dateParts = formatDateAndTime(props.event.date, props.event.time)
  const formattedDateHtml = `<span style="font-weight: 800;">${dateParts.weekday}</span>, ${dateParts.day}. ${dateParts.month} ${dateParts.year}`
  const formattedTimeHtml = `<span style="font-weight: 800;">${dateParts.hour} ${dateParts.dayPeriod.toLowerCase()}</span>`

  return [formattedDateHtml, formattedTimeHtml]
})
</script>
<style>
.event-item {
  display: flex;
  flex-direction: row;
  padding: 0 1.78rem 1.78rem 0;  
  margin-bottom: 1.78rem;  
  overflow-x: visible;
  transition: all 0.5s ease;

  @media screen and (max-width: 600px) {
    display: block;
    padding: 0 1.78rem 1.33rem 0;  
  }
}

.event-item:hover {
  background-color: #DEDEDE;
  padding: 0.89rem 0.89rem 1.78rem 0.89rem;  
  transition: all 0.5s ease;

  @media screen and (max-width: 600px) {
    padding-bottom: 0 0 1.33rem 0; 
  }
}

.info {
  flex-grow: 1;
  margin-right: 1.78rem; 

  @media screen and (max-width: 600px) {
    margin-bottom: 1.33rem; 
    margin-right: 0;
  }
}

.info-box {
  margin: 0.44rem 0; 
}

.category {
  display: inline-block;
  padding: 0.22rem 0.44rem; 
  color: #FFFFFF;
  background-color: #000000;
  line-height: 100%;
  font-size: 0.78rem;  
}

.event-name {
  font-weight: 700;
  font-size: 2.67rem; 

  @media screen and (max-width: 600px) {
    font-size: 1.78rem; 
  }
}

.description {
  font-size: 2rem; 

  @media screen and (max-width: 600px) {
    font-size: 1.33rem;  
  }
}

.date {
  font-weight: 300;
  max-width: 250px; 
  width: 100%;
  margin-right: 1.78rem;  
  white-space: nowrap;

  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: row;
    max-width: 100%;
    margin-bottom: 1.33rem;  
  }
}

.day {
  @media screen and (max-width: 600px) {
    margin-right: 0.44rem; 
  }
}

.ticket-box {
  display: flex;
  flex-direction: row;
  justify-content: end;
  max-width: 250px; 
  width: 100%;

  @media screen and (max-width: 600px) {
    display: block;
    max-width: 100%; 

  }
}

button {
  display: flex;
  align-items: end;
  background-color: #000000;
  color: #FFFFFF;
  border-width: 0;
  margin-bottom: 0.44rem;  
  padding-inline: 0;
  padding: 0.89rem 1.33rem;  
  font: inherit;
  white-space: nowrap;

  @media screen and (max-width: 600px) {
    align-items: center;
    padding: 0.44rem 0.89rem; 
  }
}

.active-button {
  background-color: #9747FF;
}

.price {
  display: flex;
  justify-content: end;

  @media screen and (max-width: 600px) {
    display: block;
  }
}

.nuxt-icon svg {
  margin-bottom: 0;
  font-size: 1.5rem;
}
</style>