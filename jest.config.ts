export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },

  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "^.+\\.svg$": "jest-transformer-svg",
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  coverageDirectory: "<rootDir>/coverage/",
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/.node/",
    "/jest/",
    "/src/main.tsx",
  ],
  collectCoverage: true,
  collectCoverageFrom: ["./src/**"],
  coverageThreshold: {
    global: {
      statements: 94.42,
      branches: 79.62,
      functions: 92.45,
      lines: 94.47,
    },
  },
};
