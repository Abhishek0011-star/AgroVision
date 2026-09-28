export type UserRole = 'farmer' | 'buyer';

export type Language = 'en' | 'hi' | 'mr';

export interface DefectItem {
  id: string;
  type: 'rotten' | 'sprouted' | 'undersized' | 'healthy';
  label: string;
  percentage: number;
  count: number;
  color: string;
  description: string;
}

export interface BoundingBox {
  id: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  width: number;
  height: number;
  type: 'rotten' | 'sprouted' | 'undersized';
  label: string;
  confidence: number;
  surface: 'top' | 'bottom';
  sizeMm?: number;
}

export interface ScanReport {
  id: string;
  date: string;
  lotNumber: string;
  farmerName: string;
  mandiLocation: string;
  variety: string;
  totalWeightKg: number;
  gradeAPercentage: number;
  ursPercentage: number;
  defects: {
    rotten: number;
    sprouted: number;
    undersized: number;
  };
  totalCount: number;
  estimatedPricePerKg: number;
  topViewImage: string;
  bottomViewImage: string;
  topBoxes: BoundingBox[];
  bottomBoxes: BoundingBox[];
  blockchainHash?: string;
  timestamp: number;
}

export interface MandiPrice {
  mandi: string;
  state: string;
  modalPrice: number;
  minPrice: number;
  maxPrice: number;
  change: number;
  arrivalsTon: number;
}
