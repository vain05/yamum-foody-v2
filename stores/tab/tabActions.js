export const SET_SELECTED_TAB = 'SET_SELECTED_TAB';

export const setSelectedTab = (selectedTab) => (dispatch) => {
    dispatch(setSelectedTabSuccess(selectedTab));
}

export const setSelectedTabSuccess = (selectedTab) => ({
  type: SET_SELECTED_TAB,
  payload: { selectedTab }
})
