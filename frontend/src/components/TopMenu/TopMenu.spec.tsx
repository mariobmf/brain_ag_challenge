import { render, screen, within } from '@testing-library/react';
import { TopMenu } from '@/components/TopMenu';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn().mockReturnValue('/users'),
}));

describe('<TopMenu />', () => {
  const mockMenuItens = [
    {
      label: 'Usuários',
      href: '/users',
    },
    {
      label: 'Cadastro',
      href: '/register',
    },
  ];

  it('should render default correctly', async () => {
    render(<TopMenu items={mockMenuItens} />);
    const topMenu = screen.getByRole('navigation');
    expect(topMenu).toBeVisible();
    const links = await within(topMenu).findAllByRole('link');
    expect(links).toHaveLength(mockMenuItens.length);
  });
});
