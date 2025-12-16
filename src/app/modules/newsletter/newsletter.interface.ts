export interface INewsletter {
  email: string;
}


export type SendResult = {
  sent: number;
  failed: number;
  errors?: Array<{ email: string; error: any }>;
  info?: any;
};