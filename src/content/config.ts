import { getPosts } from '@/lib/content'; // Path to the downloaded file

export default function BlogPage() {
  const posts = getPosts(); // This will return a strictly typed array based on your Zod schema

  return (
    <div>
      {posts.map((post) => (
        <article key={post.slug}>
          <h2>{post.frontmatter.title}</h2>
          <p>{post.frontmatter.date.toDateString()}</p>
        </article>
      ))}
    </div>
  );
}
