import { connect } from './client.mjs';

const PLAYER = 'PL2';
const LEFT = 'LEFT';
const RIGHT = 'RIGHT';
const STRAIGHT = 'STRAIGHT';
const STAY = '';

/*
Game state is a JSON object with the following structure:
{
  "turn": number,
  "snakes": [{
    "cells": [{
      "x": number,
      "y": number
    }],
    "id": string,
    "head": {
      "x": number,
      "y": number
    },
    "isAlive": boolean,
    "direction": 'None' | 'Up' | 'Down' | 'Left' | 'Right',
    "score": number,
    "weight": number,
    "maxWeight": number
  }],
  "walls": [{
    "x": number,
    "y": number
  }],
  "food": [{
    "x": number,
    "y": number
  }],
  "boardSize": {
    "width": number,
    "height": number
  },
  "turnTimeMilliseconds": number
}
*/

const nextMove = (id, gameState) => {
  console.log('Got game state', gameState);
  return STRAIGHT;
};

const main = async () => {
  console.log('Starting SnakeWars bot');
  const {send, readLine} = await connect();
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
    const gameState = JSON.parse(await readLine());
    const move = nextMove(id, gameState);
    await send(move);
  }
};

await main();

