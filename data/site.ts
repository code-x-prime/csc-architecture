export type SitePage = {
  slug: string
  title: string
  eyebrow: string
  description: string
  sections: { heading: string; body: string; items?: string[] }[]
  related?: string[]
}

export const nav: { label: string; href: string; items: [string, string][] }[] = [
  {
    label: 'Solutions',
    href: '/solutions/bi-analytics',
    items: [
      ['BI Analytics', '/solutions/bi-analytics'],
      ['Technology Consulting', '/solutions/technology-consulting'],
      ['Customer Engagement Technology', '/solutions/customer-engagement-technology'],
      ['Mergers & Acquisitions', '/solutions/mergers-and-acquisitions'],
      ['Automated Software Testing', '/solutions/automated-software-testing'],
      ['Functional Test', '/solutions/functional-test'],
      ['Performance Test Automation', '/solutions/performance-test-automation'],
      ['Regression Test Automation', '/solutions/regression-test-automation'],
    ],
  },
  {
    label: 'How We Help',
    href: '/how-we-help/great-framework',
    items: [
      ['Great Framework', '/how-we-help/great-framework'],
      ['Business Simulation', '/how-we-help/business-simulation'],
      ['Change Management', '/how-we-help/change-management'],
      ['Innovation & Digital Transformation', '/how-we-help/innovation-digital-transformation'],
      ['Strategic Execution', '/how-we-help/strategic-execution'],
      ['Learning Programs', '/how-we-help/learning-programs'],
    ],
  },
  {
    label: 'Who We Help',
    href: '/who-we-help/manufacturing',
    items: [
      ['Biotech Pharma', '/who-we-help/biotech-pharma'],
      ['Health Care Practice', '/who-we-help/health-care'],
      ['Technology', '/who-we-help/technology'],
      ['Professional Services', '/who-we-help/professional-services'],
      ['Banking', '/who-we-help/banking'],
      ['Insurance', '/who-we-help/insurance'],
      ['Retail', '/who-we-help/retail'],
      ['Oil & Gas', '/who-we-help/oil-and-gas'],
      ['Consumer Products', '/who-we-help/consumer-products'],
      ['Telecommunication', '/who-we-help/telecommunication'],
      ['Manufacturing', '/who-we-help/manufacturing'],
    ],
  },
  {
    label: 'Careers',
    href: '/careers/find-talent',
    items: [
      ['Find a Job', '/careers/find-a-job'],
      ['Find Talent', '/careers/find-talent'],
      ['Permanent Placements', '/careers/permanent-placements'],
      ['Temp / Contract Staff Augmentation', '/careers/temp-contract-staff-augmentation'],
      ['Career Consulting', '/careers/career-consulting'],
    ],
  },
  {
    label: 'Company',
    href: '/team',
    items: [
      ['Team', '/team'],
      ['Contact', '/contact'],
    ],
  },
]

const solutionData = [
  ['bi-analytics', 'BI Analytics', 'Turn information into practical decisions with clearer reporting, measurement, and business insight.'],
  [
    'technology-consulting',
    'Technology Consulting',
    'Align technology investments and operating models with the outcomes your organization needs.',
  ],
  [
    'customer-engagement-technology',
    'Customer Engagement Technology',
    'Design connected customer experiences across the systems, teams, and moments that matter.',
  ],
  [
    'mergers-and-acquisitions',
    'Mergers & Acquisitions',
    'Support critical transitions with structured analysis, execution planning, and change leadership.',
  ],
  [
    'automated-software-testing',
    'Automated Software Testing',
    'Build confidence in software quality through repeatable, scalable testing programs.',
  ],
  ['functional-test', 'Functional Test', 'Validate that products and platforms perform the work users and the business expect.'],
  [
    'performance-test-automation',
    'Performance Test Automation',
    'Test speed, resilience, and scale before they become customer-facing constraints.',
  ],
  [
    'regression-test-automation',
    'Regression Test Automation',
    'Protect releases with dependable automated coverage for evolving products.',
  ],
]
const helpData = [
  ['great-framework', 'Great Framework', 'A practical framework for connecting strategy, people, process, and execution.'],
  ['business-simulation', 'Business Simulation', 'Make complex decisions visible through facilitated scenarios and applied learning.'],
  ['change-management', 'Change Management', 'Help teams understand, adopt, and sustain the changes that move the business forward.'],
  [
    'innovation-digital-transformation',
    'Innovation & Digital Transformation',
    'Turn new ideas and technology opportunities into an actionable transformation path.',
  ],
  ['strategic-execution', 'Strategic Execution', 'Translate priorities into aligned work, measurable progress, and accountable action.'],
  ['learning-programs', 'Learning Programs', 'Build capability through focused programs designed around real organizational needs.'],
]
const industryData = [
  ['biotech-pharma', 'Biotech Pharma'],
  ['health-care', 'Health Care Practice'],
  ['technology', 'Technology'],
  ['professional-services', 'Professional Services'],
  ['banking', 'Banking'],
  ['insurance', 'Insurance'],
  ['retail', 'Retail'],
  ['oil-and-gas', 'Oil & Gas'],
  ['consumer-products', 'Consumer Products'],
  ['telecommunication', 'Telecommunication'],
  ['manufacturing', 'Manufacturing'],
]
const careerData = [
  ['find-a-job', 'Find a Job', 'Explore opportunities and connect your strengths with work that matters.'],
  ['find-talent', 'Find Talent', 'Flexible talent solutions for organizations building capable, responsive teams.'],
  ['permanent-placements', 'Permanent Placements', 'Thoughtful search and placement support for long-term team growth.'],
  [
    'temp-contract-staff-augmentation',
    'Temp / Contract Staff Augmentation',
    'Additional capability when you need it, with flexible contract and staff augmentation support.',
  ],
  ['career-consulting', 'Career Consulting', 'Practical guidance for candidates navigating their next professional move.'],
]

export const solutions = solutionData.map(([slug, title, description]) => ({ slug, title, description }))
export const howWeHelp = helpData.map(([slug, title, description]) => ({ slug, title, description }))
export const industries = industryData.map(([slug, title]) => ({
  slug,
  title,
  description: `Consulting perspective and practical support for ${title} organizations.`,
}))

