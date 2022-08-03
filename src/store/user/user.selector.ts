import { createSelector } from "reselect";
import { UserState } from "./user.reducer";

import { RootState } from "../store";

// export const selectCurrentUser = (state) => {
//   return state.user.currentUser;
// };

export const selectUserReducer = (state: RootState): UserState => state.user;

export const selectCurrentUser = createSelector(
  [selectUserReducer],
  (userSlice) => userSlice.currentUser
);
