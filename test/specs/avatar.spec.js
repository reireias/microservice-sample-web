import { shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import test from 'ava'
import Avatar from '../../components/Avatar.vue'

test('show login button', t => {
  const store = new Vuex.Store({
    state: {}
  })
  const wrapper = shallowMount(Avatar, {
    store
  })
  t.is(wrapper.isVueInstance(), true)
  t.true(wrapper.html().includes('Login'))
})

test('show avatar button', t => {
  const name = 'alice'
  const url = '/dummy'
  const store = new Vuex.Store({
    state: {
      user: {
        _id: 'id',
        name: name,
        avatarUrl: url
      },
      auth: true
    }
  })
  const wrapper = shallowMount(Avatar, {
    store
  })
  t.is(wrapper.isVueInstance(), true)
  t.false(wrapper.html().includes('Login'))
  t.true(wrapper.html().includes(url))
})
