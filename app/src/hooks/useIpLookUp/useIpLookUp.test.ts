import { describe, it, expect, afterEach, vi, type Mock, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useIpLookUp } from './useIpLookUp';
import { createQueryWrapper, testQueryClient } from '../../test-utils';
import type { IpData } from '../../types/types';
import type { ReactNode, JSX } from 'react';

const mockSuccessData: IpData = {
    success: true,
    data: {
        capital: 'New Delhi',
        country: 'India',
        countryCode: 'IN',
        flag: {
            flag_Icon: '🇮🇳',
        },
    },
};

const mockApiErrorData = {
    success: false,
    message: 'API lookup failed.',
};

describe('useIpLookUp', () => {
    let fetchMock: Mock;
    let wrapper: ({ children }: { children: ReactNode }) => JSX.Element;

    beforeEach(() => {
        fetchMock = vi.spyOn(global, 'fetch') as Mock;
        wrapper = createQueryWrapper();
    })

    afterEach(() => {
        vi.restoreAllMocks();
        fetchMock.mockClear();
        testQueryClient.clear();
    });

    it('should return loading, then successfully fetch and transform IP data', async () => {
        fetchMock.mockResolvedValueOnce({
            ok: true,
            json: async () => mockSuccessData,
        } as Response);

        const { result } = renderHook(() => useIpLookUp(), { wrapper });

        expect(result.current.isLoading).toBe(true);

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        expect(result.current.isSuccess).toBe(true);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.data).toEqual({
            capital: 'New Delhi',
            country: 'India',
            country_code: 'IN',
            country_icon: '🇮🇳',
        });
    });

    it('should return an API error if the response body indicates failure', async () => {
        fetchMock.mockResolvedValueOnce({
            ok: true,
            json: async () => mockApiErrorData,
        } as Response);

        const { result } = renderHook(() => useIpLookUp(), { wrapper });

        await waitFor(() => expect(result.current.isError).toBe(true));

        expect(result.current.isSuccess).toBe(false);
        expect(result.current.error).toBeInstanceOf(Error);
        expect((result.current.error as Error).message).toContain('API Error: IP Lookup failed.');
    });

    it('should return an HTTP error if the network request fails', async () => {
        fetchMock.mockResolvedValueOnce({
            ok: false,
            status: 404,
            statusText: 'Not Found',
        } as Response);

        const { result } = renderHook(() => useIpLookUp(), { wrapper });

        await waitFor(() => expect(result.current.isError).toBe(true));

        expect(result.current.isSuccess).toBe(false);
        expect(result.current.error).toBeInstanceOf(Error);
        expect((result.current.error as Error).message).toContain('HTTP Error: Failed to fetch IP data. Status: 404 Not Found');
    });

    it('should handle network failure gracefully', async () => {
        // test catch branch
        fetchMock.mockRejectedValueOnce(new Error('Network Error'));

        const { result } = renderHook(() => useIpLookUp(), {
            wrapper: createQueryWrapper(),
        });

        await waitFor(() => expect(result.current.isError).toBe(true));

        expect(result.current.isSuccess).toBe(false);
        expect(result.current.error).toBeInstanceOf(Error);
        expect((result.current.error as Error).message).toContain('Network Error');
    });
});