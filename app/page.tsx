import Carousel from "@/components/Carousel";
import { Banner } from "@/utils/types";

export default function Home() {
  const banners: Banner[] = [{ id: "asdf1" }, { id: "asdasdas" }];

  return (
    <div>
      <Carousel banners={banners} />
      <div className="bg-background text-text-primary min-h-screen p-8">
        <div className="bg-surface p-6 rounded-2xl border border-border">
          <h2 className="text-2xl font-bold text-text-accent">Demon Slayer</h2>
          <p className="text-text-secondary">Season 3 • Action, Fantasy</p>
          <button className="mt-4 bg-button-primary text-button-text px-4 py-2 rounded hover:bg-button-primary-hover">
            Watch Now
          </button>
        </div>
      </div>
    </div>
  );
}
