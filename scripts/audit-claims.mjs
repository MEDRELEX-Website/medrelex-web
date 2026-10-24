#!/usr/bin/env node

/**
 * MEDRELEX Claims Governance Audit Script
 * Enforces Section 2.3 of the MEDRELEX Content Claims Specification.
 *
 * Scans src/app/ and src/components/ for banned marketing claims:
 * - "FDA-approved" / "FDA-cleared"
 * - "clinically proven" / unverified "clinically validated"
 * - "guaranteed"
 * - "diagnoses"
 * - "predicts disease"
 * - "HIPAA-compliant" (as a factual guarantee)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const TARGET_DIRS = [
  path.join(ROOT_DIR, 'src', 'app'),
  path.join(ROOT_DIR, 'src', 'components'),
];

const EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs']);

const RULES = [
  {
    name: 'FDA-approved / FDA-cleared',
    pattern: /\bfda[- ](?:approved|cleared)\b/i,
    isExempt: (_line, context) =>
      /(?:not|never|neither|no|does\s+not|is\s+not)\s+.*?\bfda[- ](?:approved|cleared)\b/i.test(context),
  },
  {
    name: 'clinically proven',
    pattern: /\bclinically\s+proven\b/i,
    isExempt: () => false, // Strictly prohibited
  },
  {
    name: 'clinically validated',
    pattern: /\bclinically\s+validated\b/i,
    isExempt: (_line, context) =>
      /(?:not|neither|no|never|does\s+not|without)\s+.*?\bclinically\s+validated\b/i.test(context),
  },
  {
    name: 'guaranteed',
    pattern: /\bguaranteed\b/i,
    isExempt: (_line, context) =>
      /(?:does\s+not|do\s+not|not|never|cannot)\s+.*?\bguarantee/i.test(context),
  },
  {
    name: 'diagnoses',
    pattern: /\bdiagnoses\b/i,
    isExempt: (_line, context) =>
      /(?:do\s+not|does\s+not|without|no|not|never|cannot)\s+.*?\bdiagnos/i.test(context) ||
      /\bmedical\s+records,\s*diagnoses\b/i.test(context) ||
      context.includes('submit medical records, diagnoses'),
  },
  {
    name: 'predicts disease',
    pattern: /\bpredicts\s+disease\b/i,
    isExempt: (_line, context) =>
      /(?:does\s+not|without|no|not|never)\s+.*?\bpredict/i.test(context),
  },
  {
    name: 'HIPAA-compliant',
    pattern: /\bhipaa[- ]compliant\b/i,
    isExempt: (_line, context) =>
      /(?:does\s+not\s+claim|not\s+claim|not\s+hipaa|never)\b/i.test(context),
  },
];

function getAllFiles(dirPath, fileList = []) {
  if (!fs.existsSync(dirPath)) return fileList;

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      getAllFiles(fullPath, fileList);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if (EXTENSIONS.has(ext) && !entry.name.endsWith('.d.ts')) {
        fileList.push(fullPath);
      }
    }
  }
  return fileList;
}

function auditFiles() {
  console.log('🔍 Running MEDRELEX Claims Governance Audit (Specification Section 2.3)...\n');

  const files = TARGET_DIRS.flatMap((dir) => getAllFiles(dir));
  const violations = [];

  for (const filePath of files) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split(/\r?\n/);

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('import ') || trimmed.startsWith('export type')) {
        continue;
      }

      // Build context of surrounding lines for multi-line customer-facing sentences
      const prevLine = i > 0 ? lines[i - 1].trim() : '';
      const nextLine = i < lines.length - 1 ? lines[i + 1].trim() : '';
      const context = `${prevLine} ${trimmed} ${nextLine}`;

      for (const rule of RULES) {
        if (rule.pattern.test(trimmed)) {
          if (!rule.isExempt(trimmed, context)) {
            const relPath = path.relative(ROOT_DIR, filePath).replace(/\\/g, '/');
            violations.push({
              file: relPath,
              line: i + 1,
              rule: rule.name,
              snippet: trimmed,
            });
          }
        }
      }
    }
  }

  if (violations.length > 0) {
    console.error(`❌ Found ${violations.length} claims governance violation(s):\n`);
    for (const v of violations) {
      console.error(`  - ${v.file}:${v.line} [${v.rule}]`);
      console.error(`    Copy: "${v.snippet}"\n`);
    }
    console.error('Audit failed. Please revise copy to comply with Section 2.3 of the Claims Register.');
    process.exit(1);
  } else {
    console.log(`✓ Claims governance audit passed: 0 violations found across ${files.length} customer-facing files.\n`);
    process.exit(0);
  }
}

auditFiles();
