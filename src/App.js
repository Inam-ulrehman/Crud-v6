import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Error, Landing, Register, ProtectedRoute } from './pages'
import {
  AddJob,
  EditJob,
  Profile,
  SharedLayout,
  Stats,
} from './pages/dashboard'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Stats />} />
          <Route path='edit-job' element={<EditJob />} />
          <Route path='add-job' element={<AddJob />} />
          <Route path='profile' element={<Profile />} />
        </Route>
        <Route path='/' element={<Landing />} />
        <Route path='*' element={<Error />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
