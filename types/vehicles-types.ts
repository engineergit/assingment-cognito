export interface VehiclePayload {
  id?: number;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  imageUrl: string;
}

export interface VehicleRequestPayload {
  make: string;
  model: string;
  year: number | null;
  licensePlate: string;
}
