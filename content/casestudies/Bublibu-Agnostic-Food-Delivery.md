---
title: Product Research Bublibu food delivery app
category: Problem to Product
description: Bublibu is an internal project at Paton.dev. An agnostic food delivery marketplace that connects drivers, tenants, and customers. without having any single fleet.
draft: false
focus: Strategy, Research, Product development, Startup
platform: iOs & Android
role: Lead Product Designer
seo:
  title: Bublibu Food delivery app marketplace
  description: Bublibu is an internal project at Paton.dev. An agnostic food delivery marketplace that connects drivers, tenants, and customers. without having any single fleet.
subcategories:
  - Strategy
  - UX Research
  - Design Thinking
timeline: 2021-2025
---

![Agnostic delivery app dashboard](/bublibu/bublibu-header.png){.rounded-2xl.border.border-black/10.shadow-lg.max-w-full.transition-all.duration-300 class="hover:scale-[1.01]"}

Fg01 1: Bublibu app release materials

## Context & Overview

In early 2020, Bandung went quiet. Restaurants closed and offices emptied, but food didn't stop moving it just moved differently. The movement shifted to **WhatsApp broadcasts** from home cooks and a new wave of local courier operators who appeared almost overnight to fill the gap major platforms couldn't, or wouldn't, fill. By mid-lockdown, an entirely informal economy had emerged, with at least ten active local courier operators in Bandung alone, transacting outside every existing platform.

Bublibu started here. Not with a pitch deck, but with an observation of this invisible, parallel market.

## Research Questions

Before writing a single line of code, we needed to understand the mechanics of this informal economy. Our product discovery was guided by three core questions:

- How might we provide home-sellers with structured marketplace features (discovery, tracking, payments) without crippling 20-40% commission fees?
- What are the specific friction points causing drop-offs in the current manual, WhatsApp-based transaction flows?
- Can an agnostic API integration with emerging local courier fleets serve as a viable, scalable alternative to maintaining proprietary logistics?

## Methodology

To validate that this invisibility was an underserved market rather than a lack of demand, we focused on qualitative discovery.

- **User Interviews:** We conducted deep-dive discussions with active home sellers, including RumkayDago, Bia Kombucha, Ngombe Jamu, Bebek Setan, and Dapur Sedap Nikmat.
- **Contextual Inquiry:** We observed their current workarounds, documenting the messy, manual coordination between Instagram DMs, WhatsApp chats, and local courier dispatching.
- **Ecosystem Mapping:** We mapped the operational capabilities of local couriers (Ahsan Express, Paketin, Tiketux, etc.) to gauge their readiness for future system integrations.

## Discoveries

Through our research, we separated the immediate user frustrations from the broader, structural market failures.

### User Needs (The Micro)

Sellers and buyers were operating in stealth out of necessity. Sellers were forced into highly manual, error-prone workflows. They lacked payment gateways, delivery tracking, and a centralized discovery page. However, they possessed real buyers, real orders, and consistent delivery volume.

### Market Gaps (The Macro)

Incumbent platforms like GoFood and GrabFood carry a heavy structural cost: proprietary driver fleets managed centrally. This capital expenditure is passed down as marketplace fees ranging from 20% to 40%. For a home cook selling portions at IDR 20–35k, this cut is fatal to their unit economics. The gap wasn't a lack of platform features; it was a logistics monopoly that priced out the grassroots market.

## Actionable Insights

The data pointed to a clear direction for the product architecture. Design and product strategy needed to act as the vital bridge linking raw backend functionality with real business survival.

- **Survival-First Margins:** Sellers cannot absorb traditional tech commissions. The system must operate on an ultra-lean or flat-fee model to be adopted.
- **Decentralized Logistics:** Local courier ecosystems are fragmented but rapidly scaling. The product architecture must be API-first to leverage these external operators.
- **The Missing Link:** The product's primary value proposition isn't food discovery; it is providing the missing trust and scalability infrastructure (tracking, payments) to an already active informal network.

## Hypothesis & Proposed Solution

**The Bet:** If we can distribute the capital expenditure of maintaining a driver fleet by handing it off to a network of existing local couriers, we have a structural chance to make marketplace fees meaningfully leaner.

The proposed solution, Bublibu, was designed to treat local operators as a federated delivery layer. We hypothesized that the cost structure of food delivery is a design choice, not a fixed constraint. By taking an agnostic approach to logistics—plugging into couriers rather than owning them—we could pass the operational savings directly down to the MSMEs.

## Validation & The Lean Experiment

To test this trajectory, we kept the experiment as lean as possible. Our cross-functional team consisted of just a community manager, a UI/UX designer/PM, a graphic designer, two developers, and a QA engineer.

- **Zero Fleet Investment:** We allocated zero capital expenditure to proprietary drivers or logistics infrastructure.
- **Third-Party Integration Testing:** We built the MVP strictly around integrating with third-party courier APIs, validating whether they were mature enough to handle automated marketplace routing.
- **Measuring the Structural Bet:** Success wasn't just acquiring users. The core validation metric was proving we could successfully route orders through a fleet-agnostic layer while maintaining a compressed fee model that sellers would actually adopt.

We believed this could work, but we also knew the courier ecosystem was young and informal. Bublibu wasn't just a food delivery app; it was a model for how marketplaces in informal economies could be built differently—lean, federated, and structurally honest.
