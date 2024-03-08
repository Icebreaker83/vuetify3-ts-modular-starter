export interface Alert {
  type: string;
  message: string;
  title?: string;
}

export interface IndexedAlert extends Alert {
  id: number;
}
