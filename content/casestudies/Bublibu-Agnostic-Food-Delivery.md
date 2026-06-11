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

## Overview

In early 2020, Bandung went quiet. Restaurants closed. Offices emptied. But food didn't stop moving, it just moved differently.

If you knew where to look, you'd find it in WhatsApp broadcasts from home cooks offering nasi padang by the portion. You'd find it in a new wave of courier operators small outfits, often just a few motorbikes and a group chat  who appeared almost overnight to fill the gap the major platforms couldn't or didn't want to fill. By mid-lockdown, we had identified at least ten of local courier operators active in Bandung alone:

- Ahsan Express
- Paketin
- Tiketux
- PHK Express
- BDOJEK and many others.

Nobody had planned for any of this. There was no press release, no launch event. It just emerged an informal economy of home sellers and homebrew couriers transacting outside every existing platform.

**That's where Bublibu started. Not with a pitch deck. With an observation.**

## **What we saw**

The home sellers we interviewed are:

- RumkayDago
- Bia Kombucha
- Ngombe Jamu
- Bebek Setan
- Dapur Sedap Nikmat

They'd already built workarounds. An instagram account, whatsapp DM manual coordination with those local courier.

Those seller and buyer were operating in stealth with messy transaction flow. No payment gateway, No delivery tracking, no Discovery page. And critically no high admin fees like GoFood or GrabFood would charge to give them one.

This was the thing that stuck with me: **the invisibility wasn't a sign that demand didn't exist. It was a sign that there was underserved market were exist**. These sellers had real buyers, real orders, and real delivery happening just completely outside any platform's visibility.

## **The problem**

GoFood and GrabFood are genuinely impressive logistical operations. But they carry a structural cost that gets passed down: proprietary driver fleets, managed centrally, with all the capital expenditure that implies. That cost lands on sellers as marketplace fees ranging from 20% to 40% per transaction.

For a restaurant with high average order values, that cut is painful but survivable. For a home cook selling food at IDR 20–35k a portion, it's often fatal to the unit economics. Thin margins, no marketing budget, no brand recognition beyond their neighborhood  a 20–40% fee doesn't just hurt, it excludes.

The result was an entire segment of active, productive sellers left operating informally through WhatsApp and personal networks not because they lacked buyers, but because no platform could serve them without pricing them out. That wasn't a niche. It was a structural gap. And it was the underservedmarket we were looking at.

## **The hypothesis**

If we can distribute the capital expenditure of maintaining a driver fleet hand it off to a network of already-existing local couriers do we have a structural chance to make marketplace fees meaningfully leaner?

That was the bet. Not "can we build a food delivery app." The question was whether the cost structure of food delivery was a fixed constraint or a design choice and whether an agnostic approach to logistics (plugging into couriers rather than owning them) could produce a fundamentally different fee model.

The timing mattered. These local courier operators weren't going away. They were scaling. Our assumption was that they'd mature and eventually expose the kind of APIs or integration-ready systems that a marketplace could actually plug into. Bublibu was designed around that trajectory, not just the present reality.

## **The smallest experiment we could afford**

We were a small team.

- A community manager,
- a UI/UX designer and product manager at the sametime (mysef),
- a graphic designer,
- two developers,
- a QA engineer

The team kept the bet as lean as possible. No fleet investment, no proprietary drivers, no capital expenditure on logistics infrastructure. Instead of building what GoFood and GrabFood had built, Bublibu was designed around it integrating with third-party courier APIs and treating local operators as a federated delivery layer the team didn't have to own.

The logic was straightforward: if the capex of maintaining a driver fleet could be distributed, that saving had somewhere to go. The team passed it down into lower marketplace fees and more affordable delivery costs for the sellers and buyers who needed it most.

That was the experiment. Not "can we build a food delivery app." Can we prove that the cost structure of food delivery is a design choice, not a fixed constraint.

*we believed this could work. We also knew it might not. The courier ecosystem was young, informal, and hadn't yet developed the infrastructure a marketplace would eventually need. Our bet was on a trajectory and trajectories can stall.*

What we were trying to learn wasn't just whether people would use the app. We were trying to learn whether the underlying structural hypothesis that fleet-agnostic delivery could compress fees enough to unlock this segment was real. The product was the instrument. The question was the point.

## **Why it was worth trying**

The invisible marketplace we observed in Bandung in 2020 wasn't unique to Bandung. Versions of it exist wherever formal platforms have left gaps wherever unit economics don't work, wherever seller margins are too thin, wherever the infrastructure cost of the dominant players prices out the people who most need a platform.

If the hypothesis was right, Bublibu wasn't just a food delivery app. It was a model for how marketplaces in informal economies could be built differently lean, federated, and structurally honest about what they were and weren't.

That felt worth building. Even if it didn't work

Read more on **how we designing the form of Bublibu**
