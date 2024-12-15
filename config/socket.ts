import { io } from 'socket.io-client';
import { WS_URL } from './env';

const socket = io(WS_URL, {
    reconnection: true,
    transports: ['websocket']
});

export default socket;
