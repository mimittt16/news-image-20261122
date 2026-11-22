// News-image entry for 22 November 2026: the day's front page lives in this
// repository as entry.png, and this program delivers a copy to the output
// directory the grader reads. Before writing it validates the embedded
// image: PNG signature, at most 1 MiB, at most 1024x1024 px (competition
// limits). Run it locally with:
//   MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const MAX_BYTES = 1048576;
const MAX_DIMENSION = 1024;
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const source = new URL('./entry.png', import.meta.url);

// Validate the embedded image before writing anything.
const bytes = readFileSync(source);
if (!bytes.subarray(0, 8).equals(PNG_SIGNATURE)) {
  throw new Error('entry.png is not a PNG (bad signature)');
}
if (bytes.length > MAX_BYTES) {
  throw new Error(`entry.png is ${bytes.length} bytes, over the ${MAX_BYTES} byte limit`);
}
const width = bytes.readUInt32BE(16);
const height = bytes.readUInt32BE(20);
if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
  throw new Error(`entry.png is ${width}x${height}, over the ${MAX_DIMENSION}x${MAX_DIMENSION} limit`);
}

if (bytes.subarray(12, 16).toString('ascii') !== 'IHDR') {
  throw new Error('entry.png has no IHDR chunk where the header should be');
}

// Verify the IHDR chunk's CRC32, so a corrupted header is refused, and
// confirm the file ends with a proper IEND trailer, so a truncated PNG
// is refused. CRC32 (IEEE 802.3) over the chunk type + data.
const crcTable = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  return table;
})();
const crc32 = (buf) => {
  let c = 0xffffffff;
  for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};
const ihdrCrc = bytes.readUInt32BE(29);
if (crc32(bytes.subarray(12, 29)) !== ihdrCrc) {
  throw new Error('entry.png IHDR chunk CRC mismatch');
}
const iend = bytes.subarray(bytes.length - 12);
if (iend.readUInt32BE(0) !== 0 || iend.subarray(4, 8).toString('ascii') !== 'IEND') {
  throw new Error('entry.png has no IEND trailer');
}

mkdirSync(outDir, { recursive: true });
copyFileSync(source, join(outDir, 'entry.png'));
const written = statSync(join(outDir, 'entry.png')).size;
if (written !== bytes.length) {
  throw new Error(`copied entry.png is ${written} bytes, expected ${bytes.length}`);
}
console.log(`wrote entry.png (${written} bytes, ${width}x${height})`);
