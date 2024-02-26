"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Calendar2: () => Calendar2
});
module.exports = __toCommonJS(src_exports);

// src/constants/weekdays.ts
var weekdays = [
  "Domingo",
  "Segunda-feira",
  "Ter\xE7a-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "S\xE1bado"
];

// src/constants/weekdays-abreviations.ts
var weekdaysAbreviations = [
  "Dom",
  "Seg",
  "Ter",
  "Qua",
  "Qui",
  "Sex",
  "Sab"
];

// src/models/day.ts
var Day = class {
  constructor(input) {
    this.value = input.value;
    this.month = input.month;
    this.weekdayNumber = input.weekday;
    this.weekday = weekdays[input.weekday];
    this.abbreviation = weekdaysAbreviations[input.weekday];
  }
};

// src/calendar.v2.ts
var Calendar2 = class _Calendar2 {
  constructor(input) {
    this.weeks = [];
    this.firstWeek = [];
    this.fullOtherWeeks = [];
    this.splitedOtherWeeks = [];
    const newDate = /* @__PURE__ */ new Date();
    if (input && typeof input.month === "number" && input.month >= 0)
      newDate.setMonth(input.month);
    this.currentMonth = newDate.getMonth();
    newDate.setDate(1);
    if (input == null ? void 0 : input.day)
      newDate.setDate(input.day);
    if (input == null ? void 0 : input.year)
      newDate.setFullYear(input.year);
    this.startAtDayOfWeek = newDate.getDay();
    let lastDayOfLastMonth = this.lastDayOfLastMonth;
    if (this.startAtDayOfWeek > 0) {
      for (let i2 = this.startAtDayOfWeek; i2 > 0; i2--) {
        this.firstWeek.unshift(
          new Day({
            value: lastDayOfLastMonth,
            weekday: i2 - 1,
            month: this.currentMonth - 1
          })
        );
        lastDayOfLastMonth--;
      }
    }
    let firstDayOfMonth = 1;
    for (let i2 = this.startAtDayOfWeek; i2 < 7; i2++) {
      this.firstWeek.push(
        new Day({
          value: firstDayOfMonth,
          month: this.currentMonth,
          weekday: i2
        })
      );
      firstDayOfMonth++;
    }
    const lastDayOfFistWeek = this.firstWeek[this.firstWeek.length - 1];
    this.lastDayOfMonth = this.fetchLastDayOfMonth(
      newDate.getFullYear(),
      newDate.getMonth()
    );
    let dayOfWeek = 0;
    for (let i2 = lastDayOfFistWeek.value + 1; i2 <= this.lastDayOfMonth; i2++) {
      this.fullOtherWeeks.push(
        new Day({ value: i2, weekday: dayOfWeek % 7, month: this.currentMonth })
      );
      dayOfWeek++;
    }
    let i = 0;
    for (let start = this.fullOtherWeeks[0].value; start < this.lastDayOfMonth; start += 7) {
      this.splitedOtherWeeks.push(this.fullOtherWeeks.slice(i, i + 7));
      i += 7;
    }
    const lastWeek = this.splitedOtherWeeks[this.splitedOtherWeeks.length - 1];
    if (lastWeek.length < 7) {
      let lastWeekLength = lastWeek.length;
      for (let i2 = 1; lastWeekLength < 7; i2++) {
        lastWeek.push(
          new Day({
            month: this.currentMonth + 1,
            value: i2,
            weekday: dayOfWeek % 7
          })
        );
        dayOfWeek++;
        lastWeekLength++;
      }
    }
    this.weeks.push(this.firstWeek);
    this.splitedOtherWeeks.forEach((week) => {
      this.weeks.push(week);
    });
  }
  get lastDayOfLastMonth() {
    const partialNewDate = /* @__PURE__ */ new Date();
    let partialLastMonth;
    if (this.currentMonth > 0) {
      partialLastMonth = this.currentMonth - 1;
    } else {
      partialLastMonth = 12;
      partialNewDate.setFullYear(partialNewDate.getFullYear() - 1);
    }
    partialNewDate.setMonth(partialLastMonth + 1);
    partialNewDate.setDate(0);
    return Number(partialNewDate.toLocaleDateString().split("/")[0]);
  }
  fetchLastDayOfMonth(fullYear, month) {
    const partialNewDate = new Date(fullYear, month + 1, 0);
    return Number(partialNewDate.toLocaleDateString().split("/")[0]);
  }
  // 8. Should be possible to go to next month
  goToNextMonth() {
    const nextMonth = this.currentMonth < 11 ? this.currentMonth + 1 : 0;
    return new _Calendar2({ month: nextMonth });
  }
  // 9. Should be possible to go to previous month
  goToPreviousMonth() {
    const previousMonth = this.currentMonth > 0 ? this.currentMonth - 1 : 11;
    return new _Calendar2({ month: previousMonth });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Calendar2
});
//# sourceMappingURL=index.js.map