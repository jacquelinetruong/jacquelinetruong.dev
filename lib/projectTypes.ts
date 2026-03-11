// types according to notion projects db

export type Project = {
    id: string;

    current: boolean;
    casestudy: boolean;
    slug: string;
    
    hero: boolean;
    sectionId: '1' | '2' | '3' | '4' | '5' | '6';

    type: 'design' | 'development';
    role: string[];
    tags: string[];
    title: string;
    images: string[];

    description: string;
    languages: string[];
    programs: string[];
    category: string[];

    link?: string;
    github?: string;
};