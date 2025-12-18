import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts } from '../data';
import { Metadata } from 'next';


interface BlogPostPageProps {
  params: {
    id: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((post) => post.id === params.id);

  if (!post) {
    notFound();
  }

  // Parse markdown content with improved styling
  const renderContent = (content: string) => {
    const sections = content.split('## ').filter(section => section.trim() !== '');
    
    if (sections.length === 0) return null;

    // First section is the main content
    const [firstSection, ...restSections] = sections;
    const [title, ...introLines] = firstSection.split('\n').filter(line => line.trim() !== '');
    
    return (
      <>
        {/* Main title and intro */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6">
          {title.replace(/^#\s*/, '')}
        </h1>
        <div className="prose prose-lg max-w-none mb-12">
          {introLines.map((line, i) => (
            <p key={`intro-${i}`} className="text-gray-100 text-lg leading-relaxed mb-6">
              {line}
            </p>
          ))}
        </div>

        {/* Other sections */}
        {restSections.map((section, sectionIndex) => {
          const [sectionTitle, ...sectionContent] = section.split('\n').filter(line => line.trim() !== '');
          const content = sectionContent.join('\n');
          
          return (
            <div key={`section-${sectionIndex}`} className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-100 mb-6">
                {sectionTitle}
              </h2>
              
              {content.includes('- ') ? (
                <ul className="list-disc pl-6 space-y-3 mb-6">
                  {content
                    .split('- ')
                    .filter(item => item.trim() !== '')
                    .map((item, itemIndex) => (
                      <li key={`item-${itemIndex}`} className="text-gray-100">
                        {item.trim()}
                      </li>
                    ))}
                </ul>
              ) : (
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-100 leading-relaxed">{content}</p>
                </div>
              )}
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#171717]">
      
      <div className="flex-grow bg-[#171717] text-gray-100">
      {/* Header */}
      <header className="bg-[#171717] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block bg-pink-100 text-pink-800 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative h-[500px] w-full mb-16 rounded-xl overflow-hidden shadow-xl">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            
            <article className="max-w-3xl mx-auto text-gray-200">
              {renderContent(post.content)}
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-12 mb-8">
                {['Skincare', 'Beauty Tips', 'Anti-Aging'].map((tag) => (
                  <span 
                    key={tag}
                    className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              {/* Author Bio */}
              <div className="border-t border-b border-gray-200 py-8 my-12">
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden mr-4">
                    <Image 
                      src="/images/author-placeholder.jpg" 
                      alt={post.author}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-100">{post.author}</h4>
                    <p className="text-gray-100 text-sm">Skincare Expert & Dermatologist</p>
                    <p className="text-gray-100 text-sm mt-1">With over 10 years of experience in dermatology, {post.author.split(' ')[0]} specializes in cosmetic dermatology and skincare science.</p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </main>

      {/* Related Articles */}
      <section className="bg-[#171717] py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-100 mb-12 text-center">You May Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts
              .filter((p) => p.id !== post.id)
              .slice(0, 3)
              .map((relatedPost) => (
                <div key={relatedPost.id} className="bg-[#383838] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="relative h-48 w-full">
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <span className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full bg-gray-100 text-[#383838] mb-2">
                      {relatedPost.category}
                    </span>
                    <h3 className="text-lg font-bold mb-2">
                      <Link href={`/blog/${relatedPost.id}`} className="hover:text-pink-600 transition-colors">
                        {relatedPost.title}
                      </Link>
                    </h3>
                    <p className="text-gray-100 text-sm line-clamp-2 mb-3">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-100">
                      <span>{relatedPost.author}</span>
                      <span>{relatedPost.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link 
                href="/blog" 
                className="inline-flex items-center text-[#d4a674] hover:text-pink-800 font-medium"
              >
                View all articles
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
      </div>
      
    </div>
  );
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id,
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const post = blogPosts.find((post) => post.id === params.id);
  
  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: `${post.title} | Lunel Beauty Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  } as Metadata;
}
