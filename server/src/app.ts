import "dotenv/config";
import app from "./main";

// Function to start the server
const startServer = async () => {
  try {
    //@ts-ignore
    if (typeof PhusionPassenger !== "undefined") {
      //@ts-ignore
      PhusionPassenger.configure({ autoInstall: false });
      await app.listen("passenger");
    } else {
      await app.listen(8000);
    }
    console.log("Server started on port 8000");
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
};

// Starting the server
startServer();
