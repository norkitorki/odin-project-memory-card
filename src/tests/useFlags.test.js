import { test, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import useFlags from '../hooks/useFlags';
import countryData from '../assets/static/countryData';

test('returns initial empty array', () => {
  const { result } = renderHook(() => useFlags());

  expect(result.current).toEqual([]);
});

test('returns populated array after loading image data', async () => {
  const { result } = renderHook(() => useFlags());

  await waitFor(() => {
    const flags = result.current;
    expect(flags).toMatchObject(
      countryData.map((obj) => ({
        ...obj,
        image: { src: expect.any(String), alt: `${obj.text} flag` },
      }))
    );
  });
});
