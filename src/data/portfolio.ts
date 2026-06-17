export interface Project {
  id: string;
  title: string;
  role?: string;
  context?: string;
  media: {
    type: 'video' | 'image' | 'pdf';
    url: string;
    placeholder?: string;
  }[];
}

export interface Discipline {
  id: string;
  title: string;
  description: string;
  projects: Project[];
}

const PLACEHOLDER_VIDEO = 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';
const PLACEHOLDER_IMAGE = (seed: string) => `https://picsum.photos/seed/${seed}/1920/1080`;

export const portfolioData: Discipline[] = [
  {
    id: 'videoproduktion',
    title: 'Videoproduktion',
    description: 'Ad-Spots, Showreel-Material, reale Auftragsarbeit.',
    projects: [
      {
        id: 'conventionpoint-2026',
        title: 'ConventionPoint Ad 2026',
        role: 'Video Editor & Motion Designer',
        context: 'Werbespot für Event-Location.',
        media: [
          { type: 'video', url: PLACEHOLDER_VIDEO }
        ]
      },
      {
        id: 'do-what-excites',
        title: 'Do What Excites Shortfilm 2022',
        role: 'Director & Editor',
        context: 'Passion Project.',
        media: [
          { type: 'video', url: PLACEHOLDER_VIDEO }
        ]
      },
      {
        id: 'leadership-days',
        title: 'Leadership Days 2023',
        role: 'Video Producer',
        context: 'Event-Dokumentation.',
        media: [
          { type: 'video', url: PLACEHOLDER_VIDEO }
        ]
      },
      {
        id: 'statement-basisseminar',
        title: 'Statement Basisseminar 2023',
        role: 'Editor',
        context: 'Bildungsevent.',
        media: [
          { type: 'video', url: PLACEHOLDER_VIDEO }
        ]
      },
      {
        id: 'swiss-money-week',
        title: 'Swiss Money Week 2023',
        role: 'Video Producer',
        context: 'Social Media Campaign.',
        media: [
          { type: 'video', url: PLACEHOLDER_VIDEO }
        ]
      }
    ]
  },
  {
    id: 'fotografie',
    title: 'Fotografie',
    description: 'Porträts, Event- & Produktfotografie.',
    projects: [
      {
        id: 'ira',
        title: 'IRA Session',
        context: 'Portrait Session',
        media: [
          { type: 'image', url: PLACEHOLDER_IMAGE('ira1') },
          { type: 'image', url: PLACEHOLDER_IMAGE('ira2') }
        ]
      },
      {
        id: 'mailand',
        title: 'Mailand Trip',
        context: 'Street & Architecture',
        media: [
          { type: 'image', url: PLACEHOLDER_IMAGE('mailand1') },
          { type: 'image', url: PLACEHOLDER_IMAGE('mailand2') }
        ]
      },
      {
        id: 'produkt',
        title: 'Produkt Gruppe C',
        context: 'Product Photography',
        media: [
          { type: 'image', url: PLACEHOLDER_IMAGE('produkt') }
        ]
      }
    ]
  },
  {
    id: 'animation',
    title: 'Animation & Motion Design',
    description: 'After-Effects-Arbeiten, Motion Graphics.',
    projects: [
      {
        id: 'motion-reel',
        title: 'Motion Design Showreel',
        role: 'Motion Designer',
        context: 'Zusammenstellung aktueller Arbeiten.',
        media: [
          { type: 'video', url: PLACEHOLDER_VIDEO }
        ]
      }
    ]
  },
  {
    id: 'webdesign',
    title: 'Webdesign',
    description: 'Eigene Projekte und Kunden-Websites.',
    projects: [
      {
        id: 'portfolio-v1',
        title: 'Portfolio Website',
        role: 'Designer & Developer',
        context: 'Diese Website selbst als interaktives Arbeitsbeispiel.',
        media: [
          { type: 'image', url: PLACEHOLDER_IMAGE('webdesign') }
        ]
      }
    ]
  },
  {
    id: 'print',
    title: 'Print',
    description: 'Layout- und Grafikarbeiten.',
    projects: [
      {
        id: 'puregym',
        title: 'PureGym Ari',
        context: 'Flyer/Plakat Layout',
        media: [
          { type: 'pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' }
        ]
      },
      {
        id: 'six-convention',
        title: 'SIX ConventionPoint AdSpace',
        context: 'AdSpace Concept',
        media: [
          { type: 'pdf', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' }
        ]
      }
    ]
  }
];
