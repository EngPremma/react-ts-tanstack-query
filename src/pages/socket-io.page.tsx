import { useEffect, useState } from 'react';

import { socket } from 'src/libs/socket-io';

const SocketIoPage = () => {
  const [message, setMessage] = useState<string>('');
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const onConnect = () => setIsConnected(true);

    const onDisconnect = () => setIsConnected(false);

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  useEffect(() => {
    const onSetMessage = (newMessage: any) => {
      setMessage(newMessage);
    };
    socket.on('received message', onSetMessage);
    return () => {
      socket.off('received message', onSetMessage);
    };
  }, []);

  const handleSendMessage = () => {
    const newMessage = 'hello';
    setMessage(newMessage);
  };

  return (
    <div>
      <p>
        Socket connection <span>{`: ${String(isConnected)}`}</span>
      </p>
      <div>
        <button onClick={handleSendMessage}>send message</button>
        <p>message:</p>
        {message}
      </div>
    </div>
  );
};

export default SocketIoPage;
