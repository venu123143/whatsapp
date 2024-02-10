export const formatDate = (inputDate: string) => {
    const today = new Date();
    const messageDate = new Date(inputDate);

    // Check if the date is today
    if (
        today.getFullYear() === messageDate.getFullYear() &&
        today.getMonth() === messageDate.getMonth() &&
        today.getDate() === messageDate.getDate()
    ) {
        return 'Today';
    }

    // Check if the date is this week
    const daysSinceMessage = Math.floor(
        (today.getTime() - messageDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysSinceMessage < 7) {
        return messageDate.toLocaleDateString('en-US', { weekday: 'long' });
    }
    return messageDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};
