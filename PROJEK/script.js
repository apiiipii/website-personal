document.addEventListener('DOMContentLoaded', function() {
    const openInvitationBtn = document.getElementById('open-invitation');
    const heroSection = document.querySelector('.hero');
    const mainContent = document.getElementById('main-content');
    const rsvpForm = document.getElementById('rsvp-form');
    const rsvpMessageDiv = document.getElementById('rsvp-message');
    const countdownTimer = document.getElementById('countdown-timer');
    const backgroundMusic = document.getElementById('background-music');

    // --- 1. Fungsi untuk Membuka Undangan ---
    openInvitationBtn.addEventListener('click', function() {
        // Mulai transisi untuk menyembunyikan hero section
        heroSection.style.opacity = '0';
        heroSection.style.visibility = 'hidden';
        heroSection.style.pointerEvents = 'none'; // Nonaktifkan interaksi klik

        // Putar musik jika ada dan jika diizinkan browser
        // Penting: Autoplay sering diblokir oleh browser.
        // Pengguna mungkin perlu berinteraksi lebih lanjut agar musik bisa diputar.
        if (backgroundMusic) {
            backgroundMusic.play().catch(e => {
                console.warn("Autoplay musik dicegah oleh browser:", e);
                // Pesan ini hanya akan muncul di konsol browser.
            });
        }

        // Setelah transisi opacity selesai, sembunyikan sepenuhnya dari layout
        setTimeout(() => {
            heroSection.style.display = 'none'; // Sembunyikan sepenuhnya dari layout
            
            // Tampilkan konten utama dengan transisi
            mainContent.classList.remove('content-hidden'); // Hapus kelas tersembunyi
            mainContent.classList.add('content-visible');   // Tambahkan kelas terlihat

            // Gulir ke bagian atas konten utama setelah dibuka
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

        }, 1000); // Sesuaikan dengan durasi transisi opacity di CSS (1s)
    });

    // --- 2. Fungsi Hitungan Mundur ---
    // Tanggal pernikahan: YYYY-MM-DDTHH:MM:SS (misal: "2032-11-13T09:00:00")
    // Pastikan zona waktu sesuai jika perlu (misal: "2032-11-13T09:00:00+07:00" untuk WIB)
    const weddingDate = new Date('2032-11-13T09:00:00').getTime();

    const updateCountdown = setInterval(function() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            clearInterval(updateCountdown);
            countdownTimer.innerHTML = "Acara Sedang Berlangsung / Telah Selesai!";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownTimer.innerHTML = `${days} <small>hari</small> ${hours} <small>jam</small> ${minutes} <small>menit</small> ${seconds} <small>detik</small>`;
    }, 1000);

    // Panggil sekali saat dimuat untuk menghindari delay 1 detik pertama
    updateCountdown();

    // --- 3. Fungsi Pengiriman Formulir RSVP ---
    rsvpForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Mencegah form untuk refresh halaman

        const name = document.getElementById('name').value;
        const attendance = document.getElementById('attendance').value;
        const message = document.getElementById('message').value;

        // Validasi sederhana
        if (name.trim() === '' || attendance === '') {
            rsvpMessageDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Nama dan Kehadiran wajib diisi!';
            rsvpMessageDiv.style.color = 'red';
            return;
        }

        // --- Simulasi Pengiriman Data (Frontend Saja) ---
        // PENTING: Undangan ini murni frontend (HTML, CSS, JS di browser).
        // Data yang dikirim dari formulir tidak akan disimpan permanen ke database.
        // Untuk menyimpan data, Anda membutuhkan BACKEND (server-side language seperti PHP, Node.js, Python Flask)
        // dan DATABASE (seperti MySQL, PostgreSQL).
        // Bagian di bawah ini hanya menampilkan data ke konsol browser dan memberikan feedback visual.

        console.log('RSVP Data:', { name, attendance, message });

        rsvpMessageDiv.innerHTML = `<i class="fas fa-check-circle"></i> Terima kasih, <b>${name}</b>! Konfirmasi kehadiran Anda (${attendance === 'yes' ? 'Hadir' : 'Tidak Hadir'}) telah diterima.`;
        rsvpMessageDiv.style.color = 'var(--accent-color)'; // Menggunakan variabel CSS untuk konsistensi
        rsvpMessageDiv.style.fontWeight = 'bold';

        // Opsional: Reset form setelah pengiriman berhasil
        rsvpForm.reset();

        // Contoh bagaimana Anda akan mengirim data ke backend (dikomentari):
        /*
        fetch('https://api.yourwebsite.com/rsvp', { // Ganti dengan URL API backend Anda
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, attendance, message }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            rsvpMessageDiv.innerHTML = '<i class="fas fa-check-circle"></i> Terima kasih, konfirmasi kehadiran Anda berhasil dikirim!';
            rsvpMessageDiv.style.color = 'green';
            rsvpForm.reset();
        })
        .catch((error) => {
            console.error('Error:', error);
            rsvpMessageDiv.innerHTML = '<i class="fas fa-times-circle"></i> Terjadi kesalahan saat mengirim konfirmasi. Silakan coba lagi.';
            rsvpMessageDiv.style.color = 'red';
        });
        */
    });
});