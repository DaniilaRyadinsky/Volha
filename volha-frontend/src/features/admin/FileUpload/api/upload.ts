import BASE_URL from "../../../../shared/const/base_url";

type fileResponse = {
    mime: string,
    name: string
}

export const uploadFile = (
    file: File,
    onSuccess: (e: fileResponse) => void,
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
            console.log(error.message);
            onError(error.message)
        })


}