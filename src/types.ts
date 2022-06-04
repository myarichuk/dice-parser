export interface Dice {
  diceCount: number;
  diceSides: number;
}

export interface DiceExpression {
  operands: Array<Dice | DiceExpression | number>;
  operator: string;
}
