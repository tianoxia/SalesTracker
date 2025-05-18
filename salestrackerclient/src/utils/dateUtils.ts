// src/utils/dateUtils.ts
export const formatDateForDisplay = (isoDate: string | null): string => {
    if (!isoDate) return '';

    try {
        const date = new Date(isoDate);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    } catch {
        return '';
    }
};

export const parseDateForApi = (displayDate: string): string | null => {
    if (!displayDate) return null;

    const [month, day, year] = displayDate.split('/');
    return `${year}-${month}-${day}`;
};