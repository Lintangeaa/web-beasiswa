const DaftarUpdateModal = ({ isOpen, onClose, onSave, data }) => {
  if (!isOpen) return null;

  const handleSubmit = () => {
    onSave(true);
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
          <div className="flex space-x-4">
            <button
              type="button"
              className="p-2 mt-5 font-semibold text-white rounded bg-one hover:bg-three"
              onClick={handleSubmit}
            >
              Konfirmasi
            </button>
            <button
              type="button"
              className="p-2 mt-5 font-semibold text-white bg-red-600 rounded hover:bg-three"
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
