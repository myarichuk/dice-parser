[![Build & Test](https://github.com/myarichuk/dice-parser/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/myarichuk/dice-parser/actions/workflows/build-and-test.yml)
# dice-parser
This library contains a simple RPG dice notation parser (3d6+3 and such) written in typescript. Implements part of [Roll20 dice expression spec](https://help.roll20.net/hc/en-us/articles/360037773133-Dice-Reference)  
Can parse and evaluate for random numbers expressions such as ``3d6 * 5 + (2d6 / 4)``

### Example 1 - Parse an expression
```typescript
import {Streams} from '@masala/parser';
import {diceExprParser} from 'diceExpr.parser';
const parsed = diceExprParser().parse(Streams.ofString('(2d6 +4)*3d4'));
```
Accessing ``parsed.value`` will yield the following object:
```typescript
{
  operands: [
    {operands: [{diceCount: 2, diceSides: 6}, 4], operator: '+'},
    {diceCount: 3, diceSides: 4},
  ],
  operator: '*',
}
```
### Example 2 - Evaluate a dice expression (simulate complex dice rolls)
```typescript
import {Streams} from '@masala/parser';
import {diceExprParser} from 'diceExpr.parser';
import evaluateDiceExpression from 'diceExpr.evaluator';
const parsed = diceExprParser().parse(Streams.ofString('(2d6 +4)*3d4'));
const evaluationResult = evaluateDiceExpression(parsed.value);
```

### Implementation TODO:
* Exploding Dice
* Dice Drop/Keep
* Critical Success and Fumble Points
* Target Dice
* FATE Dice
* Rerolling Dice
* Rounding Rolls and Math Functions

