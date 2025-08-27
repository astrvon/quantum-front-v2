export interface IBankType {
  id: string;
  name: string;
  bankCode: string;
  isActive: boolean;

  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}
