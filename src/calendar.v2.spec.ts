import { expect, describe, test, beforeEach } from "vitest";
import { Calendar2 } from "./calendar.v2";
import { Day } from "./models/day";

export const calendar2Test = (
  title: string,
  cb?: any,
  input?: { month: number; day?: number; year?: number }
) => {
  describe(title, () => {
    let calendar2: Calendar2 = new Calendar2(input);

    beforeEach(() => {
      if (!!cb) cb(calendar2);
    });

    test("The current month is a valid month", () => {
      expect(calendar2.currentMonth).toBeGreaterThanOrEqual(0);
      expect(calendar2.currentMonth).toBeLessThanOrEqual(11);
    });

    test("2.The current month ever start on day 1. But what day in the week is the day 1 of this month?", () => {
      // Ex: Fev 2024 start on a Thursday (4/6).
      expect(calendar2.weeks[0][0].weekdayNumber).toBeGreaterThanOrEqual(0);
      expect(calendar2.weeks[0][0].weekdayNumber).toBeLessThanOrEqual(6);
    });

    // test(`3.If first day is greater than 0: What is the last day of the last month, so we can subtract that number to complete the first week.
    //       4.Add the next days on the first week, so it's complete.`, () => {
    //   // Ex: Fev 2024 start on a Thursday (4/6). Last month is 1/12 - January. Ended on the 31st (3/6). So we have to subtract until 28st.
    //   // Ex: Fev 2024 start on a Thursday (4/6). So we have to add until Fev. 3st. Or first weeek: [29,30,31,1,2,3];
    //   expect(calendar2.weeks[0].length).toEqual(7);
    // });

    // test("5.Add a big array with the next days until the month its over", () => {
    //   // Ex: [4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29];
    //   expect(calendar2.fullOtherWeeks.length).toEqual(
    //     calendar2.lastDayOfMonth - (7 - calendar2.startAtDayOfWeek)
    //   );
    // });

    // test("6.Split this array in every seven records to generate new arrays", () => {
    //   // Ex: [4,5,6,7,8,9,10] [11,12,13,14,15,16,17], [18,19,20,21,22,23,24] [25,26,27,28,29];
    //   expect(calendar2.splitedOtherWeeks.length).toBeGreaterThanOrEqual(
    //     Math.round(calendar2.fullOtherWeeks.length / 7)
    //   );
    // });

    // test(`7.On the last array, check if contains 7 records. If it doesn't add with the next days of the next month.`, () => {
    //   expect(
    //     calendar2.splitedOtherWeeks[calendar2.splitedOtherWeeks.length - 1]
    //       .length
    //   ).toEqual(7);
    // });

    // test(`11. The days of month must be convert to a Object-value`, () => {
    //   const firstDay = calendar2.weeks[0][0];
    //   const lastDay = calendar2.weeks[calendar2.weeks.length - 1][6];
    //   expect(firstDay).toBeInstanceOf(Day);
    //   expect(lastDay).toBeInstanceOf(Day);
    //   expect(weekdays.includes(firstDay.weekday));
    //   expect(weekdaysAbreviations.includes(firstDay.weekday));
    //   expect(weekdays.includes(lastDay.weekday));
    //   expect(weekdaysAbreviations.includes(lastDay.weekday));
    // });

    // test(`12. The calendar should be a object with weeks`, () => {
    //   calendar2.weeks.forEach((week) => {
    //     expect(week.length).toEqual(7);
    //     week.forEach((day) => {
    //       expect(day).toBeInstanceOf(Day);
    //     });
    //   });
    // });
  });
};
// 1.Start with current month equal to the actual current month
calendar2Test("Calendar v2, starts with the current date");

// 8.Should be possible to go to next month.
calendar2Test("Calendar v2, going to next month", (calendar2: Calendar2) => {
  for (let i = 0; i < 11; i++) {
    calendar2.goToNextMonth();
  }
});

//9.Should be possible to go to previous month.
calendar2Test(
  "Calendar v2, going to previous month",
  (calendar2: Calendar2) => {
    for (let i = 0; i < 11; i++) {
      calendar2.goToPreviousMonth();
    }
  }
);

// 10.Should be possible to assign a date to start (day, month, year)
calendar2Test("Calendar v2, going to specific date", null, {
  month: 2,
  day: 1,
  year: 24,
});
