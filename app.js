document.addEventListener('DOMContentLoaded', getProducts);

function getProducts() {
    fetch('https://al-quran-8d642.firebaseio.com/data.json?print=pretty')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Respons jaringan tidak baik: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data yang diterima dari REST API:', data);

            const namesArray = Array.isArray(data) ? data : [];

            if (namesArray.length === 0) {
                console.log('Tidak ada nama yang ditemukan.');
                return;
            }

            displayNames(namesArray);
        })
        .catch(error => console.error('Kesalahan mengambil atau memparsing data:', error));
}

function displayNames(names) {
    const nameList = document.getElementById('nameList');
    nameList.innerHTML = '';

    console.log('Menampilkan nama:', names);

    if (!Array.isArray(names)) {
        console.error('Data yang diterima bukan merupakan array');
        return;
    }

    if (names.length === 0) {
        console.log('Tidak ada nama yang ditemukan.');
        return;
    }

    names.forEach(nama => {
        console.log('Detail nama:', nama);
        const namaCard = document.createElement('div');
        namaCard.classList.add('nama');

        const title = document.createElement('h3');
        title.textContent = `Asma: ${nama.asma}`;

        const ayat = document.createElement('p');
        ayat.textContent = `Ayat: ${nama.ayat}`;

        const latin = document.createElement('p');
        latin.textContent = `Latin: ${nama.latin}`;

        const arti = document.createElement('p');
        arti.textContent = `Arti: ${nama.arti}`;

        const audio = document.createElement('audio');
        audio.src = nama.audio;
        audio.controls = true;

        const keterangan = document.createElement('p');
        keterangan.textContent = `Keterangan: ${nama.keterangan}`;

        namaCard.appendChild(title);
        namaCard.appendChild(ayat);
        namaCard.appendChild(latin);
        namaCard.appendChild(arti);
        namaCard.appendChild(audio);
        namaCard.appendChild(keterangan);

        nameList.appendChild(namaCard);
    });
}

function searchNames() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase();

    fetch('https://al-quran-8d642.firebaseio.com/data.json?print=pretty')
        .then(response => response.json())
        .then(data => {
            const namesArray = Array.isArray(data) ? data : [];

            const filteredNames = namesArray.filter(nama => {
                return nama.asma.toLowerCase().includes(searchTerm);
            });

            displayNames(filteredNames);
        })
        .catch(error => console.error('Error fetching data:', error));
}
