import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { HomePageView } from './views/quickstart-home';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-white">Welcome, {session.user?.email}</h1>
      <HomePageView />
    </div>
  );
}
