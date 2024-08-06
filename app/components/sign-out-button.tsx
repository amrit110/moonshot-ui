'use client';

import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
    const result = await signOut({ redirect: false, callbackUrl: `${baseUrl}/login` });
    router.push(result?.url ?? '/login');
  };

  return (
    <button
      onClick={handleSignOut}
      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
    >
      Sign Out
    </button>
  );
}
