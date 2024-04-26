export const fetchSubtitle = async (fileName: string) => {
  try {
    const response = await fetch(
      `https://storage.bunnycdn.com/${process.env.STORAGE_NAME}/subtitles/${fileName}.srt`,
      {
        headers: {
          AccessKey: "{accessKey}",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return [response.blob(), null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
};
