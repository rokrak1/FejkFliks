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
  SubtitleIcon,
  ArrowIcon,
  DoubleArrowIcon,
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
  openSubtitleSettings: boolean;
  setOpenSubtitleSettings: React.Dispatch<React.SetStateAction<boolean>>;
  subtitleSeconds: number;
  setSubtitleSeconds: React.Dispatch<React.SetStateAction<number>>;
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
  openSubtitleSettings,
  setOpenSubtitleSettings,
  subtitleSeconds,
  setSubtitleSeconds,
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

          <motion.div className=" flex justify-between items-center self-end h-24">
            <div className="flex items-center p-3 gap-x-6">
              <Control
                icon={{
                  Icon: SubtitleIcon,
                  size: 40,
                  color: "white",
                }}
                onClick={() =>
                  setOpenSubtitleSettings((prevState) => !prevState)
                }
              />
              <Control
                icon={{
                  Icon: isFullscreen ? FullscreenOff : FullscreenIcon,
                  size: 40,
                  color: "white",
                }}
                onClick={() => handleFullScreen()}
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {openSubtitleSettings && (
          <motion.div
            initial={{ opacity: 0, y: -400 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -400 }}
            className="absolute top-10 left-[calc(50%-130px)] w-[260px] z-20 bg-gray-900 rounded-lg flex flex-col gap-y-4 items-center rounded-lg"
          >
            <span className="p-3">Subtitle Settings</span>

            <div className="flex justify-between items-center pb-2 border-white">
              <Control
                icon={{
                  Icon: DoubleArrowIcon,
                  direction: "left",
                  size: 30,
                  color: "white",
                }}
                onClick={() => setSubtitleSeconds(subtitleSeconds - 1)}
              />
              <span className="flex px-4 items-center">
                <Control
                  icon={{
                    Icon: ArrowIcon,
                    direction: "left",
                    size: 30,
                    color: "white",
                  }}
                  onClick={() => setSubtitleSeconds(subtitleSeconds - 0.1)}
                />

                <div className="w-12 text-center select-none">
                  {subtitleSeconds.toFixed(1)} s
                </div>
                <Control
                  icon={{
                    Icon: ArrowIcon,
                    direction: "right",
                    size: 30,
                    color: "white",
                  }}
                  onClick={() => setSubtitleSeconds(subtitleSeconds + 0.1)}
                />
              </span>

              <Control
                icon={{
                  Icon: DoubleArrowIcon,
                  direction: "right",
                  size: 30,
                  color: "white",
                }}
                onClick={() => setSubtitleSeconds(subtitleSeconds + 1)}
              />
            </div>

            <div
              className="w-full py-1 flex justify-center items-center bg-gray-700 rounded-b-lg cursor-pointer"
              onClick={() => setOpenSubtitleSettings(false)}
            >
              <Control
                icon={{
                  Icon: ArrowIcon,
                  direction: "up",
                  size: 30,
                  color: "white",
                }}
                onClick={() => null}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface Control {
  icon: {
    Icon: React.FC<Icon>;
    size: number;
    color: string;
    direction?: "left" | "right" | "up" | "down";
  };
  onClick: () => void;
}

const Control: React.FC<Control> = ({
  icon: { Icon, size, color, direction },
  onClick,
}) => {
  return (
    <motion.span
      className="cursor-pointer"
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
    >
      <Icon size={size} color={color} direction={direction} />
    </motion.span>
  );
};

export default VideoPlayerControls;
