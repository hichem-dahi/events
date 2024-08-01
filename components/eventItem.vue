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
<style scoped>
.event-item {
  display: flex;
  flex-direction: row;
  padding: 0 0 32px 0;
  transition: all 0.5s ease;
  margin-bottom: 32px;

  @media screen and (max-width: 600px) {
    display: block;
    padding: 0 32px 24px 0;
  }
}

.event-item:hover {
  background-color: #DEDEDE;
  padding: 16px 16px 32px 16px;
  transition: all 0.5s ease;

  @media screen and (max-width: 600px) {
    padding-bottom: 0 0 24px 0;
  }
}

.info {
  margin-right: 32px;
  flex-grow: 1;

  @media screen and (max-width: 600px) {
    margin-bottom: 24px;
    margin-right: 0;

  }
}

.info-box {
  margin: 8px 0;
}

.category {
  display: inline-block;
  padding: 4px 8px;
  color: #FFFFFF;
  background-color: #000000;
  line-height: 100%;
  font-size: 14px;
}

.event-name {
  font-weight: 700;
  font-size: 48px;

  @media screen and (max-width: 600px) {
    font-size: 32px;
  }
}

.description {
  font-size: 36px;  

  @media screen and (max-width: 600px) {
    font-size: 24px;
  }
}

.date {
  font-weight: 300;
  max-width: 250px;
  width: 100%;
  margin-right: 32px;
  white-space: nowrap;
  flex-shrink: 1;

  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: row;
    margin-bottom: 24px;
  }
}

.day {
  @media screen and (max-width: 600px) {
    margin-right: 8px;
  }
}

.ticket-box {
  display: flex;
  flex-direction: row;
  justify-content: end;
  max-width: 250px;
  width: 100%;
  flex-shrink: 1;

  @media screen and (max-width: 600px) {
    display: block;
  }
}

button {
  display: flex;
  background-color: #000000;
  color: #FFFFFF;
  border-width: 0;
  margin-bottom: 8px;
  padding-inline: 0;
  padding: 16px 24px;
  font: inherit;
  white-space: nowrap;
  align-items: center;

  @media screen and (max-width: 600px) {
    padding: 8px 16px;
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

.nuxt-icon {
  font-size: 24px;
}
</style>