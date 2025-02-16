import Simulator from '@/components/simulator';
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function Home() {
  return (
    <div
      className='canvas-container'
      style={{ height: '100vh', width: '100vw' }}
    >
      <Simulator />
      <SpeedInsights/>
    </div>
  );
}
