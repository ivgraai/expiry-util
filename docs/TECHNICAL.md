#### Overview



##### Parameters

|               Key                |          Default value          | Description |
|:---------------------------------|:-------------------------------:|-------------|
| init                             | false                           | |
| serverUrl                        | "https://ivgraai.ddns.net/v1/"" | |
| cache.imageEvictionFrequency     | "monthly"                       | |
| cache.data.enabled               | true                            | |
| cache.data.evictionFrequency     | "weekly"                        | |
| cache.data.latitudeThreshold     | 0.15                            | |
| cache.data.longitudeThreshold    | 0.15                            | |
| defaultCurrentPosition.latitude  | 51.509865                       | |
| defaultCurrentPosition.longitude | -0.118092                       | |

#### Software components



#### File system

|            Directory            | Content |
|:-------------------------------:|:--------|
| package.json, package-lock.json | These do list the packages our project depends on. |
| app.json                        | This file is our go-to place for configuring parts of our app that don't belong in code. It configures many things, from your app name to icon to splash screen and even deep linking scheme and API keys to use for some services. |
| App.tsx                         | |
| services/                       | |
| screens/                        | |
| rsc/                            | |
| navigation/                     | |
| docs/                           | |
| coverage/                       | |
| constants/languages/            | |
| constants/redux/                | |
| constants/styles/               | |
| constants/validations/          | |
| components/                     | |
| common/                         | |
| assets/images/                  | |
| \_\_tests__/, \_\_mocks__/      | |


---
npm test
sonarqube
