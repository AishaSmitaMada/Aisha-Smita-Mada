export enum UnitOfMeasure {
  KG = 'KG',
  LITER = 'L',
  UNIT = 'UNIT',
  GRAM = 'G'
}

export enum TransactionType {
  PURCHASE = 'PURCHASE',
  PRODUCTION_USE = 'PRODUCTION_USE',
  ADJUSTMENT = 'ADJUSTMENT',
  SALE = 'SALE'
}

export interface Ingredient {
  id: string;
  name: string;
  sku: string;
  unit: UnitOfMeasure;
  currentStock: number;
  standardCost: number; // Standard cost per unit
  lastPurchasePrice: number;
  expiryAlertDays: number; // Days before expiry to alert
}

export interface Lot {
  id: string;
  ingredientId: string;
  quantity: number;
  receivedDate: string;
  expiryDate: string;
  costBasis: number; // Actual cost for this specific lot (FIFO support)
}

export interface BoMItem {
  ingredientId: string;
  quantity: number;
  wastePercentage: number;
}

export interface Recipe {
  id: string;
  name: string;
  version: string;
  yieldUnits: number;
  baseLaborHours: number;
  items: BoMItem[];
  instructions: string;
  isActive: boolean;
}

export interface ProductionOrder {
  id: string;
  recipeId: string;
  status: 'PLANNED' | 'IN_PROGRESS' | 'QUALITY_CHECK' | 'COMPLETED';
  quantityToProduce: number;
  startDate: string;
  dueDate: string;
  assignedTo?: string;
}

export interface CostAnalysis {
  materialCost: number;
  laborCost: number;
  overheadCost: number;
  totalUnitCost: number;
}