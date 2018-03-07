# import react
import React from 'react'
import ReactDOM from 'react-dom'

# component registration
import Reliantbutton from '../reliant-button.coffee'

# initialization react
ReactDOM.render(
  <Reliantbutton to="#">Example button</Reliantbutton>,
  document.querySelector('.content')
)