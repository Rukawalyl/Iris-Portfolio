/* ==========================================================================
   SITE DATA — all text on the site lives here. Edit text here; no code changes needed.
   Text written by Iris is used word for word.
   ========================================================================== */

window.SITE = {
  name: "Iris Li",
  shortName: "Iris",
  email: "lyl20341077@outlook.com",
  emailSubject: "Hello Iris",
  linkedin: "https://www.linkedin.com/in/iris-yulin-li/",
  linkedinHandle: "iris-yulin-li",
  // Resume PDF. Swap for a self-hosted file (e.g. "assets/files/Iris-Li-Resume.pdf") when ready.
  resumeUrl: "https://superb-teal-4tnwd48x.edgeone.dev/",

  hero: {
    traits: ["Strategy-minded", "Product-driven", "AI-curious"],
    intro:
      "I’m a marketer interested in product growth, with experience in user acquisition, market research, product launches, and integrated marketing. I enjoy using data and customer insights to understand what drives growth, while combining analytical thinking with creative storytelling to turn insights into effective marketing strategies.",
    cta: { label: "Get to know me better", href: "#/about" },
    portrait: "assets/images/home/home-portrait.jpg",
  },

  caseStudiesIntro: {
    title: "Case Studies",
    description: "A glimpse into my work: the challenges I tackled, ideas I brought to life, and results I helped drive.",
    // Homepage cards, in order (ids from data/case-studies.js).
    featured: ["thinkvas-ai", "loccitane", "shopback-audit", "netease"],
  },

  contact: {
    eyebrow: "Open to thoughtful conversations",
    titleBefore: "Let's make the next",
    accent: "Move",
  },

  footer: {
    line: ["Consumer insight", "Product innovation", "Growth strategy"],
    copyright: "Iris",
  },

  about: {
    title: "Hi, I'm Iris :)",
    welcome: "Welcome to my corner of the internet.",
    // Two photos in one frame — hover (or tap) to switch.
    photos: [
      { src: "assets/images/about/about-garden.jpg", alt: "Iris in a garden, smiling" },
      { src: "assets/images/about/about-capitol.jpg", alt: "Iris in front of the U.S. Capitol in Washington, D.C." },
    ],
    // Iris's exact words. [Text](url) becomes a link.
    paragraphs: [
      "I am a marketer with a Master’s in Communication from [Johns Hopkins University](https://www.jhu.edu/), with experience across product growth, performance marketing, and integrated marketing, including market research, product launches, paid media, and marketing analytics.",
      "I am lucky enough to have been involved in [RoboSense](https://www.robosense.ai/index/index), [Johns Hopkins Bloomberg School of Public Health](https://publichealth.jhu.edu/), [Thinkvas AI](https://www.thinkvasai.com/), [L'Occitane](https://www.loccitane.com/en-us/), [NetEase](https://www.neteasegames.com/), [MINISO](https://www.miniso-us.com/), and [Publicis Groupe](https://www.publicisgroupe.com/en/splash-en), wearing different hats in each organization.",
      "I find inspiration in turning cultural insights into data-driven stories that resonate. I use data, user insights, and market research to understand what drives growth, then translate those insights into positioning, go-to-market strategies, and campaigns that connect products with the right audiences. I also enjoy breaking down complex problems, synthesizing different perspectives, and turning ambiguity into clear, actionable marketing decisions.",
      "Aside from work, I'm probably climbing, hiking, or baking cinnamon swirl bread (the kind that makes your kitchen smell amazing). Throw in a matcha latte, a film that makes me think, or a city walk with my camera hunting for the perfect shot, and I'm in my element. I love exploring new cultures, finding hidden gems in every city, and blending creativity with intention, whether that's in marketing strategies or weekend adventures.",
    ],
    signoff: "Feel free to reach out to me below :)",
  },

  journey: {
    title: "Journey",
    ending: "still being drawn",
    stops: [
      { city: "Shenzhen", line: "I grew up embracing change and new possibilities.", art: "shenzhen" },
      { city: "Guangzhou", line: "I fell in love with marketing while exploring the worlds of tech, media, and advertising.", art: "guangzhou" },
      { city: "Washington, D.C.", line: "I fulfilled my childhood dream of seeing the bigger world.", art: "dc" },
      { city: "Shenzhen, again", line: "where I found my way into tech!", art: "shenzhen2" },
    ],
  },

  resume: {
    quote: "Let yourself be silently drawn by the strange pull of what you really love. It will not lead you astray.",
    quoteBy: "Rumi",
    philosophy:
      "I believe marketing, like life, is most powerful when it's authentic. My approach is guided by genuine curiosity about human behavior and cross-cultural connection — trusting that deep understanding, paired with data-driven strategy, creates campaigns that resonate and drive sustainable growth.",
  },

  /* Work — newest first. caseStudy: optional case-study id. */
  experience: [
    { org: "RoboSense", title: "Global Branding & PR", dates: "Jul 2026 – Present", caseStudy: "" },
    { org: "Johns Hopkins Bloomberg School of Public Health", title: "Content Creator", dates: "Oct 2025 – Apr 2026" },
    { org: "Thinkvas AI", title: "Product Growth and Marketing Intern", dates: "Sep 2025 – Feb 2026", caseStudy: "thinkvas-ai" },
    { org: "Sunrise Starlight Media Co., Ltd.", title: "Global E-commerce Analytics Intern", dates: "May 2025 – Aug 2025", caseStudy: "sunrise-starlight" },
    { org: "L'OCCITANE Group", title: "Product Marketing Intern", dates: "May 2024 – Aug 2024", caseStudy: "loccitane" },
    { org: "MINISO", title: "Product Marketing Intern", dates: "Jan 2024 – Apr 2024" },
    { org: "NetEase", title: "Digital Marketing Intern", dates: "Aug 2023 – Dec 2023", caseStudy: "netease" },
    { org: "Publicis Groupe", title: "Performance Marketing Intern", dates: "May 2023 – Aug 2023" },
    { org: "Sun Yat-sen University", title: "Social Media Director", dates: "Jul 2021 – May 2024" },
    { org: "Southern Chinese Daily News", title: "Omnimedia Journalist Intern", dates: "Jan 2023 – Feb 2023" },
    { org: "Yangcheng Evening News", title: "New Media Editor Intern", dates: "May 2022 – Aug 2022" },
  ],

  /* Education — no dates, per Iris. Logos are greyed out and light up on hover. */
  education: [
    { school: "Johns Hopkins University", degree: "Master of Communication", logo: "assets/images/logos/jhu.png", url: "https://www.jhu.edu/" },
    { school: "Sun Yat-sen University", degree: "Bachelor of Arts in German Language and Literature", logo: "assets/images/logos/sysu.png" },
  ],

  /* "What I do" — Iris listed "Integrated Marketing & GTM" twice; the two lists are merged into one group here. */
  whatIDo: [
    { title: "Growth Marketing", items: ["User Acquisition", "Paid Media", "SEO", "Funnel Analysis", "Marketing Analytics"] },
    { title: "Product Marketing", items: ["Market Research", "User Insights", "Competitive Analysis", "Positioning & Messaging", "Product Launches"] },
    { title: "Integrated Marketing & GTM", items: ["Campaign Strategy", "KOL Partnerships", "PR & Media", "Global Communications", "Cross-functional Execution", "Website Development"] },
  ],

  superpowers: [
    { title: "Take initiative", text: "I enjoy taking the lead and sharing well-prepared proposals to align teams around clear ideas." },
    { title: "Navigate ambiguity", text: "I bring people together through clear communication to find common ground in uncertain situations." },
    { title: "Exhibit adaptability", text: "I thrive when adapting to new environments and challenges." },
  ],

  /* AI Projects — reserved. Add items with published: true to show a section on the homepage. */
  aiProjects: [],
};
