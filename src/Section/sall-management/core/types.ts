export interface SaleListing {
  id: string;
  cropName: string;
  variety: string;
  quantity: string;
  unit: string;
  pricePerUnit: string;
  market: string;
  quality: string;
  harvestDate: string;
  contactNumber: string;
  description: string;
  images: string[];
  sellerName?: string;
  sold: boolean;
  createdAt: string;
}

export interface ProductComment {
    id: string;
    author: string;
    text: string;
    createdAt: string;
}