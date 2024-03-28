export interface PaintResponse {
  response: Paint[];
}

export interface Paint {
  id: number;
  color: string;
  status: string;
}
