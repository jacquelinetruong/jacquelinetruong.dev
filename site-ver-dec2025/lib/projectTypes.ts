// types according to notion projects db

export type Project = {
    id: string;
    title: string;
    description: string;
    languages: string[];
    programs: string[];
    link: string;
    image: string;
    section: 'hero' | 'about' | 'portfolio' | 'experience';
    sectionId: '1' | '2' | '3' | '4';
    type: 'designer' | 'developer'
};