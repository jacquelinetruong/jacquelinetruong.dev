// temporary until Notion CMS integration is added

export type Project = {
  title: string;
  description: string;
  link?: string;
  tags: string[];
  image?: string;
};

export const projects: Project[] = [
  {
    title: "Konfer",
    description:
      "A hackathon industry platform connecting builders, founders, and sponsors.",
    link: "https://konfer.app",
    tags: ["Next.js", "TypeScript", "Tailwind", "UX/UI"],
    image: "/konfer-cover.png",
  },
  {
    title: "Flux Studio",
    description:
      "Creative studio portfolio site showcasing generative design projects.",
    tags: ["React", "Framer Motion", "Branding"],
    image: "/flux-cover.png",
  },
];
