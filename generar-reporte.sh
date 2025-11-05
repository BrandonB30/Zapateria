#!/bin/bash
# Script para generar y abrir el reporte de pruebas

echo "📊 Generando reporte de pruebas..."

# Ejecutar pruebas con cobertura
npm run test:coverage

# Si existe el reporte de cobertura de Jest, abrirlo
if [ -f "coverage/index.html" ]; then
    echo "✅ Abriendo reporte de cobertura de Jest..."
    open coverage/index.html
else
    echo "⚠️  Reporte de Jest no disponible, abriendo reporte manual..."
    open src/pruebas/reporte.html
fi

echo "✅ Reporte abierto en el navegador"

