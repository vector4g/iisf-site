import { createTool } from "@voltagent/core";
import { z } from "zod";

// ─────────────────────────────────────────────────────────────────────────────
// Operational Intelligence Knowledge Base
// Compiled: 2026-02-19 | Next refresh: Sprint 2 (Week of 2026-03-02)
// ─────────────────────────────────────────────────────────────────────────────

const OPS_INTEL: Record<string, string> = {

  // ── FUNDING PIPELINE ─────────────────────────────────────────────────────

  funding_tier1: `TIER 1 — IMMEDIATE / HIGH-PRIORITY FUNDING (act within 30 days)

1. Humanity AI Pooled Fund (MacArthur + Omidyar + Mozilla + Ford + Mellon + Kapor + 4 others)
   Type: Foundation coalition | Amount: $500M pool, grants begin 2026
   Fit: 5/5 — explicitly funds "people-centered AI," algorithmic accountability, digital rights
   Standards: Crenshaw (algorithmic accountability), Grandin (AI + disability)
   Status: Launched Oct 2025. First grants expected mid-2026. LOI process likely opening Q1-Q2 2026.
   Next step: Monitor humanityai.org for RFP. Prepare 2-page concept note NOW: "Intersectional Safety as AI Accountability Infrastructure."
   Effort: LOW effort / HIGH probability — IISF's mission is precisely what this fund was created for.
   ⚠ Needs verification: Exact LOI timeline and eligibility for early-stage nonprofits.

2. Ford Foundation — Technology & Society Program
   Type: Foundation | Amount: $100K–$500K general support grants
   Fit: 5/5 — funds "technology for social justice," digital rights, disability, algorithmic accountability
   Standards: All three — Ford explicitly funds intersectional work
   Next step: Submit inquiry via fordfoundation.org/work/our-grants. Warm intro via Disability Rights Education & Defense Fund (DREDF) network.
   Effort: MEDIUM effort / HIGH probability.

3. Mozilla Foundation — Responsible AI Grants
   Type: Foundation | Amount: $50K–$250K project grants
   Fit: 4/5 — "trustworthy AI," algorithmic transparency, privacy, open standards
   Standards: Crenshaw Standard (algorithmic auditing), governance (kill switch)
   Next step: Watch mozilla.org/en-US/moss/ for next open call (typically Q1/Q2). Apply under "responsible AI" track.
   Effort: LOW effort / MEDIUM-HIGH probability.

4. NSF — Smart Health and Biomedical Research (NSF 25-542)
   Type: Federal grant | Amount: $150K–$1.2M over 3 years
   Fit: 4/5 — human-AI systems, accessibility, health biotelemetry
   Standards: Grandin (biosensor/HRV/EDA), Heumann (gait analysis/IMU)
   Deadline: Jul 24, 2025 was last round; next solicitation expected late 2026
   Next step: Register at research.gov. Partner with university PI for co-PI arrangement.
   Effort: HIGH effort / MEDIUM probability — requires academic partnership.
   ⚠ IISF needs a university research partner for NSF eligibility.

5. Open Society Foundations — Information & Digital Rights
   Type: Foundation | Amount: $50K–$300K
   Fit: 4/5 — digital sovereignty, surveillance resistance, marginalized communities
   Standards: Crenshaw (surveillance/algorithmic), governance (no weapons/no surveillance)
   Next step: Submit inquiry at opensocietyfoundations.org/grants. Frame around digital invisibility rights.
   Effort: LOW effort / MEDIUM probability.`,

  funding_tier2: `TIER 2 — STRATEGIC FUNDING (act within 60-90 days)

6. Horizon Europe — Cluster 2: Culture, Creativity & Inclusive Society (2026-2027 Work Programme)
   Type: EU grant | Amount: €200K–€2M consortium grants
   Fit: 4/5 — AI ethics, inclusive society, digital rights, disability
   Standards: All three — EU AI Act alignment is a major differentiator
   Status: 2026-2027 work programme published Dec 2025. Calls opening throughout 2026.
   Next step: Register IISF as entity in EU Participant Portal. Seek EU consortium partner (Estonian e-Governance Academy is ideal).
   Effort: HIGH effort / MEDIUM probability — requires EU consortium.
   ⚠ Need European partner organization. Estonia connection is strategic.

7. Luminate (Omidyar Network spinoff) — Digital Rights & Governance
   Type: Foundation | Amount: $100K–$500K
   Fit: 4/5 — civic empowerment, data rights, digital governance, accountability
   Standards: Crenshaw (data rights), governance (transparency)
   Next step: luminate.group/what-we-do — submit through inquiry form. Regional focus: Africa, Asia, LatAm, but global digital rights work eligible.
   Effort: LOW effort / MEDIUM probability.

8. Kapor Center / Kapor Foundation — Racial Equity in Tech
   Type: Foundation | Amount: $25K–$150K
   Fit: 3/5 — racial equity in tech, intersection of race and technology
   Standards: Crenshaw (intersectional error-rate parity)
   Next step: kaporcenter.org — apply through standard grantmaking. Frame around algorithmic bias + racial equity.
   Effort: LOW effort / MEDIUM probability.

9. William T. Grant Foundation — Research Grants on Reducing Inequality
   Type: Research foundation | Amount: $100K–$600K over 2-3 years
   Fit: 4/5 — reducing inequality, evidence-based, youth focus
   Deadline: Open date Jun 3, 2026; deadline Jul 29, 2026
   Standards: All three — framed through inequality reduction lens
   Next step: Prepare research proposal linking intersectional safety to inequality reduction.
   Effort: MEDIUM effort / MEDIUM probability.

10. Google.org — AI for Social Good
    Type: Corporate philanthropy | Amount: $250K–$2M + Google Cloud credits
    Fit: 3/5 — AI for social impact, accessibility, nonprofits
    Standards: Grandin (accessibility AI), Crenshaw (fairness)
    Next step: google.org — watch for open calls. Consider Google Cloud for Nonprofits for infrastructure.
    Effort: MEDIUM effort / LOW-MEDIUM probability — highly competitive.

11. Microsoft AI for Good — Accessibility Focus
    Type: Corporate philanthropy | Amount: Azure credits + $25K–$500K grants
    Fit: 4/5 — accessibility, AI for disability, inclusive tech
    Standards: Grandin (sensory), Heumann (kinetic/mobility)
    Next step: microsoft.com/en-us/ai/ai-for-good — apply under accessibility track.
    Effort: LOW effort / MEDIUM probability.

12. Access Now — Digital Rights Partnership
    Type: NGO partnership (not direct funding) | Value: Network, credibility, RightsCon platform
    Fit: 5/5 — digital rights, surveillance resistance, marginalized communities
    Standards: Crenshaw (surveillance/digital rights), governance
    Next step: accessnow.org — propose partnership for RightsCon 2026 session. Submit speaking proposal.
    Effort: LOW effort / HIGH probability for partnership (not funding).`,

  funding_tier3: `TIER 3 — EXPLORATORY / WATCH LIST

13. NIH — Sensory Processing and Occupational Health
    Type: Federal | Amount: $250K–$1.5M | Requires PI with NIH track record
    Fit: 3/5 — narrow but deep alignment on Grandin Standard biotelemetry
    Next step: Identify NIH-eligible researcher for partnership.

14. DOT — Pedestrian Safety & ADA Transit Innovation
    Type: Federal | Amount: Varies widely
    Fit: 3/5 — Heumann Standard, SADR coexistence, accessible transit
    Next step: Monitor grants.gov for DOT pedestrian safety solicitations.

15. DOL — Workplace Safety Innovation
    Type: Federal | Amount: $100K–$500K
    Fit: 3/5 — Grandin Standard (workplace sensory safety), presenteeism reduction
    Next step: Monitor OSHA/DOL grant announcements.

16. European Disability Forum — Partnership
    Type: EU advocacy NGO | Value: Network, EU policy access
    Fit: 4/5 — disability rights, EU policy, accessibility standards
    Next step: edf-feph.org — propose collaboration on EU AI Act + disability intersection.

17. Skoll Foundation — Social Entrepreneurship
    Type: Foundation | Amount: $1M+ over multiple years (Skoll Award)
    Fit: 3/5 — social entrepreneurship, systems change
    Next step: Skoll Awards require significant track record. Monitor skollfoundation.org — consider 2027+ timeline.
    ⚠ Likely premature for IISF's current stage. Build toward 2027-2028 application.

18. Christopher & Dana Reeve Foundation — Quality of Life Grants
    Type: Disability foundation | Amount: $25K–$75K
    Fit: 3/5 — disability-specific, quality of life, accessibility
    Standards: Heumann (kinetic equity, mobility)
    Next step: christopherreeve.org/living-with-paralysis/grants-and-funding.

FUNDING PRIORITY MATRIX:
  Highest ROI: Humanity AI (#1), Ford (#2), Mozilla (#3), Open Society (#5)
  Quickest wins: Mozilla (#3), Luminate (#7), Kapor (#8), Access Now partnership (#12)
  Largest potential: Humanity AI (#1, $500M pool), Horizon Europe (#6), NSF (#4)
  Needs academic partner: NSF (#4), NIH (#13), William T. Grant (#9)
  Needs EU partner: Horizon Europe (#6), European Disability Forum (#16)`,

  // ── ENTERPRISE COMPLIANCE & REGULATORY LANDSCAPE ────────────────────────

  enterprise_compliance: `THE COMPLIANCE BRIDGE — Regulatory Integration for Vector for Good (Feb 2026)

REGULATORY PERFECT STORM: ISO 31030, GDPR, AND THE CSRD PARADOX
  The primary challenge facing CROs and ESG directors in 2026 is the "Universal Traveler" failure.
  Traditional risk systems (Everbridge, International SOS) rely on generalized threat models assuming homogeneous traveler profiles.
  ISO 31030 explicitly demands organizations identify and mitigate threats tailored to specific employee profiles.
  This requirement directly clashes with GDPR and the EU AI Act, which restrict collection of sensitive identity data
  (sexual orientation, religious affiliation, neurodivergent status).

VECTOR FOR GOOD'S UNIFIED COMPLIANCE LAYER:
  • Provides hyper-local, privacy-preserving safety scores without employers possessing sensitive PII
  • Multi-agent AI architecture creates a "zero-knowledge" safety assessment loop
  • Cuts compliance costs by an estimated 60-70%
  • Enables automated generation of ESG narratives required for ESRS under the CSRD
  • NVIDIA Inception-powered on-edge architecture for air-gapped/low-connectivity environments

EU AI ACT — HIGH-RISK DESIGNATION:
  Systems impacting fundamental rights (security, workplace safety) are "high-risk" under the Act.
  • Fundamental Rights Impact Assessment (FRIA): Required for Crenshaw and Grandin modules
  • Human Oversight: Mandate for technical + organizational measures; multi-agent architecture must include "human-in-the-loop" verification
  • Vector's 501(c)(3) ownership = unique trust advantage ("CERN for AI Safety")

CSRD DEADLINES — FEB 2026 SCOPE:
  First wave of CSRD reporting for large public-interest entities due early 2026.
  Critical Gap: Most enterprises have no formal way to collect "S" (Social) metrics for intersectional workforce.
  Opportunity: Vector's "Shared Assessment Logs" and "Automated ESG Narratives" fill this gap with auditable evidence.

COMPETITIVE LANDSCAPE:
  • Avantos: $25M Series A — Compliance AI Agents
  • Ritivel: YC W2026 — Compliance automation
  • Market: Seed-stage valuations down 20-30% from 2023 peaks; VCs prioritize revenue metrics and unit economics
  • IISF 501(c)(3) structure attracts talent and grants that for-profit competitors cannot access

POSITIONING: "The Compliance Bridge" — the only tool delivering ESRS S1-S4 social disclosures
without triggering data privacy violations. Frame as essential risk mitigation, not optional social initiative.`,

  // ── VECTOR FOR GOOD — FEDERAL & INTERNATIONAL GRANTS (Category 1) ──────

  funding_grants_federal: `CATEGORY 1: NON-DILUTIVE FUNDING & FEDERAL GRANTS — $2.5M Seed Target (80% Non-Dilutive)

1. National Science Foundation (NSF) — SBIR/STTR Phase I (FY26)
   Target Module: Grandin / Heumann
   Award: $275,000 - $300,000 | Deadline: Rolling / Q2 2026
   Sub-topics: AI7 (Trustworthy AI) + MO7 (Accessibility) — strongest fit
   Emphasize: Heumann module navigation + NVIDIA-powered privacy architecture
   Entity: Delaware PBC
   ★ HIGHEST PRIORITY — translating multi-agent systems research into scalable products for public good

2. European Innovation Council (EIC) — EIC Accelerator (Open/Challenge)
   Target: Unified Compliance Layer
   Award: €2.5M (Grant) + €10M (Equity) | Deadline: Every 2 months
   Strategy: Use Estonia OÜ entity; seek "STEP Seal" for complementary EU funding access
   ★ Blended finance — largest single potential award

3. Enterprise Estonia (EIS) — Programme for Applied Research (RUP)
   Target: Multi-Agent AI Architecture
   Award: €250,000 - €2M | Deadline: Sept 28, 2026
   Focus: TRL 6-7 experimental development; AI/ML for mobility
   Entity: Estonia OÜ
   ⚠ Mandatory pre-consultation by Feb 25, 2026 → March 23 submission deadline

4. Humanity AI Coalition — Pooled Foundation Fund
   Target: Crenshaw Module (Security + Democracy)
   Award: $500,000 - $1.5M | Deadline: Rolling 2026
   Manager: Rockefeller Philanthropy Advisors
   Frame as: "Security" and "Democracy" tool for intersectional rights

5. HHS / NIDILRR — ERC on AI-Driven Assistive Tech
   Target: Heumann / Grandin modules
   Award: $975,000 (Annual) | Deadline: Q2 2026

6. NEEF / Toyota — Driving Mobility Grant
   Target: Heumann (Smart Cities)
   Award: $20,000 | Deadline: Feb 18, 2026
   ⚠ Deadline imminent

7. CTA Foundation — Eureka Park Accessibility Contest
   Target: All Modules (CES 2026)
   Award: $20,000 | Deadline: Jan 2026

8. Horizon Europe — Cluster 3: Civil Security
   Target: Safety for Intersectional Groups
   Award: €2M - €5M | Deadline: May 2026

SEARCH QUERIES FOR CATEGORY 1:
  "NSF SBIR 2026 Phase I AI7 MO7 intersectional travel safety"
  "EIC Accelerator 2026 STEP Seal project list AI safety"
  "Enterprise Estonia RUP program 2026 TRL 3-5 AI safety"
  "Humanity AI coalition $500M grant cycle 2026 priorities"
  "Horizon Europe Cluster 3 2026 call inclusive society AI"`,

  // ── BOARD & ADVISOR PIPELINE ──────────────────────────────────────────────

  board_disability: `DISABILITY ADVOCACY SEAT — Candidate Longlist

1. Haben Girma — Disability Rights Advocate & Author
   Current: Independent advocate, speaker, author ("Haben: The Deafblind Woman Who Conquered Harvard Law")
   Location: US (Bay Area)
   Expertise: Disability rights law, accessible technology, deafblind advocacy
   Why IISF: First deafblind Harvard Law graduate. Bridges legal, technology, and lived experience. Global platform.
   Intersectionality: Disability + race + immigration (Eritrean-American)
   Priority: 5/5 | Availability: 3/5 (high demand) | Conflict check: Clean
   Contact: habengirma.com — speaking bureau; warm intro via disability rights network
   ⚠ Very high-profile — may be overcommitted. Worth approaching with specific, limited ask.

2. Lydia X. Z. Brown — Disability Justice Advocate & Policy Counsel
   Current: Policy counsel, has worked with Georgetown Law Center on Disability & Privacy
   Location: US (DC area)
   Expertise: Disability justice, autistic advocacy, surveillance, AI bias, intersectionality
   Why IISF: Explicitly intersectional (disability + race + gender + neurodivergence). Published on AI + disability.
   Priority: 5/5 | Availability: 4/5 | Conflict check: Clean
   Contact: autistichoya.com — direct outreach feasible
   ★ TOP CANDIDATE — bridges disability, AI ethics, and surveillance resistance.

3. Liz Jackson — Disability Designer & Founder of The Disabled List
   Current: Founder, The Disabled List; disability design consultant
   Location: US
   Expertise: Inclusive design, disability innovation, design justice, assistive technology
   Why IISF: Bridges design, technology, and disability. Challenges "design for" vs "design with" paradigm.
   Priority: 4/5 | Availability: 4/5 | Conflict check: Clean
   Contact: LinkedIn / The Disabled List — direct outreach

4. Victor Pineda — Founder of World Enabled & Smart Cities for All
   Current: President, Victor Pineda Foundation; UN advisor on disability & cities
   Location: US / Global
   Expertise: Urban accessibility, smart cities, UN disability policy, spatial equity
   Why IISF: Direct alignment with Heumann Standard (kinetic/spatial equity). UN-level credibility.
   Priority: 4/5 | Availability: 3/5 | Conflict check: Clean
   Contact: worldenabled.org — formal inquiry`,

  board_data_ethics: `DATA ETHICS SEAT — Candidate Longlist

1. Timnit Gebru — Founder, Distributed AI Research Institute (DAIR)
   Current: Founder/Executive Director, DAIR Institute
   Location: US
   Expertise: AI ethics, algorithmic bias, large language models, intersectional fairness
   Why IISF: Co-author of "Gender Shades" (foundational intersectional AI audit). Founded independent AI ethics institute.
   Intersectionality: Race + gender + immigration (Ethiopian-Eritrean-American)
   Priority: 5/5 | Availability: 2/5 (runs own institute) | Conflict check: Clean
   Contact: dairinstitute.org — formal inquiry
   ⚠ May prefer advisory role over board seat given DAIR commitments.

2. Joy Buolamwini — Founder, Algorithmic Justice League
   Current: Founder, Algorithmic Justice League; MIT Media Lab researcher
   Location: US (Boston)
   Expertise: Facial recognition bias, algorithmic auditing, intersectional AI fairness
   Why IISF: Created the Algorithmic Justice League. "Gender Shades" co-author. Direct Crenshaw Standard alignment.
   Priority: 5/5 | Availability: 2/5 (very high demand) | Conflict check: Clean
   Contact: ajl.org — formal inquiry through AJL
   ⚠ Very high-profile. Consider advisory role or joint research partnership.

3. Rumman Chowdhury — AI Accountability Expert
   Current: Dynamic Coalition on Data & Trust (Berkman Klein); formerly Responsible AI at Twitter/Accenture
   Location: US
   Expertise: Responsible AI, algorithmic auditing, AI governance, stakeholder engagement
   Why IISF: Led Twitter's responsible AI/ML ethics team. Deep expertise in practical AI accountability.
   Priority: 4/5 | Availability: 3/5 | Conflict check: Clean — verify current corporate affiliations
   Contact: LinkedIn — direct outreach feasible

4. Safiya Umoja Noble — Author "Algorithms of Oppression"
   Current: Professor, UCLA; Co-founder, Center for Critical Internet Inquiry
   Location: US (Los Angeles)
   Expertise: Algorithmic discrimination, search engine bias, digital racial justice
   Why IISF: "Algorithms of Oppression" is foundational text for Crenshaw Standard framing.
   Priority: 4/5 | Availability: 3/5 | Conflict check: Clean
   Contact: UCLA — academic outreach

5. Sasha Costanza-Chock — Author "Design Justice"
   Current: Associate Professor, Tulane University (formerly MIT)
   Location: US
   Expertise: Design justice, intersectional technology, participatory design, trans rights + tech
   Why IISF: "Design Justice" framework directly complements IISF's intersectional approach. Bridges data ethics + LGBTQ+ + disability.
   Priority: 5/5 | Availability: 3/5 | Conflict check: Clean
   Contact: Academic outreach via Tulane
   ★ TOP CANDIDATE — could serve Data Ethics OR bridge to LGBTQ+ Safety seat.`,

  board_lgbtq: `LGBTQ+ SAFETY SEAT — Candidate Longlist

1. Evan Greer — Director, Fight for the Future
   Current: Director, Fight for the Future (digital rights nonprofit)
   Location: US (Boston)
   Expertise: Digital rights, anti-surveillance, trans rights, privacy, technology policy
   Why IISF: Trans activist leading major digital rights org. Explicitly bridges LGBTQ+ safety + surveillance resistance.
   Priority: 5/5 | Availability: 3/5 | Conflict check: Clean
   Contact: fightforthefuture.org — direct outreach
   ★ TOP CANDIDATE — perfectly bridges LGBTQ+ safety and digital surveillance resistance.

2. Jack Harrison-Quintana — Founder of Grindr for Equality (now at Grindr)
   Current: VP of Social Impact, Grindr
   Location: US
   Expertise: LGBTQ+ safety technology, dating app safety, queer community data
   Why IISF: Built Grindr for Equality program. Deep expertise in LGBTQ+ safety in digital spaces.
   Priority: 4/5 | Availability: 3/5 | Conflict check: VERIFY — Grindr has faced privacy controversies
   Contact: LinkedIn / Grindr — formal inquiry
   ⚠ Grindr privacy history needs due diligence. May be better as advisor than board.

3. Morgan Klaus Scheuerman — AI & Gender Researcher
   Current: Postdoc/faculty, information science (formerly CU Boulder)
   Location: US
   Expertise: AI classification of gender/sexuality, trans visibility in AI, algorithmic identity
   Why IISF: Research directly addresses how AI systems erase or misclassify LGBTQ+ identities. Crenshaw Standard alignment.
   Priority: 4/5 | Availability: 4/5 | Conflict check: Clean
   Contact: Academic outreach

4. Sarah Kate Ellis — CEO, GLAAD
   Current: CEO, GLAAD
   Location: US (New York)
   Expertise: LGBTQ+ advocacy, media representation, cultural safety, organizational leadership
   Why IISF: Leads largest LGBTQ+ media advocacy org. Governance experience. High credibility.
   Priority: 3/5 | Availability: 2/5 (CEO of major org) | Conflict check: Clean
   Contact: glaad.org — formal inquiry

BOARD RECRUITMENT STRATEGY:
  Phase 1: Approach dual-domain candidates first (Lydia X.Z. Brown, Sasha Costanza-Chock, Evan Greer)
  Phase 2: Seek advisory commitments from high-profile candidates (Gebru, Buolamwini, Girma)
  Phase 3: Fill remaining seats with candidates who bring governance + lived experience

  Key principle: Start with "advisory board" asks — lower commitment, builds relationship toward full board seat.
  All outreach must be transparent about IISF's stage (early nonprofit, volunteer board, building credibility).`,

  // ── DOMAIN OWNERSHIP MAP ──────────────────────────────────────────────────

  domain_map_core: `DOMAIN OWNERSHIP MAP — Core Concepts IISF Must Own (1-10)

1. INTERSECTIONAL SAFETY — IISF's foundational concept. No one else defines this. Position as the unifying framework that connects disability safety, AI accountability, and spatial equity.
2. SENSORY SAFETY STANDARDS (Grandin Standard) — Biotelemetric HRV/EDA measurement makes sensory safety auditable. Presenteeism cost: $150B/year.
3. KINETIC EQUITY (Heumann Standard) — IMU gait analysis PCA domains (pace, rhythm, variability, asymmetry, stability). Dynamic accessibility, not static ADA checklists.
4. ALGORITHMIC INVISIBILITY — The right NOT to be seen by algorithms. Distinct from "algorithmic bias." Crenshaw Standard's z-score methodology makes it auditable.
5. INTERSECTIONAL ERROR-RATE PARITY — Auditing fairness across ALL intersectional subgroups. z-score at 95% CI + permutation tests.
6. THE CURB CUT EFFECT (three-domain extension) — Sensory Curb Cut (neurodivergent→all workers), Kinetic Curb Cut (wheelchair→couriers/robots), Algorithmic Curb Cut (parity→all users).
7. AI SAFETY GOVERNANCE / KILL SWITCH — Three-pillar model: Foundation→Licensee→Kill Switch Authority. Novel contribution to AI governance.
8. SENSORY CURB CUT EFFECT — IISF-original term. Sensory-safe environments for neurodivergent workers reduce cognitive fatigue for ALL workers.
9. KINETIC CURB CUT EFFECT — IISF-original term. Wheelchair-accessible infra optimizes routes for couriers, strollers, and SADRs simultaneously.
10. HUMAN RIGHTS DATA ARCHITECTURE — HURIDOCS-based ontology (NAME, EVENT, ACT, BIOGRAPHY, RELATIONSHIP) applied to safety + accountability.

Extended domain concepts (11-25): consent architecture, queer safety in technology, SADR-pedestrian coexistence, presenteeism economics, biotelemetric auditing, EU AI Act + intersectionality, ISO 31030 + intersectional duty of care, disability-first AI design, algorithmic guilt by association, spatial justice + technology, trauma-informed tech design, neurodivergent workplace rights, digital sovereignty for marginalized communities, wearable safety standards, intersectional risk mapping.`,

  // ── CONTENT STRATEGY & SEO ─────────────────────────────────────────────

  content_strategy: `THOUGHT-LEADERSHIP & SEO PLAN — 90-Day Content Calendar

PILLAR PAGES (long-form, evergreen, target 2000+ words):
  P1: "What Is Intersectional Safety?" — Define the field. Target keyword: "intersectional safety." Publish Week 1.
  P2: "The Grandin Standard: Sensory Safety for All Workers" — HRV/EDA methodology, business case. Target: "sensory safety standards." Publish Week 3.
  P3: "The Heumann Standard: Kinetic Equity in Built Environments" — Gait analysis, SADR coexistence. Target: "kinetic equity." Publish Week 5.
  P4: "The Crenshaw Standard: Algorithmic Accountability Through Intersectionality" — Error-rate parity, audit methodology. Target: "intersectional algorithmic fairness." Publish Week 7.
  P5: "The Curb Cut Effect in Technology" — Three-domain extension. Target: "curb cut effect technology." Publish Week 9.

SUPPORTING ARTICLES (800-1200 words, link back to pillar pages):
  S1: "Why Your Office Is Making Neurodivergent Workers Sick — And Costing You $150B/Year" — Business angle. Week 2.
  S2: "LGBTQ+ Safety in the Age of Surveillance AI" — Crenshaw Standard applied. Week 4.
  S3: "How Wheelchair Ramps Make Delivery Robots Better" — Kinetic Curb Cut Effect. Week 6.
  S4: "EU AI Act Compliance Through Intersectional Safety" — Policy alignment. Week 8.
  S5: "ISO 31030 Doesn't Protect Queer Travelers — Here's What Should" — Gap analysis. Week 10.
  S6: "The Kill Switch: Why AI Needs Independent Ethical Enforcement" — Governance model. Week 11.
  S7: "Measuring What Matters: Biotelemetric Approaches to Workplace Safety" — Grandin Standard deep-dive. Week 12.

KEYWORD TARGETS (ranked by opportunity):
  Primary: "intersectional safety" (volume: low, competition: none — OWN IT)
  Primary: "sensory safety standards" (volume: low, competition: low — OWN IT)
  Primary: "kinetic equity" (volume: very low, competition: none — OWN IT)
  Secondary: "algorithmic accountability standards" (volume: medium, competition: medium)
  Secondary: "curb cut effect technology" (volume: medium, competition: low)
  Secondary: "neurodivergent workplace safety" (volume: medium, competition: medium)
  Secondary: "AI safety governance" (volume: high, competition: high — differentiate via kill switch)
  Tertiary: "EU AI Act accessibility" (volume: growing, competition: medium)
  Tertiary: "presenteeism sensory environment" (volume: low, competition: very low)
  Tertiary: "LGBTQ safety technology" (volume: medium, competition: low)

TECHNICAL SEO PRIORITIES:
  1. Schema.org markup: Organization, ResearchProject, ScholarlyArticle, DefinedTerm
  2. Google Scholar profile for IISF + key standards documents
  3. ORCID registration for lead researchers
  4. Each pillar page needs: proper H1/H2 hierarchy, internal linking, canonical URL, meta description
  5. Build backlink pipeline: guest posts on Stanford HAI blog, Brookings TechTank, Access Now blog
  6. Ensure glossary terms link to authoritative pages with structured data

DISTRIBUTION CHANNELS:
  Academic: SSRN pre-prints, Google Scholar, ResearchGate
  Policy: Brookings TechTank, New America, Data & Society
  Media: The Markup, Wired, MIT Technology Review, Rest of World
  Events: RightsCon 2026, AI Safety Summit, CSUN Assistive Technology Conference, M-Enabling Summit
  Social: LinkedIn (primary for B2B/policy), Twitter/X (academic/advocacy), Mastodon (digital rights community)`,

  // ── ROADMAP & ORCHESTRATION ───────────────────────────────────────────────

  roadmap: `SPRINT ROADMAP — Next 90 Days

SPRINT 1 (Weeks 1-4): FOUNDATION LAYING
  □ Funding: Submit LOI/inquiry to Ford Foundation, Open Society, Mozilla MOSS, Luminate
  □ Funding: Register on Humanity AI watch list; draft 2-page concept note
  □ Funding: Apply for Microsoft AI for Good (accessibility track) and Google Cloud for Nonprofits
  □ Board: Outreach to Lydia X.Z. Brown (advisory ask — disability + AI ethics bridge)
  □ Board: Outreach to Evan Greer (advisory ask — LGBTQ+ + surveillance bridge)
  □ Board: Outreach to Sasha Costanza-Chock (advisory ask — design justice + data ethics bridge)
  □ Content: Publish P1 "What Is Intersectional Safety?" pillar page
  □ Content: Publish S1 "Why Your Office Is Making Neurodivergent Workers Sick" article
  □ SEO: Implement Schema.org markup across site (Organization, DefinedTerm)
  □ SEO: Register Google Scholar profile, ORCID IDs
  □ Partnerships: Submit RightsCon 2026 session proposal (deadline varies; typically Q1)
  □ Infrastructure: Register IISF in EU Participant Portal (Horizon Europe prep)

SPRINT 2 (Weeks 5-8): BUILD MOMENTUM
  □ Funding: Follow up on Sprint 1 inquiries; submit full proposals where invited
  □ Funding: Submit Kapor Foundation inquiry (racial equity + algorithmic bias frame)
  □ Funding: Identify university PI partner for NSF co-PI arrangement
  □ Board: Follow up on advisory asks; formalize any acceptances
  □ Board: Outreach to Rumman Chowdhury (AI accountability governance experience)
  □ Content: Publish P2 (Grandin) and P3 (Heumann) pillar pages
  □ Content: Publish S2 (LGBTQ+ surveillance) and S3 (wheelchair ramps + robots) articles
  □ SEO: Begin backlink outreach (Stanford HAI, Brookings, The Markup)
  □ SEO: Submit Grandin Standard paper to SSRN as pre-print
  □ Partnerships: Reach out to Access Now for formal partnership discussion
  □ Partnerships: Contact European Disability Forum about EU AI Act collaboration

SPRINT 3 (Weeks 9-12): SCALE & CREDIBILITY
  □ Funding: Prepare Humanity AI proposal (expected call opens)
  □ Funding: Apply for William T. Grant Foundation (if research partnership secured)
  □ Funding: Submit Horizon Europe consortium expression of interest (with EU partner)
  □ Board: Secure 2-3 advisory board members; begin formalizing roles
  □ Board: Approach Haben Girma or Joy Buolamwini for high-profile advisory endorsement
  □ Content: Publish P4 (Crenshaw) and P5 (Curb Cut) pillar pages
  □ Content: Publish S4-S7 supporting articles
  □ SEO: Analyze first 60 days of traffic data; adjust keyword strategy
  □ SEO: Pursue guest post placements (minimum 2 external publications)
  □ Partnerships: Confirm RightsCon session; begin preparing presentation
  □ Governance: Schedule first advisory board meeting

RISKS & MITIGATIONS:
  Risk: Academic partnership for NSF takes >90 days → Mitigation: Pursue foundation grants in parallel (no academic partner needed)
  Risk: High-profile board candidates decline → Mitigation: Phase approach (advisory first), plus tier-2 candidates ready
  Risk: EU partner for Horizon Europe hard to find → Mitigation: Contact Estonian e-Governance Academy early; also try Digital Rights Foundation (Pakistan) or IT for Change (India)
  Risk: Content production capacity limited → Mitigation: AI-assisted drafting with human expert review; prioritize pillar pages over supporting content
  Risk: Humanity AI fund timeline slips → Mitigation: Ford + Mozilla + Open Society don't depend on Humanity AI

SUCCESS METRICS (90-day):
  Funding: ≥3 LOIs/proposals submitted, ≥1 grant commitment received
  Board: ≥2 advisory board members confirmed
  Content: 5 pillar pages + 4 supporting articles published
  SEO: Top-3 ranking for "intersectional safety" and "sensory safety standards" (low competition)
  Partnerships: ≥1 formal partnership (Access Now or European Disability Forum)
  Infrastructure: EU Participant Portal + Google Scholar + ORCID registered`,

  // ── VECTOR FOR GOOD — IMPACT INVESTORS (Category 2) ────────────────────

  funding_impact_investors: `CATEGORY 2: IMPACT INVESTMENT FUNDS — Strategic Mission Alignment

Impact funds moving beyond "green" investments into S (Social) and G (Governance) ESG pillars.
Vector's 501(c)(3) ownership structure = significant advantage for long-term mission lock.

1. Propel VC — Strengthening the social safety net via AI
   Check Size: $1M - $3M | Focus: US (Global R&D) | Affinity: Social/Safety
   Thesis: "All Americans deserve a consumer-grade experience from their government"
   ★ AI Residency program — non-dilutive R&D + state/federal agency partnerships
   Search: "Propel VC AI Residency program 2026 safety net R&D"

2. Kapor Capital — Gap-closing tech in justice and health
   Check Size: $500K - $2M | Focus: US | Affinity: DEI/Social Justice
   Search: "Kapor Capital 2026 seed deals social justice AI"

3. Obvious Ventures — "World Positive" Planetary/Human/Economic health
   Check Size: $1M - $5M | Focus: US/Global | Affinity: ESG/Human Health
   Demands: Traceability and ethical design; ESG integrated into DNA from early stages
   Vector fit: Shared assessment logs + automated ESRS social disclosures
   Search: "Obvious Ventures Fund V planetary human economic health 2026"

4. ImpactAssets 50 — Emerging impact managers in tech/mobile
   Check Size: Varies | Focus: Global | Affinity: Diversified Impact
   Search: "ImpactAssets 50 2026 list active impact VC managers"

5. Omidyar Network — Intersection of technology and society
   Check Size: $500K - $1.5M | Focus: Global | Affinity: Democracy/Security
   Search: "Omidyar Network 2026 technology and society fund"

6. MacArthur Foundation — People-centered future for AI
   Check Size: $1M+ | Focus: US/Global | Affinity: Equity/Security

KEY INSIGHT: Impact investors want startups that can quantify social impact through auditable metrics.
Vector's shared assessment logs and automated ESRS social disclosures provide exactly this.`,

  // ── VECTOR FOR GOOD — AI/ESG/COMPLIANCE VCs (Category 3) ───────────────

  funding_vc_ai_esg: `CATEGORY 3: AI, ESG & COMPLIANCE-TECH VCs — Vertical AI and Global Resilience

Firms specializing in "Vertical AI" and "Global Resilience" thesis.
Market shift: Moving from "move fast and break things" → "responsible innovation" frameworks.

1. Bessemer Venture Partners
   Lead: Maha Malik (Vertical AI)
   Portfolio: Avantos (AI OS)
   Focus: Application-layer AI, Defense Tech
   2026: Defense Tech/State of AI roadmap; "Built-World AI" as core frontier
   Vector fit: Multi-agent orchestration mirrors Bessemer's focus on uncrewed/agent systems
   Search: "Bessemer Venture Partners 2026 Defense Tech Roadmap"

2. General Catalyst
   Lead: Paul Kwan (Managing Director)
   Portfolio: Helsing (Defense AI)
   Focus: Global Resilience
   2026: GCI Washington Engagement; "Health Assurance" + proactive safety models
   Vector fit: Shifting critical institutions toward proactive wellness and safety
   Search: "General Catalyst Institute 2026 policy summit resilience"

3. Delta-v Capital
   Lead: Garrett Marsilio (Partner)
   Portfolio: VerticalAI (Consultancy)
   Focus: Data Science/Critical Infrastructure
   2026: Proprietary sourcing pipeline
   Search: "Delta-v Capital 2025-2026 data science team partner"

4. Alg Wind Ventures
   Lead: Bob Ma (Director)
   Portfolio: Confidential Stealth AI
   Focus: Critical Infrastructure, Industrial AI
   Search: "Vertical AI application layer VC deals 2026"

5. InsurTech Fund
   Lead: Sokhiba Mukhitdinova
   Portfolio: Quantee (AI Scoring)
   Focus: Fintech/Climate/Safety, ESG Policy
   Search: "InsurTech NY 2026 ESG policy diverse founders"

KEY INSIGHT: NVIDIA Inception-powered architecture provides "technological sovereignty" and
"trustworthy cognitive AI" these firms seek to strengthen national resilience.`,

  // ── VECTOR FOR GOOD — DIVERSITY & AFFINITY VCs (Category 4) ─────────────

  funding_vc_diversity: `CATEGORY 4: DIVERSITY, QUEER & AFFINITY-FOCUSED VCs

1. Gaingels — LGBTQ+ Founders/Allies
   Model: Syndicate (2,400+ companies, $900M+ deployed)
   Portfolio: BoldHue (Beauty AI)
   Focus: Diversity/Inclusive Teams; active in board/C-suite diversity pipeline
   ★ Preeminent LGBTQ+ investor syndicate
   Search: "Gaingels 2026 investment portfolio AI safety"

2. Harlem Capital — Black/Latino Founders
   Check Size: $750K - $1M (Seed) | Portfolio: Testparty (Accessibility)
   Focus: Great founders in $1B+ markets; monthly revenue, unit economics, retention
   Vector fit: Crenshaw module mitigates intersectional social/legal risks → justice and equity
   Search: "Harlem Capital 2026 winter intern class portfolio"

3. WITH Foundation — Intellectual/Developmental Disability
   Model: Award-based | Portfolio: HapWare (Health Challenge)
   Focus: Health Innovation Challenges
   Search: "WITH Foundation 2026 Health Innovation Challenge winner"

4. TransTech Social — Queer/Trans/Diverse Tech
   Check Size: Varies | Focus: Economic empowerment for trans/diverse talent
   Search: "LGBTQ+ startup investors 2026 top 50 list"

5. Backstage Capital — Underrepresented Founders
   Check Size: $50K - $1M | Portfolio: 100+ diverse startups
   Focus: Inclusive ecosystem building
   Search: "Diversity in VC 2026 Series A benchmarks"`,

  // ── VECTOR FOR GOOD — ENTERPRISE SAFETY VCs (Category 5) ───────────────

  funding_vc_enterprise_safety: `CATEGORY 5: ENTERPRISE SAFETY, TRAVEL & REGULATORY VCs

Firms tied to corporate travel and duty-of-care infrastructure.
Focus: "High Velocity Critical Event Management" (CEM), national public warning.
Gap: 50% of customers lack formal management strategies; AI investment to close readiness gaps.

1. Everbridge Ventures — Critical Event Management
   Interest: AI-driven Risk Intelligence
   Engage: Discover Resilience 2026 conference
   Search: "Everbridge 2026 Global Risk Resilience Outlook"

2. International SOS — Duty of Care Training
   Interest: Travel Risk Standards
   Engage: Rome Summit May 2026
   Search: "International SOS Duty of Care Awards May 2026"

3. ServiceNow — Critical Infrastructure
   Interest: Emergency Event Management; Joint Solution Integration
   Search: "ISO 31030 travel risk management tech providers 2026"

4. Bessemer (Defense) — National Security/Robotics
   Lead: David Cowan (Partner)
   Interest: On-Edge Agentic AI
   Search: "Executive protection study 2026 ASIS Everbridge"

5. 50 Years — Deep Tech Addressing SDGs
   Interest: Drug Discovery/AI Safety; Mission-Critical Scaling
   Search: "Agentic AI for critical infrastructure security 2026"

KEY INSIGHT: "Expanding Risk Zone" in 2026 — convergence of digital, physical, and human vulnerabilities.
Vector provides "decision-ready risk intelligence" at the digital-physical intersection.`,

  // ── NVIDIA INCEPTION & AGENTIC AI ADVANTAGE ─────────────────────────────

  nvidia_inception: `NVIDIA INCEPTION PROGRAM — Agentic AI Advantage (2026)

TECHNICAL RESOURCES:
  • Access to 150+ NVIDIA SDKs and pre-trained models
  • Iterate on large datasets; deploy models at the edge
  • Critical for Heumann and Grandin modules in air-gapped/low-connectivity environments

VC ALLIANCE:
  • Direct introductions to global investors excited about accelerated computing for real-world impact
  • Target: Request formal intros through Inception leadership to Bessemer + General Catalyst partners

MARKET VISIBILITY:
  • GTC Washington D.C. — present to government agencies and Fortune 500 partners
  • Positioning: "Secure, AI-Enabled Models" that protect privacy and compliance
  • Eureka Park / CES 2026 accessibility stage

AGENTIC AI TREND (2026):
  The market shift from chatbots → autonomous agents solving labor shortages in compliance auditing and regulatory writing.
  Portfolio examples: Accrual (financial compliance), Ritivel (YC W2026, regulatory)
  Vector fit: Multi-agent systems providing automated ESG narratives = high-impact alignment with this trend.`,

  // ── SEED ROUND STRATEGY & EXECUTION ────────────────────────────────────

  seed_round_strategy: `$2.5M SEED ROUND — Strategic Execution Plan

1. GRANT HIT LIST (Q1-Q2 2026 PRIORITY):
   a) NSF SBIR Phase I (Feb 2026 Window): Target MO7 (Accessibility) + AI7 (Trustworthy AI)
      Emphasize Heumann module navigation + NVIDIA privacy architecture
   b) EIC Accelerator: Use Estonia OÜ for blended finance; target STEP Seal
   c) Humanity AI Coalition: Submit project proposal for Pooled Fund (Rockefeller Philanthropy Advisors)
      Frame Crenshaw module as "Security" + "Democracy" tool
   d) CTA Foundation Pitch Competition: Leverage CES 2026 Accessibility Stage
      Secure awards + sponsorship from Verizon or Microsoft

2. WARM INTRO & NETWORK STRATEGY:
   a) NVIDIA VC Alliance: Request intros to Bessemer (Vertical AI) + General Catalyst (Global Resilience)
   b) Propel AI Residency: Submit 2026 application for non-dilutive R&D + agency partnerships
   c) Estonia Regional Development Center: Complete RUP pre-consultation by Feb 25, 2026 → March 23 deadline

3. PITCH TWEAKS FOR $2.5M SEED ASK:
   a) Reframe: NOT "travel safety for minorities" → "Solution to the ISO 31030/GDPR Compliance Paradox"
      Position as essential risk mitigation tool, not optional social initiative
   b) "Compliance Bridge" Narrative: Only tool delivering ESRS S1-S4 social disclosures
      without triggering data privacy violations (Feb 2026 CSRD scope)
   c) Founder Advantage: Levi Hankins — Navy vet + multi-agent AI expert
      Builds credibility with Defense/Security VCs (Bessemer, General Catalyst)

RISKS & GAPS:
  • EU AI Act high-risk designation → Conduct FRIAs for Crenshaw/Grandin modules
  • Human oversight mandate → Multi-agent architecture needs human-in-the-loop verification
  • CSRD gap → Most enterprises have no "S" metrics for intersectional workforce (opportunity)
  • Competitive pressure → Avantos ($25M Series A), Ritivel (YC W2026) accelerating "Compliance AI Agents"
  • Seed valuations down 20-30% from 2023 → VCs prioritize revenue + unit economics over growth

THE 501(c)(3) ADVANTAGE:
  Vector's IISF ownership = unique trust in an era where "Trustworthy AI" is weaponized by big tech.
  Operates as a "CERN for AI Safety" — attracts talent and grants for-profit competitors cannot access.`,
};

