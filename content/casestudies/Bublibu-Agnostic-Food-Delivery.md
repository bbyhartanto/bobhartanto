---
title: The Discovery of Bublibu agnostic food delivery marketplace
category: Problem to Product
description: Bublibu is an internal project at Paton.dev. An agnostic food delivery marketplace that connects drivers, tenants, and customers. without having any single fleet.
excerpt: Bublibu is an internal project at Paton.dev. An agnostic food delivery marketplace that connects drivers, tenants, and customers. without having any single fleet.
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

## Overview

Bublibu was an internal product initiative at [Paton.dev](http://Paton.dev), born during the COVID-19 lockdown period in Bandung, Indonesia. It was a food delivery marketplace with one radical design principle:**no owned drivers**\[. Instead, Bublibu was built to plug into a newly emerging ecosystem of homebrew local couriers — independent logistics operators who appeared almost overnight when the pandemic paralyzed established supply chains.

The project explored a deceptively simple hypothesis:

*Can a food delivery marketplace be structurally leaner if it distributes the capital expenditure of owning a driver fleet?*

## My Role on the Team

Bublibu was built by a team of six: a community manager, a UI/UX designer, a graphic designer, two developers, a QA engineer and one business owner and as a venture from Paton.dev. All working autonomusly in Bandung. I was the product researcher, and sat upstream of all of them. i report directly all of my findings and progress directly to the business owner and distribute the work to my co-worker.

That position is worth unpacking, because it shaped everything else.

**I had no direct deliverable in the traditional sense.** I wasn't designing screens, writing code, or managing community. My output was the thinking that determined what everyone else worked on — and in a greenfield internal project with no existing brief, no prior market data, and no product to iterate on, that upstream role carried the most ambiguity and the most consequence.

Specifically, here is what I owned end to end:

**Market identification.** No one assigned me a market to study. I identified the invisible marketplace — home sellers and emerging couriers — through direct observation during the lockdown. The team built a product for a market I named and framed from scratch.

**Hypothesis formulation.** The "no owned fleet" architectural decision originated from my research into the unit economics of food delivery platforms. I brought that framing to the team and to leadership as a product thesis, not just an observation.

**Actor mapping.** I defined who the three users were (home seller, local courier, buyer), what each needed, and where the friction lived for each. This became the foundation that the UI/UX designer used to structure flows, and the developers used to architect the system.

**Research-to-design handoff.** I worked directly with the UI/UX designer to translate research findings into design constraints — for example, the decision to make seller onboarding extremely lightweight came directly from what I learned about how home sellers operated. Research didn't end when design began.

**Product framing for leadership.** Because this was an internal venture, I also played a role in communicating the product direction to the company. The community manager's work in reaching home sellers and local courier operators was grounded in the user profiles I had developed.

**What I didn't do** is equally worth stating. I didn't art-direct the visual design — that was the UI/UX and graphic designer's domain. I didn't manage the sprint cadence or QA process. My role was to make sure the team was building the right thing, not to manage how they built it.

In a small team on an undefined project, the researcher's job is to replace chaos with clarity. That's what I tried to do here.

## Context: The Invisible Marketplace

During the COVID-19 lockdown, two parallel economies silently emerged in Bandung:

**1. Home-based food sellers** Mothers and home cooks who had always sold food — through WhatsApp broadcasts, personal networks, and word of mouth — continued doing so. They weren't new entrepreneurs. They were existing micro-sellers operating without any digital platform infrastructure.

**2. Homebrew courier operators** With millions unemployed and movement restricted, a new category of logistics actor emerged: small-scale, locally operated courier businesses with no prior infrastructure. Within months, Bandung alone had at least **10 identifiable new local courier operators**, including:

- Ahsan Express
- Paketin
- Tiketux
- PHK Express
- BDOJEK

These operators filled a genuine gap. They were moving packages — mostly food — between homes, at a time when the major platforms either couldn't reach or weren't servicing their neighborhoods.

**The core observation:** Significant transaction volume was flowing through an ecosystem that had no formal marketplace, no discoverability layer, and no digital infrastructure. We called this the **invisible marketplace**.

## Problem Statement

Existing food delivery giants — GoFood, GrabFood — operated with high marketplace fees, partially driven by the massive capital expenditure of maintaining proprietary driver fleets. This made it structurally difficult for small home-based sellers, with thin margins and low average order values, to participate profitably.

Meanwhile, a new wave of local couriers existed and was scaling organically — but remained invisible, informal, and unintegrated.

**The gap:** No platform existed that could serve the home seller segment while leveraging this emerging courier infrastructure — without rebuilding what the giants had already built.

## Our Hypothesis

> *If we can distribute the capex of nurturing our own driver fleet, we have a structural chance to make marketplace fees meaningfully leaner.*

This led to Bublibu's core architectural decision: **build zero driver infrastructure**. Instead, integrate with local couriers as logistics partners, effectively treating them as a federated fleet.

This was not just a cost decision — it was a bet on the trajectory of the local courier ecosystem. Our assumption was that these operators would mature, scale, and eventually expose APIs or integration-ready systems that Bublibu could consume.

## Research Process

### Phase 1 — Field Observation

Rather than starting with existing data (none existed for this market), research began with direct observation. We documented the emergence of local courier operators in Bandung by name, reach, and operating model. We identified at least 10 active operators during the lockdown period.

This was ethnographic product research — understanding a market that had no prior literature, no comparable case studies, and no playbook.

### Phase 2 — User Identification

We identified three distinct user actors:

ActorPainWhat they neededHome seller (ibu rumahan)No digital storefront, limited reach, relied on WhatsAppA lightweight way to publish their food to a wider audienceLocal courierNo aggregation platform, no steady demand pipelineConsistent order volume and discoverabilityBuyerWanted local, home-cooked food that platforms didn't offerAccess to informal sellers with reliable last-mile delivery

### Phase 3 — Competitive Analysis

We mapped the structural cost model of major food delivery platforms — specifically the relationship between driver fleet ownership, operational overhead, and marketplace fee percentage. This informed our core thesis that eliminating driver fleet capex could compress the fee structure.

### Phase 4 — Concept Validation

We prototyped the seller onboarding flow and delivery request flow, with the courier integration designed as an open slot — ready to plug into partner APIs as they became available.

### 4. Underserved segments often look invisible

Home sellers broadcasting on WhatsApp had been operating for years. They weren't waiting for a platform — they had built workarounds. Good product research uncovers workarounds, because workarounds reveal real demand that formal solutions have failed to serve.

### 5. Hypothesis-first product development

Rather than building features, we built around a thesis. This created internal alignment and helped the team make design decisions coherently — every feature was evaluated against whether it supported or diluted the core hypothesis.

## Reflection

Bublibu didn't become a commercial product. But the exercise produced something more durable: a framework for thinking about marketplace design in constrained, informal economies. The invisible marketplace we observed in Bandung in 2020 was not unique — versions of it exist in every city where formal platforms have left gaps.

The project demonstrated that you don't need proprietary infrastructure to build a marketplace. You need a clear hypothesis, a real user who is underserved, and the discipline to design for them specifically.

---

*Case study written by Bob Hartanto — Product Researcher & Product Designer at&#x20;**[Paton.dev](http://Paton.dev)**&#x20;Published at bobhartanto.com/casestudies/bublibu-agnostic-food-delivery*
