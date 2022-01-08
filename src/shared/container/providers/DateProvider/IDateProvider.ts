export interface IDateProvider {
  convertToUtc(date: Date): string;
  dateNow(): Date;
  isDateBefore(start_date: Date, end_date: Date): boolean;
  compareInHours(start_date: Date, end_date: Date): number;
  compareInDays(start_date: Date, end_date: Date): number;
  addDays(days: number): Date;
  addHours(hours: number): Date;
}
