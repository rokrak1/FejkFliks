import { create } from "zustand";
import { VideoList } from "../service/types";
import {
  Collection,
  fetchCollections,
  fetchVideoLibrary,
  fetchVideos,
} from "../service/video";
import { IUser } from "../store/AuthProvider";
import { supabase } from "../config/supabase";

interface DataStore {
  videoList: VideoList;
  collections: Collection[];
  libraryApiKey: string;
  setLibraryApiKey: (libraryApiKey: string) => void;
  setVideoList: (videoList: VideoList) => void;
  setCollections: (collections: Collection[]) => void;
  initializeData: (user: IUser) => Promise<void>;
  fetchVideoInfo: (
    videoList: VideoList,
    updateState?: boolean
  ) => Promise<VideoList>;
}

interface IVideoInfo {
  created_at: string;
  id: string;
  playedSeconds: number;
  video_id: string;
  user_id: string;
}

export const useDataStore = create<DataStore>((set, get) => ({
  videoList: {} as VideoList,
  collections: [],
  libraryApiKey: "",
  watchedVideosInfo: {},
  setVideoList: (videoList) => set({ videoList }),
  setLibraryApiKey: (libraryApiKey) => set({ libraryApiKey }),
  setCollections: (collections) => set({ collections }),

  initializeData: async (user: IUser) => {
    if (get().videoList.items?.length > 0) return;

    // Fetch video library
    try {
      const videoLibrary = await fetchVideoLibrary(user!.userData.bunny_token);
      get().setLibraryApiKey(videoLibrary.ApiKey);
    } catch (error) {
      console.log(error);
    }

    // Fetch collections
    try {
      const collections = await fetchCollections(get().libraryApiKey);
      get().setCollections(collections);
    } catch (error) {
      console.log(error);
    }

    // Fetch videos
    let videos = {} as VideoList;
    try {
      videos = await fetchVideos(get().libraryApiKey);

      // Fetch user watched videos info
      videos.items.forEach((video) => {
        video.title = video.title.split(".").join(" ");
      });
      try {
        videos = await get().fetchVideoInfo(videos);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ videoList: videos });
    }
  },
  fetchVideoInfo: async (videoList: VideoList, updateState: boolean) => {
    let response = await supabase.from("video_info").select("*");
    let watchedVideos: IVideoInfo[] = response.data;

    watchedVideos.forEach((videoInfo) => {
      const watchedVideoId = videoInfo.video_id;
      const video = videoList.items?.find(
        (video) => video.guid === watchedVideoId
      );
      if (video) {
        video.playedSeconds = videoInfo.playedSeconds;
        video.hasFinished =
          video.length - videoInfo.playedSeconds < 5 ? true : false;
        video.continueWatching = video.hasFinished ? false : true;
        video.infoId = videoInfo.id;
      }
    });
    if (updateState) set({ videoList });
    return videoList;
  },
}));
