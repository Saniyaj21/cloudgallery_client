// productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { base_url } from '../../main'

const initialState = {
  user: {},
  selectedUser: {},
  isAuthenticated: false,
  status: 'idle',
  error: null,
  isOtpSent: false,
  isEmailVerified: false,
  mail: {
    mailStatus: 'idle',
    otpStatus: 'idle',
    passwordStatus: 'idle',
  }
};

// Define an async thunk to fetch products from the API
export const loginUser = createAsyncThunk('user/loginUser', async (user) => {

  const response = await axios.post(`${base_url}/api/user/login`,
    {
      email: user.email,
      password: user.password
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

  return response.data;
});

// register user
export const registerUser = createAsyncThunk('user/registerUser', async (myForm) => {

  const response = await axios.post(`${base_url}/api/user/register`, myForm, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  return response.data;
});

// logout user
export const logoutUser = createAsyncThunk('user/logoutUser', async () => {

  const response = await axios.get(`${base_url}/api/user/logout`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

  return response.data;
});

// get user details - profile
export const getUser = createAsyncThunk('user/getUser', async () => {

  const response = await axios.get(`${base_url}/api/user/profile`, {
    withCredentials: true,
  });
  return response.data;

});



// get user details - profile
export const getUserProfile = createAsyncThunk('user/getUserProfile', async (id) => {

  const response = await axios.get(`${base_url}/api/user/profile/${id}`, {
    withCredentials: true,
  });


  return response.data;
});

// get user details - profile
export const getResetPasswordOTP = createAsyncThunk('user/getResetPasswordOTP', async (email) => {

  const response = await axios.post(`${base_url}/api/user/password/forgot`, { email }, {
    withCredentials: true,
  });

  // console.log(response);
  return response.data;
});


// verify the otp in backend 
export const verifyOTP = createAsyncThunk('user/verifyOTP', async (resetPasswordOTP) => {

  const response = await axios.post(`${base_url}/api/user/verify/otp`, { resetPasswordOTP }, {
    withCredentials: true,
  });

  // console.log(response);
  return response.data;
});


// verify the otp in backend 
export const setNewPassword = createAsyncThunk('user/setNewPassword', async ({ resetPasswordOTP, password }) => {

  const response = await axios.post(`${base_url}/api/user/password/reset`, { resetPasswordOTP, password }, {
    withCredentials: true,
  });

  // console.log(response);
  return response.data;
});



const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state, action) => {

      state.error = null,
        state.isOtpSent = false;
      state.isEmailVerified = false;
      state.mail.mailStatus = 'idle';
      state.mail.otpStatus = 'idle';
      state.mail.passwordStatus = 'idle';


    },
  },
  extraReducers: (builder) => {
    builder  // login user
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.isAuthenticated = true;

      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // register user
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {

        state.status = 'failed';
        state.error = action.error.message;

      })

      // logout user
      .addCase(logoutUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = null;
        state.isAuthenticated = false;

      })
      .addCase(logoutUser.rejected, (state, action) => {

        state.status = 'failed';
        state.error = action.error.message;

      })
      //  get user detailsF
      .addCase(getUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.isAuthenticated = true;

      })
      .addCase(getUser.rejected, (state, action) => {

        state.status = 'failed';

      })
      //  get user profile  detailsF
      .addCase(getUserProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedUser = action.payload.user;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.status = 'failed';
      })

      //  get ResetPasswordOTP via email address
      .addCase(getResetPasswordOTP.pending, (state) => {
        state.mail.mailStatus = 'loading';
        state.error = null;
        state.isOtpSent = false;
      })
      .addCase(getResetPasswordOTP.fulfilled, (state, action) => {
        state.mail.mailStatus = 'succeeded';
        state.isOtpSent = true;
      })
      .addCase(getResetPasswordOTP.rejected, (state, action) => {
        state.mail.mailStatus = 'failed';
        state.isOtpSent = false;
      })
      //  verifyOTP
      .addCase(verifyOTP.pending, (state) => {
        state.mail.otpStatus = 'loading';
        state.error = null;
        state.isEmailVerified = false;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.mail.otpStatus = 'succeeded';
        state.isEmailVerified = true;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.mail.otpStatus = 'failed';
        state.isEmailVerified = false;
      })
      //  set new password
      .addCase(setNewPassword.pending, (state) => {
        state.mail.passwordStatus = 'loading';
        state.error = null;
      })
      .addCase(setNewPassword.fulfilled, (state, action) => {
        state.mail.passwordStatus = 'succeeded';
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(setNewPassword.rejected, (state, action) => {
        state.mail.passwordStatus = 'failed';
      })


  },
});

export default userSlice.reducer;
export const { clearError } = userSlice.actions;

// Export any actions you need
export const selectUser = (state) => state.user;  
