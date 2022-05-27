export interface Dice {
  diceCount: number;
  diceSides: number;
}

export interface DiceArithmetic {
  left: number | Dice | DiceArithmetic;
  operator: string;
  right: number | Dice | DiceArithmetic;
}
