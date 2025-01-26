export default function validateQrCode(value: string): boolean {
    const BASE64_PATTERN = /^[A-Za-z0-9_-]+={0,2}$/;
    const MIN = 124
    const MAX = 132
    return BASE64_PATTERN.test(value) && value.length >= MIN && value.length <= MAX
}
