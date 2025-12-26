import BASE_URL from "../../../../shared/const/base_url"

export const validatePassword = async (
    password: string,
    onSuccess: () => void,
    onError: (e: string) => void
) => {
    fetch(`${BASE_URL}api/auth/check?admin_pw=${password}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => res.status)
        .then(status => {
            switch (status) {
                case 200:
                    onSuccess()
                    break;
                case 401:
                    onError("Неправильный пароль")
                    break;
                case 502:
                    onError("Ошибка сервера 502")
                    break;
            }
        })
}
