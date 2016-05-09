import 'babel-polyfill'
import expect from 'expect'
import { create } from 'rungen'
import createControls from '../../src/controls'
import {put, select} from '../../src/utils/helpers'

describe('Redux Controls', () => {
  it('should select all the redux state', () => {
    let output
    const fakeState = {
      10: { id: 10, title: 'title' }
    }
    const dispatch = () => {}
    const getState = () => fakeState
    const generator = function* () {
      output = yield select()
    }
    const runtime = create(createControls(dispatch, getState))

    runtime(generator())
    expect(output).toEqual(fakeState)
  })

  it('should select using a selector', () => {
    let output
    const fakeState = {
      10: { id: 10, title: 'title' }
    }
    const selector = (state, id) => state[id]
    const dispatch = () => {}
    const getState = () => fakeState
    const generator = function* () {
      output = yield select(selector, 10)
    }
    const runtime = create(createControls(dispatch, getState))

    runtime(generator())
    expect(output).toEqual({ id: 10, title: 'title' })
  })

  it('should dispatch the action', () => {
    let output
    const action = { type: 'my action' }
    const dispatch = action => ({ dispatched: true, action })
    const getState = () => {}
    const generator = function* () {
      output = yield put(action)
    }
    const runtime = create(createControls(dispatch, getState))

    runtime(generator())
    expect(output).toEqual({ dispatched: true, action })
  })
})
