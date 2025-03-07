export interface Tram {
  journeyId: number;
  destination: string;
  arrivalTime: string;
  scheduledTime: string;
  expectedTime: string;
  status: string;
  platformNumber: string | undefined;
  lineNumber: number;
}
