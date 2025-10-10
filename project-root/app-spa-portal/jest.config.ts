import { Config } from "jest";

const config: Config = {
    preset: "jest-preset-angular",
    setupFilesAfterEnv: ["<rootDir>/src/setup-jest.ts"],
    moduleDirectories: ["node_modules", "<rootDir>"],
    testMatch: ["**/+(*.)+(spec).+(ts)"], // +(spec|test)
    testEnvironment: 'jest-environment-jsdom', // Added to support DOM APIs
};

export default config;
