"use client";
import Search from "@/components/ui/search";
export default function Root() {
  return (
    <main className="p-24">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="font-semibold text-3xl">µ-tube</h1>
        <h2 className="font-semibold text-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </h2>
        <Search
          placeholders={["LukeJ", "MrBeast", "Ryan Trahan"]}
          onChange={() => {}}
          onSubmit={() => {}}
        />
      </div>
    </main>
  );
}
