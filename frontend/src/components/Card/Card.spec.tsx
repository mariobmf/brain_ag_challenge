import { render, screen, within } from '@testing-library/react';
import { Card } from '@/components/Card';

describe('<Card />', () => {
  it('should render default correctly', () => {
    render(
      <Card>
        <div>Card</div>
      </Card>,
    );
    const card = screen.getByRole('contentinfo');
    expect(card).toBeVisible();
    expect(within(card).getByText(/card/i)).toBeVisible();
  });
});
