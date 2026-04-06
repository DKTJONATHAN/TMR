const fs = require('fs');
const path = require('path');

const srcPages = path.join(__dirname, '..', 'src', 'pages');
const targetApp = path.join(__dirname, '..', 'src', 'app');

const files = fs.readdirSync(srcPages).filter(f => f.endsWith('.astro') && f !== 'index.astro' && f !== 'search.astro');

for (const file of files) {
  const name = file.replace('.astro', '');
  const outDir = path.join(targetApp, name);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  
  let content = fs.readFileSync(path.join(srcPages, file), 'utf8');
  
  // Extract Frontmatter
  let metadata = { title: '', description: '' };
  const frontmatterMatch = content.match(/---([\s\S]*?)---/);
  if (frontmatterMatch) {
    const fm = frontmatterMatch[1];
    const titleMatch = fm.match(/pageTitle\s*=\s*'([^']+)'|"([^"]+)"/);
    if (titleMatch) metadata.title = titleMatch[1] || titleMatch[2];
    
    const descMatch = fm.match(/pageDesc\s*=\s*'([^']+)'|"([^"]+)"/);
    if (descMatch) metadata.description = descMatch[1] || descMatch[2];
    
    content = content.replace(/---[\s\S]*?---/, '');
  }
  
  // Remove Layout wrapper
  content = content.replace(/<Layout([^>]*)>/, '').replace(/<\/Layout>/, '');
  
  // Extract Style
  let styleContent = '';
  const styleMatch = content.match(/<style[^>]*>([\s\S]*?)<\/style>/);
  if (styleMatch) {
    styleContent = styleMatch[1];
    content = content.replace(/<style[^>]*>[\s\S]*?<\/style>/, '');
  }
  
  // Convert class to className
  content = content.replace(/class=/g, 'className=');
  // Handle HTML attributes specific to React
  content = content.replace(/for=/g, 'htmlFor=');
  content = content.replace(/is:inline\s*/g, '');
  
  // Also any SVG stuff if needed, but Next.js usually handles basic SVG OK.
  // We'll wrap it in a Fragment.
  
  let outCode = \`import React from 'react';\n\n\`;
  
  if (metadata.title || metadata.description) {
      outCode += \`export const metadata = {\n\`;
      if (metadata.title) outCode += \`  title: "\${metadata.title}",\n\`;
      if (metadata.description) outCode += \`  description: "\${metadata.description}",\n\`;
      outCode += \`};\n\n\`;
  }
  
  outCode += \`export default function \${name.charAt(0).toUpperCase() + name.slice(1)}() {\n\`;
  outCode += \`  return (\n    <>\n\`;
  outCode += content.trim();
  
  if (styleContent) {
      let escapedStyle = styleContent.replace(/\`/g, '\\\\`').replace(/\\$/g, '\\\\$');
      outCode += \`\n\n      <style dangerouslySetInnerHTML={{ __html: \\\`\${escapedStyle}\\\` }} />\n\`;
  }
  outCode += \`    </>\n  );\n}\n\`;
  
  fs.writeFileSync(path.join(outDir, 'page.tsx'), outCode);
  console.log(\`Converted \${file} to src/app/\${name}/page.tsx\`);
}
