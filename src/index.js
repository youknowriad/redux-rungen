import is from './utils/is'
import { createControls } from './controls'
import { create, asyncControls, wrapControls } from 'rungen'
export * from './utils/helpers'

const middleware = store => {
  const runtime = create(
    ...asyncControls,
    ...wrapControls,
    ...createControls(store.dispatch, store.getState)
  )
  return next => action =>
    is.iterator(action) ?
      runtime(action) :
      next(action)
}

export default middleware
