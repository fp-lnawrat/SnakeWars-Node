import { start } from './engine.mjs';

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
  await start(nextMove);
};

await main();

