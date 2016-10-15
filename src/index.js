import is from './utils/is'
import createControls from './controls'
import { create, asyncControls, wrapControls } from 'rungen'
export * from './utils/helpers'

const middleware = store => {
  const runtime = create([
    ...asyncControls,
    ...wrapControls,
    ...createControls(store.dispatch, store.getState)
  ])

  const runtimeReturningPromise = input =>
    new Promise((resolve, reject) =>
      runtime(input, resolve, reject)
    )

  return next => action =>
    is.iterator(action) ?
      runtimeReturningPromise(action) :
      next(action)
}

export default middleware
