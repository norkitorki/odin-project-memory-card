import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Card from '../components/Card';

const image = {
  src: 'https://giiiify.com/3dfgg34532edfgeer2.png',
  alt: 'Idyllic mountain range',
};

describe('Card', () => {
  it('renders card', () => {
    render(<Card image={image} text="Alps" />);

    const card = screen.getByRole('button', { name: /alps/i });
    expect(card).toBeInTheDocument();
    expect(card.title).toEqual('Alps');
  });

  it('renders card image', () => {
    render(<Card image={image} text="Alps" />);

    const card = screen.getByRole('button', { name: /alps/i });
    const img = within(card).getByRole('img', {
      name: /idyllic mountain range/i,
    });

    expect(img.src).toEqual(image.src);
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<Card image={image} text="Alps" onClick={onClick} />);

    await user.click(screen.getByRole('button', { name: /alps/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
