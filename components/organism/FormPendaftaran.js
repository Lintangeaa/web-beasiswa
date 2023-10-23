import React, { useState } from 'react';
import axios from 'axios';
import Form from '../molekul/Form';
import InputWithTitle from '../atom/InputWithTitle';
import SelectInput from '../atom/SelectInput';
import swal from 'sweetalert';
import dataStore from '@/store/dataStore';

const FormPendaftaran = () => {
  const [nim, setNim] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [semester, setSemester] = useState('1');
  const [ipk, setIpk] = useState(0);
  const [beasiswa, setBeasiswa] = useState('Akademik');
  const [berkas, setBerkas] = useState(null);
  const [statusAjuan, setStatusAjuan] = useState(false);
  const [error, setError] = useState(null);

  const findMahasiswaData = (nim) => {
    const mahasiswa = dataStore.Mahasiswa.find((m) => m.nim === nim);

    if (!mahasiswa) {
      setError('Data mahasiswa tidak ditemukan');
      return null;
    } else {
      return mahasiswa;
    }
  };

  const handleNimChange = (e) => {
    const nimValue = e.target.value;
    setNim(nimValue);
    setError(null);
    const mahasiswa = findMahasiswaData(nimValue);
    if (mahasiswa) {
      setName(mahasiswa.nama);
      setIpk(mahasiswa.ipk);
    } else {
      setName('');
      setIpk(0);
    }
  };

  const handleDaftar = async () => {
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!emailPattern.test(email)) {
      swal('Error', 'Format email tidak sesuai.', 'error');
      return;
    } else if (!nim || !name || !phone || !semester || ipk < 3 || !berkas) {
      swal('Error', 'Semua field harus diisi.', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('nim', nim);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('semester', semester);
    formData.append('ipk', ipk);
    formData.append('beasiswa', beasiswa);
    formData.append('berkas', berkas);
    formData.append('statusAjuan', statusAjuan);

    try {
      const response = await axios.post(
        'http://localhost:3001/api/daftar',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log('Response:', response.data);
      setStatusAjuan(false);
      swal(
        'Pendaftaran Sukses',
        'Terima kasih atas pendaftarannya!',
        'success',
      ).then(() => {
        window.location.href = '/hasil';
      });
    } catch (error) {
      swal('Error', 'Mahasiswa Sudah Terdaftar', 'error');
    }
  };

  const handleBerkasUpload = (e) => {
    const file = e.target.files[0];
    setBerkas(file);
  };

  return (
    <div className="flex justify-center w-full">
      <Form title={'Formulir Pendaftaran'}>
        {error ? (
          <button
            onClick={() => {
              swal('Error', error, 'error');
              setError(null);
            }}
            style={{ display: 'none' }}
            className="absolute"
          ></button>
        ) : (
          <div></div>
        )}
        <InputWithTitle
          title={'NIM'}
          type={'text'}
          value={nim}
          onChange={handleNimChange}
        />
        <InputWithTitle
          title={'Nama'}
          type={'text'}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputWithTitle
          title={'Email'}
          type={email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <InputWithTitle
          type={'tel'}
          title={'Nomor HP'}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <SelectInput
          title={'Pilih Semester'}
          onChange={(e) => setSemester(e.target.value)}
          value={semester}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
            <option key={s} value={s}>
              Semester {s}
            </option>
          ))}
        </SelectInput>
        <InputWithTitle
          title={'IPK Terakhir'}
          type={'number'}
          value={ipk}
          disabled={true}
        />

        <SelectInput
          title={'Pilihan Beasiswa'}
          value={beasiswa}
          onChange={(e) => setBeasiswa(e.target.value)}
          disabled={ipk < 3}
        >
          <option value={'Akademik'}>Akademik</option>
          <option value={'Non-Akademik'}>Non-Akademik</option>
        </SelectInput>

        <InputWithTitle
          title={'Upload Berkas Syarat'}
          type={'file'}
          accept={'.pdf,.jpg,.jpeg,.png,.zip'}
          onChange={handleBerkasUpload}
          disabled={ipk < 3}
        />

        <div className="flex justify-center">
          <button
            type="button"
            className="p-2 mt-5 font-semibold text-white rounded bg-one hover-bg-three"
            onClick={handleDaftar}
            disabled={ipk < 3}
          >
            Daftar
          </button>
        </div>
      </Form>
    </div>
  );
};

export default FormPendaftaran;
