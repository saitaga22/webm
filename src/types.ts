
export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  image: string;
  github?: string;
  demo?: string;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Skill {
  name: string;
  logo: string;
  category: 'Languages' | 'Frameworks' | 'Databases' | 'Tools';
}
