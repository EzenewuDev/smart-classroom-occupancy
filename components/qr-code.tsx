'use client';

import React, { useMemo } from 'react';

// Simple QR-like matrix generator for room availability info
// Uses a deterministic pattern based on room data
function generateQRMatrix(data: string, size: number = 21): boolean[][] {
  const matrix: boolean[][] = Array(size).fill(null).map(() => Array(size).fill(false));

  // Finder patterns (top-left, top-right, bottom-left)
  const finderPatterns = [[0, 0], [size - 7, 0], [0, size - 7]];
  finderPatterns.forEach(([row, col]) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4)) {
          matrix[row + r][col + c] = true;
        }
      }
    }
  });

  // Timing patterns
  for (let i = 8; i < size - 8; i++) {
    matrix[6][i] = i % 2 === 0;
    matrix[i][6] = i % 2 === 0;
  }

  // Encode data into the remaining cells using a simple hash
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    hash = ((hash << 5) - hash + data.charCodeAt(i)) | 0;
  }

  let dataIdx = 0;
  for (let col = size - 1; col >= 0; col -= 2) {
    if (col === 6) col--;
    for (let row = size - 1; row >= 0; row--) {
      for (let c = 0; c < 2; c++) {
        const actualCol = col - c;
        const actualRow = ((col + 1) % 4 < 2) ? (size - 1 - row) : row;
        if (actualRow >= 0 && actualRow < size && !matrix[actualRow][actualCol]) {
          // Use hash bits to determine cell value
          const bit = (hash >>> (dataIdx % 32)) & 1;
          matrix[actualRow][actualCol] = bit === 1;
          hash = ((hash << 1) | (hash >>> 31)) ^ (dataIdx * 7 + actualRow * 13 + actualCol * 17);
          dataIdx++;
        }
      }
    }
  }

  return matrix;
}

interface QRCodeProps {
  value: string;
  size?: number;
  className?: string;
  color?: string;
  bgColor?: string;
}

export function QRCode({ value, size = 160, className = '', color = '#1e40af', bgColor = '#ffffff' }: QRCodeProps) {
  const matrix = useMemo(() => generateQRMatrix(value, 21), [value]);
  const cellSize = size / 23; // include quiet zone

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="QR Code"
    >
      {/* Background */}
      <rect width={size} height={size} fill={bgColor} rx="4" />

      {/* QR Matrix cells */}
      {matrix.map((row, r) =>
        row.map((cell, c) =>
          cell ? (
            <rect
              key={`${r}-${c}`}
              x={(c + 1) * cellSize}
              y={(r + 1) * cellSize}
              width={cellSize}
              height={cellSize}
              fill={color}
            />
          ) : null
        )
      )}
    </svg>
  );
}
