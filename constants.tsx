import { Ingredient, Recipe, UnitOfMeasure, ProductionOrder, Lot } from './types';
import { 
  Wheat, 
  Droplet, 
  Egg, 
  Cookie, 
  Croissant, 
  Users, 
  Package, 
  AlertTriangle 
} from 'lucide-react';
import React from 'react';

export const MOCK_INGREDIENTS: Ingredient[] = [
  { id: 'ING-001', name: 'Premium Bread Flour', sku: 'RM-FL-01', unit: UnitOfMeasure.KG, currentStock: 450, standardCost: 1.20, lastPurchasePrice: 1.25, expiryAlertDays: 30 },
  { id: 'ING-002', name: 'Unsalted Butter', sku: 'RM-DA-01', unit: UnitOfMeasure.KG, currentStock: 80, standardCost: 8.50, lastPurchasePrice: 8.75, expiryAlertDays: 14 },
  { id: 'ING-003', name: 'Whole Milk', sku: 'RM-DA-02', unit: UnitOfMeasure.LITER, currentStock: 120, standardCost: 1.10, lastPurchasePrice: 1.10, expiryAlertDays: 5 },
  { id: 'ING-004', name: 'Cane Sugar', sku: 'RM-SW-01', unit: UnitOfMeasure.KG, currentStock: 200, standardCost: 0.90, lastPurchasePrice: 0.95, expiryAlertDays: 365 },
  { id: 'ING-005', name: 'Organic Eggs', sku: 'RM-DA-03', unit: UnitOfMeasure.UNIT, currentStock: 1000, standardCost: 0.25, lastPurchasePrice: 0.28, expiryAlertDays: 10 },
  { id: 'ING-006', name: 'Dark Chocolate 70%', sku: 'RM-CH-01', unit: UnitOfMeasure.KG, currentStock: 40, standardCost: 12.00, lastPurchasePrice: 12.50, expiryAlertDays: 180 },
];

export const MOCK_RECIPES: Recipe[] = [
  {
    id: 'RCP-001',
    name: 'Artisan Croissant',
    version: '1.2',
    yieldUnits: 50,
    baseLaborHours: 4,
    isActive: true,
    instructions: 'Laminate dough with butter block. Chill for 2 hours between folds.',
    items: [
      { ingredientId: 'ING-001', quantity: 2.5, wastePercentage: 0.02 },
      { ingredientId: 'ING-002', quantity: 1.2, wastePercentage: 0.01 },
      { ingredientId: 'ING-003', quantity: 0.8, wastePercentage: 0.01 },
      { ingredientId: 'ING-004', quantity: 0.3, wastePercentage: 0 },
    ]
  },
  {
    id: 'RCP-002',
    name: 'Pain au Chocolat',
    version: '1.0',
    yieldUnits: 40,
    baseLaborHours: 4.5,
    isActive: true,
    instructions: 'Standard croissant dough base. Insert chocolate batons before final roll.',
    items: [
      { ingredientId: 'ING-001', quantity: 2.5, wastePercentage: 0.02 },
      { ingredientId: 'ING-002', quantity: 1.2, wastePercentage: 0.01 },
      { ingredientId: 'ING-006', quantity: 0.8, wastePercentage: 0 },
    ]
  },
];

export const MOCK_ORDERS: ProductionOrder[] = [
  { id: 'WO-2023-881', recipeId: 'RCP-001', status: 'IN_PROGRESS', quantityToProduce: 200, startDate: '2023-10-27', dueDate: '2023-10-28', assignedTo: 'Shift A' },
  { id: 'WO-2023-882', recipeId: 'RCP-002', status: 'PLANNED', quantityToProduce: 150, startDate: '2023-10-28', dueDate: '2023-10-29', assignedTo: 'Shift B' },
  { id: 'WO-2023-880', recipeId: 'RCP-001', status: 'COMPLETED', quantityToProduce: 100, startDate: '2023-10-26', dueDate: '2023-10-26', assignedTo: 'Shift A' },
];

export const MOCK_LOTS: Lot[] = [
  { id: 'LOT-BF-992', ingredientId: 'ING-001', quantity: 200, receivedDate: '2023-10-01', expiryDate: '2024-04-01', costBasis: 1.15 },
  { id: 'LOT-BF-998', ingredientId: 'ING-001', quantity: 250, receivedDate: '2023-10-15', expiryDate: '2024-04-15', costBasis: 1.25 },
  { id: 'LOT-MK-001', ingredientId: 'ING-003', quantity: 120, receivedDate: '2023-10-25', expiryDate: '2023-10-31', costBasis: 1.10 },
];

export const ICON_MAP: Record<string, React.ReactNode> = {
  'ING-001': <Wheat className="w-4 h-4" />,
  'ING-002': <Package className="w-4 h-4" />,
  'ING-003': <Droplet className="w-4 h-4" />,
  'ING-004': <Package className="w-4 h-4" />,
  'ING-005': <Egg className="w-4 h-4" />,
  'ING-006': <Cookie className="w-4 h-4" />,
};

// Simulated overhead rate per labor hour
export const OVERHEAD_RATE_PER_HOUR = 25.00;
export const LABOR_RATE_PER_HOUR = 18.50;