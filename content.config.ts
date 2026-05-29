import { defineContentConfig, defineCollection, z } from '@nuxt/content'
// ─── Single Source of Truth ──────────────────────────────────────────────────
// Import categories.json so the schema enum values are DERIVED from it (updated).
import categoriesData from './content/categories.json'

const categoryNames = categoriesData.items.map(i => i.name) as [string, ...string[]]
const subcategoryNames = categoriesData.items.flatMap(i => i.subcategories) as [string, ...string[]]
// ─────────────────────────────────────────────────────────────────────────────

export default defineContentConfig({
  collections: {
    // 1. Register standard markdown pages (like index, about in the root)
    content: defineCollection({
      type: 'page',
      source: '*.md', // Matches index.md and about.md in root
    }),



    // 3. Register Master Data for Categories (from categories.json)
    categories: defineCollection({
      type: 'data',
      source: 'categories.json',
      schema: z.object({
        items: z.array(
          z.object({
            name: z.string(),
            subcategories: z.array(z.string()),
            Quotes: z.array(z.string())
          })
        )
      })
    }),

    // 4. Register Case Studies (from casestudies/ folder)
    casestudies: defineCollection({
      type: 'page',
      source: 'casestudies/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string().editor({
          input: 'textarea',
          label: 'Description'
        }),
        excerpt: z.string().optional().editor({
          input: 'textarea',
          label: 'Excerpt'
        }),
        quotes: z.string().optional().editor({
          input: 'textarea',
          label: 'Quotes'
        }),

        // Dropdown — options derived from categories.json at build time
        category: z.enum(categoryNames).editor({
          label: 'Category'
        }),

        // Multi-select — options derived from categories.json at build time
        // Adding a subcategory to categories.json auto-adds it here too
        subcategories: z.array(
          z.enum(subcategoryNames)
        ).default([]).editor({
          label: 'Subcategories'
        }),

        role: z.string().optional().editor({
          label: 'Role',
          description: 'Your role in the project (e.g. Product Design Lead)'
        }),
        timeline: z.string().optional().editor({
          label: 'Timeline',
          description: 'Project timeline (e.g. 2026)'
        }),
        platform: z.string().optional().editor({
          label: 'Platform',
          description: 'Project platforms (e.g. Web & Mobile)'
        }),
        focus: z.string().optional().editor({
          label: 'Focus',
          description: 'Areas of focus (e.g. Strategy & Research)'
        })
      })
    })
  },
})



