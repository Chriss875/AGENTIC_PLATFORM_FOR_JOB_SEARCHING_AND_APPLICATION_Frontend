export type Job = {
  id: string;
  title: string;
  company: string;
  companyLogo: string | null;
  applicationUrl: string | null;
  industry: string;
  location: string;
  country: string | null;
  employmentType: string;
  postedAt: string;
  relevance: number;
  summary: string;
  fullPosting: string;
  requirements: string[];
  responsibilities: string[];
  skills: string[];

};
