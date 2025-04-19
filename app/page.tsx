import Carousel from "@/components/Carousel";
import VideoPlayer from "@/components/VideoPlayer";
import { Banner } from "@/utils/types";

export default function Home() {
  const banners: Banner[] = [
    {
      title: "Super Cube",
      description:
        "In an accident, an ordinary boy, Wang Xiaoxiu, obtains a space system called Superpower Cube from a high-latitude cosmic civilization and gains extraordinary powers. When the school belle, Shen Yao, Wang Xiaoxius longtime crush, confesses her love to him, the delinquent Sun Jun, who also has a crush on her, is provoked. Wang Xiaoxiu resolves the crisis with his wit and extraordinary powers, but it also brings more disasters as a result. Shen Yao is taken to the world of extraordinary beings by a mysterious person, and Wang Xiaoxiu embarks on a journey to rescue her. Fighting in the bizarre universe, he finds the meaning of fairness and justice on the path to becoming a peerless powerhouse.",
      thumbnailURL:
        "https://cdn.noitatnemucod.net/thumbnail/1366x768/100/71a1f086c03a5f0157834c17860e1235.jpg",
    },
    {
      title: "One Piece",
      description:
        "Gold Roger was known as the Pirate King, the strongest and most infamous being to have sailed the Grand Line. The capture and execution of Roger by the World Government brought a change throughout the world. His last words before his death revealed the existence of the greatest treasure in the world, One Piece. It was this revelation that brought about the Grand Age of Pirates, men who dreamed of finding One Piece—which promises an unlimited amount of riches and fame—and quite possibly the pinnacle of glory and the title of the Pirate King. Enter Monkey Luffy, a 17-year-old boy who defies your standard definition of a pirate. Rather than the popular persona of a wicked, hardened, toothless pirate ransacking villages for fun, Luffy's reason for being a pirate is one of pure wonder: the thought of an exciting adventure that leads him to intriguing people and ultimately, the promised treasure. Following in the footsteps of his childhood hero, Luffy and his crew travel across the Grand Line, experiencing crazy adventures, unveiling dark mysteries and battling strong enemies, all in order to reach the most coveted of all fortunes—One Piece. [Written by MAL Rewrite]",
      thumbnailURL:
        "https://cdn.noitatnemucod.net/thumbnail/1366x768/100/db8603d2f4fa78e1c42f6cf829030a18.jpg",
    },
  ];

  return (
    <div>
      {/* <Carousel banners={banners} /> */}
      {/* <iframe
        src="https://2anime.xyz/embed/one-piece-episode-1"
        width="100%"
        height="100%"
        frameborder="0"
        scrolling="no"
        allowfullscreen
      >asd</iframe> */}
      {/* <VideoPlayer/> */}
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
