import { mount } from '@vue/test-utils'
import test from 'ava'
import User from '../../components/User.vue'

test('show user component', t => {
  const name = 'alice'
  const url = '/dummy'
  const wrapper = mount(User, {
    propsData: {
      user: {
        _id: '0000',
        name: name,
        avatarUrl: url,
        follow: true
      }
    }
  })
  t.is(wrapper.isVueInstance(), true)
  t.true(wrapper.html().includes(name))
  t.is(wrapper.find('img').attributes().src, url)
  t.true(wrapper.html().includes('unfollow'))
})
