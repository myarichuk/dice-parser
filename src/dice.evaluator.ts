import {integer, MersenneTwister19937} from 'random-js';
import {Dice} from './types';

const engine = MersenneTwister19937.autoSeed();

export default function rollDice(dice: Dice): number {
  //sanity check
  if (dice.diceCount === 0) {
    throw new Error('invalid dice count, cannot be zero!');
  }
  if (dice.diceSides <= 1) {
    throw new Error(
      'invalid dice side count, cannot be less or equal than one!'
    );
  }
  let result = 0;
  const distribution = integer(1, dice.diceSides);
  for (let i = 0; i < dice.diceCount; i++) {
    result += distribution(engine);
  }
  return result;
}
