import * as net from 'net';

let socket;
let lines = [];
let buffer = "";

export const connect = async (host = 'localhost', port = 3000) => {
  return new Promise((resolve) => {
    socket = new net.Socket();
    socket.setNoDelay(true);
    socket.setEncoding('ascii');
    socket.connect(port, host, () => {
      resolve({
        send,
        readLine
      });
    });

    socket.on('close', () => {
      console.log('Connection from SnakeWars closed, exiting');
      process.exit(0);
    });

    socket.on('data', (data) => {
      buffer += data;
      if (buffer.includes("\n")) {
        const parts = buffer.split("\n");
        lines = lines.concat(parts.slice(0, parts.length - 1));
        buffer = parts[parts.length - 1];
      }
    });
  });
}

const send = (msg) => {
  const promise = new Promise((resolve) => {
    socket.write(`${msg}\n`, 'ascii', () => {
      resolve();
    });
  });
  return promise;
}

const readLine = async () => {
  while (lines.length === 0) {
    await delay(5);
  }
  return lines.shift();
}

const delay = async (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
};

