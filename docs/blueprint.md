# **App Name**: WorkWise

## Core Features:

- Job Seeker Landing Page: Landing page with a hero section, featured jobs, and a button to the Hirer landing page. Served at the `/` route.
- Hirer Landing Page: Landing page for hirers with a hero section and information about posting jobs. It has a button to go back to the Job Seeker landing page. Served at the `/hirer` route.
- Job Browsing: Job seekers can browse jobs in a list or grid format on the `/jobs` route. The available job types, specializations and other qualities are provided via a LLM-powered tool.
- CV Upload: Job seekers can upload their CV to apply for a job.
- Job Sorting: Jobs can be sorted by newest, oldest, relevance, location, and type.
- Job Application: Job seekers can apply for jobs, displaying a success message upon submission.
- Hirer Dashboard: Dashboard for hirers to post new jobs (mock form), see a list of posted jobs, and delete job posts, including mock data on who applied.

## Style Guidelines:

- Primary color: Deep Indigo (#4B0082) for a sophisticated and trustworthy feel, inspired by premium job platforms. Use a gradient to subtly enhance the premium look.
- Background color: Off-white (#F5F5F5) to provide a clean, modern backdrop that emphasizes content and feels high-end.
- Accent color: Teal (#008080) used for key interactive elements and highlights to create a sense of innovation and draw attention, reminiscent of Wellfound's color scheme.
- Font: 'Nunito Sans' (sans-serif) for both body text and headlines, ensuring readability and a modern, clean aesthetic. Adjust font-weight and size for emphasis.
- Use high-quality, minimalist icons from a library like Phosphor Icons or Remix Icon to represent different job categories and actions, ensuring a sleek and professional look.
- Employ a responsive grid system with TailwindCSS to ensure the website looks good on all devices. Max width should be 1440px to accommodate larger screens and provide a spacious feel. Use generous padding and spacing.
- Incorporate subtle, smooth transitions and animations for hover effects and page transitions to provide a polished, premium user experience. Use easing functions for natural movements.