import { CategoryInfo } from '@/types/youtube';

export interface AgeGroup {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  emoji: string;
  query: string;
  colorTint: string;
  borderTint: string;
  iconName: string;
  videoCountText: string;
}

export const AGE_GROUPS: AgeGroup[] = [
  {
    id: '0-2',
    slug: '0-2',
    title: '0–2',
    subtitle: 'Babies & Toddlers',
    description: 'Gentle songs, lullabies and simple sensory stories for infants & tiny tots.',
    badge: 'Baby',
    emoji: '👶',
    query: 'baby lullabies nursery rhymes gentle songs for babies toddlers',
    colorTint: 'bg-lavender-50 text-purple-900',
    borderTint: 'border-purple-200/80',
    iconName: 'Baby',
    videoCountText: '300+ gentle videos',
  },
  {
    id: '2-4',
    slug: '2-4',
    title: '2–4',
    subtitle: 'Early Learners',
    description: 'Rhymes, ABCs, colors, counting, and friendly animal adventures.',
    badge: 'Toddler',
    emoji: '🧸',
    query: 'nursery rhymes songs alphabet colors animals for kids toddlers',
    colorTint: 'bg-rose-50 text-rose-950',
    borderTint: 'border-rose-200/80',
    iconName: 'Sparkles',
    videoCountText: '500+ curated videos',
  },
  {
    id: '5-7',
    slug: '5-7',
    title: '5–7',
    subtitle: 'Learn & Explore',
    description: 'Animated stories, numbers, beginner science, and creative crafts.',
    badge: 'Early',
    emoji: '🚀',
    query: 'kids stories educational science songs phonics for kids',
    colorTint: 'bg-amber-50 text-amber-950',
    borderTint: 'border-amber-200/80',
    iconName: 'Rocket',
    videoCountText: '800+ curated videos',
  },
  {
    id: '8-12',
    slug: '8-12',
    title: '8–12',
    subtitle: 'Curious Minds',
    description: 'Science experiments, space discovery, coding, and creative learning.',
    badge: 'Big Kids',
    emoji: '🔬',
    query: 'kids coding science experiments crafts space exploration geography',
    colorTint: 'bg-cyan-50 text-cyan-950',
    borderTint: 'border-cyan-200/80',
    iconName: 'Microscope',
    videoCountText: '1,000+ curated videos',
  },
];

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'songs',
    slug: 'songs',
    title: 'Songs',
    ageGroup: '2–4',
    description: 'Fun music & rhymes',
    query: 'kids songs sing along nursery rhymes music',
    color: 'bg-pink-100/70 text-pink-800 border-pink-200',
    gradient: 'from-pink-500 to-rose-500',
    icon: 'Music',
  },
  {
    id: 'stories',
    slug: 'stories',
    title: 'Stories',
    ageGroup: '5–7',
    description: 'Magical stories',
    query: 'animated kids stories fairy tales read aloud bedtime',
    color: 'bg-amber-100/70 text-amber-900 border-amber-200',
    gradient: 'from-amber-500 to-orange-500',
    icon: 'BookOpen',
  },
  {
    id: 'science',
    slug: 'science',
    title: 'Science',
    ageGroup: '8–12',
    description: 'Explore & learn',
    query: 'educational science for kids animals space experiments',
    color: 'bg-cyan-100/70 text-cyan-900 border-cyan-200',
    gradient: 'from-cyan-500 to-blue-500',
    icon: 'Microscope',
  },
  {
    id: 'creativity',
    slug: 'creativity',
    title: 'Creativity',
    ageGroup: '5–7',
    description: 'Art, craft & DIY',
    query: 'kids art drawing tutorials crafts easy',
    color: 'bg-emerald-100/70 text-emerald-900 border-emerald-200',
    gradient: 'from-emerald-500 to-teal-500',
    icon: 'Palette',
  },
  {
    id: 'learning',
    slug: 'learning',
    title: 'Learning',
    ageGroup: '2–4',
    description: 'Math, letters & more',
    query: 'alphabet for kids numbers counting phonics',
    color: 'bg-purple-100/70 text-purple-900 border-purple-200',
    gradient: 'from-purple-500 to-indigo-500',
    icon: 'Puzzle',
  },
  {
    id: 'discovery',
    slug: 'discovery',
    title: 'Discovery',
    ageGroup: '8–12',
    description: 'World around us',
    query: 'how things work for kids world history geography',
    color: 'bg-sky-100/70 text-sky-900 border-sky-200',
    gradient: 'from-sky-500 to-blue-600',
    icon: 'Compass',
  },
  {
    id: 'puzzles',
    slug: 'puzzles',
    title: 'Puzzles',
    ageGroup: '8–12',
    description: 'Brain games',
    query: 'kids riddles coding logic scratch for kids',
    color: 'bg-rose-100/70 text-rose-900 border-rose-200',
    gradient: 'from-rose-500 to-pink-600',
    icon: 'Brain',
  },
  {
    id: 'movement',
    slug: 'movement',
    title: 'Movement',
    ageGroup: '2–4',
    description: 'Dance & active play',
    query: 'kids yoga action songs dance workout for kids',
    color: 'bg-blue-100/70 text-blue-900 border-blue-200',
    gradient: 'from-blue-500 to-indigo-600',
    icon: 'Activity',
  },
];

export function getCategoryBySlug(slug: string): CategoryInfo | undefined {
  return CATEGORIES.find(c => c.slug === slug || c.id === slug);
}

export function getAgeGroupBySlug(slug: string): AgeGroup | undefined {
  return AGE_GROUPS.find(a => a.slug === slug || a.id === slug);
}
