import {C} from '@masala/parser';

export const addOrSubOperator = C.charIn('+-');
export const multOrDivOperator = C.charIn('*/');
export const whitespace = C.char(' ').optrep().drop();
