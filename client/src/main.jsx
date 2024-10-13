import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'
// import SearchBooks from './components/SearchBooks'
// import SavedBooks from './components/SavedBooks'
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'
import Signup from './pages/SignupPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      {

        index: true,
        element: <Home />
      }, 
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/me',
        element: <Profile />
      },
      {
        path: '/profiles/:username',
        element: <Profile />
      },

    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
