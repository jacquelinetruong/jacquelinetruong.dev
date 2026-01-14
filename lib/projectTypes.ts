// types according to notion projects db

export type Project = {
    id: string;

    hero: boolean;
    sectionId: '1' | '2' | '3';

    type: 'design' | 'development';
    title: string;
    images: string[];

    description: string;
    points?: string[];
    languages: string[];
    programs: string[];
    category: string[];

    link?: string;
    github?: string;
    dribbble?: string;
};