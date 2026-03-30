export interface Project {
  id: string
  title: string
  description: string
  category: string
  year: string
  techStack: string[]
  gridCols: 5 | 7
  imageColor: string // placeholder gradient color
  role: string
}

export const projects: Project[] = [
  {
    id: 'fintech-dashboard',
    title: 'Fintech Dashboard',
    description: 'A real-time financial analytics platform with complex data visualisation and AI-driven insights.',
    category: 'Product Design',
    year: '2025',
    techStack: ['Figma', 'React', 'D3.js'],
    gridCols: 7,
    imageColor: '#0d1117',
    role: 'Lead Product Designer',
  },
  {
    id: 'health-os',
    title: 'Health OS',
    description: 'Unified health management system for clinics. Reduced admin time by 40% through intelligent workflows.',
    category: 'UX Strategy',
    year: '2025',
    techStack: ['Figma', 'Framer', 'Lottie'],
    gridCols: 5,
    imageColor: '#0a1628',
    role: 'UX Strategist',
  },
  {
    id: 'brand-system',
    title: 'Orbital Brand System',
    description: 'Comprehensive design system for a Series B startup — 400+ components, 3 themes, full token library.',
    category: 'Design Systems',
    year: '2024',
    techStack: ['Figma', 'Storybook', 'Tokens Studio'],
    gridCols: 5,
    imageColor: '#110a1f',
    role: 'Design Systems Lead',
  },
  {
    id: 'ecommerce-redesign',
    title: 'Commerce Redesign',
    description: 'Full e-commerce platform redesign. Checkout conversion improved by 28% in the first month post-launch.',
    category: 'Product Design',
    year: '2024',
    techStack: ['Figma', 'Shopify', 'A/B Testing'],
    gridCols: 7,
    imageColor: '#0f1a0f',
    role: 'Senior Product Designer',
  },
  {
    id: 'mobile-banking',
    title: 'Neobank Mobile App',
    description: 'Zero-to-one mobile banking experience. From early concept to App Store launch in 6 months.',
    category: 'Mobile Design',
    year: '2024',
    techStack: ['Figma', 'Protopie', 'iOS HIG'],
    gridCols: 7,
    imageColor: '#1a0f0f',
    role: 'Product Designer',
  },
  {
    id: 'design-ops',
    title: 'DesignOps Framework',
    description: 'Internal tooling and process design for a 20-person design org. Scaled handoff efficiency by 60%.',
    category: 'DesignOps',
    year: '2023',
    techStack: ['Notion', 'Figma', 'Jira'],
    gridCols: 5,
    imageColor: '#0f0f1a',
    role: 'DesignOps Lead',
  },
]

export const siteConfig = {
  name: 'Edgar Jerry',
  role: 'Product Designer',
  version: 'v.2.0.26',
  email: 'edgar@edgarjerry.com',
  github: 'https://github.com/edgarjerry',
  linkedin: 'https://linkedin.com/in/edgarjerry',
  location: 'Lagos, Nigeria',
  available: true,
}
