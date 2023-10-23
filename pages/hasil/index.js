import Layout from '@/components/organism/Layout';
import axios from 'axios';
import { useState, useEffect } from 'react';
import swal from 'sweetalert';
import DaftarUpdateModal from '@/components/molekul/DaftarUpdateModal';
import PieChart from '@/components/molekul/Chart';

const Hasil = () => {
  const [hasil, setHasil] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getAllHasil = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/daftar');
      console.log(response.data);
      if (response.data.status == 200) {
        setHasil(response.data.data);
      } else {
        swal('Error', response.data.message, 'error');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const openUpdateModal = (data) => {
    setSelectedData(data);
    setModalOpen(true);
  };

  useEffect(() => {
    getAllHasil();
  }, []);

  const academicApplicants = hasil.filter(
    (data) => data.statusAjuan && data.beasiswa === 'Akademik',
  ).length;
  const nonAcademicApplicants = hasil.filter(
    (data) => data.statusAjuan && data.beasiswa === 'Non-Akademik',
  ).length;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = hasil.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  console.log(hasil);
  return (
    <Layout>
      <section className="flex flex-col items-center w-full p-2 mt-5 rounded shadow-lg">
        <table className="w-full">
          <thead>
            <tr className="font-semibold bg-slate-300">
              <td className="text-center border-2 border-one">No</td>
              <td className="text-center border-2 border-one">Nama</td>
              <td className="text-center border-2 border-one">Email</td>
              <td className="text-center border-2 border-one">Nomor</td>
              <td className="text-center border-2 border-one">Semester</td>
              <td className="text-center border-2 border-one">IPK</td>
              <td className="text-center border-2 border-one">Beasiswa</td>
              <td className="text-center border-2 border-one">Status Ajuan</td>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((data, index) => (
              <tr key={index}>
                <td className="text-center border-2 border-one">{index + 1}</td>
                <td className="px-2 text-left border-2 border-one">
                  {data.name}
                </td>
                <td className="px-2 text-left border-2 border-one">
                  {data.email}
                </td>
                <td className="px-2 text-left border-2 border-one">
                  {data.phone}
                </td>
                <td className="text-center border-2 border-one">
                  {data.semester}
                </td>
                <td className="text-center border-2 border-one">{data.ipk}</td>
                <td className="text-center border-2 border-one">
                  {data.beasiswa}
                </td>
                <td className="text-center border-2 border-one">
                  {data.statusAjuan ? (
                    <p className="text-green-500">Sudah diverifikasi</p>
                  ) : (
                    <p
                      className="text-red-500 cursor-pointer"
                      onClick={() => openUpdateModal(data)}
                    >
                      Belum diverifikasi
                    </p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-4">
          <ul className="flex">
            {Array(Math.ceil(hasil.length / itemsPerPage))
              .fill()
              .map((_, i) => (
                <li key={i} className="mx-2 cursor-pointer">
                  <a
                    className={`px-2 py-1 border rounded-lg ${
                      i + 1 === currentPage
                        ? 'bg-three text-white'
                        : 'border-three'
                    }`}
                    onClick={() => paginate(i + 1)}
                  >
                    {i + 1}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </section>

      {selectedData && (
        <DaftarUpdateModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onSave={async (status) => {
            try {
              const response = await axios.put(
                `http://localhost:3001/api/daftar/${selectedData._id}`,
                { statusAjuan: status },
              );
              console.log(response);
              if (response.data.status == 200) {
                getAllHasil();
                setModalOpen(false);
              } else {
                swal('Error', response.data.message, 'error');
              }
            } catch (error) {
              console.error('Error:', error);
            }
          }}
          data={selectedData}
        />
      )}

      <section className="flex flex-col items-center w-full p-4 mt-20 rounded shadow-2xl">
        <h2 className="font-semibold uppercase">Diagram Jumlah Mahasiswa</h2>
        <div className="max-w-lg">
          <PieChart
            academicCount={academicApplicants}
            nonAcademicCount={nonAcademicApplicants}
          />
        </div>
      </section>
    </Layout>
  );
};

export default Hasil;
