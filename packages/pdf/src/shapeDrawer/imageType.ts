/**
 * ImageType
 *
 * Created by sunvisor on 2024/03/20.
 * Copyright (C) Sunvisor Lab. 2024.
 */
import fs from 'fs';

export function isSVGFile(filePath: string) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const content = data.toString();
    return content.includes('<svg') && content.includes('</svg>');
  } catch (error) {
    throw new Error(`Failed to read file: ${error}`);
  }
}

export function isPngFile(filePath: string): boolean {
  const fileHeaderSize = 8; // PNG signature is 8 bytes
  const fileBuffer = Buffer.alloc(fileHeaderSize);
  const fileDescriptor = fs.openSync(filePath, 'r');

  try {
    fs.readSync(fileDescriptor ,fileBuffer, 0, fileHeaderSize, 0);
    return fileBuffer.toString('hex') === '89504e470d0a1a0a'; // PNG signature
  } finally {
    fs.closeSync(fileDescriptor);
  }
}

export function isJPEGFile(filePath: string): boolean {
  const fileHeaderSize = 2; // JPEG signature is 2 bytes
  const fileBuffer = Buffer.alloc(fileHeaderSize);
  const fileDescriptor = fs.openSync(filePath, 'r');

  try {
    fs.readSync(fileDescriptor, fileBuffer, 0, fileHeaderSize, 0);
    return fileBuffer.toString('hex') === 'ffd8'; // JPEG signature
  } finally {
    fs.closeSync(fileDescriptor);
  }
}

