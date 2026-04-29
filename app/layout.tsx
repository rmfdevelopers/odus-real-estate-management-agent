import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';

const heading = Cormorant_Garamond({ 
  subsets: ['latin'], 
  variable: '--font-heading',
  weight: ['300', '400', '500', '600', '700']
});
const body = DM_Sans({ 
  subsets: ['latin'], 
  variable: '--font-body',
  weight: ['400', '500', '700']
});

export const metadata = {
  title: 'Odus Real Estate | Home & Comfort',
  description: 'Expert real estate management and lifestyle curation across Lagos, Abuja, and the North-Central region.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}