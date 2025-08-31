export type Designation =
  | "Developer"
  | "Manager"
  | "System Admin"
  | "Team Lead"
  | "PM";

export interface SkillInfo {
  skillName: string;
  skillRating: number | string;
}

export interface EducationInfo {
  instituteName: string;
  courseName: string;
  completedYear: string; 
}

export interface EmployeeInfo {
  id: string;
  empName: string;
  designation: Designation;
  joinDate: string; // YYYY-MM-DD
  email: string;
  phoneNumber: string;
  skillInfo: SkillInfo[];
  educationInfo: EducationInfo[];
}

export interface Company {
  id: string;
  companyName: string;
  address?: string;
  email: string;
  phoneNumber: string;
  createdAt: string; // ISO
  empInfo: EmployeeInfo[];
}
