import CandlestickChart from "./components/candleChart";
import PerformanceChart from "./components/performanceChart";

export default function HomePage() {
  return (
    <main>
      <div>
        <h1 className="text-center mt-5 font-bold m-auto">Candlestick Chart</h1>
        <CandlestickChart />
      </div>
      <div className="my-10">
        <h1 className="text-center mt-5 font-bold m-auto">Performance Chart</h1>
        <PerformanceChart />
      </div>
    </main>
  );
}
