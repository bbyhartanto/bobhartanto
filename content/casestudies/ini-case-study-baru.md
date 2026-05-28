---
title: No Password
category: Problem to Product
description: User has so many password to remember, during the development process of bublibu we remove password and just OTP right away, it's reduce recall system in user cognitive load
seo:
  title: Ini case study baru file
  description: lorem ipsum dolor sit amet lorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit ametlorem ipsum dolor sit amet
subcategories:
  - Strategy
---

#

**One Less Thing to Remember**

Passwords are a solved problem in the worst possible way. Users either reuse the same weak password everywhere, forget it and hit "reset," or store it somewhere they'll also forget. For an app still trying to prove its value such as Bublibu, adding that friction at the front door is a quiet way to lose people before they even get started.

During the development of Bublibu, we made an early call: no passwords.

**The Cognitive Argument**

Every time a user has to recall something — an account number, a preference, a password — they're spending mental energy that isn't going toward your product. This is recall load: the cost of retrieving something from memory rather than simply recognizing it in front of you.

Passwords sit at the worst end of this spectrum. They're arbitrary strings with no inherent meaning, often different across every service, and frequently subject to rules that make them harder to remember without making them meaningfully more secure. For a food delivery app competing for a few seconds of a hungry user's attention, that's a cost we couldn't justify.

**The Decision: OTP Only**

We replaced the password login entirely with OTP — a one-time code sent to the user's phone number. No account creation flow asking them to invent and confirm a password. No "forgot password" loop. No password requirements banner. Just: enter your number, get a code, you're in.

The cognitive shift is significant. Instead of asking the user to *remember* something, we're asking them to *check* something. That's a fundamentally easier task. Recognition over recall — the user's phone becomes the authentication layer, and most people already trust it.

**What Gets Removed**

Removing passwords isn't just a UX simplification. It removes an entire category of failure states:

- No incorrect password errors
- No account lockouts
- No password reset emails going to spam
- No friction for users returning after weeks away

For a product in early validation, fewer failure states means cleaner signal. When a user drops off, you want to understand why — and "I forgot my password" is noise, not insight.

**The Right Tradeoff at the Right Stage**

OTP isn't without tradeoffs. It requires a working phone number, it depends on SMS delivery reliability, and it adds a step for users in low-connectivity environments. Those are real considerations.

But at the validation stage, the goal is to get real users through the door with as little resistance as possible. Reducing recall load at login means the first experience a user has with Bublibu isn't a memory test — it's the product itself.

That's where the first impression should be.
