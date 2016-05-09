Redux Rungen
============

Generator middleware for Redux (Based on [rungen](https://github.com/youknowriad/rungen))

Another redux-saga ?
--------------------

I like [redux-saga](https://github.com/yelouafi/redux-saga) a lot, It's quite powerfull and if you already use it and feel
quite happy about it, than just continue. This is just a pale copy of it :).

But if like me,
 * You find that the generator approach is a breeze,
 * You like how easy testing those generators is.

And in the same time you find the `redux-saga` approach a little bit harder to reason about in comparison to `thunks`, than I made this library for you (for me at first :P)

So, how does this work ?
------------------------

The principle here is simple. Instead of writing your action creators using thunks, you just replace them (one to one) by generators.

**Example :**

Take the following thunk action creator

```javascript
function requestPost(id) {
  return dispatch => {
    dispatch({ type: 'post-fetch', payload: id })
    fetch('/api/post/' + id)
      .then(post => {
        dispatch({ type: 'post-fetch-success', payload: post })
      })
      .catch(error => {
        dispatch({ type: 'post-fetch-error', payload: error })
      })
  }
}
```

The equivalent using `redux-rungen` is

```javascript
import {put} from 'redux-rungen'
import {call} from 'rungen'

function* requestPost(id) {
  yield put({ type: 'post-fetch', payload: id })
  try {
    const post = yield call(fetch, '/api/post/' + id)
    yield put({ type: 'post-fetch-success', payload: post })
  } catch (error) {
    yield put({ type: 'post-fetch-error', payload: error })
  }
}
```

Why It's better ?
-----------------

 - Because testing effects based generators is refreshing : The generator itself never triggers the side effect (API call) it self. This means no mocking is required to test your action creators.
 - Because I can compose my action creators easily and have a really nice way to express complex flows using `fork`/`join` effects.

Seems too complex ?
-------------------

If you are not yet familiar with ES6 generators and runtimes like [co](https://github.com/tj/co) or [rungen](https://github.com/youknowriad/rungen), I understand.
So if you are not interested in the ease of testing and are happy with what you're doing
using `thunks`, you certainly don't want to use rungen :)
