const logger = {
    writeFile: false,
    logLevel: "info",
    logPath: "./logs",
    info: function (message) {
        console.log(this._format(message));
    },
    debug: function (message) {
        console.log(this._format(message));
    },
    error: function (message) {
        console.error(this._format(message));
    },
    _format: (message) => {
        if (typeof message === "object")
            message = JSON.stringify(message, null, 2);
        return message;
    },
    _writeLog: async (message) => {
        if (!this.writeFile) return; // guard

        const fs = await import("fs");
        const path = await import("path");

        const __dirname = path.dirname(new URL(import.meta.url).pathname);
        const logPath = path.join(__dirname, logger.logPath);
        const logFile = path.join(
            logPath,
            `${new Date().toISOString().split("T")[0]}.log`,
        );

        const exists = await fs.promises.access(logPath, fs.constants.F_OK); // since this is a perm check this probably isnt the best idea

        if (!exists) await fs.promises.mkdir(logPath, { recursive: true });

        await fs.promises.appendFile(
            logFile,
            `${new Date().toISOString()} ${message}\n`,
        );
    },
};
export default logger;
