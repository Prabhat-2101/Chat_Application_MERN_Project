import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "isLightMode",
  initialState: "true",
  reducers: {
    toggleTheme: (state) => {
      return state === "true" ? "false" : "true";
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;