export class Calendar2 {
  currentMonth!: number;
  startAtDayOfWeek!: number;
  firstWeek: number[] = [];
  lastDayOfMonth!: number;
  fullOtherWeeks: number[] = [];
  splitedOtherWeeks: Array<number[]> = [];

  constructor() {
    const newDate: Date | any = new Date();
    // 1.Start with current month equal to the actual current month
    this.currentMonth = newDate.getMonth();
    // 2.The current month ever start on day 1. But what day in the week is the day 1 of this month?
    newDate.setDate(1);
    this.startAtDayOfWeek = newDate.getDay();
    // 3.If first day is greater than 0: What is the last day of the last month, so we can subtract that number to complete the first week.
    let lastDayOfLastMonth = this.lastDayOfLastMonth;
    if (this.startAtDayOfWeek > 0) {
      for (let i = this.startAtDayOfWeek; i > 0; i--) {
        this.firstWeek.unshift(lastDayOfLastMonth);
        lastDayOfLastMonth--;
      }
    }
    // 4.Add the next days on the first week, so it's complete.
    let firstDayOfMonth = 1;
    for (let i = this.startAtDayOfWeek; i < 7; i++) {
      this.firstWeek.push(firstDayOfMonth);
      firstDayOfMonth++;
    }
    // 5.Add a big array with the next days until the month its over
    const lastDayOfFistWeek = this.firstWeek[this.firstWeek.length - 1];
    this.lastDayOfMonth = this.fetchLastDayOfMonth(
      newDate.getFullYear(),
      newDate.getMonth()
    );
    for (let i = lastDayOfFistWeek + 1; i <= this.lastDayOfMonth; i++) {
      this.fullOtherWeeks.push(i);
    }
    // 6.Split this array in every seven records to generate new arrays
    let i = 0;
    for (
      let start = this.fullOtherWeeks[0];
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
        lastWeek.push(i);
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
}
