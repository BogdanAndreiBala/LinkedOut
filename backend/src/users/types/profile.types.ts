export interface Education {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startYear: number;
  endYear: number | null;
}

export interface Experience {
  company: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string | null;
  description: string;
}
