/**
 * Sets a new cookie.
 * @param {string} name Cookie name.
 * @param {string} value Value of the cookie.
 * @param {number} days Cookie validity in days
 */
export function setCookie(name, value, days) {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value || ''}${expires}; path=/`;
}

/**
 * Get cookie by name.
 * @param {string} name Cookie name.
 * @return {string|null} Returns string if cookie exists or null if it doesn't
 */
export function getCookie(name) {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

/**
 * Erase cookie by name.
 * @param {string} name Cookie name.
 */
export function eraseCookie(name) {
  document.cookie = `${name}=; Max-Age=-99999999;`;
}
