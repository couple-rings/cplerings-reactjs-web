import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ConversationState {
  conversationsList: IConversation[];

  currentConversation: IConversation;

  notificationList: string[];
}

const initialState: ConversationState = {
  conversationsList: [],

  currentConversation: {
    _id: "",
    participants: [],
  },

  notificationList: [],
};

export const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    saveConversations: (state, { payload }: PayloadAction<IConversation[]>) => {
      state.conversationsList = payload;
    },

    selectConversation: (state, { payload }: PayloadAction<IConversation>) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { latestMessage, notifiedUsers, ...rest } = payload;
      state.currentConversation = rest;
    },

    saveNotifications: (state, { payload }: PayloadAction<string[]>) => {
      state.notificationList = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveConversations, selectConversation, saveNotifications } =
  conversationSlice.actions;

export default conversationSlice.reducer;
