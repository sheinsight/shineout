// copy from https://github.com/jamiebuilds/create-react-context
// Solve the version conflict between create-react-context and react17
import React from 'react'
import createReactContext from './implementation'

export default React.createContext || createReactContext
