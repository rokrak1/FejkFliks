import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDataStore } from "../store/store";
import VideoWidget from "../components/VideoList/VideoWidget";

const Search = () => {
  const location = useLocation();
  const [searchValue, setSearchValue] = useState("");
  const videoList = useDataStore((s) => s.videoList);

  // This workaround is done since useSearchParams is not working as expected...
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setSearchValue(searchParams.get("q") || "");
  }, [location]);

  const improvedSearch = (searchValue: string) => {
    const searchWords = searchValue.split(" ");
    return videoList.items.filter((video) =>
      searchWords.every((word) =>
        video.title.toLowerCase().includes(word.toLowerCase())
      )
    );
  };

  const filteredVideos = improvedSearch(searchValue);

  return (
    <div className="flex flex-col px-10">
      <div className="py-2 text-lg">Looking for: {searchValue}</div>
      <div className="py-2 text-3xl">Results</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full justify-items-start">
        {filteredVideos.map((video, i) => (
          <VideoWidget key={video.guid} video={video} usingGrid />
        ))}
      </div>
    </div>
  );
};

export default Search;
