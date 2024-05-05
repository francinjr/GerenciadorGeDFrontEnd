export default interface FinanceInterface {
    name: string;
    value: number | null;
    description: string;
    type: string[] | string;
    startDate: Date | null,
    endDate: Date | null,
    id: number;
  }