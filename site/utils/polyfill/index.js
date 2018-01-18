import Promise from 'promise'
import objectAssign from 'es6-object-assign'

if (!window.Promise) window.Promise = Promise

objectAssign.polyfill()
