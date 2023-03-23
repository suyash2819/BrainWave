import { courseDetail } from "../../pages/BrowseCourses/IPropsCourses";

export interface Assignment_creation {
  name: string;
  description: string;
  courseName: string;
  deadlineDate: string;
  file: File | null; // add a new property for the file
}

export interface courseDetailI {
  courseDetailAssign: courseDetail;
  subCourseFullHeading: string;
}
