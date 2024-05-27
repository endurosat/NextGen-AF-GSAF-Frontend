export const SHOW_TOAST = 'SHOW_TOAST';
export const HIDE_TOAST = 'HIDE_TOAST';
export const CHANGE_USER_ID = 'CHANGE_USER_ID';

export const showToast = (message, severity) => ({
  type: SHOW_TOAST,
  payload: { message, severity }
});

export const hideToast = () => ({
  type: HIDE_TOAST
});

export const changeUser = (userId, userRole) => ({
  type: CHANGE_USER_ID,
  payload: { userId, userRole }
});

