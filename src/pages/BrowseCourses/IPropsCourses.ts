export interface IAllCourses {
  allCourseDetails: courseDetail[];
  messageLog?: string;
  status?: string;
}

export type courseDetail = {
  title?: string;
  description?: string;
  sem?: string;
  professor?: string;
  id?: string;
};