export const industryImages: Record<string, string> = {
  'biotech-pharma': '/images/industries/csc-industry-biotech-pharma.jpg',
  'health-care': '/images/industries/csc-industry-health-care.jpg',
  technology: '/images/industries/csc-industry-technology.jpg',
  'professional-services': '/images/industries/csc-industry-professional-services.jpg',
  banking: '/images/industries/csc-industry-banking.jpg',
  insurance: '/images/industries/csc-industry-insurance.jpg',
  retail: '/images/industries/csc-industry-retail.jpg',
  'oil-and-gas': '/images/industries/csc-industry-oil-and-gas.jpg',
  'consumer-products': '/images/industries/csc-industry-consumer-products.jpg',
  telecommunication: '/images/industries/csc-industry-telecommunication.jpg',
  manufacturing: '/images/industries/csc-industry-manufacturing.jpg',
}
export const heroImages: Record<string, string> = {
  'solutions/bi-analytics': '/images/solutions/csc-hero-bi-analytics.jpg',
  'solutions/technology-consulting': '/images/solutions/csc-hero-technology-consulting.jpg',
  'solutions/customer-engagement-technology': '/images/solutions/csc-hero-customer-engagement.jpg',
  'solutions/mergers-and-acquisitions': '/images/solutions/csc-hero-mergers-acquisitions.jpg',
  'solutions/automated-software-testing': '/images/solutions/csc-hero-automated-testing.jpg',
  'solutions/functional-test': '/images/solutions/csc-hero-functional-testing.jpg',
  'solutions/performance-test-automation': '/images/solutions/csc-hero-performance-testing.jpg',
  'solutions/regression-test-automation': '/images/solutions/csc-hero-regression-testing.jpg',
  'how-we-help/great-framework': '/images/how-we-help/csc-hero-great-framework.jpg',
  'how-we-help/business-simulation': '/images/how-we-help/csc-hero-business-simulation.jpg',
  'how-we-help/change-management': '/images/how-we-help/csc-hero-change-management.jpg',
  'how-we-help/innovation-digital-transformation': '/images/how-we-help/csc-hero-digital-transformation.jpg',
  'how-we-help/strategic-execution': '/images/how-we-help/csc-hero-strategic-execution.jpg',
  'how-we-help/learning-programs': '/images/how-we-help/csc-hero-learning-programs.jpg',
  'careers/find-a-job': '/images/careers/csc-hero-find-a-job.jpg',
  'careers/find-talent': '/images/careers/csc-hero-find-talent.jpg',
  'careers/permanent-placements': '/images/careers/csc-hero-permanent-placements.jpg',
  'careers/temp-contract-staff-augmentation': '/images/careers/csc-hero-temp-contract-staffing.jpg',
  'careers/career-consulting': '/images/careers/csc-hero-career-consulting.jpg',
}

export const solutionIcons: Record<string, string> = {
  'bi-analytics': '/icons/solutions/bi-analytics.svg',
  'technology-consulting': '/icons/solutions/technology-consulting.svg',
  'customer-engagement-technology': '/icons/solutions/customer-engagement.svg',
  'mergers-and-acquisitions': '/icons/solutions/ma-consulting.svg',
  'automated-software-testing': '/icons/solutions/software-testing.svg',
  'functional-test': '/icons/solutions/software-testing.svg',
  'performance-test-automation': '/icons/solutions/software-testing.svg',
  'regression-test-automation': '/icons/solutions/software-testing.svg',
}

export const solutionImageIcons: Record<string, string> = {
  'bi-analytics': '/images/solutions/card-bi-analytics.jpg',
  'technology-consulting': '/images/solutions/card-technology-consulting.jpg',
  'customer-engagement-technology': '/images/solutions/card-customer-engagement.jpg',
  'mergers-and-acquisitions': '/images/solutions/card-mergers-acquisitions.jpg',
}

export const careers = careerData.map(([slug, title, description]) => ({ slug, title, description }))

