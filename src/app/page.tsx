import Simulator from "@/components/simulator";

export default function Home() {
  return (
    <div className='canvas-container' style={{ height: '100vh', width: '100vw' }}>
      <Simulator />
    </div>
  );
}