export function omitProperties<T extends {}, K extends keyof T>(
    value: T,
    properties: K[]
): Omit<T, K> {
    return Object.keys(value).reduce(
        (acc, key) => {
            if (!properties.includes(key as K)) {
                acc = Object.assign(acc, { [key]: value[key as keyof T] });
            }
            return acc;
        },
        {} as Omit<T, K>
    );
}
