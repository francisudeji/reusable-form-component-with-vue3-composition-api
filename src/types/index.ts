export interface Values {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  tos: boolean;
}

export type Errors = {
  [key in keyof Values]?: string;
};
