# TechsCrafts LinkedIn Automation — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build an n8n workflow that auto-generates and publishes AI-written LinkedIn posts for TechsCrafts 3x/week (Mon/Wed/Fri at 9:00 AM EAT) using Claude AI for copy and Google Drive for images.

**Architecture:** Schedule trigger fires on Mon/Wed/Fri → content pillar is determined by day → Claude AI generates a branded post → Google Drive serves a matching image template → LinkedIn UGC API publishes the post → WhatsApp confirms success or alerts on failure.

**Tech Stack:** n8n Cloud, Claude API (claude-sonnet-4-6), Google Drive API, LinkedIn UGC Posts API, WhatsApp Business API (via n8n HTTP node or Twilio)

**Design Doc:** `docs/plans/2026-03-18-linkedin-automation-design.md`

---

## Prerequisites (Do These Before Building)

- [ ] Sign up at [n8n.io/cloud](https://n8n.io/cloud) — Start trial, choose Starter plan ($20/month)
- [ ] Have a Claude API key ready (from console.anthropic.com)
- [ ] Have a LinkedIn account with admin access to TechsCrafts company page
- [ ] Have a Google account for Drive access
- [ ] Have WhatsApp Business API access OR a Twilio account for WhatsApp notifications

---

## Task 1: Set Up LinkedIn Developer App

**Purpose:** Get OAuth credentials so n8n can post to LinkedIn on your behalf.

**Step 1: Create LinkedIn Developer App**
1. Go to `https://developer.linkedin.com/`
2. Click "Create App"
3. Fill in:
   - App name: `TechsCrafts Automation`
   - LinkedIn Page: Select TechsCrafts company page
   - App logo: Upload TechsCrafts logo
4. Click "Create App"

**Step 2: Enable required permissions**
1. Go to the "Products" tab in your app
2. Request access to **"Share on LinkedIn"** — this unlocks `w_member_social`
3. Also request **"Sign In with LinkedIn using OpenID Connect"**
4. Wait for approval (usually instant for Share on LinkedIn)

**Step 3: Note your credentials**
Save these — you'll need them in Task 3:
```
Client ID: [copy from Auth tab]
Client Secret: [copy from Auth tab]
Redirect URL: https://your-n8n-instance.app.n8n.cloud/rest/oauth2-credential/callback
```

**Step 4: Add redirect URL**
1. In Auth tab → "OAuth 2.0 settings"
2. Add your n8n redirect URL (format above)
3. Save

**Verify:** App shows status "Active" in the LinkedIn Developer dashboard.

---

## Task 2: Set Up Google Drive Folder & Service Account

**Purpose:** Store Canva image templates that n8n will pull from during each post.

**Step 1: Create the folder structure in Google Drive**
```
Google Drive/
└── TechsCrafts LinkedIn/
    └── images/
        ├── education-1.png
        ├── education-2.png
        ├── education-3.png
        ├── education-4.png
        ├── pain-1.png
        ├── pain-2.png
        ├── pain-3.png
        ├── reframe-1.png
        ├── reframe-2.png
        ├── reframe-3.png
        ├── results-1.png
        ├── results-2.png
        ├── results-3.png
        ├── cta-1.png
        └── cta-2.png
```

**Step 2: Create Canva templates**
Open Canva → Create 15 branded templates using these specs:
- Size: 1200 x 627px
- Brand colors: TechsCrafts palette (dark bg, green accent)
- Export as PNG

Upload all 15 to the `images/` folder in Google Drive.

**Step 3: Create Google Cloud Service Account**
1. Go to `https://console.cloud.google.com/`
2. Create a new project: `techscrafts-automation`
3. Enable **Google Drive API** in APIs & Services
4. Go to Credentials → Create Credentials → Service Account
5. Name: `n8n-automation`
6. Download the JSON key file — save it securely

**Step 4: Share Drive folder with service account**
1. Copy the service account email (looks like `n8n-automation@techscrafts-automation.iam.gserviceaccount.com`)
2. Right-click the `TechsCrafts LinkedIn` folder in Drive
3. Share → paste service account email → set to "Viewer"

**Step 5: Note the folder ID**
The folder ID is in the URL when you open the images folder:
```
https://drive.google.com/drive/folders/[THIS-IS-YOUR-FOLDER-ID]
```
Save it — you'll use it in Task 5.

**Verify:** Service account can see files in the folder (test via Google Drive API Explorer).

---

## Task 3: Configure n8n Credentials

**Purpose:** Connect all external services to n8n so nodes can authenticate.

**Step 1: Add Claude API credential**
1. In n8n → Credentials → New → Search "Anthropic"
2. Name: `Claude - TechsCrafts`
3. API Key: paste your Claude API key
4. Save and test

**Step 2: Add LinkedIn OAuth credential**
1. In n8n → Credentials → New → Search "LinkedIn OAuth2"
2. Name: `LinkedIn - TechsCrafts`
3. Client ID: paste from Task 1
4. Client Secret: paste from Task 1
5. Click "Connect my account" → authorize via LinkedIn
6. Confirm it connects to the TechsCrafts company page
7. Save

**Step 3: Add Google Drive credential**
1. In n8n → Credentials → New → Search "Google Drive"
2. Name: `Google Drive - TechsCrafts`
3. Authentication: Service Account
4. Paste contents of your JSON key file
5. Save and test

**Step 4: Add WhatsApp/Twilio credential** (for notifications)
If using Twilio:
1. In n8n → Credentials → New → Search "Twilio"
2. Name: `Twilio - TechsCrafts`
3. Account SID + Auth Token: paste from Twilio console
4. Save

**Verify:** All 4 credentials show green checkmark in n8n credentials list.

---

## Task 4: Build the Core Workflow Skeleton

**Purpose:** Create the workflow with all nodes placed (not yet configured) so you can wire them up step by step.

**Step 1: Create new workflow**
1. n8n → Workflows → New Workflow
2. Name: `TechsCrafts LinkedIn Poster`

**Step 2: Add all nodes in order (left to right)**

Add these nodes by clicking "+" and searching:
1. **Schedule Trigger** — fires the workflow
2. **Code** (Node 1) — determines content pillar from day of week
3. **Anthropic Chat Model** — generates post copy via Claude
4. **Code** (Node 2) — builds Claude prompt from pillar + topic list
5. **Google Drive** — lists image files for the pillar
6. **Code** (Node 3) — randomly selects one image from the list
7. **Google Drive** (second node) — downloads the selected image
8. **HTTP Request** (Node 1) — registers image upload with LinkedIn
9. **HTTP Request** (Node 2) — uploads image binary to LinkedIn
10. **HTTP Request** (Node 3) — publishes the post with image
11. **HTTP Request** (Node 4) — sends WhatsApp success notification

**Step 3: Add error workflow**
1. In workflow settings → Error Workflow → Create new
2. Name: `LinkedIn Poster — Error Handler`
3. Add: Trigger → HTTP Request (WhatsApp alert with error details)

**Verify:** All 11 nodes appear on canvas, connected left to right.

---

## Task 5: Configure Schedule Trigger

**Purpose:** Fire the workflow on Mon/Wed/Fri at 9:00 AM EAT (UTC+3 = 06:00 UTC).

**Step 1: Configure the Schedule Trigger node**
Double-click the Schedule Trigger node:
```
Trigger Interval: Custom (Cron)
Cron Expression:  0 6 * * 1,3,5
```

Breakdown:
- `0 6` = 06:00 UTC (= 09:00 EAT)
- `* *` = every month, every day of month
- `1,3,5` = Monday, Wednesday, Friday

**Step 2: Verify timezone**
In n8n Settings → General → Timezone: set to `Africa/Nairobi`

Then update cron to use local time:
```
Cron Expression: 0 9 * * 1,3,5
```

**Verify:** Click "Next execution" button — confirm it shows next Monday/Wednesday/Friday at 9:00 AM.

---

## Task 6: Build the Content Pillar Selector (Code Node 1)

**Purpose:** Determine which content pillar and topic to use based on the day of the week.

**Step 1: Configure the first Code node**
Name it: `Select Content Pillar`

Paste this code:
```javascript
// Topic lists per pillar — 20+ topics each for months of non-repetitive content
const topics = {
  education: [
    "gross profit margin and why most founders don't track it",
    "the difference between revenue and cash in hand",
    "how to build a simple weekly cash flow tracker",
    "what a business dashboard should show you every Monday morning",
    "the three numbers every service business must know",
    "how to measure team productivity without micromanaging",
    "what an operations audit actually looks at",
    "how to identify your most profitable service line",
    "why your P&L is lying to you and what to read instead",
    "how to set up a basic reporting system in under a week",
    "what KPIs actually matter for a Nairobi SME",
    "the difference between being busy and being productive",
    "how to track customer acquisition cost without a big budget",
    "what good inventory management looks like for a small business",
    "how to build an SOP for your most repeated task",
    "why every founder needs a 13-week cash flow forecast",
    "how to measure client retention and why it matters more than new sales",
    "what financial visibility actually means for a small business",
    "how to run a monthly business review in 30 minutes",
    "the one metric that predicts whether your business will survive the next 6 months"
  ],
  pain: [
    "not knowing if your business made money last month",
    "your best employee quitting and taking all the knowledge with them",
    "saying yes to every client because you don't know which ones are profitable",
    "running out of cash despite having a full order book",
    "spending your Sunday firefighting instead of resting",
    "not being able to take a week off because everything depends on you",
    "making decisions based on what feels right instead of what the numbers say",
    "your team doing things differently every time with no standard process",
    "chasing invoices every month because there is no payment system",
    "hiring someone and realizing three months later they have been underperforming",
    "not knowing your real margins until an accountant tells you six months later",
    "losing a client and not knowing why",
    "your phone being the only place your business information lives",
    "being the most hardworking person in your business but still not growing",
    "making the same operational mistake for the third time",
    "your business running you instead of you running your business",
    "quoting jobs by gut feel and constantly undercharging",
    "no system for following up with leads so they just go cold",
    "three different team members giving three different answers to the same client question",
    "growing revenue but somehow having less cash than last year"
  ],
  reframe: [
    "hustle harder is not a growth strategy",
    "hiring more staff will not fix a broken process",
    "your business does not need more clients — it needs better systems",
    "working 16-hour days is a symptom not a badge of honor",
    "a beautiful brand means nothing if operations are broken underneath",
    "more revenue does not mean more profit",
    "the problem is not your team — it is the system they are working in",
    "passion alone has never scaled a business",
    "being busy is not the same as being productive",
    "your competitor is not your biggest threat — your own operations are",
    "you do not need a business loan — you need visibility into what you already have",
    "delegation fails without documentation",
    "the founders who scale are not the most talented — they are the most systematic",
    "growth without systems just creates bigger chaos",
    "your gut feeling is not a strategy"
  ]
};

// Day of week → pillar mapping
const day = new Date().getDay(); // 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
let pillar;

if (day === 1) pillar = 'education';      // Monday
else if (day === 3) pillar = 'pain';      // Wednesday
else if (day === 5) pillar = 'reframe';   // Friday
else pillar = 'education';                // Fallback

// Pick a random topic from the pillar list
const topicList = topics[pillar];
const topic = topicList[Math.floor(Math.random() * topicList.length)];

return [{ json: { pillar, topic } }];
```

**Step 2: Connect to Schedule Trigger**
Wire: Schedule Trigger → Select Content Pillar

**Verify:** Click "Execute Node" — output should show `pillar` and `topic` fields.

---

## Task 7: Build the Claude AI Content Generator

**Purpose:** Generate a branded LinkedIn post using the selected pillar and topic.

**Step 1: Add a Code node before Claude to build the prompt**
Name it: `Build Claude Prompt`

```javascript
const { pillar, topic } = $input.first().json;

const pillarInstructions = {
  education: `Write an educational LinkedIn post teaching Kenyan founders and SME owners about: "${topic}". Make it practical and specific. Give them one actionable insight they can use this week.`,
  pain: `Write a LinkedIn post about the pain of: "${topic}". Make founders feel deeply seen. Mirror their frustration back to them. Do not offer a solution yet — just make them nod their head in recognition.`,
  reframe: `Write a LinkedIn post that challenges this common belief: "${topic}". Flip the narrative. Replace the old belief with a systems-first mindset. Be direct and confident.`
};

const systemPrompt = `You are a LinkedIn content writer for TechsCrafts, a digital systems consultancy based in Nairobi, Kenya founded by Dennis Bundi Kimathi.

Brand voice: Direct, confident, no-fluff, founder-to-founder. You speak to Kenyan SME owners and startup founders who are working hard but lack operational visibility.

Core message: "You are not failing because you are not working hard enough. You are failing because your business is running on guesswork instead of systems."

Rules:
- 150 to 300 words
- No hashtag spam (max 3 relevant hashtags at the end)
- End every post with a soft CTA: invite them to book a free business operations audit at TechsCrafts
- Write in first person as Dennis Bundi
- No corporate jargon, no fluff
- Nairobi-grounded — reference the Kenyan business context naturally
- Short punchy paragraphs, not walls of text
- Use line breaks for readability`;

const userInstruction = pillarInstructions[pillar];

return [{ json: { systemPrompt, userInstruction, pillar, topic } }];
```

**Step 2: Configure the Anthropic Chat Model node**
Name it: `Generate LinkedIn Post`

Settings:
```
Model: claude-sonnet-4-6
Credential: Claude - TechsCrafts
System Message: {{ $json.systemPrompt }}
User Message: {{ $json.userInstruction }}
Max Tokens: 600
Temperature: 0.8
```

**Step 3: Connect nodes**
Wire: Select Content Pillar → Build Claude Prompt → Generate LinkedIn Post

**Verify:** Execute the chain — the Claude node should return a full LinkedIn post in the output.

---

## Task 8: Build the Image Selector

**Purpose:** Pick a random matching image from Google Drive based on the content pillar.

**Step 1: Configure Google Drive node (list files)**
Name it: `List Pillar Images`

Settings:
```
Operation: List
Resource: File
Drive: My Drive
Parent Folder ID: [paste your images folder ID from Task 2]
Filter by name contains: {{ $('Select Content Pillar').first().json.pillar }}
```

This returns all files matching the pillar name (e.g., all `education-*.png` files).

**Step 2: Add Code node to pick random image**
Name it: `Pick Random Image`

```javascript
const files = $input.all();

if (files.length === 0) {
  // Fallback: use a default image file ID
  return [{ json: { fileId: 'YOUR_DEFAULT_IMAGE_FILE_ID', fileName: 'default.png' } }];
}

const randomFile = files[Math.floor(Math.random() * files.length)];
return [{ json: { fileId: randomFile.json.id, fileName: randomFile.json.name } }];
```

**Step 3: Configure Google Drive node (download file)**
Name it: `Download Image`

Settings:
```
Operation: Download
Resource: File
File ID: {{ $json.fileId }}
```

**Step 4: Connect nodes**
Wire: Generate LinkedIn Post → List Pillar Images → Pick Random Image → Download Image

**Verify:** Execute — the Download Image node should output binary image data.

---

## Task 9: Build LinkedIn Publisher

**Purpose:** Upload the image and publish the post to the TechsCrafts LinkedIn company page.

**Before starting:** Get your LinkedIn Organization ID:
- Go to your TechsCrafts LinkedIn company page
- The URL looks like: `https://www.linkedin.com/company/12345678/`
- `12345678` is your organization ID — save it

**Step 1: Register image upload with LinkedIn**
Name the node: `Register LinkedIn Image Upload`

HTTP Request node settings:
```
Method: POST
URL: https://api.linkedin.com/v2/assets?action=registerUpload
Authentication: Header Auth
Header Name: Authorization
Header Value: Bearer {{ $credentials.linkedinOAuth2Api.oauthTokenData.access_token }}

Body (JSON):
{
  "registerUploadRequest": {
    "recipes": ["urn:li:digitalmediaRecipe:feedshare-image"],
    "owner": "urn:li:organization:YOUR_ORG_ID",
    "serviceRelationships": [{
      "relationshipType": "OWNER",
      "identifier": "urn:li:userGeneratedContent"
    }]
  }
}
```

This returns an `uploadMechanism` URL and an `asset` ID.

**Step 2: Upload image binary to LinkedIn**
Name the node: `Upload Image to LinkedIn`

HTTP Request node settings:
```
Method: PUT
URL: {{ $json.value.uploadMechanism['com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest'].uploadUrl }}
Authentication: Header Auth
Header Name: Authorization
Header Value: Bearer {{ $credentials.linkedinOAuth2Api.oauthTokenData.access_token }}
Body: Binary Data
Binary Property: data
```

**Step 3: Publish the post**
Name the node: `Publish LinkedIn Post`

HTTP Request node settings:
```
Method: POST
URL: https://api.linkedin.com/v2/ugcPosts
Authentication: Header Auth
Header Name: Authorization
Header Value: Bearer {{ $credentials.linkedinOAuth2Api.oauthTokenData.access_token }}
Content-Type: application/json

Body (JSON):
{
  "author": "urn:li:organization:YOUR_ORG_ID",
  "lifecycleState": "PUBLISHED",
  "specificContent": {
    "com.linkedin.ugc.ShareContent": {
      "shareCommentary": {
        "text": "{{ $('Generate LinkedIn Post').first().json.choices[0].message.content }}"
      },
      "shareMediaCategory": "IMAGE",
      "media": [{
        "status": "READY",
        "description": { "text": "TechsCrafts" },
        "media": "{{ $('Register LinkedIn Image Upload').first().json.value.asset }}",
        "title": { "text": "TechsCrafts" }
      }]
    }
  },
  "visibility": {
    "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
  }
}
```

**Step 4: Connect nodes**
Wire: Download Image → Register LinkedIn Image Upload → Upload Image to LinkedIn → Publish LinkedIn Post

**Verify:** Execute full chain — check LinkedIn company page to confirm post appeared.

---

## Task 10: Build WhatsApp Notification

**Purpose:** Send a confirmation to +254 113 303 583 after every post goes live.

**Step 1: Configure notification node**
Name it: `Send Success Notification`

If using Twilio:
```
Method: POST
URL: https://api.twilio.com/2010-04-01/Accounts/YOUR_ACCOUNT_SID/Messages.json
Authentication: Basic Auth (Account SID as username, Auth Token as password)

Body (Form):
From: whatsapp:+14155238886  (Twilio WhatsApp sandbox number)
To: whatsapp:+254113303583
Body: ✅ TechsCrafts LinkedIn post published successfully!

Pillar: {{ $('Select Content Pillar').first().json.pillar }}
Topic: {{ $('Select Content Pillar').first().json.topic }}
Time: {{ $now.format('DD MMM YYYY HH:mm') }} EAT
```

**Step 2: Connect to end of workflow**
Wire: Publish LinkedIn Post → Send Success Notification

**Verify:** Execute — you should receive a WhatsApp message on +254 113 303 583.

---

## Task 11: Build Error Handler Workflow

**Purpose:** Alert you via WhatsApp if any step in the workflow fails.

**Step 1: Open the error workflow created in Task 4**
Go to: `LinkedIn Poster — Error Handler`

**Step 2: Configure Error Trigger node**
This is auto-added — leave it as is.

**Step 3: Add WhatsApp alert node**
Name it: `Send Error Alert`

```
Method: POST
URL: https://api.twilio.com/2010-04-01/Accounts/YOUR_ACCOUNT_SID/Messages.json
Authentication: Basic Auth

Body:
From: whatsapp:+14155238886
To: whatsapp:+254113303583
Body: ❌ TechsCrafts LinkedIn automation FAILED

Error: {{ $json.error.message }}
Workflow: {{ $json.workflow.name }}
Node: {{ $json.execution.lastNodeExecuted }}
Time: {{ $now.format('DD MMM YYYY HH:mm') }} EAT

Action needed: Check n8n dashboard and re-run manually if needed.
```

**Step 4: Link error workflow to main workflow**
In main workflow settings → Error Workflow → Select `LinkedIn Poster — Error Handler`

**Verify:** Temporarily break a node (wrong URL), run the workflow — confirm you receive a WhatsApp error alert.

---

## Task 12: Set Up Token Expiry Reminder

**Purpose:** Warn you 5 days before the LinkedIn OAuth token expires (every 60 days).

**Step 1: Create a new workflow**
Name: `LinkedIn Token Expiry Reminder`

**Step 2: Add Schedule Trigger**
```
Cron: 0 8 * * 1   (Every Monday at 8 AM — weekly check)
```

**Step 3: Add Code node**
Name: `Check Token Age`

```javascript
// LinkedIn tokens last 60 days
// Store the token creation date as a workflow variable or hardcode initial date
const tokenCreatedDate = new Date('2026-03-18'); // Update this when you re-authenticate
const today = new Date();
const daysSinceCreation = Math.floor((today - tokenCreatedDate) / (1000 * 60 * 60 * 24));
const daysUntilExpiry = 60 - daysSinceCreation;

if (daysUntilExpiry <= 5) {
  return [{ json: { sendAlert: true, daysUntilExpiry } }];
}

return [{ json: { sendAlert: false, daysUntilExpiry } }];
```

**Step 4: Add IF node**
Condition: `{{ $json.sendAlert }}` equals `true`

**Step 5: Add WhatsApp node on true branch**
```
Body: ⚠️ LinkedIn token expires in {{ $json.daysUntilExpiry }} days!

Action: Go to n8n → Credentials → LinkedIn - TechsCrafts → Reconnect account

Do this before the token expires or automated posting will stop.
```

**Verify:** Temporarily set `daysUntilExpiry` to 3 and run — confirm WhatsApp alert fires.

---

## Task 13: End-to-End Test

**Purpose:** Run the complete workflow once manually and verify every step works.

**Step 1: Execute full workflow manually**
In n8n → Main workflow → Execute Workflow (top right button)

**Step 2: Check each node output**
Walk through every node and confirm:
- [ ] Schedule Trigger — fired correctly
- [ ] Select Content Pillar — returned valid `pillar` and `topic`
- [ ] Build Claude Prompt — returned `systemPrompt` and `userInstruction`
- [ ] Generate LinkedIn Post — returned 150-300 word post copy
- [ ] List Pillar Images — returned list of matching image files
- [ ] Pick Random Image — returned one `fileId`
- [ ] Download Image — returned binary image data
- [ ] Register LinkedIn Image Upload — returned `asset` ID and upload URL
- [ ] Upload Image to LinkedIn — HTTP 201 response
- [ ] Publish LinkedIn Post — HTTP 201 response, returns post ID
- [ ] Send Success Notification — WhatsApp received on +254 113 303 583

**Step 3: Check LinkedIn**
Go to TechsCrafts LinkedIn company page → confirm post is live with correct text and image.

**Step 4: Fix any failures**
If a node fails, check n8n execution log for the error message. Most common issues:
- LinkedIn auth → reconnect credential
- Image not found → check folder ID and file naming convention
- Claude output format → check output path (`choices[0].message.content`)

---

## Task 14: Activate & Go Live

**Step 1: Activate the main workflow**
Toggle: Active (top right of workflow editor)

**Step 2: Activate the error handler workflow**
Toggle: Active

**Step 3: Activate the token expiry reminder workflow**
Toggle: Active

**Step 4: Confirm next execution time**
In n8n → Executions — confirm next scheduled run shows correct next Mon/Wed/Fri at 9:00 AM.

**Step 5: Commit final workflow exports**
In n8n → Export workflow as JSON → save to:
```
n8n-workflows/linkedin-poster.json
n8n-workflows/error-handler.json
n8n-workflows/token-expiry-reminder.json
```

Then commit:
```bash
git add n8n-workflows/
git commit -m "feat: add n8n workflow JSON exports for LinkedIn automation"
```

**You are live.** TechsCrafts will now post to LinkedIn automatically every Monday, Wednesday, and Friday at 9:00 AM.

---

## Maintenance Reference

| Task | Frequency | Action |
|---|---|---|
| Re-authenticate LinkedIn | Every 60 days | Reconnect credential in n8n |
| Add new image templates | As needed | Upload to Google Drive images folder |
| Add new topics | Monthly | Edit Code node topic lists |
| Review post performance | Monthly | Check LinkedIn analytics, adjust pillars |
| Check n8n execution logs | Weekly | Review for any silent failures |
