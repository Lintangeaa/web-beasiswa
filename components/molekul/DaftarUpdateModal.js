import { useState } from 'react';
import InputWithTitle from '../atom/InputWithTitle';
import swal from 'sweetalert';

const DaftarUpdateModal = ({ isOpen, onClose, onSave, data }) => {
  const [password, setPassword] = useState('');
  if (!isOpen) return null;

  const handleSubmit = () => {
    if (password === 'password123') {
      setPassword('');
      onSave(true);
    } else {
      swal('error', 'Password Salah!', 'error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75">
      <div className="w-full max-w-sm p-6 mx-auto bg-white rounded-lg shadow-lg lg:max-w-lg">
        <div className="flex justify-between">
          <h2 className="mb-4 text-xl font-semibold">
            Ubah Status Ajuan {data && data.name}
          </h2>
          <p onClick={onClose} className="text-red-500 cursor-pointer">
            Close
          </p>
        </div>
        <div className="flex flex-col items-center">
          <p>
            Apakah Anda yakin ingin melakukan verifikasi terhadap beasiswa{' '}
            {data.name}?
          </p>
          <div className="mt-4">
            <InputWithTitle
              title={'Password edit'}
              type={'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex mt-4 space-x-4">
            <button
              type="button"
              className="p-2 font-semibold text-white rounded bg-one hover:bg-three"
              onClick={handleSubmit}
            >
              Konfirmasi
            </button>
            <button
              type="button"
              className="p-2 font-semibold text-white bg-red-600 rounded hover:bg-three"
              onClick={onClose}
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaftarUpdateModal;
