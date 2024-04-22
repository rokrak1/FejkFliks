import { AnimatePresence, motion } from "framer-motion";
import {
  PauseIcon,
  PlayIcon,
  ForwardICon,
  RewindIcon,
  VolumeIcon,
  VolumeOffIcon,
  FullscreenIcon,
  FullscreenOff,
} from "../../assets/icons/icons";
import { Icon } from "../../assets/icons/types";
import ReactPlayer from "react-player";
import { useRef, useState } from "react";
import { GradientHorizontalSlider } from "./slider";

interface IVideoPlayerControls {
  playing: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  playerRef: React.MutableRefObject<ReactPlayer>;
  volume: number;
  lastVolume: number;
  setVolume: (e: number) => void;
  progress: number;
  loaded: number;
  handleFullScreen: (close?: boolean) => void;
  isFullscreen: boolean;
}

const VideoPlayerControls: React.FC<IVideoPlayerControls> = ({
  playing,
  setPlaying,
  playerRef,
  volume,
  lastVolume,
  progress,
  loaded,
  setVolume,
  handleFullScreen,
  isFullscreen,
}) => {
  const [isVolumeOpen, setIsVolumeOpen] = useState(false);
  const videoChangeTimeout = useRef<ReturnType<typeof setTimeout>>(null);

  const seekTo = (time: number) => {
    const player = playerRef?.current;
    if (player) {
      const currentTime = player.getCurrentTime();
      let minTime = Math.abs(currentTime + time);
      player.seekTo(minTime);
    }
  };

  const setVideoTime = (time: number) => {
    if (videoChangeTimeout.current) clearTimeout(videoChangeTimeout.current);
    const player = playerRef?.current;
    if (player) {
      let duration = player.getDuration();
      const videoTime = time * duration;
      player.seekTo(videoTime);
    }
  };

  return (
    <div className="justify-between absolute bottom-0 left-0 w-full h-full flex flex-col items-center">
      <div
        className="h-full w-full"
        onClick={() => {
          setPlaying(!playing);
        }}
      ></div>
      <motion.div
        initial={{ y: 150 }}
        animate={{ y: 0, transition: { duration: 0.2, type: "tween" } }}
        exit={{ y: 150, transition: { duration: 0.2, type: "tween" } }}
        className=" w-full"
      >
        <GradientHorizontalSlider
          value={progress}
          loaded={loaded}
          setOnMouseUpValue={setVideoTime}
        />
        <motion.div className="bg-gray-900/25 flex justify-between items-center w-full h-24">
          <div className="flex items-center p-3 gap-x-6">
            <Control
              icon={{
                Icon: playing ? PauseIcon : PlayIcon,
                size: 40,
                color: "white",
              }}
              onClick={() => {
                setPlaying(!playing);
              }}
            />

            <Control
              icon={{
                Icon: RewindIcon,
                size: 40,
                color: "white",
              }}
              onClick={() => seekTo(-15)}
            />

            <Control
              icon={{
                Icon: ForwardICon,
                size: 40,
                color: "white",
              }}
              onClick={() => seekTo(15)}
            />
            <div
              className="relative"
              onMouseEnter={() => setIsVolumeOpen(true)}
              onMouseLeave={() => setIsVolumeOpen(false)}
            >
              <Control
                icon={{
                  Icon: volume === 0 ? VolumeOffIcon : VolumeIcon,
                  size: 40,
                  color: "white",
                }}
                onClick={() => setVolume(volume === 0 ? lastVolume : 0)}
              />
              <AnimatePresence>
                {isVolumeOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center p-3 left-1/2 absolute bottom-12 w-max bg-gray-900/75 rounded-lg"
                  >
                    {/*  <GradientSlider
                      value={volume}
                      setValue={setVolume}
                      vertical={130}
                    /> */}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <motion.span
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleFullScreen(false)}
            className="p-3 cursor-pointer"
          >
            {isFullscreen ? (
              <FullscreenOff size={40} color="white" />
            ) : (
              <FullscreenIcon size={40} color="white" />
            )}
          </motion.span>
        </motion.div>
      </motion.div>
    </div>
  );
};

interface Control {
  icon: {
    Icon: React.FC<Icon>;
    size: number;
    color: string;
  };
  onClick: () => void;
}

const Control: React.FC<Control> = ({
  icon: { Icon, size, color },
  onClick,
}) => {
  return (
    <motion.span
      className="cursor-pointer"
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
    >
      <Icon size={size} color={color} />
    </motion.span>
  );
};

export default VideoPlayerControls;
