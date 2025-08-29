import { useRouter } from 'next/router';
import { ComingSoon } from '../components/ComingSoon';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export default function ComingSoonPage() {
  const router = useRouter();
  return (
    <div className="bg-white min-h-screen">
      <Header />
      <ComingSoon onBackToHome={() => router.push('/')} />
      <Footer />
    </div>
  );
}


