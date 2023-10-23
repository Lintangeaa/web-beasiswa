import Link from 'next/link';

const MenuBeasiswa = () => {
  return (
    <section className="w-full max-w-xl p-4 mt-5 rounded shadow-lg">
      <div className="flex flex-col items-center w-full p-2 border-2 rounded border-three">
        <Link href="/daftar/akademik">
          <p className="font-semibold uppercase">Beasiswa Akademik</p>
        </Link>
        <p>
          Beasiswa untuk Kemampuan Akademik yang Baik, telah hadir untuk
          mewujudkan impianmu!
        </p>
        <p className="mt-5">Syarat dan Ketentuan:</p>
        <p>Transkrip Nilai atau Bukti Prestasi Akademik</p>
      </div>
      <div className="flex flex-col items-center w-full p-2 mt-5 border-2 rounded border-three">
        <Link href="/daftar/non-akademik">
          <p className="font-semibold uppercase">Beasiswa Non-Akademik</p>
        </Link>
        <p>
          Memberikan kesempatan kepada mahasiswa yang aktif terlibat dalam
          kegiatan sosial dan memberikan kontribusi nyata bagi masyarakat.
        </p>
        <p className="mt-5">Syarat dan Ketentuan:</p>
        <p>Bukti Prestasi Non-akademik</p>
      </div>
    </section>
  );
};

export default MenuBeasiswa;
