[![Build & Test](https://github.com/myarichuk/dice-parser/actions/workflows/build-and-test.yml/badge.svg?branch=main)](https://github.com/myarichuk/dice-parser/actions/workflows/build-and-test.yml)
# dice-parser
This library contains a simple RPG dice notation parser (3d6+3 and such) written in typescript. Implements part of [Roll20 dice expression spec](https://help.roll20.net/hc/en-us/articles/360037773133-Dice-Reference)  
Can parse and evaluate for random numbers expressions such as ``3d6 * 5 + (2d6 / 4)``

### Example - Parse and evaluate expression
```typescript
import {DiceExpr} from 'dice-expr-parser';

const diceExpr = new DiceExpr('2d4+5-3d6'); //can parse arithmetic expressions
const rollResult = diceExpr.roll(); //evaluate and randomly roll all dice subexpressions
```
### Implementation TODO:
* Exploding Dice
* Dice Drop/Keep
* Critical Success and Fumble Points
* Target Dice
* FATE Dice
* Rerolling Dice
* Rounding Rolls and Math Functions

