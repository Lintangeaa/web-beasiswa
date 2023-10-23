import Link from 'next/link';
import { useRouter } from 'next/router';

const NavItem = ({ title, link }) => {
  const router = useRouter();
  const currentPath = router.pathname.split('/')[1];
  const isActive = currentPath === link.split('/')[1];

  return (
    <Link
      href={link}
      className={`flex justify-center items-center w-40 text-black rounded font-semibold ${
        isActive ? 'bg-white' : 'bg-three'
      }`}
    >
      <p>{title}</p>
    </Link>
  );
};

export default NavItem;
