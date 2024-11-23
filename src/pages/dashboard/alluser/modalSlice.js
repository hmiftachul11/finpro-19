import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        showModal: false,
        selectedUserId: null,
    },
    reducers: {
        setShowModal: (state, action) => {
            state.showModal = action.payload.showModal;
            state.selectedUserId = action.payload.selectedUserId;
        },
        hideModal: (state) => {
            state.showModal = false;
            state.selectedUserId = null;
        },
    },
});

export const { setShowModal, hideModal } = modalSlice.actions;

export default modalSlice.reducer;