const solutionSections: Record<string, SitePage['sections']> = {
  'bi-analytics': [
    {
      heading: 'Overview',
      body: 'Most organizations aren’t short on data — they’re short on clarity. We help you turn scattered reports, spreadsheets, and disconnected dashboards into a single source of truth that leadership actually trusts and uses to make decisions.',
    },
    {
      heading: 'What we deliver',
      body: 'A BI Analytics engagement moves from raw data to decision-ready insight, covering the full reporting lifecycle:',
      items: [
        'Data source audit and consolidation across systems and departments',
        'Dashboard and reporting design built around the metrics that matter to your leadership team',
        'KPI frameworks that connect day-to-day operations to strategic goals',
        'Self-service reporting so teams stop waiting on ad hoc data requests',
        'Governance and data-quality standards that keep reports trustworthy as they scale',
      ],
    },
    {
      heading: 'Our approach',
      body: 'We start by sitting with the people who actually make decisions — not just the data team — to understand what questions they’re trying to answer. From there we map the data landscape, prioritize the highest-impact reports first, and build incrementally so you see value in weeks, not quarters. Tooling stays practical: we work within Power BI, Tableau, or your existing BI stack rather than forcing a platform change.',
    },
    {
      heading: 'Business value',
      body: 'Clients typically see faster month-end and quarter-end reporting cycles, fewer conflicting numbers in leadership meetings, and a measurable drop in manual spreadsheet work across finance and operations teams.',
      items: ['Faster, more confident decision-making', 'Reduced manual reporting effort', 'One consistent set of numbers across the business'],
    },
  ],
  'technology-consulting': [
    {
      heading: 'Overview',
      body: 'Technology decisions are business decisions. We help leadership teams align their technology roadmap, architecture, and vendor choices with the outcomes the business actually needs — not just what’s trending.',
    },
    {
      heading: 'What we deliver',
      body: 'Our technology consulting engagements typically include:',
      items: [
        'Current-state technology and architecture assessment',
        'Roadmap and investment prioritization tied to business outcomes',
        'Vendor and platform evaluation, selection, and negotiation support',
        'Operating model and governance recommendations',
        'Risk and technical-debt review with a practical remediation plan',
      ],
    },
    {
      heading: 'Our approach',
      body: 'We pair hands-on technologists with people who understand P&L and operations, so recommendations hold up in both the server room and the boardroom. Every roadmap we build is sequenced — quick wins first, foundational investments next — so momentum never stalls waiting on a single big-bang initiative.',
    },
    {
      heading: 'Business value',
      body: 'The result is a technology strategy your leadership team can defend to the board, a reduction in redundant or conflicting tools, and a clearer picture of where technology spend is actually driving outcomes.',
      items: ['A defensible, sequenced technology roadmap', 'Reduced tool sprawl and licensing cost', 'Faster, better-informed vendor decisions'],
    },
  ],
  'customer-engagement-technology': [
    {
      heading: 'Overview',
      body: 'Customers now expect a consistent experience whether they call, chat, email, or walk in. We help organizations connect the systems, teams, and data behind those channels so every interaction feels like part of one relationship — not four disconnected ones.',
    },
    {
      heading: 'What we deliver',
      body: 'A Customer Engagement Technology engagement typically covers:',
      items: [
        'CRM and customer-data platform selection, implementation, and integration',
        'Omnichannel experience design across web, contact center, and in-person touchpoints',
        'Marketing automation and lifecycle communication workflows',
        'Customer journey mapping to identify friction and drop-off points',
        'Reporting on engagement, retention, and satisfaction metrics',
      ],
    },
    {
      heading: 'Our approach',
      body: 'We map the real customer journey before touching a single system — where people get stuck, where handoffs break down, where teams are working from different data. The technology choices follow the journey, not the other way around, so the resulting platform actually reflects how your customers move through your business.',
    },
    {
      heading: 'Business value',
      body: 'Organizations we work with typically see improved customer satisfaction scores, shorter resolution times, and a single customer view that sales, service, and marketing teams can all trust.',
      items: ['A unified view of every customer', 'Fewer dropped handoffs between teams', 'Measurable gains in satisfaction and retention'],
    },
  ],
  'mergers-and-acquisitions': [
    {
      heading: 'Overview',
      body: 'M&A transitions succeed or fail on execution, not just deal terms. We support organizations through diligence, integration planning, and the operational and cultural work required to make a transaction deliver its intended value.',
    },
    {
      heading: 'What we deliver',
      body: 'Our M&A support spans the full transaction lifecycle:',
      items: [
        'Operational and technology due diligence ahead of a transaction',
        'Integration planning across systems, processes, and org structure',
        'Day-one readiness and cutover planning',
        'Change leadership and communication to keep people and culture aligned',
        'Post-close synergy tracking against the original business case',
      ],
    },
    {
      heading: 'Our approach',
      body: 'We treat integration as a program, not a project — with a single plan of record, clear ownership, and weekly visibility into risk. Because timelines in M&A are rarely flexible, we prioritize the decisions that unblock day-one operations first, then sequence the rest around business continuity.',
    },
    {
      heading: 'Business value',
      body: 'Clients gain a structured path through a high-stakes transition, fewer surprises during integration, and a clearer line of sight to the synergies the deal was built around.',
      items: ['Reduced integration risk and disruption', 'Faster realization of deal synergies', 'A clear, accountable integration plan of record'],
    },
  ],
  'automated-software-testing': [
    {
      heading: 'Overview',
      body: 'Manual testing doesn’t scale with modern release cycles. We build automated testing programs that give engineering and product teams confidence to ship faster, without trading away quality.',
    },
    {
      heading: 'What we deliver',
      body: 'Our Automated Software Testing practice covers the full quality lifecycle, and connects directly to our specialist tracks:',
      items: [
        'Test strategy and automation framework design (tool-agnostic — Selenium, Playwright, Cypress, and more)',
        'Functional, performance, and regression test automation (see our dedicated pages for each)',
        'CI/CD pipeline integration so tests run automatically on every build',
        'Test data management and environment strategy',
        'QA process maturity assessment and coaching for in-house teams',
      ],
    },
    {
      heading: 'Our approach',
      body: 'We build automation coverage around risk, not just convenience — prioritizing the flows that would hurt the business most if they broke. Frameworks are built to be maintained by your own team, with documentation and knowledge transfer built into every engagement, so you’re never locked into us to keep the suite running.',
    },
    {
      heading: 'Business value',
      body: 'Teams typically see release cycles shorten, defect escape rates drop, and QA effort shift from repetitive manual checks to higher-value exploratory and risk-based testing.',
      items: ['Faster, more frequent releases', 'Fewer defects reaching production', 'Lower long-term cost of quality'],
    },
  ],
  'functional-test': [
    {
      heading: 'Overview',
      body: 'Functional testing confirms your product does what it’s supposed to do — for real users, on real workflows, every time you ship. We build and automate functional test coverage so that confirmation happens automatically, not through a manual checklist before every release.',
    },
    {
      heading: 'What we deliver',
      body: 'A Functional Test engagement typically includes:',
      items: [
        'End-to-end automated test suites covering critical user workflows',
        'API and integration testing alongside UI-level coverage',
        'Cross-browser and cross-device validation',
        'Test case design aligned to acceptance criteria and business requirements',
        'Integration into your existing CI/CD pipeline for automatic execution',
      ],
    },
    {
      heading: 'Our approach',
      body: 'We start with the workflows that matter most to the business — checkout, onboarding, claims processing, whatever drives revenue or risk — and build outward from there. Test suites are designed to be readable and maintainable by your own QA and engineering teams, not just by us.',
    },
    {
      heading: 'Business value',
      body: 'Clients see fewer functional defects reaching production, faster regression cycles before release, and QA teams freed up to focus on new feature validation instead of repeatedly re-testing what already works.',
      items: ['Reliable coverage of critical user workflows', 'Faster pre-release validation', 'Fewer functional defects in production'],
    },
  ],
  'performance-test-automation': [
    {
      heading: 'Overview',
      body: 'Performance problems rarely show up in a demo — they show up under real load, at the worst possible time. We build performance testing programs that surface speed, scalability, and stability issues before your customers do.',
    },
    {
      heading: 'What we deliver',
      body: 'A Performance Test Automation engagement typically covers:',
      items: [
        'Load, stress, and soak testing against realistic traffic patterns',
        'Scalability testing ahead of peak events, launches, or growth milestones',
        'Bottleneck identification across application, database, and infrastructure layers',
        'Automated performance test suites integrated into your release pipeline',
        'Baseline benchmarking so future releases are measured against a known standard',
      ],
    },
    {
      heading: 'Our approach',
      body: 'We model test scenarios against your actual traffic and usage patterns rather than generic benchmarks, so results reflect what will really happen at 9am on a Monday or during a seasonal peak. Findings come with root-cause context, not just a chart — so engineering teams know exactly where to focus.',
    },
    {
      heading: 'Business value',
      body: 'Organizations gain confidence heading into high-traffic events, fewer performance-related incidents in production, and a clear, data-backed view of system capacity and headroom.',
      items: ['Confidence ahead of peak-traffic events', 'Fewer performance incidents in production', 'Clear visibility into system capacity'],
    },
  ],
  'regression-test-automation': [
    {
      heading: 'Overview',
      body: 'Every new feature is a chance to break something that used to work. We build regression test automation that protects existing functionality as your product evolves, so teams can move fast without holding their breath at every release.',
    },
    {
      heading: 'What we deliver',
      body: 'A Regression Test Automation engagement typically includes:',
      items: [
        'Automated regression suites covering core product functionality',
        'Risk-based test prioritization so the most critical paths run first and most often',
        'Ongoing suite maintenance strategy as the product changes',
        'Integration into CI/CD so regression runs automatically on every build',
        'Flaky-test remediation to keep results trustworthy over time',
      ],
    },
    {
      heading: 'Our approach',
      body: 'We design regression suites for longevity — built around stable selectors and maintainable patterns, not brittle scripts that break with every UI tweak. Coverage is prioritized by business risk, so the suite catches what actually matters instead of testing everything equally and running forever.',
    },
    {
      heading: 'Business value',
      body: 'Teams see fewer regressions slipping into production, shorter release cycles because regression testing no longer bottlenecks deployment, and a test suite the team can trust instead of second-guess.',
      items: ['Fewer regressions reaching production', 'Faster, less risky release cycles', 'A regression suite the team actually trusts'],
    },
  ],
}

