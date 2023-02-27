import { connect } from './client.mjs';
import { stopwatch } from './stopwatch.mjs';

const PLAYER = 'PL2';
const HOST = 'localhost';
const PORT = 3000;

export const start = async (nextMove) => {
  console.log('Starting SnakeWars bot');
  const {send, readLine} = await connect(HOST, PORT);
  console.log('Connected to SnakeWars');
  const hello = await readLine();
  if (hello !== 'ID') {
    console.log('Expected "ID" from server, got', hello);
    process.exit(1);
  }

  await send(PLAYER);
  const id = await readLine();

  console.log('Got ID', id);
  
  while(true) {
    const sw = stopwatch();
    const gameState = JSON.parse(await readLine());
    console.log('Got game state in', sw.elapsed(), 'ms');
    sw.reset();
    const move = nextMove(id, gameState);
    await send(move);
    console.log('Sent move', move, 'in', sw.elapsed(), 'ms');
  }
};
