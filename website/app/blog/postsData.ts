export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  coverImage: string;
  author: {
    name: string;
    role?: string;
    avatar?: string;
  };
  featured?: boolean;
}

export const blogPosts: BlogPostMeta[] = [
  {
    slug: 'exploring-japan-kyoto-to-tokyo',
    title: 'From Kyoto Temples to Tokyo Neon: A 10-Day Journey Across Honshu',
    excerpt: 'Explore ancient cedar forests in Arashiyama, forge chef knives with local masters, and navigate the world’s most seamless transit network.',
    category: 'Trip Report',
    date: 'Sep 12, 2026',
    readTime: '6 min read',
    coverImage: 'https://coeythfyfwzrwzuqowfe.supabase.co/storage/v1/object/public/post-media/d971cec8-661c-47da-9a2d-090947e09af3/8B166176-0E9B-4027-824A-3B66B13D6D71/EC7CE90E-5513-4EB5-86ED-5C2FE649C463.jpg',
    author: {
      name: 'Caravyn Team',
      role: 'Founding Explorers',
    },
    featured: true,
  },
  {
    slug: 'template',
    title: 'Blog Post Starter Template & Component Guide',
    excerpt: 'A complete reference and copy-paste boilerplate demonstrating all Caravyn blog blocks: headers, mini-maps, photo cards, video embeds, and callouts.',
    category: 'Guide',
    date: 'Sep 15, 2026',
    readTime: '3 min read',
    coverImage: 'https://coeythfyfwzrwzuqowfe.supabase.co/storage/v1/object/public/post-media/51dd8574-e9eb-4346-b79b-94e121a986cf/A5C32288-19CD-46DF-A50D-596C3816ED33/79AC68AB-E934-4E3A-8798-1023968DC7D3.jpg',
    author: {
      name: 'Caravyn Docs',
      role: 'Template & Docs',
    },
    featured: false,
  },
];
