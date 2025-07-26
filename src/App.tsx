import { getAssetMeta } from "@utils/getAsset";
import { useState } from "react";
import "./App.css";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";

function App() {
  const [count, setCount] = useState(0);
  const reactAssets = getAssetMeta("react.svg");
  const viteAssets = getAssetMeta("vite.svg");
  console.log({ reactAssets, viteAssets });

  return (
    <>
      <div>
        <h1 className="text-xs font-bold underline">Hello world!</h1>
        <a href="https://vite.dev" target="_blank">
          <img src={viteAssets.src} className="logo" alt={viteAssets.alt} />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactAssets.src} className="logo react" alt={reactAssets.alt} />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
