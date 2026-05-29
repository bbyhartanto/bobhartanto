---
title: Double sided app as lean solution for marketplace app
category: Problem to Product
description: Early stages startup struggle with the development cost, I design double sided interface Buyer and Merchant to reduce development cost at validation phase.
navigation:
  title: Lean Marketplace app development strategy
  description: Early stages startup struggle with the development cost, I design double sided interface Buyer and Merchant to reduce development cost at validation phase.
seo:
  title: Lean Marketplace app development strategy
  description: Early stages startup struggle with the development cost, I design double sided interface Buyer and Merchant to reduce development cost at validation phase.
subcategories:
  - Design Thinking
  - Strategy
  - UX Research
  - Prototyping
---

#

**The Problem No One Talks About**

Early-stage startups don't just struggle with product-market fit. They struggle with a more immediate question: *how do you validate a two-sided marketplace without building two separate apps?*

That was the situation with Bublibu, a food delivery app with two distinct user groups — buyers who want to discover and order food, and merchants who need to manage their listings and incoming orders. In theory, two audiences means two products. In practice, that means double the cost, double the timeline, and double the risk during a phase where nothing is proven yet.

**The Constraint Becomes the Brief**

When development budget and timeline are tight, compromise is inevitable. The question is: *where do you compromise without breaking the product?*

The answer wasn't to strip features or cut corners on either side. It was to rethink the architecture entirely. Instead of two apps running in parallel, I designed a single app that could carry two distinct identities — one for buyers, one for merchants — with a clean mechanism to switch between them.

**Isolating Two Worlds in One Shell**

The core challenge was information architecture. A buyer and a merchant have completely different mental models, different tasks, and different information hierarchies. Putting them in the same app without clear separation would create confusion. Putting them in separate apps would create cost.

The solution was a profile switcher — a deliberate, intentional role toggle that signals to the user: *you are now in a different mode*. When a user switches to merchant mode, the navigation changes, the content changes, the entire context shifts. It's the same account, the same session, but a completely different interaction surface.

This wasn't just a UI pattern. It was an architectural decision. Every screen, flow, and data layer had to be cleanly scoped to a role. Nothing bleeds across. A merchant's order management view never leaks into the buyer's browsing experience.

**Why This Mattered at the Validation Stage**

At early validation, the goal isn't a perfect product. It's learning — fast, cheaply, with real users on both sides of the market. A double-sided interface made that possible without the overhead of maintaining two codebases, two deployment pipelines, or two sets of onboarding flows.

The tradeoff was clear: some UX complexity in exchange for significant engineering efficiency. And at this stage, that's a trade worth making.

**What It Demonstrated**

This project wasn't just about saving money. It showed that design decisions can carry strategic weight. Knowing when to consolidate, where to draw the line between roles, and how to make that transition feel seamless — that's the kind of thinking that keeps early products alive long enough to grow.
