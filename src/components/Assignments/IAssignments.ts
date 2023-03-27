import { courseDetail } from "../../pages/BrowseCourses/IPropsCourses";

export interface Assignment {
  name: string;
  description: string;
  courseName: string;
  deadlineDate: string;
  courseFullName: string;
  file: string; // add a new property for the file
  datePosted?: string;
  submissiontType: string;
  submissionsEmail: string[];
  uuid: string;
}

export interface courseDetailI {
  courseDetailAssign: courseDetail;
  subCourseFullHeading: string;
  subCourseCode: string;
}