const howWeHelpSections: Record<string, SitePage['sections']> = {
  'great-framework': [
    {
      heading: 'Overview',
      body: 'Most organizations don’t fail from a lack of ideas — they fail from a gap between strategy and execution. The Great Framework is our structured method for closing that gap, connecting strategy, people, process, and execution into one coherent plan instead of four disconnected initiatives.',
    },
    {
      heading: 'What we deliver',
      body: 'A Great Framework engagement typically walks through four connected phases:',
      items: [
        'Strategy clarity — defining what success actually looks like, in specific and measurable terms',
        'People alignment — making sure roles, ownership, and incentives support the strategy',
        'Process design — building the workflows and decision rights that make execution repeatable',
        'Execution tracking — a simple, visible cadence for measuring progress and course-correcting',
      ],
    },
    {
      heading: 'Our approach',
      body: 'We don’t hand over a framework and leave. We work alongside your leadership team to apply it to your real priorities, in your real operating rhythm, so it becomes how you run the business — not a slide deck that gets shelved after the kickoff meeting.',
    },
    {
      heading: 'Business value',
      body: 'Leadership teams walk away with a shared, specific definition of success and a repeatable way to keep strategy and day-to-day work connected as priorities shift.',
      items: ['A shared definition of what success looks like', 'Clear ownership across strategy, people, and process', 'A repeatable cadence for tracking real progress'],
    },
  ],
  'business-simulation': [
    {
      heading: 'Overview',
      body: 'Some decisions are too high-stakes to learn by trial and error in production. Business Simulation makes complex tradeoffs visible through facilitated scenarios, so leadership teams can pressure-test decisions before committing real budget, people, and time.',
    },
    {
      heading: 'What we deliver',
      body: 'Our simulation programs are built around your actual business context, not generic case studies:',
      items: [
        'Custom scenario design based on real decisions your team is facing',
        'Facilitated live simulation sessions with your leadership or extended team',
        'Structured debriefs that surface assumptions, risks, and blind spots',
        'Decision frameworks your team can reuse after the session ends',
      ],
    },
    {
      heading: 'Our approach',
      body: 'Simulations work because they’re realistic enough to trigger genuine debate. We build scenarios from your actual data and constraints, then facilitate the room so the conversation surfaces real disagreement — the kind that’s far cheaper to have in a workshop than after a decision has already shipped.',
    },
    {
      heading: 'Business value',
      body: 'Teams leave with sharper judgment about the specific decision at hand, and a shared, tested rationale they can stand behind when the real decision gets made.',
      items: ['Tested decisions before real budget is committed', 'Surfaced risks and blind spots early', 'Stronger alignment across the leadership team'],
    },
  ],
  'change-management': [
    {
      heading: 'Overview',
      body: 'The best strategy fails if the people expected to carry it out don’t understand it, believe in it, or know what to do differently on Monday morning. We help organizations manage the human side of change so new systems, processes, and priorities actually stick.',
    },
    {
      heading: 'What we deliver',
      body: 'A Change Management engagement is built around the people affected by the change, not just the change itself:',
      items: [
        'Stakeholder and impact assessment across affected teams',
        'Communication planning tailored to each audience and their concerns',
        'Training and enablement so people know exactly what to do differently',
        'Adoption tracking with clear, measurable signals of progress',
        'Resistance and risk management as issues surface in real time',
      ],
    },
    {
      heading: 'Our approach',
      body: 'We start with the people most affected, not the org chart — understanding what they stand to gain or lose helps us build a communication and enablement plan that lands. Change plans are sequenced alongside the actual rollout, so support shows up exactly when people need it, not months in advance or after the fact.',
    },
    {
      heading: 'Business value',
      body: 'Organizations see faster adoption of new systems and processes, less disruption during the transition, and fewer people quietly reverting to old habits once attention moves elsewhere.',
      items: ['Faster adoption of new ways of working', 'Reduced resistance and disruption', 'Change that sticks after the project ends'],
    },
  ],
  'innovation-digital-transformation': [
    {
      heading: 'Overview',
      body: 'New technology and new ideas are only valuable if they turn into action. We help organizations move from “we should explore AI/automation/digital” to an actual, sequenced transformation plan with clear ownership and measurable outcomes.',
    },
    {
      heading: 'What we deliver',
      body: 'Our innovation and digital transformation engagements typically include:',
      items: [
        'Opportunity assessment across processes, technology, and customer experience',
        'Prioritization of initiatives by business impact and feasibility',
        'Pilot design so new ideas are tested at low risk before scaling',
        'Transformation roadmap with clear ownership and milestones',
        'Capability building so your team can keep innovating after we’re gone',
      ],
    },
    {
      heading: 'Our approach',
      body: 'We treat innovation as a discipline, not a one-off workshop. Every opportunity gets evaluated against real business impact and real feasibility, so your roadmap is a sequenced set of decisions rather than a wish list. Pilots are designed to fail cheap and fast if they’re not going to work — so resources go toward what actually moves the business forward.',
    },
    {
      heading: 'Business value',
      body: 'Clients gain a prioritized, realistic transformation roadmap, faster time from idea to piloted initiative, and internal capability to keep evaluating new opportunities long after the engagement ends.',
      items: ['A prioritized, realistic transformation roadmap', 'Lower-risk piloting of new initiatives', 'Internal capability to sustain innovation'],
    },
  ],
  'strategic-execution': [
    {
      heading: 'Overview',
      body: 'A strategy is only as good as the work it produces. We help leadership teams translate priorities into aligned, accountable work — closing the gap between what was decided in the strategy offsite and what actually happens across the organization.',
    },
    {
      heading: 'What we deliver',
      body: 'A Strategic Execution engagement typically includes:',
      items: [
        'Translation of strategic priorities into specific, owned initiatives',
        'Governance and cadence design so progress gets reviewed on a regular rhythm',
        'Cross-functional alignment so teams aren’t working from conflicting priorities',
        'Progress measurement tied to the outcomes leadership actually cares about',
        'Course-correction support when initiatives drift off track',
      ],
    },
    {
      heading: 'Our approach',
      body: 'We work backward from the strategic goal to the specific, owned actions that will actually achieve it — then build a lightweight governance cadence so leadership sees real progress, not status theater. The goal is fewer, better-tracked initiatives rather than a long list nobody has the bandwidth to deliver.',
    },
    {
      heading: 'Business value',
      body: 'Leadership teams gain visibility into whether strategic priorities are actually moving, fewer stalled or forgotten initiatives, and a governance rhythm that surfaces problems early enough to fix them.',
      items: ['Clear line of sight from strategy to daily work', 'Fewer stalled or conflicting initiatives', 'Earlier visibility into execution risk'],
    },
  ],
  'learning-programs': [
    {
      heading: 'Overview',
      body: 'Generic training doesn’t change behavior — training built around your organization’s actual work does. We design learning programs around the real skills, decisions, and workflows your teams need, not off-the-shelf course content.',
    },
    {
      heading: 'What we deliver',
      body: 'Our learning programs are built specifically for the capability gap you’re trying to close:',
      items: [
        'Skills and capability gap assessment across the relevant team or function',
        'Curriculum design built around your organization’s real workflows and tools',
        'Blended delivery — live facilitation, applied exercises, and reference materials',
        'Manager enablement so learning is reinforced on the job, not just in the room',
        'Measurement of applied capability, not just course completion',
      ],
    },
    {
      heading: 'Our approach',
      body: 'We design backward from the on-the-job behavior you want to see, not forward from a course catalog. Every program includes applied practice against real scenarios from your business, so people leave able to do the work differently — not just able to describe it.',
    },
    {
      heading: 'Business value',
      body: 'Organizations see measurable improvement in the specific capability the program targeted, faster ramp time for new skills, and learning that managers can reinforce well after the sessions end.',
      items: ['Measurable improvement in targeted capability', 'Faster ramp-up on new skills and tools', 'Learning that managers can reinforce on the job'],
    },
  ],
}

