import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import authReducer from './reducers/authReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notifications: notificationReducer,
    users: userReducer,
    authUser: authReducer
  }
})

store.subscribe(() => {console.log(store.getState())})

export default store