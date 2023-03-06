import { createBrowserHistory as createHistory } from 'history'
import getBasepath from './utils/basepath'

export default createHistory({ basename: getBasepath() })
