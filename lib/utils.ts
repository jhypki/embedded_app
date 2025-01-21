import { ActivationData } from '@/types/ActivationData';

export const getCountsForPeriod = (
    activations: ActivationData[],
    period: 'day' | 'week' | 'month'
): { labels: string[]; counts: number[] } => {
    const now = new Date();

    // --- DAY: last 24 hours by hour (0..23) ---
    if (period === 'day') {
        // Build an array of hour labels [ '0', '1', '2', ... '23' ]
        const hours = Array.from({ length: 24 }, (_, i) => i);
        const counts = hours.map((hour) => {
            return activations.filter((activation) => {
                const activatedAt = new Date(activation.activatedAt);
                // Check if it's the same day and the same hour
                return (
                    activatedAt.getDate() === now.getDate() &&
                    activatedAt.getMonth() === now.getMonth() &&
                    activatedAt.getFullYear() === now.getFullYear() &&
                    activatedAt.getHours() === hour
                );
            }).length;
        });

        // Convert hour array into more friendly labels if you want (e.g., '0h', '1h')
        const labels = hours.map((hour) => hour.toString());

        return { labels, counts };
    }

    // --- WEEK: last 7 days by date ---
    if (period === 'week') {
        // Build an array of the last 7 dates (including today)
        const lastSevenDays = Array.from({ length: 7 }, (_, i) => {
            const d = new Date();
            d.setDate(now.getDate() - i);
            return d;
        }).reverse(); // reverse so oldest is first

        const labels = lastSevenDays.map((date) => {
            // E.g. 'MM-DD'
            return `${date.getMonth() + 1}-${date.getDate()}`;
        });

        const counts = lastSevenDays.map((date) => {
            const year = date.getFullYear();
            const month = date.getMonth();
            const day = date.getDate();

            return activations.filter((activation) => {
                const activatedDate = new Date(activation.activatedAt);
                return (
                    activatedDate.getFullYear() === year &&
                    activatedDate.getMonth() === month &&
                    activatedDate.getDate() === day
                );
            }).length;
        });

        return { labels, counts };
    }

    // --- MONTH: last 30 days by date ---
    if (period === 'month') {
        const lastThirtyDays = Array.from({ length: 30 }, (_, i) => {
            const d = new Date();
            d.setDate(now.getDate() - i);
            return d;
        }).reverse();

        const labels = lastThirtyDays.map((date) => {
            // E.g. 'MM-DD'
            return `${date.getMonth() + 1}-${date.getDate()}`;
        });

        const counts = lastThirtyDays.map((date) => {
            const year = date.getFullYear();
            const month = date.getMonth();
            const day = date.getDate();

            return activations.filter((activation) => {
                const activatedDate = new Date(activation.activatedAt);
                return (
                    activatedDate.getFullYear() === year &&
                    activatedDate.getMonth() === month &&
                    activatedDate.getDate() === day
                );
            }).length;
        });

        return { labels, counts };
    }

    // Fallback
    return { labels: [], counts: [] };
};
