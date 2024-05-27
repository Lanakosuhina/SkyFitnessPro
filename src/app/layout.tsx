import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import localFont from 'next/font/local';

import './globals.css';
import Wrapper from '@/components/Wrapper/Wrapper';
import Header from '@/components/Header/Header';

const roboto_400 = Roboto({
  weight: '400',
  subsets: ['cyrillic'],
  variable: '--font-roboto-400',
});

const roboto_500 = Roboto({
  weight: '500',
  subsets: ['cyrillic'],
  variable: '--font-roboto-500',
});

const stratosSkyeng = localFont({
  src: '../../fonts/StratosSkyeng.woff2',
  variable: '--font-skyeng',
});

export const metadata: Metadata = {
  title: 'Sky-Fitness-Pro',
  description: 'Измени своё тело за полгода!',
};

export default function RootLayout({
  children,
  signin,
  signup,
  reset,
  new_password,
}: Readonly<{
  signin: React.ReactNode;
  children: React.ReactNode;
  signup: React.ReactNode;
  reset: React.ReactNode;
  new_password: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto_400.variable} ${roboto_500.variable} ${stratosSkyeng.variable}`}
      >
        <Header />
        <Wrapper>
          <div id="modal-root" className="flex justify-center " />
          {children}
          {signin}
          {signup}
          {reset}
          {new_password}
        </Wrapper>
      </body>
    </html>
  );
}
