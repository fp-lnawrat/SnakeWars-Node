import { connect } from './client.mjs';
import { stopwatch } from './stopwatch.mjs';

const PLAYER = 'BARBI';
const HOST = 'FP-LSC0248';
const PORT = 9977;

export const start = async (nextMove) => {
  console.log('Starting SnakeWars bot');
  const { send, readLine } = await connect(HOST, PORT);
  console.log('Connected to SnakeWars');
  const hello = await readLine(); 
  if (hello != 'ID') {
    console.log('Expected "ID" from server, got', '->' + hello + '<-');
    // process.exit(1);
  }

  console.log('debug 001');
  await send(PLAYER);
  console.log('debug 002');
  const id = await readLine();
  console.log('debug 003');

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
