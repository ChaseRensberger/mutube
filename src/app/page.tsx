import Search from "@/components/ui/custom/search";
export default function Root() {
  return (
    <main className="p-24">
      <div className="flex flex-col items-center gap-4">
        <h1 className="font-semibold text-3xl">µ-Tube</h1>
        <h2 className="font-semibold text-2xl">
          An open source, free forever, youtube analytics tool.
        </h2>
        {/* <Search /> */}
      </div>
    </main>
  );
}
