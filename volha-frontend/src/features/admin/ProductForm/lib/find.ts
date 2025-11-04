const findById = <T extends { id: string | number }>(
    arr: T[],
    id?: string | number
): T | undefined => (id == null ? undefined : arr.find(x => String(x.id) === String(id)));

// сразу получить label по id
export const getLabel = <T extends { id: string | number; name: string }>(
    arr: T[],
    id?: string | number
): string | undefined => findById(arr, id)?.name;

export const getLabelTitle = <T extends { id: string | number; title: string }>(
    arr: T[],
    id?: string | number
): string | undefined => findById(arr, id)?.title;
