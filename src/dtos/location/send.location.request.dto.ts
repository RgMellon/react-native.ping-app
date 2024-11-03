export type SendMyLocationDto = {
  userId: string;
  location: {
    latitude: number;
    longitude: number;
  };
};
