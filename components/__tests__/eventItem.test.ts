import type { mount } from '@vue/test-utils'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, it, expect, beforeEach } from 'vitest'

import EventItem from '@/components/eventItem.vue' 
import eventsJson from '@/public/events.json'


type MountSuspendedReturnType<T> = ReturnType<typeof mount<T>> & { setupState: Record<string, string> }

describe('eventItem.vue', () => {
  let wrapper: MountSuspendedReturnType<typeof EventItem>

  const event = eventsJson.events[0]
  
  beforeEach(async () => {
    wrapper = await mountSuspended(EventItem, {
      props: { event },
    })
  })

  it('renders event details correctly', () => {
    expect(wrapper.find('.category').text()).toBe(event.category)
    expect(wrapper.find('.event-name').text()).toBe(event.title)
    expect(wrapper.find('.description').text()).toBe(event.description)
    expect(wrapper.find('.location').text()).toBe(event.location)
    expect(wrapper.find('.price').text()).toBe(`${event.price}€`)
  })

  it('formats the date and time correctly', () => {
    const dateParts = wrapper.vm.formattedDateAndTimeHtml
    expect(wrapper.find('.day').html()).toContain(dateParts[0])
    expect(wrapper.find('.hour').html()).toContain(dateParts[1])
  })

  it('button class changes on mouseover and mouseleave', async () => {

    const button = wrapper.find('button')
    expect(button.classes()).not.toContain('active-button')

    await wrapper.trigger('mouseover')
    expect(button.classes()).toContain('active-button')

    await wrapper.trigger('mouseleave')
    expect(button.classes()).not.toContain('active-button')
  })

})