// ─────────────────────────────────────────────────────────────────────────────
// Tool definition — agents query by section
// ─────────────────────────────────────────────────────────────────────────────

export const opsIntelTool = createTool({
  name: "ops_intel",
  description:
    "Query IISF operational intelligence. Sections: 'funding_tier1/2/3' (nonprofit grants), 'funding_grants_federal' (NSF/EIC/Estonia/HHS federal grants), 'funding_impact_investors' (Propel/Kapor/Obvious/Omidyar), 'funding_vc_ai_esg' (Bessemer/GC/Delta-v), 'funding_vc_diversity' (Gaingels/Harlem/TransTech), 'funding_vc_enterprise_safety' (Everbridge/IntlSOS/ServiceNow), 'enterprise_compliance' (ISO 31030/GDPR/CSRD regulatory landscape), 'nvidia_inception' (NVIDIA resources & VC Alliance), 'seed_round_strategy' ($2.5M seed execution plan), 'board_disability/data_ethics/lgbtq', 'domain_map_core', 'content_strategy', 'roadmap'. Use 'all_sections' to list all keys.",
  parameters: z.object({
    section: z
      .string()
      .describe(
        "Section key to retrieve. Use 'all_sections' to list available keys."
      ),
  }),
  execute: async ({ section }) => {
    if (section === "all_sections") {
      return `Available ops-intel sections:\n${Object.keys(OPS_INTEL).join("\n")}`;
    }
    const data = OPS_INTEL[section];
    if (!data) {
      return `Section "${section}" not found. Available: ${Object.keys(OPS_INTEL).join(", ")}`;
    }
    return data;
  },
});