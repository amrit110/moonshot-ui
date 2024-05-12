import React from 'react';
import { Icon, IconName } from '@/app/components/IconSVG';
import LeftNav from '@/app/components/leftNav';
import { BenchmarkReportViewer } from '@/app/views/benchmarking/benchmarkReportViewer';
import { MicroLayout } from '@/app/views/quickstart-home/components/microLayout';
import { colors } from '@/app/views/shared-components/customColors';

export default function BenchmarkingReportPage() {
  return (
    <MicroLayout>
      <nav className="pt-[5rem]">
        <LeftNav />
      </nav>
      <header className="flex justify-between items-center px-4">
        <h1
          className="text-moonpurplelight tracking-[0.7rem] font-extralight text-[2.7rem] cursor-pointer"
          style={{ textShadow: '2px 2px 3px rgba(0,0,0,0.5)' }}>
          moonshot.
        </h1>
        <Icon
          color={colors.moongray[300]}
          name={IconName.Bell}
          size={30}
        />
      </header>
      <main className="h-full">
        <div className="flex flex-col h-full">
          <BenchmarkReportViewer />
        </div>
      </main>
    </MicroLayout>
  );
}
