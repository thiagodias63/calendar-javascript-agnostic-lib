export class Calendar2 {
  currentMonth!: number;

  constructor() {
    this.currentMonth = new Date().getMonth();
  }
}

