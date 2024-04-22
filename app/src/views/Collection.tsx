import { Navigate, useParams } from "react-router-dom";
import { useDataStore } from "../store/store";
import { shallow } from "zustand/shallow";
import toast from "react-hot-toast";
import VideoWidget from "../components/VideoList/VideoWidget";
import { motion } from "framer-motion";

const Collection = () => {
  const { id } = useParams();
  const [videoList, collections] = useDataStore(
    (s) => [s.videoList, s.collections],
    shallow
  );

  if (!id) {
    toast.error("Collection ID not found...");
    return <Navigate to="/" />;
  }
  const filteredVideos = videoList?.items
    ?.filter((video) => video.collectionId === id)
    .sort((a, b) => a.title.localeCompare(b.title));

  let collectionTitle = collections?.find(
    (collection) => collection.guid === id
  )?.name;
  return (
    <motion.div className="p-10">
      <h1 className="text-3xl ">{collectionTitle}</h1>
      <motion.div className="flex flex-wrap pt-10 gap-5">
        {filteredVideos?.map((video, index) => (
          <VideoWidget key={index} video={video} index={index} />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Collection;
