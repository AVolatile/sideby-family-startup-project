export const productNav = [
  { slug: "today", label: "Today", icon: "sun" },
  { slug: "calendar", label: "Calendar", icon: "calendar" },
  { slug: "responsibilities", label: "Responsibilities", icon: "check" },
  { slug: "check-ins", label: "Check-ins", icon: "pin" },
  { slug: "rides", label: "Rides", icon: "ride" },
  { slug: "goals", label: "Goals", icon: "flag" },
  { slug: "permissions", label: "Permissions", icon: "key" },
  { slug: "updates", label: "Family updates", icon: "message" },
  { slug: "milestones", label: "Growing independence", icon: "path" },
  { slug: "info", label: "Important info", icon: "shield" },
  { slug: "notifications", label: "Notifications", icon: "bell" },
  { slug: "profiles", label: "Our family", icon: "family" },
] as const;
export const articles = [
  {
    slug: "the-sunday-ten",
    tag: "Family rhythm",
    title: "The Sunday ten-minute reset",
    description:
      "A small conversation that gives the whole week somewhere to start.",
    read: "4 min",
    color: "lilac",
    sections: [
      [
        "Start with what’s already fixed.",
        "School, work, practice. Let each person add their own commitments. The aim is a useful shared picture, not an audit of everyone’s time.",
      ],
      [
        "Ask one practical question.",
        "“Where will you need a hand this week?” makes room for the ride, the schedule conflict, or the responsibility that needs covering. Assign those gaps while everyone is together.",
      ],
      [
        "Leave room to change the plan.",
        "Agree on how to tell each other when something changes. A short update is enough. Finish by choosing one thing to look forward to together. Ten minutes should feel like a little help, not another meeting.",
      ],
    ],
  },
  {
    slug: "check-ins-without-hovering",
    tag: "Trust & communication",
    title: "A check-in is a conversation, not a coordinate.",
    description:
      "Agree on the moments worth sharing—and give everything else some space.",
    read: "5 min",
    color: "butter",
    sections: [
      [
        "Choose the moments together.",
        "Arrival after a new route, leaving a late shift, or getting home: these are useful moments to discuss. Let your teen say which moments feel helpful, and which feel repetitive.",
      ],
      [
        "Say what happens next.",
        "Talk about the difference between a delayed message and an actual change of plan. Decide how long to wait, who to contact, and when a phone call makes more sense. An app is a coordination tool, not emergency response.",
      ],
      [
        "Review the agreement.",
        "As a route becomes familiar, the check-ins you need may change. Revisit expectations together. Trust should have room to adapt.",
      ],
    ],
  },
  {
    slug: "a-first-solo-plan",
    tag: "Growing independence",
    title: "Make space for the first solo plan.",
    description:
      "A practical way to hand over responsibility without handing over every detail.",
    read: "3 min",
    color: "coral",
    sections: [
      [
        "Start with a familiar plan.",
        "A trip to rehearsal or a weekly task is a good place to start. Ask your teen to work out the steps, including what they will do if the original plan changes.",
      ],
      [
        "Offer support with a clear boundary.",
        "Choose one part to help with. That might be checking the bus route together or doing a practice drive. Avoid quietly taking the whole task back.",
      ],
      [
        "Reflect, then loosen the structure.",
        "After a few tries, ask what worked. Agree on what support is still useful. Independence grows through practice, including the occasional imperfect plan.",
      ],
    ],
  },
];
export const campaigns = [
  {
    id: "01",
    title: "Out the door.\nOn the same page.",
    audience: "Family coordination",
    color: "coral",
    note: "Launch · a plan that travels with you",
    ui: "today",
  },
  {
    id: "02",
    title: "Your plans.\nYour move.",
    audience: "Teen independence",
    color: "lilac",
    note: "Teen acquisition · own the next step",
    ui: "goals",
  },
  {
    id: "03",
    title: "Practice ended.\nThe texting can, too.",
    audience: "Check-ins",
    color: "butter",
    note: "Parent acquisition · one useful update",
    ui: "check-ins",
  },
  {
    id: "04",
    title: "A ride home.\nAlready sorted.",
    audience: "Rides",
    color: "sky",
    note: "Product education · visible handoffs",
    ui: "rides",
  },
  {
    id: "05",
    title: "Ask. Talk.\nMake a plan.",
    audience: "Permissions",
    color: "plum",
    note: "Trust · a conversation with context",
    ui: "permissions",
  },
  {
    id: "06",
    title: "More “I’ve got it.”\nLess reminding.",
    audience: "Responsibilities",
    color: "butter",
    note: "Habit formation · ownership, not points",
    ui: "responsibilities",
  },
  {
    id: "07",
    title: "Four people.\nOne Tuesday.",
    audience: "Family calendar",
    color: "lilac",
    note: "Coordination · real life, in one view",
    ui: "calendar",
  },
  {
    id: "08",
    title: "Growing up.\nWith room to go.",
    audience: "Milestones",
    color: "coral",
    note: "Brand platform · agreements that evolve",
    ui: "milestones",
  },
];
export const emails = [
  {
    slug: "welcome",
    subject: "A little structure. A lot of room.",
    eyebrow: "Welcome to Sideby",
    title: "Let’s make room for the week.",
    body: "Start with the plans you already have. Add your household, put one shared event on the calendar, and decide what each person wants to own.",
    cta: "Set up our family",
    href: "/signup",
  },
  {
    slug: "invite",
    subject: "Make it their space, too.",
    eyebrow: "A shared start",
    title: "Invite a teen. Start a conversation.",
    body: "Before adding expectations, talk about what would actually help. Their schedule? A ride after practice? Fewer repeat texts? Build your first shared plan together.",
    cta: "Meet the teen experience",
    href: "/for-teens",
  },
  {
    slug: "weekly",
    subject: "Your week has a few moving parts.",
    eyebrow: "The weekly snapshot",
    title: "Monday, meet the plan.",
    body: "In the Bennett demo: two practices, a café shift, and Grandma on Sunday. Wednesday’s ride still needs a driver. A ten-minute check together can help.",
    cta: "Look at the week",
    href: "/app/calendar",
  },
  {
    slug: "permission",
    subject: "Ellie has a Friday plan to talk about.",
    eyebrow: "Permission request",
    title: "Movie night, with the details.",
    body: "Cedar Cinema with Ava and Jules. Ava’s mom can drive there. Ellie plans to be home by 10:30. Read the plan, add an agreement, or make time to talk.",
    cta: "Review the request",
    href: "/app/permissions",
  },
  {
    slug: "tomorrow",
    subject: "Tomorrow’s ride needs a hand.",
    eyebrow: "Tomorrow, sorted",
    title: "One shift. One ride to arrange.",
    body: "Ellie finishes at June Coffee at 7:00 tomorrow. The ride home is still open. If you can drive, claim it so everyone knows the plan.",
    cta: "See the ride",
    href: "/app/rides",
  },
];
