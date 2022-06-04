import {Streams} from '@masala/parser';
import evaluateDiceExpression from './diceExpr.evaluator';
import {diceExprParser} from './diceExpr.parser';
import {Dice, DiceExpression} from './types';

export default class DiceExpr {
  private data: DiceExpression | Dice | number;

  constructor(diceExpr: string) {
    const parseResult = diceExprParser().parse(Streams.ofString(diceExpr));
    if (!parseResult.isAccepted()) {
      throw new Error(`failed to parse '${diceExpr}'`);
    }
    this.data = parseResult.value;
  }

  public roll(): number {
    return evaluateDiceExpression(this.data);
  }
}
