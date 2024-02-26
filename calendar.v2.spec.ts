import { expect, describe, beforeAll, test, beforeEach } from "vitest";
import { Calendar2 } from "./calendar.v2";

let calendar2Test = (cb) => {
  describe("Calendar v2, Documentation Driven Development", () => {
    let calendar2: Calendar2;
    beforeAll(() => {
      calendar2 = new Calendar2();
    });

    beforeEach(() => {
      cb(calendar2);
    });

    test("1.Start with current month equal to the actual current month", () => {
      expect(calendar2.currentMonth).toBeGreaterThanOrEqual(0);
      expect(calendar2.currentMonth).toBeLessThanOrEqual(11);
    });

    test("2.The current month ever start on day 1. But what day in the week is the day 1 of this month?", () => {
      // Ex: Fev 2024 start on a Thursday (4/6).
      expect(calendar2.startAtDayOfWeek).toBeGreaterThanOrEqual(0);
      expect(calendar2.startAtDayOfWeek).toBeLessThanOrEqual(6);
    });

    test(`3.If first day is greater than 0: What is the last day of the last month, so we can subtract that number to complete the first week.
          4.Add the next days on the first week, so it's complete.`, () => {
      // Ex: Fev 2024 start on a Thursday (4/6). Last month is 1/12 - January. Ended on the 31st (3/6). So we have to subtract until 28st.
      // Ex: Fev 2024 start on a Thursday (4/6). So we have to add until Fev. 3st. Or first weeek: [29,30,31,1,2,3];
      expect(calendar2.firstWeek.length).toEqual(7);
    });

    test("5.Add a big array with the next days until the month its over", () => {
      // Ex: [4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29];
      expect(calendar2.fullOtherWeeks.length).toEqual(
        calendar2.lastDayOfMonth - (7 - calendar2.startAtDayOfWeek)
      );
    });

    test("6.Split this array in every seven records to generate new arrays", () => {
      // Ex: [4,5,6,7,8,9,10] [11,12,13,14,15,16,17], [18,19,20,21,22,23,24] [25,26,27,28,29];
      expect(calendar2.splitedOtherWeeks.length).toBeGreaterThanOrEqual(
        Math.round(calendar2.fullOtherWeeks.length / 7)
      );
    });

    test(`7.On the last array, check if contains 7 records. If it doesn't add with the next days of the next month.`, () => {
      expect(
        calendar2.splitedOtherWeeks[calendar2.splitedOtherWeeks.length - 1]
          .length
      ).toEqual(7);
    });
  });
};
calendar2Test(() => {});

// 8.Should be possible to go to next month.
calendar2Test((calendar2) => {
  for (let i = 0; i < 11; i++) {
    calendar2 = calendar2.goToNextMonth();
  }
});
//   // Ex: Mar 2024 start on a Friday (5/6).
//   expect(calendar2NextMonth.startAtDayOfWeek).toBeGreaterThanOrEqual(0);
//   expect(calendar2NextMonth.startAtDayOfWeek).toBeLessThanOrEqual(6);
//   expect(calendar2NextMonth.firstWeek.length).toEqual(7);
//   expect(calendar2NextMonth.fullOtherWeeks.length).toEqual(
//     calendar2NextMonth.lastDayOfMonth -
//       (7 - calendar2NextMonth.startAtDayOfWeek)
//   );
//   expect(calendar2NextMonth.splitedOtherWeeks.length).toBeGreaterThanOrEqual(
//     Math.round(calendar2NextMonth.fullOtherWeeks.length / 7)
//   );
//   expect(
//     calendar2NextMonth.splitedOtherWeeks[
//       calendar2NextMonth.splitedOtherWeeks.length - 1
//     ].length
//   ).toEqual(7);
//   calendar2NextMonth = calendar2NextMonth.goToNextMonth();
// });

//9.Should be possible to go to previous month.
calendar2Test((calendar2) => {
  for (let i = 0; i < 11; i++) {
    calendar2 = calendar2.goToPreviousMonth();
  }
});
//   let calendar2PreviusMonth = calendar2.goToPreviousMonth();
//   for (let i = 0; i < 11; i++) {
//     // Ex: Jan 2024 start on a Monday (1/6).
//     expect(calendar2PreviusMonth.startAtDayOfWeek).toBeGreaterThanOrEqual(0);
//     expect(calendar2PreviusMonth.startAtDayOfWeek).toBeLessThanOrEqual(6);
//     expect(calendar2PreviusMonth.firstWeek.length).toEqual(7);
//     expect(calendar2PreviusMonth.fullOtherWeeks.length).toEqual(
//       calendar2PreviusMonth.lastDayOfMonth -
//         (7 - calendar2PreviusMonth.startAtDayOfWeek)
//     );
//     expect(
//       calendar2PreviusMonth.splitedOtherWeeks.length
//     ).toBeGreaterThanOrEqual(
//       Math.round(calendar2PreviusMonth.fullOtherWeeks.length / 7)
//     );
//     expect(
//       calendar2PreviusMonth.splitedOtherWeeks[
//         calendar2PreviusMonth.splitedOtherWeeks.length - 1
//       ].length
//     ).toEqual(7);
//     calendar2PreviusMonth = calendar2PreviusMonth.goToPreviousMonth();
//   }
// });

// test(`10.Should be possible to assign a date to start (day, month, year)`, () => {
calendar2Test((calendar2) => {
  calendar2 = new Calendar2({ month: 0, day: 1, year: 2024 });
});
//   let calendar2SetDate = new Calendar2({ month: 0, day: 1, year: 2024 });
//   expect(calendar2SetDate.startAtDayOfWeek).toBeGreaterThanOrEqual(0);
//   expect(calendar2SetDate.startAtDayOfWeek).toBeLessThanOrEqual(6);
//   expect(calendar2SetDate.firstWeek.length).toEqual(7);
//   expect(calendar2SetDate.fullOtherWeeks.length).toEqual(
//     calendar2SetDate.lastDayOfMonth - (7 - calendar2SetDate.startAtDayOfWeek)
//   );
//   expect(calendar2SetDate.splitedOtherWeeks.length).toBeGreaterThanOrEqual(
//     Math.round(calendar2SetDate.fullOtherWeeks.length / 7)
//   );
//   expect(
//     calendar2SetDate.splitedOtherWeeks[
//       calendar2SetDate.splitedOtherWeeks.length - 1
//     ].length
//   ).toEqual(7);
//   calendar2SetDate = calendar2SetDate.goToPreviousMonth();
// });
