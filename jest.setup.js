if (!process.env.LISTENING_TO_UNHANDLED_REJECTION) {
  process.on("unhandledRejection", (reason) => {
    console.log("REJECTION", reason);
    // throw reason;
  });
  process.env.LISTENING_TO_UNHANDLED_REJECTION = true;
}
