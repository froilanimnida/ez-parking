export default function validateFile(
    file: File | null,
    allowedTypes: string[],
    maxFileSize: number
): boolean {
    if (!file) return false;

    if (file.size > maxFileSize) {
        return false;
    }

    // Check file type
    if (!allowedTypes.includes(file.type)) {
        return false;
    }

    return true;
}
