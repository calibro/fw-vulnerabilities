module.exports = {
  publicPath:
    process.env.NODE_ENV === "production"
      ? //? `${process.cwd()}/dist/`
        `/fw-vulnerabilities/`
      : "/",
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: "FW Vulnerabilities",
        mac: {
          icon: "build/mac-icon.png"
        },
        win: {
          icon: "build/win-icon.png"
        }
      }
    }
  }
};
