export interface IUserProps {
  email: string;
  loginToken?: string;
  status?: string;
  messageLog?: string | undefined;
  password?: string;
  firstname: string;
  lastname: string;
  username: string;
  role: string;
  uid: number;
  isVerifiedByAdmin?: string;
}
