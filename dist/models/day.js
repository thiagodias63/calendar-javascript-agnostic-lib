"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Day = void 0;
const weekdays_1 = require("../constants/weekdays");
const weekdays_abreviations_1 = require("../constants/weekdays-abreviations");
// 11. The days of month must be convert to a Object-value type with the follow properties
//     1. value: the day itself. In a number type
//     1. month: the month that day belongs to. In a number type;
//     1. weekday: a string of the day on the week;
//     1. abbreviation: a string of the day abbreviation on the week
class Day {
    constructor(input) {
        this.value = input.value;
        this.month = input.month;
        this.weekdayNumber = input.weekday;
        this.weekday = weekdays_1.weekdays[input.weekday];
        this.abbreviation = weekdays_abreviations_1.weekdaysAbreviations[input.weekday];
    }
}
exports.Day = Day;
