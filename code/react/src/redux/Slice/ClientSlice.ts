import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface ClientState {
    status: "create" | "update" | "get" | "delete" | "idle";
}

const initialState: ClientState = {
    status: "idle",
};

export const clientSlice = createSlice({
    name: "client",
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setClientStatus: (state, action: PayloadAction<string>) => {
            // @ts-ignore
            state.status = action.payload;
        },
    },
});

export const { setClientStatus } = clientSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectClientStatus = (state: RootState) => state.client.status;

export default clientSlice.reducer;
