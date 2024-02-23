import { Calendar2 } from './calendar.v2';

describe('Calendar v2, Documentation Driven Development', () => {
  let calendar2;

  beforeAll(() => {
    calendar2 = new Calendar2();
  });

  it('1.Start with current month equal to the actual current month', () => {
    expect(calendar2.currentMonth).toEqual(2);
  });

  //   it('2.The actual month ever start on day 1. But what day in the week is the day 1 of this month?', () => {});
  //   // Ex: Fev 2024 start on a Thursday (4/6).

  //   it('3.What is the last day of the last month, so we can subtract that number to complete the first week.', () => {});
  //   // Ex: Fev 2024 start on a Thursday (4/6). Last month is 1/12 - January. Ended on the 31st (3/6). So we have to subtract until 28st.
  //   it(`4.Add the next days on the first week, so it's complete.`, () => {});
  //   // Ex: Fev 2024 start on a Thursday (4/6). So we have to add until Fev. 3st. Or first weeek: [29, 30, 31, 1, 2, 3];

  //   it('5.Add a big array with the next days until the month its over', () => {});
  //   // Ex: [4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28];

  //   it('6.Split this array in every seven records to generate new arrays', () => {});
  //   // Ex: [4,5,6,7,8,9,10] [11,12,13,14,15,16,17], [18,19,20,21,22,23,24] [25,26,27,28];

  //   it('7.On the last array, check if contains 7 records', () => {});

  //   it(`7.1.If it doesn't add with the next days of the next month.`, () => {});
});

