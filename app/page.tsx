import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { HomePageView } from './views/quickstart-home';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="bg-moonwine-800 rounded-lg shadow-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-white">
          Welcome, <span className="text-moonwine-300">{session.user?.email}</span>
        </h1>
      </header>
      <HomePageView />
    </div>
  );
}
