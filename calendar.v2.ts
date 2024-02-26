import { Day } from "./models/day";

export class Calendar2 {
  currentMonth!: number;
  startAtDayOfWeek!: number;
  firstWeek: Day[] = [];
  lastDayOfMonth!: number;
  fullOtherWeeks: Day[] = [];
  splitedOtherWeeks: Array<Day[]> = [];

  constructor(input?: { day?: number; month: number; year?: number }) {
    const newDate: Date | any = new Date();
    // 8.Should be possible to go to next month
    if (input && typeof input.month === "number" && input.month >= 0)
      newDate.setMonth(input.month);
    // 1.Start with current month equal to the actual current month
    this.currentMonth = newDate.getMonth();
    // 2.The current month ever start on day 1. But what day in the week is the day 1 of this month?
    newDate.setDate(1);
    // 10.Should be possible to assign a date to start (day, month, year)
    if (input?.day) newDate.setDate(input.day);
    if (input?.year) newDate.setFullYear(input.year);
    this.startAtDayOfWeek = newDate.getDay();
    // 3.If first day is greater than 0: What is the last day of the last month, so we can subtract that number to complete the first week.
    let lastDayOfLastMonth = this.lastDayOfLastMonth;
    if (this.startAtDayOfWeek > 0) {
      for (let i = this.startAtDayOfWeek; i > 0; i--) {
        this.firstWeek.unshift(
          new Day({
            value: lastDayOfLastMonth,
            weekday: i,
            month: this.currentMonth - 1,
          })
        );
        lastDayOfLastMonth--;
      }
    }
    // 4.Add the next days on the first week, so it's complete.
    let firstDayOfMonth = 1;
    for (let i = this.startAtDayOfWeek; i < 7; i++) {
      this.firstWeek.push(
        new Day({
          value: firstDayOfMonth,
          month: this.currentMonth,
          weekday: i,
        })
      );
      firstDayOfMonth++;
    }
    // 5.Add a big array with the next days until the month its over
    const lastDayOfFistWeek = this.firstWeek[this.firstWeek.length - 1];
    this.lastDayOfMonth = this.fetchLastDayOfMonth(
      newDate.getFullYear(),
      newDate.getMonth()
    );
    let dayOfWeek = 0;
    for (let i = lastDayOfFistWeek.value + 1; i <= this.lastDayOfMonth; i++) {
      this.fullOtherWeeks.push(
        new Day({ value: i, weekday: dayOfWeek % 6, month: this.currentMonth })
      );
      dayOfWeek++;
    }
    // 6.Split this array in every seven records to generate new arrays
    let i = 0;
    for (
      let start = this.fullOtherWeeks[0].value;
      start < this.lastDayOfMonth;
      start += 7
    ) {
      this.splitedOtherWeeks.push(this.fullOtherWeeks.slice(i, i + 7));
      i += 7;
    }
    // 7.On the last array, check if contains 7 records
    // 7.1.If it doesn't add with the next days of the next month.
    const lastWeek = this.splitedOtherWeeks[this.splitedOtherWeeks.length - 1];
    if (lastWeek.length < 7) {
      let lastWeekLength = lastWeek.length;
      for (let i = 1; lastWeekLength < 7; i++) {
        lastWeek.push(
          new Day({
            month: this.currentMonth + 1,
            value: i,
            weekday: dayOfWeek % 6,
          })
        );
        dayOfWeek++;
        lastWeekLength++;
      }
    }
  }

  private get lastDayOfLastMonth(): number {
    const partialNewDate = new Date();
    let partialLastMonth: number;
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

  private fetchLastDayOfMonth(fullYear: number, month: number): number {
    const partialNewDate = new Date(fullYear, month + 1, 0);
    return Number(partialNewDate.toLocaleDateString().split("/")[0]);
  }

  // 8. Should be possible to go to next month
  public goToNextMonth(): Calendar2 {
    const nextMonth = this.currentMonth < 11 ? this.currentMonth + 1 : 0;
    return new Calendar2({ month: nextMonth });
  }

  // 9. Should be possible to go to previous month
  public goToPreviousMonth(): Calendar2 {
    const previousMonth = this.currentMonth > 0 ? this.currentMonth - 1 : 11;
    return new Calendar2({ month: previousMonth });
  }
}
