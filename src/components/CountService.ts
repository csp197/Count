import { syllable } from "syllable";

export function countChars(str: string) {
    return str.length;
}

export function countLines(str: string) {
    if (str.length === 0) {
        return 0;
    }
    return str.split("\n").length;
}

export function countPages(str: string) {
    const numWords = countWords(str);
    return Math.ceil(numWords / 500);
}

export function countSentences(str: string) {
    if (str.length === 0) {
        return 0;
    }
    // Split by common sentence terminators and filter out empty sentences
    const sentences = str.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
    return sentences.length;
}

export function countSyllables(str: string) {
    if (str.length === 0) {
        return 0;
    }
    try {
        return syllable(str);
    } catch (error) {
        console.error("Error counting syllables:", error);
        return 0;
    }
}

export function countWords(str: string) {
    if (str.length === 0) {
        return 0;
    }
    // Split by whitespace and filter out empty strings
    return str.trim().split(/\s+/).filter(word => word.length > 0).length;
}

/**
 * Calculate Flesch Reading Ease score
 * 206.835 - 1.015 × (words / sentences) - 84.6 × (syllables / words)
 * 
 * Score interpretation:
 * 90-100: Very easy to read. 5th grade level.
 * 80-89: Easy to read. 6th grade level.
 * 70-79: Fairly easy to read. 7th grade level.
 * 60-69: Standard. 8th-9th grade level.
 * 50-59: Fairly difficult. 10th-12th grade level.
 * 30-49: Difficult. College level.
 * 0-29: Very confusing.
 */
export function calculateFleschReadingEase(text: string): number {
    const wordCount = countWords(text);
    const sentenceCount = countSentences(text);
    const syllableCount = countSyllables(text);
    
    if (wordCount === 0 || sentenceCount === 0) {
        return 0;
    }
    
    const wordsPerSentence = wordCount / sentenceCount;
    const syllablesPerWord = syllableCount / wordCount;
    
    const score = 206.835 - (1.015 * wordsPerSentence) - (84.6 * syllablesPerWord);
    
    // Clamp score between 0 and 100
    return Math.min(Math.max(score, 0), 100);
}

/**
 * Calculate Flesch-Kincaid Grade Level
 * 0.39 × (words / sentences) + 11.8 × (syllables / words) - 15.59
 * 
 * Result corresponds to US grade level (e.g., 8.0 means 8th grade)
 * Capped at K-12 range
 */
export function calculateFleschKincaidGradeLevel(text: string): number {
    const wordCount = countWords(text);
    const sentenceCount = countSentences(text);
    const syllableCount = countSyllables(text);
    
    if (wordCount === 0 || sentenceCount === 0) {
        return 0;
    }
    
    const wordsPerSentence = wordCount / sentenceCount;
    const syllablesPerWord = syllableCount / wordCount;
    
    const score = (0.39 * wordsPerSentence) + (11.8 * syllablesPerWord) - 15.59;
    
    // Ensure score is not negative and cap at grade 12
    return Math.min(Math.max(score, 0), 12);
}

/**
 * Format grade level as K-12 string
 */
export function formatGradeLevel(gradeLevel: number): string {
    if (gradeLevel < 1) {
        return "K";
    } else if (gradeLevel >= 1 && gradeLevel <= 12) {
        // Round to nearest 0.5
        const rounded = Math.round(gradeLevel * 2) / 2;
        return rounded.toString();
    } else {
        return "12";
    }
}

/**
 * Get a text description of the reading level based on Flesch Reading Ease score
 */
export function getReadabilityDescription(score: number): string {
    if (score >= 90) return "Very easy to read (K-1st grade)";
    if (score >= 80) return "Easy to read (2nd-3rd grade)";
    if (score >= 70) return "Fairly easy to read (4th-5th grade)";
    if (score >= 60) return "Standard (6th-7th grade)";
    if (score >= 50) return "Fairly difficult (8th-9th grade)";
    if (score >= 30) return "Difficult (10th-12th grade)";
    return "Very challenging (12th grade)";
}

/**
 * Count complex words (words with 3 or more syllables)
 */
export function countComplexWords(text: string): number {
    if (text.length === 0) {
        return 0;
    }
    
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    
    return words.filter(word => {
        // Skip proper nouns that start with capital letter
        if (/^[A-Z]/.test(word) && !/^[A-Z]+$/.test(word)) {
            return false;
        }
        
        // Count syllables and check if it's complex (3+ syllables)
        try {
            return syllable(word) >= 3;
        } catch (error) {
            console.error("Error counting syllables in word:", word, error);
            return false;
        }
    }).length;
}

/**
 * Calculate SMOG Index (Simple Measure of Gobbledygook)
 * SMOG = 1.043 * sqrt(number of polysyllables * (30 / number of sentences)) + 3.1291
 * 
 * Result corresponds to US grade level needed to understand the text
 */
export function calculateSMOGIndex(text: string): number {
    const sentenceCount = countSentences(text);
    
    if (sentenceCount === 0) {
        return 0;
    }
    
    // Count words with 3 or more syllables
    const polysyllableCount = countComplexWords(text);
    
    // Apply SMOG formula
    const smog = 1.043 * Math.sqrt(polysyllableCount * (30 / sentenceCount)) + 3.1291;
    
    // Ensure score is not negative and cap at grade 12
    return Math.min(Math.max(smog, 0), 12);
}

/**
 * Calculate Gunning Fog Index
 * 0.4 * ((words / sentences) + 100 * (complex words / words))
 * 
 * Result corresponds to US grade level needed to understand the text
 */
export function calculateGunningFogIndex(text: string): number {
    const wordCount = countWords(text);
    const sentenceCount = countSentences(text);
    const complexWordCount = countComplexWords(text);
    
    if (wordCount === 0 || sentenceCount === 0) {
        return 0;
    }
    
    const averageSentenceLength = wordCount / sentenceCount;
    const percentComplexWords = complexWordCount / wordCount * 100;
    
    // Apply Gunning Fog formula
    const gunningFog = 0.4 * (averageSentenceLength + percentComplexWords);
    
    // Ensure score is not negative and cap at grade 12
    return Math.min(Math.max(gunningFog, 0), 12);
}

/**
 * Get a text description of the reading level based on grade level
 */
export function getGradeLevelDescription(gradeLevel: number): string {
    if (gradeLevel < 1) return "Kindergarten level";
    if (gradeLevel <= 2) return "Very easy (1st-2nd grade)";
    if (gradeLevel <= 4) return "Easy (3rd-4th grade)";
    if (gradeLevel <= 6) return "Conversational (5th-6th grade)";
    if (gradeLevel <= 8) return "Standard (7th-8th grade)";
    if (gradeLevel <= 10) return "Somewhat difficult (9th-10th grade)";
    if (gradeLevel <= 12) return "Difficult (11th-12th grade)";
    return "Very difficult (College level)";
}