const industrySections: Record<string, SitePage['sections']> = {
  'biotech-pharma': [
    {
      heading: 'Overview',
      body: 'Biotech and pharma organizations operate under intense regulatory pressure while trying to move discoveries to market faster than ever. We help leadership teams balance compliance, R&D velocity, and commercial readiness without sacrificing any of the three.',
    },
    {
      heading: 'What we help with',
      body: 'Our work with biotech and pharma clients typically covers:',
      items: [
        'Regulatory-aware technology and process design across R&D and commercial functions',
        'Clinical and quality data systems that hold up to audit',
        'Digital transformation of research, manufacturing, and supply chain operations',
        'Automated testing for validated systems and regulated software',
        'Change management through mergers, product launches, and organizational shifts',
      ],
    },
    {
      heading: 'Our approach',
      body: 'We bring consultants who understand both the science-driven pace of biotech and the audit trail requirements of a regulated industry, so recommendations hold up under scrutiny without slowing teams down more than necessary.',
    },
    {
      heading: 'Business value',
      body: 'Clients see faster, cleaner audit readiness, technology decisions that don’t need to be re-litigated during due diligence, and teams that spend less time firefighting compliance gaps.',
      items: ['Faster, cleaner regulatory and audit readiness', 'Fewer compliance gaps discovered late', 'Technology that scales with R&D pace'],
    },
  ],
  'health-care': [
    {
      heading: 'Overview',
      body: 'Health systems and payers are under pressure to improve outcomes and patient experience while managing cost, staffing, and increasingly complex technology. We bring structured, practical support to organizations navigating that balance.',
    },
    {
      heading: 'What we help with',
      body: 'Our health care practice supports organizations across:',
      items: [
        'Payer and provider technology strategy, including ACA and value-based care initiatives',
        'Clinical and operational workflow improvement',
        'EHR, claims, and care-management system integration',
        'Automated testing for patient-facing and clinical systems',
        'Staffing and talent support for hard-to-fill clinical and technical roles',
      ],
    },
    {
      heading: 'Our approach',
      body: 'We work closely with both clinical and administrative leadership, because technology and process decisions in health care rarely succeed if they’re made in isolation from the people delivering care. Every recommendation is weighed against patient impact, not just operational efficiency.',
    },
    {
      heading: 'Business value',
      body: 'Organizations gain smoother technology transitions, fewer disruptions to clinical workflows during change, and measurable improvement in the operational metrics leadership is accountable for.',
      items: ['Smoother technology and process transitions', 'Reduced disruption to clinical workflows', 'Clearer line of sight to operational KPIs'],
    },
  ],
  technology: [
    {
      heading: 'Overview',
      body: 'Technology companies move fast — but fast growth without structure creates its own risk. We help technology organizations scale their engineering practices, product operations, and technical talent without losing the speed that got them here.',
    },
    {
      heading: 'What we help with',
      body: 'Our work with technology sector clients typically includes:',
      items: [
        'Engineering and QA process maturity assessment',
        'Automated software testing frameworks built for continuous delivery',
        'Platform and architecture strategy ahead of scale',
        'Technical staffing and contract augmentation for engineering teams',
        'M&A technical due diligence for technology acquisitions',
      ],
    },
    {
      heading: 'Our approach',
      body: 'We work the way engineering teams actually work — iteratively, with clear artifacts, and without slowing down delivery for the sake of process. Recommendations are sized to be adopted incrementally, not imposed as a big-bang overhaul.',
    },
    {
      heading: 'Business value',
      body: 'Clients see fewer production incidents, faster onboarding for new engineers, and technology decisions that hold up as the organization scales past its current headcount.',
      items: ['Fewer production incidents and outages', 'Faster engineering onboarding and ramp', 'Architecture that holds up at scale'],
    },
  ],
  'professional-services': [
    {
      heading: 'Overview',
      body: 'Professional services firms sell expertise and time — which means operational efficiency and talent quality directly drive the bottom line. We help firms strengthen the systems and processes behind client delivery without adding bureaucratic drag.',
    },
    {
      heading: 'What we help with',
      body: 'Our work with professional services firms typically covers:',
      items: [
        'Practice management and delivery process improvement',
        'Technology consolidation across disconnected firm and client-facing tools',
        'Talent strategy and staff augmentation for client engagements',
        'Change management through firm mergers or service-line expansion',
        'Reporting and utilization visibility for partners and practice leads',
      ],
    },
    {
      heading: 'Our approach',
      body: 'We treat every recommendation through the lens of billable capacity and client experience — the two things that actually move a professional services firm’s numbers. Process changes are designed to reduce non-billable overhead, not add another layer of it.',
    },
    {
      heading: 'Business value',
      body: 'Firms typically see improved utilization visibility, smoother client handoffs, and less time lost to administrative friction across engagements.',
      items: ['Improved utilization and delivery visibility', 'Smoother client handoffs between teams', 'Less non-billable administrative overhead'],
    },
  ],
  banking: [
    {
      heading: 'Overview',
      body: 'Banks are balancing legacy core systems, rising customer expectations, and a dense regulatory environment — often all at once. We help banking organizations modernize deliberately, without introducing the operational or compliance risk that stalls most transformation efforts.',
    },
    {
      heading: 'What we help with',
      body: 'Our banking practice typically supports:',
      items: [
        'Core banking and digital channel modernization strategy',
        'Regulatory-aware technology and process design',
        'Customer engagement technology across branch, online, and mobile channels',
        'Automated testing for financial and transactional systems',
        'M&A integration support for bank mergers and acquisitions',
      ],
    },
    {
      heading: 'Our approach',
      body: 'We sequence modernization around risk — prioritizing the changes that reduce operational and compliance exposure first, then building toward the customer-facing improvements that drive growth. Nothing gets recommended without a clear view of its regulatory and audit implications.',
    },
    {
      heading: 'Business value',
      body: 'Clients gain a modernization path that satisfies both examiners and customers, fewer compliance surprises during audits, and measurable improvement in digital channel adoption.',
      items: ['A modernization path examiners and customers both accept', 'Fewer compliance surprises during audits', 'Higher digital channel adoption'],
    },
  ],
  insurance: [
    {
      heading: 'Overview',
      body: 'Insurance carriers are managing legacy policy administration systems, growing customer expectations around digital self-service, and constant regulatory change. We help carriers modernize claims, underwriting, and customer-facing systems without disrupting the business they already run.',
    },
    {
      heading: 'What we help with',
      body: 'Our insurance practice typically covers:',
      items: [
        'Claims and policy administration system modernization',
        'Customer engagement technology for self-service and digital channels',
        'Automated testing for claims, billing, and underwriting systems',
        'Data and BI strategy for underwriting and risk reporting',
        'Change management through system migrations and process redesign',
      ],
    },
    {
      heading: 'Our approach',
      body: 'We approach every insurance engagement with an eye toward continuity — claims and policy systems can’t go down, and customers can’t experience service gaps mid-transition. Migrations and modernization work are sequenced to protect business continuity first.',
    },
    {
      heading: 'Business value',
      body: 'Carriers see faster claims processing, higher digital self-service adoption, and modernization projects that land without disrupting day-to-day operations.',
      items: ['Faster claims and policy processing', 'Higher digital self-service adoption', 'Modernization without operational disruption'],
    },
  ],
  retail: [
    {
      heading: 'Overview',
      body: 'Retailers are managing the shift between physical and digital commerce, supply chain complexity, and rising customer expectations for a seamless experience across every channel. We help retail organizations connect those channels into one coherent operation.',
    },
    {
      heading: 'What we help with',
      body: 'Our retail practice typically covers:',
      items: [
        'Omnichannel customer engagement technology across store, web, and mobile',
        'Supply chain and inventory system integration',
        'BI and analytics for merchandising and demand planning',
        'Automated testing for e-commerce and point-of-sale systems',
        'Seasonal staffing and workforce planning support',
      ],
    },
    {
      heading: 'Our approach',
      body: 'We build around the customer journey first — from browsing to purchase to fulfillment — then align the systems and teams behind it. Retail moves in seasonal cycles, so every roadmap accounts for the peak periods the business can’t afford to disrupt.',
    },
    {
      heading: 'Business value',
      body: 'Retailers see improved conversion and fulfillment accuracy, a more consistent brand experience across channels, and technology that holds up during peak seasonal demand.',
      items: ['Improved conversion and fulfillment accuracy', 'A consistent experience across every channel', 'Technology that holds up under peak demand'],
    },
  ],
  'oil-and-gas': [
    {
      heading: 'Overview',
      body: 'Oil and gas operators manage complex field operations, safety-critical systems, and volatile market conditions simultaneously. We help operators bring more structure and visibility to operations and technology decisions without slowing down field teams.',
    },
    {
      heading: 'What we help with',
      body: 'Our oil and gas practice typically supports:',
      items: [
        'Operational technology and field data system integration',
        'Safety and compliance-aware process design',
        'BI and analytics for production, asset, and cost reporting',
        'Automated testing for operational and safety-critical software',
        'Workforce and contract staffing for field and technical roles',
      ],
    },
    {
      heading: 'Our approach',
      body: 'We prioritize operational continuity and safety above all else — technology and process recommendations are built to work in the field, not just on paper, and are validated with the operations teams who will actually rely on them.',
    },
    {
      heading: 'Business value',
      body: 'Operators gain clearer visibility into production and cost data, more reliable field technology, and staffing support that scales up or down with project demand.',
      items: ['Clearer visibility into production and cost', 'More reliable operational technology', 'Staffing that scales with project demand'],
    },
  ],
  'consumer-products': [
    {
      heading: 'Overview',
      body: 'Consumer products companies are managing complex supply chains, shifting retail and e-commerce channels, and rising expectations for speed to market. We help brands connect product, supply chain, and customer data into decisions leadership can act on.',
    },
    {
      heading: 'What we help with',
      body: 'Our consumer products practice typically covers:',
      items: [
        'Supply chain and manufacturing system integration',
        'BI and analytics for demand planning and sales performance',
        'Customer engagement technology across retail and direct-to-consumer channels',
        'Automated testing for e-commerce and order management systems',
        'M&A support for brand and category acquisitions',
      ],
    },
    {
      heading: 'Our approach',
      body: 'We treat speed to market as a design constraint from day one — every recommendation is evaluated on whether it helps the business launch, adapt, and restock faster, not just whether it’s technically sound.',
    },
    {
      heading: 'Business value',
      body: 'Brands see faster, more accurate demand planning, smoother launches across channels, and fewer stockouts or overstock situations driven by disconnected data.',
      items: ['Faster, more accurate demand planning', 'Smoother multichannel product launches', 'Fewer stockouts and overstock situations'],
    },
  ],
  telecommunication: [
    {
      heading: 'Overview',
      body: 'Telecom providers manage massive infrastructure, dense regulatory requirements, and customers with low tolerance for service disruption. We help providers modernize network operations and customer systems without risking the reliability the business is built on.',
    },
    {
      heading: 'What we help with',
      body: 'Our telecommunications practice typically covers:',
      items: [
        'Network operations and infrastructure technology strategy',
        'Customer engagement technology for billing, support, and self-service',
        'Automated testing for network and customer-facing systems',
        'BI and analytics for network performance and customer churn',
        'Regulatory-aware technology and process design',
      ],
    },
    {
      heading: 'Our approach',
      body: 'We treat reliability as non-negotiable — every modernization step is validated against uptime and service-continuity requirements before it touches production systems customers depend on every day.',
    },
    {
      heading: 'Business value',
      body: 'Providers gain improved network visibility, reduced customer churn through better service experience, and modernization that happens without customer-facing disruption.',
      items: ['Improved network visibility and performance', 'Reduced customer churn', 'Modernization without service disruption'],
    },
  ],
  manufacturing: [
    {
      heading: 'Overview',
      body: 'Manufacturers are under pressure to modernize operations, integrate data across the plant floor and the back office, and manage increasingly complex supply chains — all while keeping production running. We help manufacturing organizations modernize without stopping the line.',
    },
    {
      heading: 'What we help with',
      body: 'Our manufacturing practice typically covers:',
      items: [
        'Plant floor and ERP system integration',
        'Supply chain visibility and BI reporting',
        'Automated testing for production and quality systems',
        'Technology strategy for automation and Industry 4.0 initiatives',
        'Workforce and technical staffing for plant and engineering roles',
      ],
    },
    {
      heading: 'Our approach',
      body: 'We sequence every initiative around production continuity — changes are piloted and validated in ways that don’t put throughput at risk, with rollback plans built in before anything touches the live production environment.',
    },
    {
      heading: 'Business value',
      body: 'Manufacturers see improved visibility from plant floor to back office, fewer unplanned production disruptions during modernization, and data leadership can actually use for supply chain decisions.',
      items: ['Improved plant-floor-to-back-office visibility', 'Fewer unplanned production disruptions', 'Supply chain data leadership can act on'],
    },
  ],
}

