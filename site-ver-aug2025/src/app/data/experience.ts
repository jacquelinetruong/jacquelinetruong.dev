// temporary until Notion CMS integration is added

export interface Experience {
  company: string;
  role: string;
  duration: string;
  points: string[];
};

export const experience: Experience[] = [
  {
    company: "MobCoder",
    role: "UX/UI Designer",
    duration: "june 2025 — present",
    points: [
      "TBD"
    ],
  },
  {
    company: "Konfer",
    role: "Chief Creative Officer, Founding Designer",
    duration: "july 2024 — present",
    points: [
      "Led all creative across 3+ hackathons with 3,000+ attendees and 35+ company sponsors.",
      "Designed responsive web UIs in Figma—landing pages, hacker dashboards, admin portals, and forms, all with mobile views.",
      "Partnered with 5 engineers in an agile environment to iterate through usability testing and team feedback, ensuring smooth hand-off and design implementation.",
    ],
  },
  {
    company: "Civiconnect",
    role: "UI Designer & Web Developer",
    duration: "may 2024 — april 2025",
    points: [
      "Prototyped UIs in Figma for client websites across 5+ industries: eCommerce, real estate, art, tech, event planning, and business.",
      "Delivered a solo full-stack project: a dynamic activity calendar for a retirement home (see Projects section).",
      "Bridged design and development teams, ensuring aesthetic and functional consistency across 12+ successful client projects.",
    ],
  },
];
