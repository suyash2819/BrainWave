import { courseDetail } from "../../pages/BrowseCourses/IPropsCourses";

export interface Assignment {
  name: string;
  description: string;
  courseName: string;
  deadlineDate: string;
  file: string; // add a new property for the file
}

export interface courseDetailI {
  courseDetailAssign: courseDetail;
  subCourseFullHeading: string;
  subCourseCode: string;
}