const careerSections: Record<string, SitePage['sections']> = {
  'find-a-job': [
    {
      heading: 'Overview',
      body: 'Finding the right next role is about more than matching a resume to a job description. We work with candidates to understand what they’re actually looking for — the work itself, the team, the growth path — and connect them with roles that fit, not just openings that are available.',
    },
    {
      heading: 'How it works',
      body: 'Our process is built to respect your time and give you a real picture of every opportunity:',
      items: [
        'A conversation to understand your background, goals, and what you’re looking for next',
        'Curated introductions to roles that actually match, not a mass resume blast',
        'Interview preparation and honest context on each opportunity',
        'Support through offer negotiation and onboarding',
      ],
    },
    {
      heading: 'Our approach',
      body: 'We work as your advocate, not a volume recruiter. That means we’re direct about whether a role is a good fit — including telling you when it isn’t — because a placement that doesn’t work for you isn’t a win for anyone.',
    },
    {
      heading: 'Why candidates work with us',
      body: 'Candidates get access to roles that aren’t always publicly posted, a recruiter who actually understands the work, and support that continues past the offer letter.',
      items: ['Access to roles beyond public job boards', 'A recruiter who understands the role, not just the title', 'Support that continues through onboarding'],
    },
  ],
  'find-talent': [
    {
      heading: 'Overview',
      body: 'Finding the right person for a critical role takes more than posting a job and filtering resumes. We partner with hiring teams to understand what success in the role actually looks like, then bring candidates who are genuinely qualified — not just available.',
    },
    {
      heading: 'How it works',
      body: 'Our talent search process is built around understanding the role and the team it sits in:',
      items: [
        'Role scoping to define the skills, experience, and team fit that actually matter',
        'Targeted sourcing across our network and active search, not just database keyword matching',
        'Candidate screening and technical validation before you ever see a resume',
        'Coordinated interview scheduling and offer support',
      ],
    },
    {
      heading: 'Our approach',
      body: 'We take the time to understand your team’s working style and the specific gap you’re trying to fill, so the candidates we bring you are pre-qualified against your actual bar — not just a keyword match to the job title.',
    },
    {
      heading: 'Why organizations work with us',
      body: 'Hiring teams get a shorter time-to-fill, higher-quality candidate slates, and a recruiting partner who understands their business well enough to represent it accurately to candidates.',
      items: ['Shorter time-to-fill on critical roles', 'Higher-quality, pre-qualified candidate slates', 'A partner who represents your business accurately'],
    },
  ],
  'permanent-placements': [
    {
      heading: 'Overview',
      body: 'Permanent hires are long-term investments, and getting them right matters more than getting them fast. We support organizations building out long-term teams with thoughtful search, screening, and placement — focused on retention, not just a signed offer.',
    },
    {
      heading: 'How it works',
      body: 'Our permanent placement process is built for long-term fit:',
      items: [
        'In-depth role and team culture assessment before search begins',
        'Structured search across active and passive candidate networks',
        'Multi-stage screening for skills, experience, and team fit',
        'Offer negotiation support and post-placement check-ins',
      ],
    },
    {
      heading: 'Our approach',
      body: 'We measure success by retention, not just placement. That means we’re selective about who we put forward, and we stay engaged after the offer is signed to make sure the fit is working for both sides.',
    },
    {
      heading: 'Why organizations work with us',
      body: 'Clients see stronger long-term retention on placed candidates, less time spent re-hiring for the same role, and a search partner invested in the outcome, not just the placement fee.',
      items: ['Stronger long-term retention', 'Less repeat hiring for the same role', 'A partner invested in long-term fit'],
    },
  ],
  'temp-contract-staff-augmentation': [
    {
      heading: 'Overview',
      body: 'Sometimes you need capable people fast — for a project surge, a seasonal peak, or a skills gap you don’t need to solve permanently. We provide flexible contract and staff augmentation talent so your team can scale up or down without the overhead of a full hiring cycle.',
    },
    {
      heading: 'How it works',
      body: 'Our staff augmentation model is built for speed without sacrificing quality:',
      items: [
        'Rapid needs assessment to define the skills and timeline required',
        'Fast access to pre-vetted contract and temp talent from our network',
        'Flexible engagement terms — from short-term coverage to extended contracts',
        'Ongoing performance check-ins throughout the engagement',
      ],
    },
    {
      heading: 'Our approach',
      body: 'We keep a network of pre-vetted talent ready to deploy, so when a request comes in, we’re not starting the search from zero. That means faster turnaround without compromising on the quality of who we send.',
    },
    {
      heading: 'Why organizations work with us',
      body: 'Teams get the flexibility to scale capacity up or down as project needs change, without the fixed overhead or long ramp time of permanent hiring.',
      items: ['Fast access to qualified contract talent', 'Flexibility to scale up or down with demand', 'No long-term overhead commitment'],
    },
  ],
  'career-consulting': [
    {
      heading: 'Overview',
      body: 'A career move is a big decision, and it’s easy to make it based on incomplete information. We provide practical, honest guidance for candidates navigating a job search, a career pivot, or a promotion path — grounded in real market context, not generic advice.',
    },
    {
      heading: 'How it works',
      body: 'Our career consulting engagements are built around your specific situation:',
      items: [
        'A candid assessment of your experience, goals, and market positioning',
        'Resume and profile review with practical, specific feedback',
        'Interview preparation and negotiation coaching',
        'Ongoing guidance as you evaluate opportunities and offers',
      ],
    },
    {
      heading: 'Our approach',
      body: 'We give direct, practical feedback — not generic career advice. Because we work across many industries and roles, we can tell you honestly how you compare in the current market and what will actually move the needle in your search.',
    },
    {
      heading: 'Why candidates work with us',
      body: 'Candidates leave with a clearer, more realistic picture of their options and a concrete plan for their next move — not just a polished resume.',
      items: ['Honest, specific market context', 'A concrete plan for your next move', 'Practical interview and negotiation coaching'],
    },
  ],
}

