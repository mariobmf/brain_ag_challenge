import 'react-toastify/dist/ReactToastify.css';
import './globals.css';
import type { Metadata } from 'next';
import { roboto } from './fonts';
import { TopMenu } from '@/components/TopMenu';
import { ToastContainer } from 'react-toastify';
import { AppProvider } from '@/providers';
import classNames from 'classnames';

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
    <html
      lang="pt-BR"
      className={classNames('relative flex h-full w-full', roboto.className)}
    >
      <body className="relative flex h-full w-full flex-col bg-gradient-to-t from-slate-300 to-slate-100">
        <AppProvider>
          <ToastContainer />
          <TopMenu items={MENU_ITEMS} />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
