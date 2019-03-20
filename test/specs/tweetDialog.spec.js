import { shallowMount } from '@vue/test-utils'
import test from 'ava'
import TweetDialog from '../../components/TweetDialog.vue'

test('show tweet button', t => {
  const wrapper = shallowMount(TweetDialog)
  t.is(wrapper.isVueInstance(), true)
  // edit button
  t.true(wrapper.html().includes('edit'))
})

test('show tweet dialog', t => {
  const wrapper = shallowMount(TweetDialog)
  t.is(wrapper.isVueInstance(), true)
  // title
  t.true(wrapper.html().includes('Tweet'))
  // empty text
  t.true(wrapper.html().includes("What's happening?"))
  // button
  t.true(wrapper.html().includes('close'))
  t.true(wrapper.html().includes('check'))
})
