import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import './App.css'

import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const createDispatch = (type) => () => {
    store.dispatch({ type })
  }

  return (
    <div>
      <div>good {store.getState().good}</div>
      {/* <div>ok {store.getState().ok}</div> */}
      {/* <div>bad {store.getState().bad}</div> */}
      <button onClick={createDispatch('GOOD')}>good</button>
      {/* <button onClick={createDispatch('OK')}>ok</button> */}
      {/* <button onClick={createDispatch('BAD')}>bad</button> */}
      {/* <button onClick={createDispatch('ZERO')}>reset stats</button> */}
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
