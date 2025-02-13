export const API_URL = process.env.API_URL || 'http://192.168.18.4:3000';
export const WS_URL = process.env.WS_URL || `ws://${API_URL.split('://')[1]}`;
export const IMG_URL = process.env.IMG_URL || `${API_URL}/uploads`;
export const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

export const ACTIVATIONS_URL = `/activations`;
export const IMAGES_URL = `/images`;
