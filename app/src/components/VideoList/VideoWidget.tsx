import { AnimatePresence, motion } from "framer-motion";
import { Video } from "../../service/types";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

const VideoWidget = ({
  video,
  index,
  usingGrid,
}: {
  video: Video;
  index?: number;
  usingGrid?: boolean;
}) => {
  const [hoveredVideo, setHoveredVideo] = useState("");
  const hoverRef = useRef<NodeJS.Timeout>(null);
  const navigate = useNavigate();

  const onVideoSelect = (id: string) => {
    navigate(`/video/${id}`);
  };

  const calculatePlayedPercentage = () => {
    return (video.playedSeconds / video.length) * 100;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        opacity: 1,
        transition: { duration: 0.5, delay: (index || 0) * 0.1 },
      }}
      className={`relative glass rounded-xl my-1 h-48 flex-shrink-0 cursor-pointer overflow-hidden 
      ${usingGrid ? "w-full" : "w-[300px]"}
      `}
      onClick={() => onVideoSelect(video.guid)}
      onMouseEnter={() => {
        hoverRef.current = setTimeout(() => setHoveredVideo(video.guid), 1000);
      }}
      onMouseLeave={() => {
        clearTimeout(hoverRef.current);
        setHoveredVideo("");
      }}
    >
      <AnimatePresence>
        {(hoveredVideo !== video.guid && (
          <motion.span exit={{ opacity: 0, transition: { duration: 0.4 } }}>
            <div className="bg-gradient-to-t from-black from-20% w-full h-full absolute rounded-xl  z-10" />
            <img
              src={
                hoveredVideo === video.guid ? video.preview : video.thumbnail
              }
              style={{
                objectFit: "cover",
              }}
              alt={video.title}
              className={`absolute h-full rounded-xl opacity-80 select-none
              ${usingGrid ? "w-full" : "w-[300px]"}
              `}
            />
            <p className="px-2 bottom-0 py-1 h-14 m-2 rounded-xl max-w-[50ch] text-[17px] overflow-hidden font-medium absolute select-none z-20">
              {video.title}
            </p>
            <motion.div
              className="absolute bottom-0 left-0 h-1 z-20 bg-red-500"
              style={{
                width: calculatePlayedPercentage() + "%",
              }}
            />
          </motion.span>
        )) || (
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            src={hoveredVideo === video.guid ? video.preview : video.thumbnail}
            alt={video.title}
            style={{
              objectFit: "cover",
            }}
            className={`absolute h-full rounded-xl opacity-80 select-none bg-transparent
            ${usingGrid ? "w-full" : "w-[300px]"}
            `}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default VideoWidget;
