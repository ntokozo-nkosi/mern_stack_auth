import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import useAuth from './customHooks/useAuth'

function App() {
  const {isAuth, currentUser, isLoading} = useAuth()
  
  if (isLoading) {
    return <h1>Fetching Data...</h1>
  }

  return (
    <>
     <Routes>
        {isAuth && <Route path='/' exact element={<Home user={currentUser}/>}/>}
        <Route path='/login' exact element={<Login/>}/>
        <Route path='/signup' exact element={<SignUp/>}/>
        <Route path='/:any' exact element={<h1>404 Page Not Found</h1>}/>
        {!isAuth && <Route path='/' element={<Navigate replace to="/login" /> }/>}
     </Routes>
    </>
  )
}

export default App
