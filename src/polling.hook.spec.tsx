
import { renderHook, waitFor } from '@testing-library/react';
import { usePolling } from './polling.hook';

describe('usePolling specs', () => {
  it('The initial count is 0', () => {
    // Arrange
    const time: number = 500;

    // Act
    const { result } = renderHook(() => usePolling(time));

    // Assert
    expect(result.current.count).toEqual(0);
  });

  it('The count increments', async () => {
    // Arrange
    const time: number = 500;

    // Act
    const { result } = renderHook(() => usePolling(time));


    // Assert
    await waitFor(() => expect(result.current.count).toEqual(1));
  });
});
