import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from './types';

const categoryColors = {
  Technology: 'bg-blue-100 text-blue-800',
  Design: 'bg-purple-100 text-purple-800',
  Business: 'bg-green-100 text-green-800',
  Marketing: 'bg-yellow-100 text-yellow-800',
  Development: 'bg-indigo-100 text-indigo-800',
};

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6">
        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${categoryColors[post.category]}`}>
          {post.category}
        </span>
        <h3 className="text-xl font-bold mt-3 mb-2 hover:text-indigo-600 transition-colors">
          <Link href={`/blog/${post.id}`}>
            {post.title}
          </Link>
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{post.author}</span>
          <span>{post.date}</span>
        </div>
      </div>
    </div>
  );
}
