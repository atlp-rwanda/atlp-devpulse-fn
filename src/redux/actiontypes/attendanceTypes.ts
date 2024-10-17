export interface Attendance {
    id: string;
    date: string;
    status: string;
  }

export interface AttendanceData {
  attendances: Attendance[];
  attendanceRatio: number;
}