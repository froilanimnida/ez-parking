export function buildFormData(
    body: unknown,
    parentKey?: string,
    formData: FormData = new FormData()
): FormData {
    if (body === null || body === undefined) return formData;

    if (body instanceof File) {
        formData.append(parentKey!, body);
    } else if (Array.isArray(body)) {
        body.forEach((item, index) => {
            buildFormData(item, `${parentKey}[${index}]`, formData);
        });
    } else if (typeof body === 'object' && !(body instanceof File)) {
        Object.entries(body).forEach(([key, value]) => {
            const newKey = parentKey ? `${parentKey}[${key}]` : key;
            buildFormData(value, newKey, formData);
        });
    } else {
        formData.append(parentKey!, body.toString());
    }

    return formData;
}
