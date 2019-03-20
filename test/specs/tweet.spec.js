import { shallowMount } from '@vue/test-utils'
import test from 'ava'
import Tweet from '../../components/Tweet.vue'

test('show tweet component', t => {
  const name = 'alice'
  const url = '/dummy'
  const content = 'hello world'
  const wrapper = shallowMount(Tweet, {
    propsData: {
      tweet: {
        name: name,
        avatarUrl: url,
        content: content
      }
    }
  })
  t.is(wrapper.isVueInstance(), true)
  t.true(wrapper.html().includes(name))
  t.is(wrapper.find('img').attributes().src, url)
  t.true(wrapper.html().includes(content))
})
