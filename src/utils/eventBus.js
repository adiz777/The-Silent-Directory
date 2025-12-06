// src/utils/eventBus.js

const subscribers = {};

/**
 * Subscribe to a global event
 * @param {string} event
 * @param {function} callback
 */
export function subscribe(event, callback) {
  if (!subscribers[event]) {
    subscribers[event] = [];
  }
  subscribers[event].push(callback);

  return () => {
    subscribers[event] = subscribers[event].filter(cb => cb !== callback);
  };
}

/**
 * Emit a global event
 * @param {string} event
 * @param {any} data
 */
export function emit(event, data) {
  if (!subscribers[event]) return;
  subscribers[event].forEach(callback => callback(data));
}

/**
 * Clear all listeners (used for resets)
 */
export function clearEventBus() {
  Object.keys(subscribers).forEach(event => {
    subscribers[event] = [];
  });
}
