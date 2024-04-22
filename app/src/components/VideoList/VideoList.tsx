import { motion } from "framer-motion";

import DraggableScrollContainer from "../common/DraggableScrollContainer";
import { FolderIcon } from "../../assets/icons/icons";
import { useNavigate } from "react-router-dom";
import { useDataStore } from "../../store/store";
import { shallow } from "zustand/shallow";
import VideoWidget from "./VideoWidget";

const VideoList = () => {
  const [videoList, collections] = useDataStore(
    (s) => [s.videoList, s.collections],
    shallow
  );
  const navigate = useNavigate();

  const onCollectionSelect = (id: string) => {
    navigate(`/collection/${id}`);
  };

  console.log("videoList", videoList);

  return (
    <motion.div className="w-full">
      {videoList?.items?.filter((v) => v.hasFinished === false).length > 0 && (
        <>
          <div className="flex px-5 pt-5 items-center gap-x-3">
            <div className="text-3xl font-medium ">Continue watching</div>
          </div>
          <DraggableScrollContainer enableControls>
            {videoList?.items
              ?.filter((v) => v.hasFinished === false)
              .map((video, index) => (
                <VideoWidget key={index} video={video} index={index} />
              ))}
          </DraggableScrollContainer>
        </>
      )}
      <div className="flex px-5 pt-5 items-center gap-x-3">
        <div className="text-3xl font-medium ">Lastest Videos</div>
      </div>
      <DraggableScrollContainer enableControls>
        {videoList?.items?.slice(0, 9).map((video, index) => (
          <VideoWidget key={index} video={video} index={index} />
        ))}
      </DraggableScrollContainer>

      <div className="flex px-5 pt-5 items-center gap-x-3">
        <div className="text-3xl font-medium select-none">Folders</div>
      </div>
      <DraggableScrollContainer enableControls>
        {collections?.map((collection, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.5, delay: index * 0.1 },
            }}
            className="flex flex-col items-center justify-center relative my-1 glass rounded-xl w-[300px] h-48 flex-shrink-0 cursor-pointer "
            onClick={() => onCollectionSelect(collection.guid)}
          >
            <FolderIcon size={100} color="#ffffff20" />
            <p className="px-2 max-w-[50ch] text-lg overflow-hidden font-medium absolute select-none ">
              {collection.name}
            </p>
          </motion.div>
        ))}
      </DraggableScrollContainer>
    </motion.div>
  );
};

export default VideoList;
