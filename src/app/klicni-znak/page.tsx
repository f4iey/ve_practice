import { SubHeader } from '@/components/sub_header';
import { Metadata } from 'next';
import CallsignTool from './callsign-tool';

export const metadata: Metadata = {
  title: 'Callsign Selection',
  description: 'PCallsign Selection Helper',
  openGraph: {
    title: 'Callsign selection',
    description: 'Callsign Selection Helper',
  },
};

export default function Callsign() {
  return (
    <>
      <SubHeader>
        <h1>Callsign Selection Helper</h1>
        <p className="text-lg">
          Enter the desired callsign
        </p>
      </SubHeader>

      <CallsignTool />
    </>
  );
}
