export type CreateNewOrderDto = {
  userId: string;
  amount: number;
  description: string;
  status?: string;
  location: {
    latitude: number;
    longitude: number;
  };
};
