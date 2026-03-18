# TechsCrafts LinkedIn Automation — Design Document

**Date:** 2026-03-18
**Project:** Techcrafts n8n automation
**Author:** Dennis Bundi Kimathi / TechsCrafts

---

## Overview

An n8n automation that generates and publishes AI-written LinkedIn posts for TechsCrafts three times per week. Posts are fully automatic — no human review required. Claude AI writes on-brand content based on rotating content pillars. Images are pulled from a pre-built Canva template library stored in Google Drive. Posts publish directly to the TechsCrafts LinkedIn company page.

---

## Goals

- Build consistent LinkedIn presence for TechsCrafts without manual effort
- Generate inbound leads by driving founders toward the free business audit CTA
- Establish Dennis Bundi as a systems-first thought leader in the Kenyan SME space
- 3 posts per week: Monday, Wednesday, Friday at 9:00 AM EAT

---

## Architecture

```
[Schedule Trigger]
Mon / Wed / Fri at 9:00 AM EAT
        ↓
[Content Pillar Selector]
Mon → Education
Wed → Pain Point
Fri → Reframe or CTA (alternates weekly)
        ↓
[Claude AI Node]
Generates post copy using TechsCrafts brand brief
Target: 150–300 words, direct tone, Nairobi-grounded
        ↓
[Image Selector Node]
Picks a matching image from Google Drive Canva template library
        ↓
[LinkedIn API Node]
Posts text + image to TechsCrafts LinkedIn company page
        ↓
[Notification Node]
Sends WhatsApp confirmation that post went live
```

### Tools

| Tool | Purpose |
|---|---|
| n8n Cloud | Workflow engine and hosting |
| Claude API | AI content generation |
| Google Drive | Image library storage |
| LinkedIn UGC Posts API | Publishing posts |
| WhatsApp (via n8n) | Notifications and alerts |

---

## Content Generation

### System Prompt (baked in once)

```
You are a LinkedIn content writer for TechsCrafts, a digital systems
consultancy based in Nairobi, Kenya founded by Dennis Bundi Kimathi.

Brand voice: Direct, confident, no-fluff, founder-to-founder.
You speak to Kenyan SME owners and startup founders who are
working hard but lack operational visibility.

Core message: "You are not failing because you are not working hard
enough. You are failing because your business is running on guesswork
instead of systems."

Rules:
- 150 to 300 words
- No hashtag spam (max 3 relevant hashtags)
- End every post with a soft CTA toward the free business audit
- Write in first person as Dennis
- No corporate jargon, no fluff
```

### Per-Day Variable Instructions

```
Monday  → "Write an educational post teaching founders what [metric/system]
           they should be tracking and why"
Wednesday → "Write a pain point post about [specific founder frustration]
             — make them feel seen"
Friday  → "Write a reframe post challenging the belief that [common myth]"
```

Bracketed placeholders rotate from a pre-written list of 20+ topics per pillar — providing months of non-repetitive content.

### Content Pillars

1. **Education** — Teach founders what good business operations look like
2. **Pain Point** — Surface daily frustrations, make founders feel seen
3. **Reframe** — Challenge "hustle harder" beliefs, promote systems-first mindset
4. **Results/Proof** — Share what good operations deliver (timelines, outcomes)
5. **CTA** — Drive toward the free business audit

---

## LinkedIn Integration

### Authentication
- OAuth 2.0 via LinkedIn Developer App
- Permission required: `w_member_social`
- Connected to TechsCrafts company page
- Token expiry: 60 days — reminder sent 5 days before expiry

### Image Upload Flow (2-step LinkedIn requirement)
1. Register image upload with LinkedIn → receive upload URL
2. Upload image file to that URL
3. Attach image asset ID to the post text payload

All handled via n8n HTTP Request nodes — no custom code.

---

## Image Strategy

### Template Library (15 Canva templates in Google Drive)

| Pillar | Count | Style |
|---|---|---|
| Education | 4 | Clean stat/tip card — dark bg, TechsCrafts green accent |
| Pain Point | 3 | Bold text on dark — raw, emotional feel |
| Reframe | 3 | Contrast layout — myth vs reality |
| Results/Proof | 3 | Before/after or outcome card |
| CTA | 2 | Free audit call-to-action banner |

### Image Selection Logic
- Files named by pillar + number: `education-1.png`, `pain-2.png`, etc.
- n8n Google Drive node lists files matching the day's pillar
- Random selection from the matching set to avoid repetition

### Image Specs
- Size: 1200 x 627px (landscape) or 1080 x 1080px (square)
- Format: PNG or JPG
- Max size: 5MB

### One-Time Setup
1. Design 15 branded Canva templates
2. Export and upload to a dedicated Google Drive folder
3. Share folder with n8n service account

---

## Error Handling & Reliability

| Failure Point | Recovery Action |
|---|---|
| Claude API fails | Retry 3x with 5min gap, WhatsApp alert if all fail |
| LinkedIn token expired | WhatsApp reminder 5 days before expiry |
| Google Drive image not found | Fall back to default branded image |
| LinkedIn API rate limit | Wait 15min and retry, alert after 2 failed retries |
| n8n instance down | Daily health check ping |

### Notifications
- Every successful post → WhatsApp confirmation to +254 113 303 583
- Every failure → WhatsApp alert with step that broke and reason
- Monthly summary → total posts published, failures logged

---

## Hosting

**Recommended: n8n Cloud** — $20/month, no server management, automatic uptime.

Alternative: Self-hosted on Railway/Render (~$5/month) — requires manual maintenance.

---

## One-Time Setup Checklist

- [ ] Create LinkedIn Developer App at developer.linkedin.com
- [ ] Enable `w_member_social` permission
- [ ] Connect app to TechsCrafts LinkedIn company page
- [ ] Add LinkedIn credentials to n8n
- [ ] Set up Claude API key in n8n
- [ ] Create Google Drive folder for image library
- [ ] Design and upload 15 Canva templates
- [ ] Share Google Drive folder with n8n service account
- [ ] Write 20+ topic prompts per content pillar
- [ ] Build and test n8n workflow end-to-end
- [ ] Set live schedule: Mon / Wed / Fri at 9:00 AM EAT

---

## Success Metrics (3-month targets)

- 36+ posts published with zero manual effort
- LinkedIn follower growth: 200+ new followers
- Inbound audit requests: 5+ per month from LinkedIn
- Zero missed scheduled posts
