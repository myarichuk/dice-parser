export interface Dice {
  diceCount: number;
  diceSides: number;
}

export interface DiceExpression {
  operands: Array<Dice | DiceExpression>;
  operator: string;
}
