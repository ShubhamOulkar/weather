import { describe, it, expect, afterEach, vi, type Mock, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useAQI } from './useAQI';
import { createQueryWrapper, testQueryClient } from '../../test-utils';
import type { ReactNode, JSX } from 'react';
import type { Cooradinates } from '../../types/types';

const coords: Cooradinates = { latitude: 16, longitude: 74 }
