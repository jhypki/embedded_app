import socket from '@/config/socket';
import { SocketEvents } from '@/constants/socketEvents';

type Callback = () => void;

const SocketService = {
    subscribe(event: SocketEvents, callback: any) {
        socket.on(event, callback);
    },
    unsubscribe(event: SocketEvents, callback: any) {
        socket.off(event, callback);
    }
};

export default SocketService;
