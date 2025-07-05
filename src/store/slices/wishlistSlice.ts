import { RealEstateItem } from "@/types/real-estate";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WishlistItem extends RealEstateItem {
  addedBy: string;
}

interface WishlistState {
  realestates: WishlistItem[];
}

const initialState: WishlistState = {
  realestates: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: {
      reducer(state, action: PayloadAction<WishlistItem>) {
        if (!action.payload.addedBy) return;
        const existingIndex = state.realestates.findIndex(
          (item) =>
            item.id === action.payload.id &&
            item.addedBy === action.payload.addedBy,
        );
        if (existingIndex === -1) {
          state.realestates.push(action.payload);
        }
      },
      prepare(realestate: RealEstateItem, userId: string) {
        return {
          payload: {
            ...realestate,
            addedBy: userId,
          },
        };
      },
    },
    removeFromWishlist: (
      state,
      action: PayloadAction<{ id: string; userId: string }>,
    ) => {
      state.realestates = state.realestates.filter(
        (item) =>
          !(
            item.id === action.payload.id &&
            item.addedBy === action.payload.userId
          ),
      );
    },
    clearWishlist: (state, action: PayloadAction<{ userId: string }>) => {
      state.realestates = state.realestates.filter(
        (item) => item.addedBy !== action.payload.userId,
      );
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
