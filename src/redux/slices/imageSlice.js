// productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { base_url } from '../../main'

const initialState = {
    images: [],
    publicImages: [],
    selectedImage: {},
    status: 'idle',
    postStatus: 'idle',
    error: null,
    likeChanges: false,
};

// Define an async thunk to fetch products from the API
export const allImages = createAsyncThunk('images/allImages', async () => {

    const response = await axios.get(`${base_url}/api/images`,

        {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });

    return response.data;
});
// get all public images
export const allPublicImages = createAsyncThunk('images/allPublicImages', async () => {

    const response = await axios.get(`${base_url}/api/images/public`,

        {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });

    return response.data;
});
// Define an async thunk to fetch products from the API
export const postImage = createAsyncThunk('images/postImage', async (myForm) => {

    const response = await axios.post(`${base_url}/api/images`,
        myForm,

        {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });

    return response.data;
});
// Define an async thunk to fetch products from the API
export const deleteImage = createAsyncThunk('images/deleteImage', async (id) => {

    const response = await axios.delete(`${base_url}/api/images/${id}`,

        {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });

    return response.data;
});


// like image
export const likeImage = createAsyncThunk('images/likeImage', async ({ id, userId }) => {

    // image id
    const response = await axios.post(`${base_url}/api/images/likes/${id}`,
        {
            userId
        },

        {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });

    return response.data;
});

// unlike image
export const unlikeImage = createAsyncThunk('images/unlikeImage', async ({ id, userId }) => {

    // image id
    const response = await axios.post(`${base_url}/api/images/unlikes/${id}`,
        {
            userId
        },

        {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });

    return response.data;
});


const imageSlice = createSlice({
    name: 'image',
    initialState,
    reducers: {
        resetState: (state, action) => {

            state.error = null,
                state.status = "idle"


        },
    },
    extraReducers: (builder) => {
        builder
            // all images
            .addCase(allImages.pending, (state) => {
                state.status = 'loading';
                state.error = null
            })
            .addCase(allImages.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.images = action.payload.allImages;


            })
            .addCase(allImages.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // all public images
            .addCase(allPublicImages.pending, (state) => {
                state.status = 'loading';
                state.error = null
            })
            .addCase(allPublicImages.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.publicImages = action.payload.allImages;


            })
            .addCase(allPublicImages.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })


            // postImage

            .addCase(postImage.pending, (state) => {
                state.postStatus = 'loading';
                state.error = null
            })
            .addCase(postImage.fulfilled, (state, action) => {
                state.postStatus = 'succeeded';
                state.images = action.payload.allImages;


            })
            .addCase(postImage.rejected, (state, action) => {
                state.postStatus = 'failed';
                state.error = action.error.message;
            })

            // delete image
            .addCase(deleteImage.pending, (state) => {
                state.status = 'loading';
                state.error = null
            })
            .addCase(deleteImage.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.images = action.payload.allImages;


            })
            .addCase(deleteImage.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // like image
            .addCase(likeImage.pending, (state) => {
                state.status = 'loading';
                state.error = null
            })
            .addCase(likeImage.fulfilled, (state, action) => {
                state.status = 'succeeded';
                console.log(action.payload)
                state.publicImages = action.payload.allImages;
                state.likeChanges = ! state.likeChanges;

               
            })
            .addCase(likeImage.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            // unlike image
            .addCase(unlikeImage.pending, (state) => {
                state.status = 'loading';
                state.error = null
            })
            .addCase(unlikeImage.fulfilled, (state, action) => {
                state.status = 'succeeded';
                console.log(action.payload)
                state.publicImages = action.payload.allImages;
                state.likeChanges = ! state.likeChanges;
            })
            .addCase(unlikeImage.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

    },
});


export const { resetState } = imageSlice.actions;
export default imageSlice.reducer;

// Export any actions you need
export const selectImages = (state) => state.images;  
