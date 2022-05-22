import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import customFetch from '../../utils/axios'
import {
  getUserFromLocalStorage,
  addUserToLocalStorage,
  removeUserFromLocalStorage,
} from '../../utils/localStorage'

const initialState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
  barOpen: false,
}

// Hold Register user

export const getRegisterUser = createAsyncThunk(
  'user/getRegisterUser',
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post('/auth/register', user)
      return resp.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

//  Hold Logged in Users

export const getLoggedInUsers = createAsyncThunk(
  'user/getLoggedInUsers',
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post('/auth/login', user)
      return resp.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

// hold profile Update

export const getProfileUpdate = createAsyncThunk(
  'user/getProfileUpdate',
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.patch('/auth/updateUser', user, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      })
      return resp.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg)
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOutUser: (state) => {
      removeUserFromLocalStorage()
      state.user = null
    },
    toggleBar: (state) => {
      state.barOpen = !state.barOpen
    },
  },
  extraReducers: {
    [getRegisterUser.pending]: (state) => {
      state.isLoading = true
    },

    [getRegisterUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      const { user } = payload
      state.user = user
      toast.success(`Hello there , ${user.name}`)
      addUserToLocalStorage(user)
    },
    [getRegisterUser.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(`Server msg : ${payload}`)
    },
    [getLoggedInUsers.pending]: (state) => {
      state.isLoading = true
    },
    [getLoggedInUsers.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      const { user } = payload
      state.user = user
      toast.success(`Welcome back , ${user.name}`)
      addUserToLocalStorage(user)
    },
    [getLoggedInUsers.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload)
    },
    [getProfileUpdate.pending]: (state) => {
      state.isLoading = true
    },
    [getProfileUpdate.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      const { user } = payload
      state.user = user
      addUserToLocalStorage(user)
      toast.success(`Profile update ${user.name}`)
    },
    [getProfileUpdate.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.warn(payload)
    },
  },
})

export const { logOutUser, toggleBar } = userSlice.actions
export default userSlice.reducer
