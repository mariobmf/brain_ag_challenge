import 'react-toastify/dist/ReactToastify.css';
import './globals.css';
import type { Metadata } from 'next';
import { roboto } from './fonts';
import { TopMenu } from '@/components/TopMenu';
import { ToastContainer } from 'react-toastify';

export const metadata: Metadata = {
  title: 'Brain Agriculture',
  description: 'Brain Agriculture',
};

const MENU_ITEMS = [
  {
    label: 'Resumo',
    href: '/summary',
  },
  {
    label: 'Cadastro',
    href: '/register',
  },
  {
    label: 'Produtores Rurais',
    href: '/producers',
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={roboto.className}>
      <body className="relative flex h-full w-full flex-col bg-gradient-to-t from-slate-300 to-slate-100">
        <ToastContainer />
        <TopMenu items={MENU_ITEMS} />
        {children}
      </body>
    </html>
  );
}
