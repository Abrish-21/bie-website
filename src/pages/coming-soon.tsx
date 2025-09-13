import { useRouter } from 'next/router';
import { ComingSoon } from '../components/ComingSoon';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export default function ComingSoonPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow">
        <ComingSoon onBackToHome={() => router.push('/')} />
      </main>
      <Footer />
    </div>
  );
}


