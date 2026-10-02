document.getElementById('formDaftar').addEventListener('submit', async function(e) {
    e.preventDefault();
    // Ambil nilai input
    const nis = document.getElementById('nis').value.trim();
    const nama = document.getElementById('nama').value.trim();
    const divisi = document.getElementById('divisi').value;
    const email = document.getElementById('email').value.trim();
    const errNis = document.getElementById('errNis');
    const msgBox = document.getElementById('responseMessage');
    // Validasi Regex NIS: Wajib 8 Digit Angka
    const nisRegex = /^[0-9]{8}$/;
    if (!nisRegex.test(nis)) {
        errNis.classList.remove('hidden');
        return;
    } else {
        errNis.classList.add('hidden');
    }
    // Buat Payload JSON
    const payload = { nis, nama, divisi, email };
    try {
        const response = await fetch('api.php?action=daftar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const result = await response.json();
        msgBox.classList.remove('hidden');
        if (result.status === 'success') {
            msgBox.className = 'mt-4 p-3 rounded text-sm font-semibold text-center bg-green-100 text-green-700';
            msgBox.innerText = result.message;
            document.getElementById('formDaftar').reset();
        } else {
            msgBox.className = 'mt-4 p-3 rounded text-sm font-semibold text-center bg-red-100 text-red-700';
            msgBox.innerText = result.message;
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Gagal terhubung ke server backend API!');
    }
});