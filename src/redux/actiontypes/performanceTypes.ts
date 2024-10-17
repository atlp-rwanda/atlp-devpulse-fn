export interface Performance {
    id: string;
    score: number;
    date: string;
  }

  export interface PerformanceData {
    performances: Performance[];
    averageScore: number;
  }