
export const USER_CLIENT_ID = 'test-client-id';
export const USER_CLIENT_ROLE = 'CLIENT';
export const USER_ADMIN_ID = 'test-admin-id';
export const USER_ADMIN_ROLE = 'ADMIN';
export const GATEWAY_APP_NAME = 'Gateway';
export const APP_MAX_BUNDLE_SIZE = 5;//mb

export function formatDate(dateString) {
    if(dateString === null || dateString === undefined) return ('N/A');
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
  };