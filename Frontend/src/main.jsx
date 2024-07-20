import ReactDOM from 'react-dom/client'
import App from './App'
import store from './store'
import {Provider} from 'react-redux'
import {MantineProvider} from '@mantine/core'

ReactDOM.createRoot(document.getElementById('root')).render(
  <MantineProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </MantineProvider>
    
)