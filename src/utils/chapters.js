export const extractChapters = (description) => {
    if (!description) return [];
    
    // Regex to match timestamps like "00:00 - Intro", "01:23 - Gameplay", "1:23:45 - Conclusion"
    // It captures the timestamp in group 1 and the title in group 2
    const regex = /(?:^|\n)((?:\d{1,2}:)?\d{1,2}:\d{2})\s*[-:]\s*(.+)/g;
    let match;
    const chapters = [];

    while ((match = regex.exec(description)) !== null) {
        chapters.push({
            timestamp: match[1],
            title: match[2].trim()
        });
    }

    return chapters;
};
