'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type MenuItem = {
  label: string;
  href: string;
};

interface TopMenuProps {
  items: MenuItem[];
}

export function TopMenu({ items }: TopMenuProps) {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-center gap-7 p-7 sm:justify-end">
      {items.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          data-state={pathname === item.href ? 'active' : ''}
          className="pb-1 text-lg font-medium text-gray-900 hover:opacity-70 data-[state=active]:border-b-4 data-[state=active]:border-primary data-[state=active]:font-bold"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
