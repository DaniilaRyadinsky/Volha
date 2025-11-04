import BASE_URL from "../../../../shared/const/base_url";

export const uploadFile = (
    file: File,
    onSuccess: (e: any) => void,
    onError: (e: string) => void
) => {
    const formData = new FormData();
    formData.append('img', file);

    fetch(`${BASE_URL}api/files/upload`, {
        method: 'POST',
        body: formData,
    })
        .then(res => {
            if (!res.ok) {
                throw new Error("upload failed: " + res.status);
            }
            return res.json();
        })
        .then(data => {
            if (!data.name) onError('no "path" in response');
            onSuccess(data);
        })
        .catch(error => {
            onError(error.message)
        })


}