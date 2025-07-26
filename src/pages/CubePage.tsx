import CubeScene from "@components/CubeScene";

export default function CubePage() {
  return (
    <>
      <main
        className="w-full h-screen flex flex-col items-center justify-center gap-8 p-4"
        style={{
          background: "radial-gradient(circle, rgba(55, 65, 81, 1) 0%, rgba(17, 24, 39, 1) 100%)",
        }}
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl tracking-tight">
            Interactive 3D Cube
          </h1>
          <p className="text-white/70 mt-2 font-mono text-sm">
            Drag to Rotate. Click a Face to Turn.
          </p>
        </div>

        <div className="w-full max-w-[500px] h-[400px] aspect-square cursor-grab active:cursor-grabbing">
          <CubeScene />
        </div>
      </main>
    </>
  );
}
