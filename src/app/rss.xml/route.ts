import { getPublicPosts } from '../../utils/posts';

export async function GET() {
  const posts = getPublicPosts().slice(0, 20);
  const siteUrl = 'https://jonathanmwaniki.co.ke';

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>The Mwaniki Report</title>
  <link>${siteUrl}</link>
  <description>Latest investigative journalism and news from Kenya.</description>
  <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
  ${posts.map(post => `
    <item>
      <title><![CDATA[${post.data.title}]]></title>
      <link>${siteUrl}/posts/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/posts/${post.slug}</guid>
      <pubDate>${new Date(post.data.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.data.description || ''}]]></description>
      <category>${post.data.category || 'News'}</category>
    </item>
  `).join('')}
</channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
