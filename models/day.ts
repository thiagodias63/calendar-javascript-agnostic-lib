import { weekdays } from "../constants/weekdays";
import { weekdaysAbreviations } from "../constants/weekdays-abreviations";
// 11. The days of month must be convert to a Object-value type with the follow properties
//     1. value: the day itself. In a number type
//     1. month: the month that day belongs to. In a number type;
//     1. weekday: a string of the day on the week;
//     1. abbreviation: a string of the day abbreviation on the week
export class Day {
  value: number;
  month: number;
  weekday: string;
  abbreviation: string;

  constructor(input: { value: number; month: number; weekday: number }) {
    this.value = input.value;
    this.month = input.month;
    this.weekday = weekdays[input.weekday];
    this.abbreviation = weekdaysAbreviations[input.weekday];
  }
}
