import { api } from '@common/api';
import type { Session } from '../types/sessions.types';

export const getSessions = () => api.get('sessions').json<Session[]>();
export const deleteSession = (id: string) => api.delete(`sessions/${id}`);
export const deleteAllSessions = () => api.delete('sessions');
