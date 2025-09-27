Cara Menjalankan (lokal)

Clone repo dan masuk ke folder.

npm install

untuk env file sesuaikan dengan koneksi masing" dan jwt secretnya

Jalankan server: node --env-file=.env --watch server.js

Jalankan test: masuk ke folder test, lalu jalankan node --env-file=.env --test <'nama file' > bisa juga dilakukan melaui postman atau extensi http dari vs code jikalau sudah menjalankan servernya (node --env-file=.env --watch server.js), dan untuk contoh sudah saya sediakan di file .http

Desain Penting:


file env : pada saat ingin menjalankan unit test dan masuk ke folder test itu , perhatikan tata letak env filenya jikalau file env nya diluar folder test maka jalankan (node --env-file=../.env --test <'nama file' > ), tapi jika berada di dalam folder test cukup jalankan (node --env-file=.env --test <'nama file' > )

JWT: akses token 2 jam, refresh token optional (lihat di bawah).

Rate Limiter: login max 5 kali/5 menit per IP, status 429 jika terlampaui.

Admin Role: field role di user schema, hanya admin dapat akses /api/admin/listing-user.

token disimpan di DB per user.


alur user :
register jika belum melakukan login,
setelah register , silahkan login dengan menggunakan email dan password kemudian nanti diberikan token JWT,
untuk mendapatkan user sendiri ambil token dari respon setelah login lalu auhtorizasi di header

alur admin :
sudah ada di test/admin.test.js
