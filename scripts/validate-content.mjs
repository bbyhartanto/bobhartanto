#!/usr/bin/env node
/**
 * validate-content.mjs
 *
 * Validates case study markdown frontmatter against categories.json.
 * Run manually: npm run validate
 * Runs automatically: as a git pre-commit hook (see .git/hooks/pre-commit)
 *
 * What it checks:
 *  - `category` must be one of the names in categories.json
 *  - Each item in `subcategories` must be one of the subcategories in categories.json
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

// ── Load master data from categories.json ────────────────────────────────────
const categoriesRaw = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'content/categories.json'), 'utf8')
)
const validCategories    = categoriesRaw.items.map(i => i.name)
const validSubcategories = categoriesRaw.items.flatMap(i => i.subcategories)

// ── Parse YAML frontmatter (simple, no extra deps needed) ────────────────────
function parseFrontmatter(fileContent) {
  const match = fileContent.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return {}

  const yaml = match[1]
  const result = {}

  // Parse `key: value` pairs (single-line)
  for (const line of yaml.split('\n')) {
    const kv = line.match(/^(\w+):\s*(.+)$/)
    if (kv) result[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, '')
  }

  // Parse `subcategories:` array block
  const arrayMatch = yaml.match(/subcategories:\n((?:  - .+\n?)+)/)
  if (arrayMatch) {
    result.subcategories = arrayMatch[1]
      .split('\n')
      .filter(l => l.trim().startsWith('- '))
      .map(l => l.replace(/^\s*- /, '').trim())
  }

  return result
}

// ── Collect all case study markdown files ────────────────────────────────────
function getMarkdownFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  return entries.flatMap(e =>
    e.isDirectory()
      ? getMarkdownFiles(path.join(dir, e.name))
      : e.name.endsWith('.md') ? [path.join(dir, e.name)] : []
  )
}

const casestudiesDir = path.join(ROOT, 'content/casestudies')
const files = getMarkdownFiles(casestudiesDir)

// ── Validate each file ───────────────────────────────────────────────────────
let hasErrors = false

for (const filePath of files) {
  const content = fs.readFileSync(filePath, 'utf8')
  const fm = parseFrontmatter(content)
  const relPath = path.relative(ROOT, filePath)
  const errors = []

  // Check category
  if (fm.category && !validCategories.includes(fm.category)) {
    errors.push(
      `  ✗ category: "${fm.category}" is not valid.\n` +
      `    Valid values: ${validCategories.map(v => `"${v}"`).join(', ')}`
    )
  }

  // Check each subcategory
  if (Array.isArray(fm.subcategories)) {
    for (const sub of fm.subcategories) {
      if (!validSubcategories.includes(sub)) {
        errors.push(
          `  ✗ subcategories: "${sub}" is not valid.\n` +
          `    Valid values: ${validSubcategories.map(v => `"${v}"`).join(', ')}`
        )
      }
    }
  }

  if (errors.length > 0) {
    hasErrors = true
    console.error(`\n❌ ${relPath}`)
    errors.forEach(e => console.error(e))
  }
}

if (hasErrors) {
  console.error('\n🚫 Content validation failed. Fix the errors above before committing.\n')
  process.exit(1)
} else {
  console.log(`✅ All ${files.length} case stud${files.length === 1 ? 'y' : 'ies'} passed validation.`)
}
