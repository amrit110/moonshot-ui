'use client'; // Error components must be Client Components

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Icon, IconName } from '@/app/components/IconSVG';
import { colors } from '@/app/views/shared-components/customColors';
import { Modal } from '@/app/views/shared-components/modal/modal';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Modal
      heading="Something went wrong!"
      bgColor={colors.moongray['800']}
      textColor="#FFFFFF"
      primaryBtnLabel="Try again"
      enableScreenOverlay
      onCloseIconClick={() => router.push('/')}
      onPrimaryBtnClick={() => reset()}>
      <div className="flex items-start gap-2 pt-4">
        <Icon
          name={IconName.Alert}
          size={30}
          color="red"
        />
        <p className="text-[0.9rem]">{error.message}</p>
      </div>
    </Modal>
  );
}