export type Project = {
  id: string;
  title: string;
  description: string;
  tech: string[];
  repo: string;
  year?: string;
  image?: string;
  video?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: 'lpr',
    title: 'License Plate Recognition System',
    description: 'AI-powered smart parking enforcement solution with real-time license plate detection and recognition. Features microservices architecture with YOLOv11, OCR, motion detection, and real-time alerts through PyQt5 UI.',
    tech: ['Python', 'YOLOv11', 'PaddleOCR', 'FastAPI', 'Redis', 'Docker', 'PyQt5'],
    repo: 'https://github.com/tnaydnov/License_Plate_Recognition',
    year: '2025',
    image: '/images/lpr-preview.png',
    video: '/videos/lpr-demo.mp4',
    featured: true
  },
  {
    id: 'trading-system',
    title: 'E-Commerce Trading System',
    description: 'Full-stack e-commerce platform with comprehensive store management, user authentication, payment integration, and supplier systems. Features admin controls, shopping cart functionality, and detailed configuration system.',
    tech: ['JavaScript', 'Java', 'JSON', 'Web Development'],
    repo: 'https://github.com/tnaydnov/Trading_System',
    year: '2024',
    image: '/images/trading-preview.png',
    video: '/videos/trading-demo.mp4',
    featured: true
  },
  {
    id: 'hr-organization',
    title: 'HR Management System',
    description: 'Enterprise-level HR management application designed to help stores manage employees, deliveries, and shift scheduling. Built with robust database integration and comprehensive business logic.',
    tech: ['Java', 'Database Management', 'Enterprise Software'],
    repo: 'https://github.com/tnaydnov/HR_Organization',
    year: '2023',
    image: '/images/hr-preview.png'
  },
  {
    id: 'set-card-game',
    title: 'Set Card Game',
    description: 'Digital implementation of the classic Set card game with intelligent game logic, pattern recognition algorithms, and interactive gameplay mechanics.',
    tech: ['Java', 'Game Development', 'Algorithms'],
    repo: 'https://github.com/tnaydnov/Set_Card_Game',
    year: '2022',
    image: '/images/set-game-preview.png'
  },
  {
    id: 'coalition-race',
    title: 'The Coalition Race',
    description: 'Strategic racing simulation game with advanced C++ programming concepts, object-oriented design patterns, and optimized performance algorithms.',
    tech: ['C++', 'Game Development', 'OOP'],
    repo: 'https://github.com/tnaydnov/The_Coalition_Race',
    year: '2022',
    image: '/images/coalition-preview.png'
  },
  {
    id: 'kanban',
    title: 'Kanban Board System',
    description: 'Project management tool implementing Kanban methodology with task tracking, workflow visualization, and team collaboration features.',
    tech: ['C#', 'Project Management', 'Desktop Development'],
    repo: 'https://github.com/tnaydnov/Kanban',
    year: '2022',
    image: '/images/kanban-preview.png'
  },
  {
    id: 'dungeons-dragons',
    title: 'Dungeons & Dragons Game',
    description: 'Text-based RPG implementation of classic D&D mechanics with character management, combat systems, and adventure progression.',
    tech: ['Java', 'Game Development', 'OOP'],
    repo: 'https://github.com/tnaydnov/Dungeons_and_Dragons',
    year: '2022',
    image: '/images/dnd-preview.png'
  }
];
