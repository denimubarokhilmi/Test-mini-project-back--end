Cara Menjalankan (lokal)

Clone repo dan masuk ke folder.

npm install

Salin .env.example ke .env dan sesuaikan.

Jalankan server: node server.js

Jalankan test: masuk ke folder test, lalu jalankan node --env-file=.env --test <'nama file' >

Desain Penting

JWT: akses token 2 jam, refresh token optional (lihat di bawah).

Rate Limiter: login max 5 kali/5 menit per IP, status 429 jika terlampaui.

Admin Role: field role di user schema, hanya admin dapat akses /api/admin/listing-user.

Refresh Token + Revoke

Refresh token disimpan di DB per user.
