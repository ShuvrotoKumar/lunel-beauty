export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  category: 'Technology' | 'Design' | 'Business' | 'Marketing' | 'Development';
  date: string;
  author: string;
  image: string;
  content: string;
};

export type SortOption = 'latest' | 'oldest' | 'a-z' | 'z-a';

export const categories = [
  'All Posts',
  'Technology',
  'Design',
  'Business',
  'Marketing',
  'Development',
] as const;