export const pages: SitePage[] = [
  ...solutionData.map(([slug, title, description]) => ({
    slug: `solutions/${slug}`,
    title,
    eyebrow: 'Solutions',
    description,
    sections: solutionSections[slug] ?? commonSections(title, description),
    related:
      slug === 'automated-software-testing'
        ? ['functional-test', 'performance-test-automation', 'regression-test-automation'].map((x) => `/solutions/${x}`)
        : ['/contact'],
  })),
  ...helpData.map(([slug, title, description]) => ({
    slug: `how-we-help/${slug}`,
    title,
    eyebrow: 'How We Help',
    description,
    sections: howWeHelpSections[slug] ?? commonSections(title, description),
    related: ['/contact'],
  })),
  ...industryData.map(([slug, title]) => ({
    slug: `who-we-help/${slug}`,
    title,
    eyebrow: 'Who We Help',
    description: `Consulting perspective and practical support for ${title} organizations.`,
    sections:
      industrySections[slug] ??
      commonSections(title, `Consulting perspective and practical support for ${title} organizations.`),
    related: ['/solutions/technology-consulting', '/contact'],
  })),
  ...careerData.map(([slug, title, description]) => ({
    slug: `careers/${slug}`,
    title,
    eyebrow: 'Careers',
    description,
    sections: careerSections[slug] ?? commonSections(title, description),
    related:
      slug === 'find-talent' ? ['/careers/permanent-placements', '/careers/temp-contract-staff-augmentation', '/contact'] : ['/contact'],
  })),
]

function commonSections(title: string, description: string) {
  return [
    { heading: 'Overview', body: description },
    {
      heading: 'Capabilities',
      body: `CSC works alongside leaders and teams to clarify priorities, build practical plans, and support execution for ${title.toLowerCase()}.`,
      items: [
        'Assess current needs and opportunities',
        'Create an actionable path forward',
        'Support alignment, adoption, and measurable progress',
      ],
    },
    {
      heading: 'Our approach',
      body: 'We bring structured thinking, experienced collaboration, and a focus on outcomes. Specific service details and client examples will be added as content is confirmed.',
    },
    { heading: 'Business value', body: '[CLIENT CONTENT REQUIRED] Confirm outcomes, proof points, and relevant examples for this page.' },
  ]
}

export const allRoutePaths = ['/', ...pages.map((p) => `/${p.slug}`), '/team', '/contact']

