export function getSubtitleForProgress(progressInSeconds, srtText) {
  if (!srtText || srtText.trim() === "") {
    return null;
  }
  try {
    const lines = srtText.split(/\n\s*\n/);

    const progressInMiliseconds = progressInSeconds * 1000;

    for (let line of lines) {
      const [_, timestamp, ...lines] = line.split("\n");
      const [start, end] = timestamp.split(" --> ");
      const startTime = getMiliseconds(start);
      const endTime = getMiliseconds(end);

      if (startTime > progressInMiliseconds) {
        return null;
      }

      if (
        progressInMiliseconds >= startTime &&
        progressInMiliseconds <= endTime
      ) {
        return {
          text: lines.join("\n"),
          duration: endTime - startTime,
        };
      }
    }
  } catch (err) {
    console.error(err);
  }

  return null;
}
function getMiliseconds(time) {
  const [hours, minutes, secondsAndMilliseconds] = time.split(":");
  const [seconds, milliseconds] = secondsAndMilliseconds.split(",");
  const totalMilliseconds =
    parseInt(hours) * 3600000 +
    parseInt(minutes) * 60000 +
    parseInt(seconds) * 1000 +
    parseInt(milliseconds);
  return totalMilliseconds;
}
