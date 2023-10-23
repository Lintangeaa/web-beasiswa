import { useRouter } from 'next/router';
import FormPendaftaran from '@/components/organism/FormPendaftaran';
import Layout from '@/components/organism/Layout';

const Beasiswa = () => {
  const router = useRouter();
  const { jenis } = router.query;

  return (
    <Layout>
      <h1 className="text-center">Daftar Beasiswa</h1>
      <FormPendaftaran />
    </Layout>
  );
};

export default Beasiswa;