export const team: { name: string; role: string; bio: string; image?: string }[] = [
  {
    name: 'Mohammad Vikaruddin',
    role: 'Healthcare Practice CTO / Strategy & Innovation Capability Lead',
    bio: 'Mohammad believes that companies thrive with a culture that focuses on doing the right thing for both the customer and the business as a whole — aligning mission with outcomes for optimum success. Having a very mature mindset, he acts as a business enabler who is proficient in wearing different hats to ensure the business is running at full speed.\n\nMohammad is a management consultant, entrepreneur, and technologist with over 20 years of extensive experience spanning healthcare, insurance, financial services, higher education, and software. Mohammad’s work is focused on enterprise architecture, big data, and cloud computing. As a graduate of the Software Development and Master of Business Administration program, and as a certified Microsoft Solutions Architect, PMP, CSM, AWS Certified DevOps Engineer Professional, AWS Certified Solutions Architect Professional, and Google Certified Architect, Mohammad provides value as a Solutions Architect well versed in implementation of leading-edge cloud, programming, and database technologies.\n\nMohammad has held leadership roles in IT strategy, enterprise architecture, software development, technology portfolio rationalization, business process and IT outsourcing, and captive operations setup. He has held several senior IT management roles at companies such as Discover Financial Services, JP Morgan Chase, and Accenture, as well as founding a boutique healthcare IT consulting services company.',
    image: '/images/team/mohammad-vikaruddin.png',
  },
  {
    name: 'Syed Hussaini',
    role: 'PMP, CSM',
    bio: 'Results-driven Project Manager with over 8 years of experience leading agile teams to deliver high-quality software products on time and within budget. A proven leader with a deep understanding of agile methodologies, with a track record of driving continuous improvement and fostering a culture of collaboration and innovation. Skilled in stakeholder management, excelling at aligning cross-functional teams with business objectives to ensure successful project delivery.\n\nPassionate about coaching and mentoring team members to achieve their full potential and continuously improve their skills. With expertise in agile tools such as Jira and Confluence, Syed has a keen eye for detail and data-driven decision making, and is committed to driving results and building strong relationships with all stakeholders, including senior leadership, to achieve organizational goals.',
    image: '/images/team/syed-hussaini.png',
  },
  {
    name: 'Jaleel Razvi',
    role: 'Products & Distribution Practice Lead / Strategy & Innovation Capability Lead',
    bio: 'Razvi is a proven leader with the ability to drive exceptional value in a variety of business operations. Razvi is a successful entrepreneur, Fortune 100 leader, and management consultant, specializing in business acceleration through corporate strategy, operational effectiveness, and emerging-market innovation.\n\nThroughout his career, Razvi has achieved bottom-line results by effectively integrating business processes, people, and technology to improve customer satisfaction, business competitiveness, and management control. With over 25 years of experience, Razvi has worked across all operational areas and many industries including financial services, wholesale distribution, and retail. Razvi has an MBA from the ICBM School of Business Excellence.',
    image: '/images/team/jaleel-razvi.png',
  },
  {
    name: 'Melissa Mathews',
    role: 'VP, Client Management',
    bio: 'Melissa oversees Human Resources for Consulting Services Corporation. Her experience includes employee relations, HR law, benefits, recruiting, employee onboarding, compliance, employee development, project management, and HR reporting and analysis. Melissa holds a Bachelor’s degree in Human Resource Management from DePaul University, Chicago.',
    image: '/images/team/melissa-mathews.png',
  },
  {
    name: 'Shakira Khan',
    role: 'Financial Services Practice Lead',
    bio: 'Ms. Khan approaches customers and the team with the understanding that they want what she wants — results-driven and satisfied experiences.\n\nShe leads the Information and Healthcare capability team, bringing a strong track record of defining and executing transformational initiatives for industry-leading organizations. She has deep industry expertise in healthcare (payer and provider) and financial services, including leading one of the nation’s largest payers in the creation and delivery of their Affordable Care Act financial information management strategy, and partnering with leading health systems to create innovative care models that improved patient satisfaction, lowered cost, and raised quality across Commercial and Pioneer ACO environments.\n\nShe believes that solving problems starts with listening, learning, and acting. A driven leader with extensive experience in IT talent management, she thrives in rapidly changing digital environments. Ms. Khan received a Bachelor of Science degree in Information Systems from Benedictine University.',
  },
]

export const contact = {
  email: 'info@consultingservice.com',
  phone: '312-866-8011',
  address: '2E 22nd St #217, Lombard, IL 60148',
}

export const testimonial = {
  quote: 'Incredible background and experience. Consulting Services Corporation has provided prompt, professional, and great service...',
  attribution: 'Client, Greater Chicago Area',
}

export const testimonials = [
  {
    text: 'Incredible background and experience. Consulting Services Corporation has provided prompt, professional, and great service across every engagement.',
    name: 'Client',
    role: 'Greater Chicago Area',
  },
  {
    text: 'CSC brought structure to a project that felt overwhelming. Within weeks we had a clear roadmap and a team that actually delivered on it.',
    name: 'David Reyes',
    role: 'VP of Operations, Regional Health System',
  },
  {
    text: "Their team didn't just advise from the sidelines — they worked alongside ours through implementation, which made all the difference.",
    name: 'Priya Nathan',
    role: 'Director of IT, Financial Services',
  },
  {
    text: 'We came in with a vague transformation goal and left with a practical, phased plan our leadership could actually execute.',
    name: 'Marcus Webb',
    role: 'COO, Manufacturing Group',
  },
  {
    text: 'The BI analytics work paid for itself within a quarter. Reporting that used to take days now takes minutes.',
    name: 'Elena Castillo',
    role: 'Head of Strategy, Retail Chain',
  },
  {
    text: 'CSC staffed our project with people who understood both the technology and our industry — that combination is rare.',
    name: 'Thomas Grant',
    role: 'CIO, Insurance Provider',
  },
  {
    text: 'Change management is usually the part that fails. CSC treated it as seriously as the technical rollout, and adoption followed.',
    name: 'Rachel Kim',
    role: 'HR Director, Telecommunications',
  },
  {
    text: 'Straightforward, responsive, and genuinely invested in the outcome — not just the statement of work.',
    name: 'Anthony Reeves',
    role: 'CEO, Professional Services Firm',
  },
  {
    text: "We've worked with larger firms before. CSC gave us more senior attention and faster turnaround at every stage.",
    name: 'Grace Liu',
    role: 'VP Technology, Consumer Products',
  },
]

export const home = {
  title: 'Consulting Services Corporation',
  description: 'Practical consulting support for organizations navigating growth, change, technology, and talent.',
  sections: [
    {
      heading: 'Company overview',
      body: 'Consulting Services Corporation helps organizations move from complex questions to practical next steps. Our teams bring structure, perspective, and execution support to the work ahead.',
    },
    {
      heading: 'Core solutions',
      body: 'Explore focused support across analytics, technology, customer engagement, transactions, and software quality.',
    },
    {
      heading: 'Who we help',
      body: 'Our experience spans sectors including health care, technology, financial services, retail, energy, consumer products, telecommunications, and manufacturing.',
    },
    {
      heading: 'How we help',
      body: 'Frameworks, simulations, change management, transformation, strategic execution, and learning programs connect people and priorities.',
    },
  ],
}

export const process = [
  { number: '01', title: 'Assess', description: 'Understand the current state, priorities, and constraints shaping the work ahead.' },
  { number: '02', title: 'Plan', description: 'Build a structured, actionable path aligned to the outcomes that matter.' },
  { number: '03', title: 'Execute', description: 'Support delivery with experienced collaboration and hands-on execution.' },
  { number: '04', title: 'Optimize', description: 'Measure progress and refine the approach as the work evolves.' },
]

export const processIcons: Record<string, string> = {
  '01': '/icons/process/assess.svg',
  '02': '/icons/process/plan.svg',
  '03': '/icons/process/execute.svg',
  '04': '/icons/process/optimize.svg',
}
