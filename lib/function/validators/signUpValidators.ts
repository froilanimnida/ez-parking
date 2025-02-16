export const emailValidator = (email: string): string => {
    if (!email) {
        throw new Error("Email is required");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("Invalid email");
    }
    return email;
};

export const lengthValidator = (value: string, min: number, max: number): string => {
    if (value.length < min) {
        throw new Error(`Field must be at least ${min} characters long`);
    }
    if (value.length > max) {
        throw new Error(`Field must be at most ${max} characters long`);
    }
    return value;
};
