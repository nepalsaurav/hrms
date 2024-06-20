export interface HeaderColumns {
  name: string;
  displayName: string;
  type: string;
}

export interface SearchDataProps {
  name: string;
  label: string;
  type: string;
  colSize: string;
  placeholder?: string;
  firstDate?: boolean;
  secondDate?: boolean;
}
