import { Request, Response, NextFunction } from 'express';

/**
 * Validación y sanitización de datos de entrada
 * Previene inyección de datos maliciosos
 */

export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Valida que productId sea un número válido y positivo
 */
export function validateProductId(req: Request, res: Response, next: NextFunction): void {
  const { productId } = req.body;
  
  if (productId === undefined || productId === null) {
    res.status(400).json({ error: 'productId es requerido' });
    return;
  }
  
  const id = Number(productId);
  if (isNaN(id) || id <= 0 || !Number.isInteger(id)) {
    res.status(400).json({ error: 'productId debe ser un número entero positivo' });
    return;
  }
  
  req.body.productId = id;
  next();
}

/**
 * Valida que qty sea un número válido y positivo
 */
export function validateQuantity(req: Request, res: Response, next: NextFunction): void {
  const { qty } = req.body;
  
  if (qty === undefined || qty === null) {
    res.status(400).json({ error: 'qty es requerido' });
    return;
  }
  
  const quantity = Number(qty);
  if (isNaN(quantity) || quantity <= 0 || !Number.isInteger(quantity)) {
    res.status(400).json({ error: 'qty debe ser un número entero positivo' });
    return;
  }
  
  // Limitar cantidad máxima para prevenir abuso
  if (quantity > 100) {
    res.status(400).json({ error: 'La cantidad máxima permitida es 100' });
    return;
  }
  
  req.body.qty = quantity;
  next();
}

/**
 * Valida que el ID en los parámetros sea un número válido
 */
export function validateIdParam(req: Request, res: Response, next: NextFunction): void {
  const { id } = req.params;
  const idNum = Number(id);
  
  if (isNaN(idNum) || idNum <= 0 || !Number.isInteger(idNum)) {
    res.status(400).json({ error: 'ID inválido' });
    return;
  }
  
  req.params.id = String(idNum);
  next();
}

/**
 * Sanitiza strings para prevenir XSS
 */
export function sanitizeString(str: string): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/[<>]/g, '')
    .trim();
}

