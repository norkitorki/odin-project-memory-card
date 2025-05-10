import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MemoryGame from '../components/MemoryGame';

const images = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => ({
  id: i,
  text: `image-${i}`,
  image: { src: 'image.png', alt: `image-${i}-alt` },
}));

describe('MemoryGame', () => {
  it('displays message when images are loading/empty', () => {
    const { unmount } = render(<MemoryGame images={[]} />);

    expect(screen.getByText('Cards are loading...')).toBeInTheDocument();
    unmount();
    render(<MemoryGame images={images} />);
    expect(screen.queryByText('Cards are loading...')).not.toBeInTheDocument();
  });

  it('renders a maximum number of 9 cards', () => {
    render(<MemoryGame images={images} />);

    expect(screen.getAllByTitle(/image-\d+/i)).toHaveLength(9);
  });

  it('shuffles cards after initial render', () => {
    render(<MemoryGame images={images} />);

    const cards = screen.getAllByTitle(/image-\d+/i);
    expect(cards.map((card) => card.title)).not.toEqual(
      images.map((image) => image.text)
    );
  });

  it('shuffles cards after rerender', async () => {
    const user = userEvent.setup();
    render(<MemoryGame images={images} />);

    const initialCards = screen.getAllByTitle(/image-\d+/i);
    await user.click(initialCards[0]);
    const subsequentCards = screen.getAllByTitle(/image-\d+/i);

    expect(initialCards).not.toEqual(subsequentCards);
  });

  it('increases score when clicking previously unselected card', async () => {
    const user = userEvent.setup();
    render(<MemoryGame images={images} />);

    expect(
      screen.getByRole('row', { name: /current score 0/i })
    ).toBeInTheDocument();

    const firstCard = screen.getAllByTitle(/image-\d+/)[0];
    await user.click(firstCard);
    const cards = screen.getAllByTitle(/image-\d+/);
    let secondCard = cards[0];

    if (firstCard.title === secondCard.title) secondCard = cards[1];
    await user.click(secondCard);

    expect(
      screen.getByRole('row', { name: /current score 2/i })
    ).toBeInTheDocument();
  });

  it('resets score when clicking previously selected card', async () => {
    const user = userEvent.setup();
    const imagesSelection = images.slice(0, 8);
    render(<MemoryGame images={imagesSelection} />);

    const card = screen.getByTitle(imagesSelection[0].text);
    await user.click(card);

    expect(
      screen.getByRole('row', { name: /current score 1/i })
    ).toBeInTheDocument();

    await user.click(screen.getByTitle(card.title));

    expect(
      screen.getByRole('row', { name: /current score 0/i })
    ).toBeInTheDocument();
  });

  it('increases maxScore when score is bigger than maxScore', async () => {
    const user = userEvent.setup();
    const imagesSelection = images.slice(0, 8);
    render(<MemoryGame images={imagesSelection} />);

    expect(
      screen.getByRole('row', { name: /max score 0/i })
    ).toBeInTheDocument();

    const firstCard = screen.getByTitle(imagesSelection[0].text);
    const secondCard = screen.getByTitle(imagesSelection[1].text);
    const thirdCard = screen.getByTitle(imagesSelection[2].text);

    await user.click(firstCard);
    expect(
      screen.getByRole('row', { name: /max score 1/i })
    ).toBeInTheDocument();
    await user.click(secondCard);
    expect(
      screen.getByRole('row', { name: /max score 2/i })
    ).toBeInTheDocument();
    await user.click(thirdCard);
    expect(
      screen.getByRole('row', { name: /max score 3/i })
    ).toBeInTheDocument();
  });

  it('does not reset maxScore when clicking previously selected card', async () => {
    const user = userEvent.setup();
    const imagesSelection = images.slice(0, 8);
    render(<MemoryGame images={imagesSelection} />);

    const firstCard = screen.getByTitle(imagesSelection[0].text);
    const secondCard = screen.getByTitle(imagesSelection[1].text);

    await user.click(firstCard);
    await user.click(secondCard);
    await user.click(firstCard);

    expect(
      screen.getByRole('row', { name: /current score 0/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('row', { name: /max score 2/i })
    ).toBeInTheDocument();
  });

  describe('when the game is won', () => {
    const currentAlert = window.alert;

    beforeEach(() => (window.alert = vi.fn()));
    afterEach(() => (window.alert = currentAlert));

    it('alerts the user', async () => {
      const user = userEvent.setup();
      const imagesSelection = images.slice(0, 2);
      render(<MemoryGame images={imagesSelection} />);

      const firstCard = screen.getByTitle(imagesSelection[0].text);
      const secondCard = screen.getByTitle(imagesSelection[1].text);

      await user.click(firstCard);
      await user.click(secondCard);

      expect(window.alert).toHaveBeenCalledWith(
        'Congratulations! You have won the game.'
      );
    });

    it('resets currentScore and maxScore', async () => {
      const user = userEvent.setup();
      const imagesSelection = images.slice(0, 2);
      render(<MemoryGame images={imagesSelection} />);

      const firstCard = screen.getByTitle(imagesSelection[0].text);
      const secondCard = screen.getByTitle(imagesSelection[1].text);

      await user.click(firstCard);
      expect(
        screen.getByRole('row', { name: /current score 1/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('row', { name: /max score 1/i })
      ).toBeInTheDocument();
      await user.click(secondCard);

      expect(
        screen.getByRole('row', { name: /current score 0/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('row', { name: /max score 0/i })
      ).toBeInTheDocument();
    });
  });
});
