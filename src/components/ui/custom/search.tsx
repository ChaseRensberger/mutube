import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
export default function Search() {
  return (
    <div className="flex ring-2 ring-black rounded-lg gap-2 items-center px-2">
      <MagnifyingGlassIcon className="w-16 h-6" />
      <Input
        type="search"
        placeholder="LukeJ"
        className="border-none shadow-none font-semibold"
      />
    </div>
  );
}
