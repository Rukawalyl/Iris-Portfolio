/* ==========================================================================
   CASE STUDIES — order in this array = order on the Case Studies page.
   `body` is lightweight Markdown: ### heading, #### sub-heading, **bold**, - list, * list.
   Links: only add a key if the destination is real. Empty links never render a button.
     pdfUrl  → "View Full Proposal / PDF"
     liveUrl → "Live" (only for Iris's own shipped work)
     brandUrl→ "Company website" (not Iris's work)
   cover: image path; coverBg: background colour behind contain-fit logo covers.
   ========================================================================== */

window.CASE_STUDIES = [
  {
    id: "thinkvas-ai",
    title: "Thinkvas AI",
    category: "AI · Productivity · EdTech",
    summary: "Driving revenue growth through strategic paid search campaigns and data-driven optimization.",
    role: "Product Growth and Marketing Intern",
    year: "2025–26",
    skills: ["Paid Search", "SEO", "Google Analytics", "Reddit Ads", "LinkedIn Ads", "Content Strategy", "AI Product Marketing"],
    cover: "assets/images/projects/thinkvas-cover.jpg",
    coverFit: "cover",
    coverBg: "#FBF6EF",
    brandUrl: "https://www.thinkvasai.com/",
    highlights: [
      { value: "3.2%", label: "CTR on Reddit Ads (vs. 2.1% benchmark)" },
      { value: "+43%", label: "Organic traffic over 4 months" },
      { value: "+12%", label: "Sign-up conversion lift" },
    ],
    body: `
### Challenge
Thinkvas AI launched as an innovative AI canvas tool designed to break users free from traditional linear chat interfaces. The platform enables multi-threaded conversations, branching discussions, and visual thinking across an infinite canvas, targeting knowledge workers, researchers, students, and creative professionals frustrated by single-chat limitations in tools like ChatGPT and Claude.

Operating with a lean team across different time zones, the company faced critical growth challenges: limited brand awareness in a crowded AI tools market, complex product education barriers around nonlinear thinking and multi-threading concepts, high customer acquisition costs threatening runway, unclear messaging resonance across user segments, and resource constraints typical of early-stage startups with no dedicated marketing team.

As the sole marketing hire working directly with the founder, I took the initiative to launch and scale paid acquisition while building organic visibility in a fast-moving, highly iterative startup environment.

### Impact
As a one-person growth team, I established the marketing infrastructure from the ground up, managing the full lifecycle from strategy to execution and analysis.

#### Campaign Setup
I managed the end-to-end setup of paid campaigns on **Reddit Ads Manager** and **LinkedIn Campaign Manager**. This involved implementing robust tracking (UTM, Pixel) to ensure data accuracy and developing a budget allocation logic to maximize efficiency across channels.

#### Audience & Creative Testing
To reach our niche audience, I executed precise community targeting on Reddit (e.g., r/ChatGPT, r/productivity). I rigorously **A/B tested** ad creatives and messaging, leveraging asynchronous collaboration to iterate rapidly based on performance data.

#### Conversion Insights
Using **GA4 funnel analysis**, I identified key drop-off points in the onboarding process. I translated these marketing insights into actionable product feedback, helping to refine the user journey and improve retention.

#### SEO
I used **SEMrush** and **Google Search Console** to drive our organic strategy, creating high-value comparison pages and use-case focused content to capture high-intent search traffic.

### Results
**Paid Acquisition**
- **3.2% CTR** on Reddit Ads (vs. 2.1% benchmark)
- **8% CPA reduction** through optimization
- **35% lower CPA** on Reddit compared to LinkedIn

**Organic Growth**
- **43% organic traffic increase** over 4 months
- **First-page rankings** for 30+ strategic keywords

**Strategic Impact**
- **12% sign-up conversion lift** via funnel improvements
- Established scalable acquisition **playbooks** for future growth
`,
  },

  {
    id: "loccitane",
    title: "L'OCCITANE en Provence",
    category: "Go-to-Market · Campaign Strategy · Analytics",
    summary: "Driving revenue growth during flagship Mega Sale events through integrated digital campaigns and full-funnel performance optimization.",
    role: "Product Marketing Intern",
    year: "2024",
    skills: ["Paid Social", "Campaign Management", "KOC Seeding", "Google Analytics", "A/B Testing", "CRO", "Performance Analysis"],
    cover: "assets/images/projects/loccitane-cover.jpg",
    coverFit: "contain",
    coverBg: "#F2B33D",
    brandUrl: "https://www.loccitane.com/en-us/",
    highlights: [
      { value: "+28%", label: "New-product conversion rate (618)" },
      { value: "+40%", label: "Product search volume" },
      { value: "+18%", label: "ROI after budget reallocation" },
    ],
    // Updated per PRD 6.5 with the latest résumé figures. The +28% now uses the new-product conversion caliber only.
    body: `
### Challenge
L'Occitane en Provence, a global premium beauty brand, needed to maximize revenue during its flagship 618 Mega Sale in a crowded digital beauty market. The company faced critical challenges: fragmented campaign execution across paid and organic channels leading to inefficient spend, limited real-time visibility into funnel performance preventing optimization, and the need to balance promotional urgency with premium brand positioning without eroding brand equity.

As Product Marketing Intern during peak summer shopping season, I drove go-to-market execution for the Mega Sale across digital channels while establishing performance infrastructure for data-driven decision making.

### Impact
As part of the digital marketing team, I owned campaign execution, analytics, and cross-functional coordination to drive measurable conversion impact.

#### Integrated Campaign
I helped plan and execute the 618 campaign end to end — distilling product selling points, writing copy, and coordinating across e-commerce platforms and social channels so every launch moment landed on time. I monitored performance daily and worked with media teams to reallocate budget toward the highest-performing segments in real time.

#### Content & Community
I built the Xiaohongshu and Douyin seeding plan, selected and onboarded **12 KOCs**, and reviewed **30+ seeding posts**, which together generated **150K+ interactions** and fed creative insights back into RTB ad optimization.

#### Creative & Positioning
I broke down competitors' selling-point structures and marketing direction in **4 insight reports**, proposing differentiated narratives adopted into the new-product strategy. I A/B tested messaging frameworks (product benefits vs. lifestyle storytelling vs. urgency-driven) to find the strongest-converting formats while protecting premium positioning.

#### Performance Analytics
I tracked SKU and channel performance with Excel pivot tables and dashboards, delivering **12 weekly reports** that surfaced high-potential products and guided budget allocation.

### Results
- **+28% conversion rate** for new products during the 618 campaign
- **+40% product search volume** driven by KOC seeding on Xiaohongshu and Douyin
- **150K+ interactions** across 30+ KOC posts
- **+18% ROI** through SKU- and channel-level budget optimization
`,
  },

  {
    id: "shopback-audit",
    title: "ShopBack",
    category: "UX Strategy · Email Marketing · CRO",
    summary: "A comprehensive strategic audit of ShopBack's user acquisition funnel, focusing on landing page optimization and CRM email effectiveness.",
    role: "Strategy Proposal",
    year: "",
    skills: ["UX/UI Audit", "Conversion Optimization", "Email Marketing", "Consumer Psychology", "A/B Testing Strategy"],
    cover: "assets/images/projects/shopback-cover.jpg",
    coverFit: "cover",
    coverBg: "#000000",
    pdfUrl: "portfolio-assets/files/projects/shopback/shopback-strategy-proposal.pdf",
    pdfLabel: "View Full Proposal",
    body: `
### Challenge
ShopBack is a leading cashback platform, but educating new users about earning cash back often triggers natural skepticism. The challenge was twofold. First, the core landing page needed a revamp to bridge the trust gap and clearly communicate value. Second, their promotional email campaigns were suffering from cognitive overload and conflicting messaging. This increased user friction and reduced overall engagement.

### Strategic Approach
I conducted a comprehensive audit of ShopBack's web and email touchpoints. By applying behavioral psychology principles like Trust Deficit Theory and decision fatigue, I evaluated the user journey across design, content, and cross-platform accessibility to identify high-impact optimization opportunities.

### Key Recommendations
#### Landing Page
**Concrete Value Proposition:** I recommended shifting from abstract corporate jargon to quantified and relatable benefits. Instead of vague promises, the new hero section explicitly states potential annual savings and exact cash back percentages.

**Building a Trust Fortress:** To overcome skepticism, I proposed replacing generic retailer banners with tangible everyday products that display exact cash back amounts. I also introduced layered social proof. This includes real-time activity feeds, verified app store ratings, and specific user testimonials.

**Visualizing the Money Flow:** I outlined a clear visual diagram to explain the affiliate business model. This demystifies where the money comes from and removes the hesitation that the offer is too good to be true.

#### Email Marketing
**Reducing Cognitive Overload:** The original email featured a scrolling grid of twelve equally weighted offers. I recommended introducing clear visual hierarchy cues like highlight badges to guide user attention and prevent decision fatigue.

**Clarifying Urgency:** I identified conflicting expiration dates and buried promotional values that were hurting credibility. The revised strategy places the highest value offer front and center while unifying the campaign timeline.

**Streamlining the User Journey:** Secondary actions like downloading the browser extension were interrupting the main shopping flow. I suggested repositioning these elements to the bottom of the email to maintain a frictionless browsing experience.
`,
  },

  {
    id: "netease",
    title: "NetEase",
    category: "Digital Marketing · Paid Social · Growth",
    summary: "Optimizing user acquisition and web funnels for overseas tech products through data-driven analysis and creative testing.",
    role: "Digital Marketing Intern",
    year: "2023",
    skills: ["Paid Social", "Google Analytics", "TikTok Ads", "Meta Ads", "SEMrush", "SimilarWeb", "A/B Testing"],
    cover: "assets/images/projects/netease-tryfun.jpg",
    coverFit: "contain",
    coverBg: "#FFFFFF",
    body: `
### Challenge
NetEase's overseas digital business team drove user acquisition for technology products sold through independent websites, relying on web-based traffic, paid social media, and conversion optimization.

The team faced several critical challenges. Paid social traffic quality varied significantly across channels, making it difficult to scale spend efficiently without inflating CPA. Limited visibility into the end-to-end web funnel made it hard to identify where users dropped off between ad click and conversion. Creative testing across Google, TikTok and other platforms lacked structured frameworks, slowing iteration speed and reducing the ability to identify scalable winning formats under budget constraints.

### Impact
As Digital Marketing Intern, I supported paid acquisition and web growth efforts by translating performance data into actionable insights across traffic quality, funnel behavior, and creative effectiveness.

#### Paid Social
I analyzed paid social campaigns across Meta and TikTok, focusing on CTR, CPC, and conversion rates. I identified channel-level efficiency differences and supported budget reallocation decisions to improve overall acquisition performance and reduce wasted spend.

#### Funnel Analysis
I used GA4 to map the full web acquisition funnel from ad click through landing page engagement to conversion. I identified critical drop-off points related to page load issues, messaging misalignment, and CTA placement, and synthesized findings into optimization recommendations for landing page structure and campaign targeting.

#### Creative Testing
I reviewed 32 paid social A/B tests comparing creative formats (video vs. static), messaging angles (product features vs. user benefits), and audience segments, helping establish a repeatable testing framework that improved learning velocity and guided creative prioritization.

#### Competitive Research
I conducted competitive analyses using SEMrush and SimilarWeb to benchmark traffic sources, messaging strategies, and positioning across comparable international tech products. Insights informed differentiation strategies and campaign planning decisions.

### Results
These efforts contributed to more structured and data-driven acquisition processes:
- **Funnel Optimization:** Identified key friction points and delivered conversion recommendations that reduced landing page drop-off rates
- **Creative Framework:** Established a testing playbook across 32 experiments that improved the team's ability to scale high-performing formats
- **Media Efficiency:** Supported more efficient budget allocation by highlighting channel-level performance differences
- **Strategic Impact:** Strengthened the team's web-based acquisition approach by integrating traffic quality, funnel behavior, and creative insights into ongoing optimization

By combining performance analysis, experimentation, and competitive intelligence, I helped build a repeatable and scalable framework for driving growth across international web products.
`,
  },

  {
    id: "sunrise-starlight",
    title: "Sunrise Starlight Media",
    category: "E-commerce · TikTok Shop · Analytics",
    summary: "Scaling e-commerce performance for TikTok Shop campaigns through data-driven creative optimization and audience strategy.",
    role: "Global E-commerce Analytics Intern",
    year: "2025",
    skills: ["TikTok Shop", "Performance Marketing", "Data Analysis", "Audience Segmentation", "Campaign Reporting"],
    cover: "assets/images/projects/sunrise-cover.jpg",
    coverFit: "cover",
    coverBg: "#EEF3F8",
    highlights: [
      { value: "+19%", label: "CTR lift" },
      { value: "+11%", label: "Conversion rate" },
      { value: "42M+", label: "Total interactions" },
    ],
    body: `
### Challenge
Sunrise Starlight Media, a performance marketing agency specializing in TikTok Shop campaigns, managed e-commerce advertising for multiple consumer brands competing in the crowded short-form video space. The agency faced critical challenges in maximizing client ROI: identifying which creator content and ad formats drove the strongest conversion rates, optimizing budget allocation across dozens of concurrent campaigns with limited testing budgets, and proving clear performance value to clients through comprehensive reporting.

With campaigns generating millions in monthly GMV, the agency needed data-driven optimization strategies to scale winning creative, refine audience targeting for higher-intent users, and establish repeatable processes that improved efficiency across all client accounts.

### Impact
As Global E-commerce Analytics Intern, I supported TikTok Shop campaign optimization through creative performance analysis, audience strategy development, and comprehensive reporting to drive conversion efficiency and revenue growth.

#### Creative Scaling
I analyzed performance data across creator-led ads and livestream content to identify top-performing formats, hooks, and messaging angles, then collaborated with creative and media teams to scale high-performing variations and shift budget toward the content that converted best.

#### Audience Targeting
I built audience segments using conversion data, purchase behavior patterns, and demographic insights to guide targeting strategy, and developed recommendations for keyword bidding and audience allocation that helped media buyers focus spend on high-intent users.

#### Reporting & Insights
I delivered post-campaign reports tracking GMV, conversion rates, CTR, CPC, and full-funnel metrics across multiple brand campaigns, synthesizing findings into actionable recommendations for creative development, targeting refinement, and budget optimization.

### Results
Through systematic performance analysis and data-driven optimization, Sunrise Starlight Media achieved measurable campaign improvements:
- **19% CTR lift** through creative optimization and scaling of top-performing formats
- **11% conversion rate increase** via audience segmentation and targeting refinement
- **42M+ total interactions** across managed campaigns
- Delivered **6 comprehensive reports** that strengthened client relationships and informed ongoing strategy
- Established **performance benchmarking processes** that improved efficiency across concurrent campaigns
`,
  },
];
