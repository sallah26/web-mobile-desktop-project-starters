module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    '@electron-toolkit/eslint-config-ts/recommended',
    '@electron-toolkit/eslint-config-prettier'
  ],
  "plugins": ["boundaries"],
  "settings": {
    "boundaries/include": ["src/**/*"],
    "boundaries/elements": [
      {
        "mode": "full",
        "type": "shared",
        "pattern": [
          "src/config/**/*",
          "src/components/**/*",
          "src/assets/**/*",
          "src/data/**/*",
          "src/hooks/**/*",
          "src/lib/**/*",
          "src/server/**/*"
        ]
      },
      {
        "mode": "full",
        "type": "feature",
        "capture": ["featureName"],
        "pattern": ["src/features/*/**/*"]
      },
      {
        "mode": "full",
        "type": "app",
        "capture": ["_", "fileName"],
        "pattern": ["src/app/**/*"]
      },
      {
        "mode": "full",
        "type": "neverImport",
        "pattern": ["src/*", "src/tasks/**/*"]
      }
    ]
  },
  "rules": {
    "boundaries/no-unknown": ["error"],
    "boundaries/no-unknown-files": ["error"],
    "boundaries/element-types": [
      "error",
      {
        "default": "disallow",
        "rules": [
          {
            "from": ["shared"],
            "allow": ["shared"]
          },
          {
            "from": ["feature"],
            "allow": [
              "shared",
              ["feature", { "featureName": "${from.featureName}" }]
            ]
          },
          {
            "from": ["app", "neverImport"],
            "allow": ["shared", "feature"]
          },
          {
            "from": ["app"],
            "allow": [["app", { "fileName": "*.css" }]]
          }
        ]
      }
    ]
  }
}
