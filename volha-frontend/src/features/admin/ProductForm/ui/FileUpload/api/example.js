
const API_BASE = 'http://localhost:8080'; // бэкенд с Echo
const STORAGE_KEY = 'uploaded_images';

const input = document.getElementById('fileInput');
const gallery = document.getElementById('gallery');
const statusEl = document.getElementById('status');

// --- storage helpers ---
const loadStoredImages = () => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
    catch { return []; }
};
const saveStoredImages = (paths) => localStorage.setItem(STORAGE_KEY, JSON.stringify(paths));

// Нормализуем путь вида "./images/..." или "images/..." в "/images/..."
const toApiPath = (p) => {
    if (!p) return '';
    const noDot = p.replace(/^\.\//, '');     // "./images/..." -> "images/..."
    const withSlash = noDot.startsWith('/') ? noDot : '/' + noDot; // "images/..." -> "/images/..."
    return withSlash;
};

let images = loadStoredImages();

// --- rendering ---
const renderImages = (paths) => {
    gallery.innerHTML = '';
    paths.forEach((path, idx) => {
        const apiPath = toApiPath(path);
        const card = document.createElement('div');
        card.className = 'card';

        const img = document.createElement('img');
        img.src = API_BASE + apiPath;
        img.alt = 'uploaded image';

        const btn = document.createElement('button');
        btn.className = 'remove-btn';
        btn.title = 'Удалить';
        btn.textContent = '×';
        btn.addEventListener('click', () => onDelete(path, idx));

        const cap = document.createElement('div');
        cap.className = 'cap';
        cap.textContent = apiPath; // подпись с путём

        card.appendChild(img);
        card.appendChild(btn);
        card.appendChild(cap);
        gallery.appendChild(card);
    });
};

const setStatus = (msg) => { statusEl.textContent = msg || ''; };
renderImages(images);

// --- upload ---
input.addEventListener('change', async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('img', file);

    setStatus('Загрузка...');
    try {
        const res = await fetch(API_BASE + '/api/files/upload', { method: 'POST', body: formData, });
        if (!res.ok) throw new Error('upload failed: ' + res.status);
        const data = await res.json();
        if (!data.path) throw new Error('no "path" in response');
        images.push(data.path);
        saveStoredImages(images);
        renderImages(images);
        setStatus('Файл загружен!');
    } catch (err) {
        console.error(err);
        setStatus('Ошибка загрузки');
    } finally {
        input.value = '';
        setTimeout(() => setStatus(''), 2500);
    }
});

// --- delete ---
async function onDelete(path, index) {
    const filename = path.split('/').pop(); // из "./images/uuid.jpg" -> "uuid.jpg"
    if (!filename) return;

    const url = API_BASE + '/api/files/delete?title=' + filename;

    // оптимистично ставим статус
    setStatus('Удаляем...');
    try {
        const res = await fetch(url, { method: 'DELETE' });
        if (!res.ok) {
            // если файл уже отсутствует — всё равно уберём из localStorage
            if (res.status !== 404) throw new Error('delete failed: ' + res.status);
        }
        // локально удаляем
        images.splice(index, 1);
        saveStoredImages(images);
        renderImages(images);
        setStatus('Удалено');
    } catch (err) {
        console.error(err);
        setStatus('Ошибка удаления');
    } finally {
        setTimeout(() => setStatus(''), 2000);
    }
}