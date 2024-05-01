import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  BackIcon,
  LoadingIcon,
  PauseIcon,
  PlayIcon,
} from "../../assets/icons/icons";
import VideoPlayerControls from "./VideoPlayerControls";
import { useDataStore } from "../../store/store";
import toast from "react-hot-toast";
import { IUser, useAuth } from "../../store/AuthProvider";
import { shallow } from "zustand/shallow";
import { VideoList } from "../../service/types";
import { fetchSubtitles, finishWatchingVideo } from "../../service/video";
import { getSubtitleForProgress } from "./videoPlayer.utils";

const VideoPlayer = () => {
  const { id } = useParams();

  const videoListRef = useRef<VideoList | null>(null);
  const idRef = useRef<string | null>(null);
  const userRef = useRef<IUser | null>(null);
  const playedSecondsRef = useRef(0);
  const playerRef = useRef<ReactPlayer>({} as ReactPlayer);
  const showOverlayRef = useRef<NodeJS.Timeout | null>(null);
  const subtitleTextRef = useRef<NodeJS.Timeout | null>(null);

  const navigate = useNavigate();
  const [showOverlay, setShowOverlay] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [lastVolume, setLastVolume] = useState(0.8);
  const [volume, setVolume] = useState(0.8);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [subtitle, setSubtitle] = useState<string | null>(null);
  const [videoList, setVideoList, fetchVideoInfo] = useDataStore(
    (s) => [s.videoList, s.setVideoList, s.fetchVideoInfo],
    shallow
  );
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [subtitleText, setSubtitleText] = useState<string | null>(null);
  const [subtitleSeconds, setSubtitleSeconds] = useState<number>(0.5);
  const [openSubtitleSettings, setOpenSubtitleSettings] = useState(false);
  const [enableSubtitle, setEnableSubtitle] = useState(true);

  useEffect(() => {
    setShowPlayButton(true);
    setTimeout(() => {
      setShowPlayButton(false);
    }, 500);
  }, [playing]);

  useEffect(() => {
    if (volume !== 0) {
      setLastVolume(volume);
    }
  }, [volume]);

  useEffect(() => {
    // Setting timeout because the player triggers onProgress event on load
    if (playerRef.current) {
      setTimeout(() => {
        const currentVideo = videoList.items?.find(
          (video) => video.guid === id
        );
        playedSecondsRef.current = currentVideo?.playedSeconds || 0;
        playerRef.current.seekTo(playedSecondsRef.current);
        setProgress(playedSecondsRef.current / currentVideo?.length);
        setIsLoading(false);
        setPlaying(true);
      }, 1000);
    }
  }, [playerRef, videoList]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (!userRef.current.userData?.id) {
        toast.error("Error saving video progress");
        return;
      }
      const data = JSON.stringify({
        playedSeconds: playedSecondsRef.current,
        video_id: idRef.current,
        user_id: userRef.current.userData?.id,
        done_watching: false,
      });
      console.log("VideoListRef:", idRef.current, videoListRef.current.items);
      const currentVideo = videoListRef.current.items?.find(
        (video) => video.guid === idRef.current
      );
      console.log("Current Video:", currentVideo);
      const wasNeverPlayed = currentVideo?.playedSeconds === undefined;

      const wasPlayedId = wasNeverPlayed ? "" : `?id=eq.${currentVideo.infoId}`;
      fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/video_info${wasPlayedId}`,
        {
          method: wasNeverPlayed ? "POST" : "PATCH",
          body: data,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userRef.current.accessToken}`,
            apikey: `${import.meta.env.VITE_SUPABASE_PUBLIC_ANON_KEY}`,
          },
          keepalive: true, // Ensure the request is sent even if the page unloads
        }
      ).catch((e) => console.error("Error sending data on unload:", e));

      // Update local state
      const updatedVideos = videoListRef.current.items?.map((video) => {
        if (video.guid === idRef.current) {
          return {
            ...video,
            playedSeconds: playedSecondsRef.current,
          };
        }
        return video;
      });
      setVideoList({
        ...videoListRef.current,
        items: updatedVideos,
      });

      // Refetch video list info
      fetchVideoInfo(true, videoListRef.current);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      handleBeforeUnload();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [id]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const fullscreenElement = document.fullscreenElement;
      setIsFullscreen(!!fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    videoListRef.current = videoList;
    userRef.current = user;
    idRef.current = id;
  }, [videoList, user, id]);

  useEffect(() => {
    (async () => {
      if (id) {
        const video = videoList.items?.find((video) => video.guid === id);

        if (video?.title) {
          let subs = await fetchSubtitles(video.title, user.accessToken);

          if (subs) {
            setSubtitle(subs);
          }
        }
      }
    })();
  }, [id, videoList]);

  const handleOverlay = () => {
    if (showOverlayRef.current) {
      clearTimeout(showOverlayRef.current);
    }
    setShowOverlay(true);

    if (!openSubtitleSettings) {
      showOverlayRef.current = setTimeout(() => {
        setShowOverlay(false);
      }, 4000);
    }
  };

  const handleFullScreen = (close?: boolean) => {
    if (!document.fullscreenElement && !close) {
      document.documentElement.requestFullscreen().catch((e) => {
        console.error(
          `Failed to enable full-screen mode: ${e.message} (${e.name})`
        );
      });
    } else if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch((e) => {
        console.error(
          `Failed to exit full-screen mode: ${e.message} (${e.name})`
        );
      });
    }
  };

  const onProgressChange = (e: any) => {
    setProgress(e.played);
    setLoaded(e.loaded);
    playedSecondsRef.current = e.playedSeconds;

    // Creating own subtitle system since the player doesn't support direct file loading
    changeSubtitle();
  };

  const changeSubtitle = () => {
    if (subtitle) {
      const subText = getSubtitleForProgress(
        playedSecondsRef.current + subtitleSeconds,
        subtitle
      );
      if (subText) {
        if (subText.text !== subtitleText || !subtitleText) {
          clearTimeout(subtitleTextRef.current);
          setSubtitleText(subText.text);
          subtitleTextRef.current = setTimeout(() => {
            setSubtitleText(null);
          }, subText.duration + 500);
        }
      }
    }
  };

  const onVideoFinishWatching = async () => {
    const updated = await finishWatchingVideo(id);
    if (!updated) {
      return;
    }

    await fetchVideoInfo(true);
    navigate("/");
  };

  let videoId = `${import.meta.env.VITE_BUNNY_STREAM_URL}/${id}/playlist.m3u8`;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full h-full bg-black"
      onMouseMove={handleOverlay}
    >
      <ReactPlayer
        ref={playerRef}
        width={"100%"}
        height={"100%"}
        url={videoId}
        playing={playing}
        volume={volume}
        onProgress={onProgressChange}
        onError={() => {
          toast.error("Error loading video.");
          navigate("/");
        }}
      />

      <AnimatePresence>
        {showOverlay && playerRef.current && !isLoading && (
          <>
            <VideoPlayerControls
              playing={playing}
              setPlaying={setPlaying}
              playerRef={playerRef}
              setVolume={setVolume}
              volume={volume}
              lastVolume={lastVolume}
              progress={progress}
              loaded={loaded}
              handleFullScreen={handleFullScreen}
              isFullscreen={isFullscreen}
              setSubtitleSeconds={setSubtitleSeconds}
              subtitleSeconds={subtitleSeconds}
              openSubtitleSettings={openSubtitleSettings}
              setOpenSubtitleSettings={setOpenSubtitleSettings}
              enableSubtitle={enableSubtitle}
              setEnableSubtitle={setEnableSubtitle}
              onVideoFinishWatching={onVideoFinishWatching}
            />
            <motion.div
              className="absolute top-[40px] left-[40px] cursor-pointer flex justify-between flex-wrap w-[calc(100%-80px)] gap-y-4"
              initial={{ y: -150 }}
              animate={{ y: 0, transition: { duration: 0.2, type: "tween" } }}
              exit={{ y: -150, transition: { duration: 0.2, type: "tween" } }}
              onClick={() => {
                handleFullScreen(true);
                navigate(-1);
              }}
            >
              <motion.span
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-[30px]"
              >
                <BackIcon size={30} color="white" />
              </motion.span>
              <div className="title select-none">
                {videoList?.items?.find((video) => video.guid === id)?.title}
              </div>
              <span className="w-[30px]"></span>
            </motion.div>
          </>
        )}
        {showPlayButton && !isLoading && (
          <div
            key="pauseplay"
            className="w-full h-full flex items-center justify-center absolute top-0 left-0"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="bg-gray-900/50 p-5 rounded-full"
            >
              {playing ? (
                <PlayIcon size={100} color="white" />
              ) : (
                <PauseIcon size={100} color="white" />
              )}
            </motion.div>
          </div>
        )}

        {subtitleText && enableSubtitle && (
          <motion.div
            key="subtitle"
            className="absolute bottom-[14%] left-0 w-full text-center text-white text-2xl  p-2"
          >
            <pre>{subtitleText}</pre>
          </motion.div>
        )}
      </AnimatePresence>

      {isLoading && (
        <div className="w-full h-full flex items-center justify-center absolute top-0 left-0 bg-black bg-opacity-90">
          <LoadingIcon size={100} color="white" />
        </div>
      )}
    </motion.div>
  );
};

export default VideoPlayer;
