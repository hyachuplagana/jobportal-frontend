import { PlaceHolderImages } from './placeholder-images';

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  postedDate: string; // ISO 8601 format
  description: string;
  logoId: string;
  hirerId: string;
};

export type Company = {
    id: string;
    name: string;
    description: string;
    website: string;
    logoId: string;
}

export const MOCK_COMPANIES: Company[] = [
    { id: 'logo-tech-solutions', name: 'Tech Solutions Inc.', description: 'A leading provider of innovative tech solutions.', website: 'https://techsolutions.example.com', logoId: 'logo-tech-solutions' },
    { id: 'logo-innovate-now', name: 'Innovate Now', description: 'Driving the future of creative design and product development.', website: 'https://innovatenow.example.com', logoId: 'logo-innovate-now' },
    { id: 'logo-data-corp', name: 'DataCorp', description: 'Unlocking the power of data with advanced analytics.', website: 'https://datacorp.example.com', logoId: 'logo-data-corp' },
    { id: 'logo-green-energy', name: 'GreenEnergy Co.', description: 'Pioneering sustainable energy for a greener tomorrow.', website: 'https://greenenergy.example.com', logoId: 'logo-green-energy' },
    { id: 'logo-health-plus', name: 'HealthPlus', description: 'Committed to providing top-tier healthcare services.', website: 'https://healthplus.example.com', logoId: 'logo-health-plus' },
    { id: 'logo-finance-gurus', name: 'Finance Gurus', description: 'Expert financial advice to guide your success.', website: 'https://financegurus.example.com', logoId: 'logo-finance-gurus' },
]

export const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'Tech Solutions Inc.',
    location: 'San Francisco, CA',
    salary: '$120,000 - $160,000',
    type: 'Full-time',
    postedDate: '2024-07-28T10:00:00Z',
    description: 'We are looking for an experienced Senior Frontend Developer to join our team. You will be responsible for building and maintaining our web applications, using modern technologies like React and Next.js.',
    logoId: 'logo-tech-solutions',
    hirerId: '1',
  },
  {
    id: '2',
    title: 'Product Designer',
    company: 'Innovate Now',
    location: 'New York, NY',
    salary: '$90,000 - $110,000',
    type: 'Full-time',
    postedDate: '2024-07-27T14:30:00Z',
    description: 'Innovate Now is seeking a creative Product Designer to help shape the future of our products. You will work on all stages of the design process, from user research to high-fidelity mockups.',
    logoId: 'logo-innovate-now',
    hirerId: '1',
  },
  {
    id: '3',
    title: 'Data Scientist',
    company: 'DataCorp',
    location: 'Remote',
    salary: '$130,000 - $175,000',
    type: 'Full-time',
    postedDate: '2024-07-29T09:00:00Z',
    description: 'Join DataCorp as a Data Scientist and help us make sense of large datasets. You will be using machine learning models to provide valuable insights for our business.',
    logoId: 'logo-data-corp',
    hirerId: '1',
  },
  {
    id: '4',
    title: 'Renewable Energy Engineer',
    company: 'GreenEnergy Co.',
    location: 'Austin, TX',
    salary: '$85,000 - $105,000',
    type: 'Full-time',
    postedDate: '2024-07-25T11:00:00Z',
    description: 'GreenEnergy Co. is hiring a Renewable Energy Engineer to design and develop our next generation of green power solutions. A passion for sustainability is a must.',
    logoId: 'logo-green-energy',
    hirerId: '1',
  },
  {
    id: '5',
    title: 'Marketing Intern',
    company: 'Innovate Now',
    location: 'New York, NY',
    salary: '$25/hour',
    type: 'Internship',
    postedDate: '2024-07-20T16:00:00Z',
    description: 'Gain hands-on marketing experience with our dynamic team. This internship is perfect for a student or recent graduate looking to kickstart their career in marketing.',
    logoId: 'logo-innovate-now',
    hirerId: '1',
  },
  {
    id: '6',
    title: 'Backend Engineer (Node.js)',
    company: 'Tech Solutions Inc.',
    location: 'Remote',
    salary: '$110,000 - $140,000',
    type: 'Full-time',
    postedDate: '2024-07-30T08:00:00Z',
    description: 'We need a skilled Backend Engineer proficient in Node.js to build scalable and robust services. Experience with microservices and cloud platforms like AWS is a plus.',
    logoId: 'logo-tech-solutions',
    hirerId: '1',
  },
  {
    id: '7',
    title: 'Registered Nurse',
    company: 'HealthPlus',
    location: 'Chicago, IL',
    salary: '$75,000 - $95,000',
    type: 'Part-time',
    postedDate: '2024-07-15T12:00:00Z',
    description: 'HealthPlus is looking for a compassionate and dedicated Registered Nurse for a part-time position at our downtown clinic. Flexible hours available.',
    logoId: 'logo-health-plus',
    hirerId: '1',
  },
  {
    id: '8',
    title: 'Financial Analyst',
    company: 'Finance Gurus',
    location: 'Boston, MA',
    salary: '$80,000 - $100,000',
    type: 'Contract',
    postedDate: '2024-07-26T18:00:00Z',
    description: 'We have a 6-month contract opportunity for a Financial Analyst to assist with quarterly reporting and financial modeling. Strong Excel skills required.',
    logoId: 'logo-finance-gurus',
    hirerId: '1',
  }
];

export type HirerJob = Job & {
    applicants: number;
    status: 'Open' | 'Closed';
}

export const MOCK_HIRER_JOBS: HirerJob[] = MOCK_JOBS.slice(0,4).map((job, index) => ({
    ...job,
    applicants: Math.floor(Math.random() * 30) + 5,
    status: index % 2 === 0 ? 'Open' : 'Closed',
}));
