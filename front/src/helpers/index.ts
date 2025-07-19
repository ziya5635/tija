export function isValidToken(token: string | null): boolean {
    if (!token) return false;
    try {
        const parts = token.split('.');
        return parts.length === 3; // Proper JWT has 3 parts
    } catch {
        return false;
    }
};

export function typeOf(value: unknown) {
    return Object.prototype.toString.call(value).split(" ")[1].slice(0, -1);
}