import { VideoLibrary, VideoList } from "./types";

export const fetchVideoLibrary = async (
  accessToken: string
): Promise<VideoLibrary> => {
  const options = {
    method: "GET",
    headers: { accept: "application/json", AccessKey: accessToken },
  };

  try {
    const response = await fetch(
      `https://api.bunny.net/videolibrary/${
        import.meta.env.VITE_BUNNY_LIBRARY_ID
      }?includeAccessKey=false`,
      options
    );
    const data: VideoLibrary = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return {} as VideoLibrary;
  }
};

interface CollectionReponse {
  items: Collection[];
}

export interface Collection {
  videoLibraryId: number;
  guid: string;
  name: string;
  videoCount: number;
  totalSize: number;
  previewVideoIds: any;
  previewImageUrls: any[];
}

export const fetchCollections = async (
  accessToken: string
): Promise<Collection[]> => {
  const options = {
    method: "GET",
    headers: { accept: "application/json", AccessKey: accessToken },
  };

  try {
    const response = await fetch(
      `https://video.bunnycdn.com/library/${
        import.meta.env.VITE_BUNNY_LIBRARY_ID
      }/collections`,
      options
    );
    const data: CollectionReponse = await response.json();
    return data.items;
  } catch (err) {
    console.error(err);
    return [] as Collection[];
  }
};

export const fetchVideos = async (accessToken: string): Promise<VideoList> => {
  const options = {
    method: "GET",
    headers: { accept: "application/json", AccessKey: accessToken },
  };

  try {
    const response = await fetch(
      `https://video.bunnycdn.com/library/${
        import.meta.env.VITE_BUNNY_LIBRARY_ID
      }/videos?page=1&itemsPerPage=100&orderBy=date`,
      options
    );
    const data: VideoList = await response.json();
    constructThumbnailsAndPreview(data.items);
    return data;
  } catch (err) {
    console.error(err);
    return {} as VideoList;
  }
};

const constructThumbnailsAndPreview = (data: any) => {
  data.forEach((video: any) => {
    video.thumbnail = `${import.meta.env.VITE_BUNNY_STREAM_URL}/${video.guid}/${
      video.thumbnailFileName
    }`;
    video.preview = `${import.meta.env.VITE_BUNNY_STREAM_URL}/${
      video.guid
    }/preview.webp`;
  });
};

export const getVideo = async (accessToken: string) => {
  const options = {
    method: "GET",
    headers: { accept: "application/json", AccessKey: accessToken },
  };

  try {
    const response = await fetch(
      `https://video.bunnycdn.com/library/${
        import.meta.env.VITE_BUNNY_LIBRARY_ID
      }/videos?page=1&itemsPerPage=100&orderBy=date`,
      options
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
};
