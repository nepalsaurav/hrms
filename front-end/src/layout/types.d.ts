export interface ShowSelectedItemsProps {
  selectedItems: Set<string>;
  collectionName: string;
  onDeleteSuccess: () => void;
}

export interface PaginationProps {
  currentPage: number | undefined;
  totalPages: number | undefined;
}

export interface AutoCompleteData {
  key: string;
  value: string;
}
