export interface taskModel{
  createdAt: number;
  state:     boolean | null | string;
  title:     string;
  id:        string;
  email?:    string;
  password?: string;
  inputFocused?: boolean;
}

export interface filteredModel {
  tasks: taskModel[];
  totalItems: number;
}
