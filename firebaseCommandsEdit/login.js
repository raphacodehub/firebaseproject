"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const _ = require("lodash");
const clc = require("colorette");
const command_1 = require("../command");
const logger_1 = require("../logger");
const configstore_1 = require("../configstore");
const utils = require("../utils");
const error_1 = require("../error");
const prompt_1 = require("../prompt");
const auth = require("../auth");
const utils_1 = require("../utils");
exports.command = new command_1.Command("login")
    .description("log the CLI into Firebase")
    .option("--no-localhost", "login from a device without an accessible localhost")
    .option("--reauth", "force reauthentication even if already logged in")
    .action(async (options) => {
    const user = options.user;
    const tokens = options.tokens;
    if (user && tokens && !options.reauth) {
        logger_1.logger.info("Already logged in as", clc.bold(user.email));
        return user;
    }
    const useLocalhost = (0, utils_1.isCloudEnvironment)() ? false : options.localhost;
    const result = await auth.loginGoogle(useLocalhost, _.get(user, "email"));
    configstore_1.configstore.set("user", result.user);
    configstore_1.configstore.set("tokens", result.tokens);
    configstore_1.configstore.set("loginScopes", result.scopes);
    configstore_1.configstore.delete("session");
    logger_1.logger.info();
    if (typeof result.user !== "string") {
        console.log(`email ${result.user.email}`);
    }
    else {
        logger_1.logger.debug("Unexpected string for UserCredentials.user. Maybe an auth response JWT didn't parse right?");
        utils.logSuccess("Success! Logged in");
    }
    return auth;
});
