import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Script from "next/script";

// global CSS for layout
import "./globals.css";

export const metadata: Metadata = {
  title: "The Report",
  description: "Breaking news, politics, and trending stories from Kenya. Your trusted source for truth and real-time updates.",
  keywords: "Kenya breaking news today, latest news in Kenya, Nairobi trending news, jobs in Kenya, celebrity gossip Kenya, William Ruto news, Raila Odinga, Gachagua latest, SHA registration Kenya, KeNHA updates, KRA news, education news Kenya, entertainment news Kenya",
  authors: [{ name: "Jonathan Mwaniki" }],
  openGraph: {
    title: "The Report",
    description: "Breaking news, politics, and trending stories from Kenya. Your trusted source for truth and real-time updates.",
    url: "https://jonathanmwaniki.co.ke",
    siteName: "Jonathan Mwaniki",
    images: [{ url: "/default-social-card.jpg", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    site: "@maestropuns",
    creator: "@maestropuns",
    title: "The Report",
    description: "Breaking news, politics, and trending stories from Kenya. Your trusted source for truth and real-time updates.",
  },
  verification: {
    other: { "yandex-verification": "4ec79656b15aa799" }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="theme-color" content="#dc2626" />
        <link rel="sitemap" href="/sitemap-index.xml" />
        {/* GOOGLE ADSENSE */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js?id=ca-pub-9291176772735390" crossOrigin="anonymous"></script>
        {/* GOOGLE ANALYTICS */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-W3FVP4FRPT"></script>
        <script dangerouslySetInnerHTML={{__html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-W3FVP4FRPT');
        `}} />
      </head>
      <body>
        <Header />
        
        <main>
          {/* ADCASH BANNER */}
          <div className="ad-container" style={{ display: 'flex', justifyContent: 'center', minHeight: '90px', margin: '10px 0' }}>
            <Script id="aclib" strategy="afterInteractive" src="//acscdn.com/script/aclib.js" />
            <Script id="adcash-exec" strategy="lazyOnload">
              {`
                window.addEventListener('load', function() {
                  if (window.aclib) {
                    window.aclib.runBanner({
                      zoneId: '11004510',
                    });
                  }
                });
              `}
            </Script>
          </div>

          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
