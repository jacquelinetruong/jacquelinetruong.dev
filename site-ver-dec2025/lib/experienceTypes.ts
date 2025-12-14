// types according to notion experience db

export type Experience = {
    id: string;
    category: 'work' | 'clients' | 'proficiencies';
    menuTitle: string;
    position: string;
    startDate: string | null;
    endDate: string | null;
    current: boolean; 
    points: string[];
}