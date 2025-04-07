export function cleanParams<T extends Record<string, any>>(
  params: T
): Partial<T> {
  const cleanedEntries = Object.entries(params).filter(
    ([_, value]) => value !== null && value !== undefined
  );

  return cleanedEntries.reduce((acc, [key, value]) => {
    acc[key as keyof T] = value;
    return acc;
  }, {} as Partial<T>);
}
