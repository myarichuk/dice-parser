export interface Dice {
  diceCount: number;
  diceSides: number;
}

export interface BinaryExpression {
  left: number | Dice;
  operator: string;
  right: number | Dice | BinaryExpression;
}
