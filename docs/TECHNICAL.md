*Last update: 24 July 2020*

#### Overview

Manage more, be notified, waste less, be conscious.
This app does help you with keeping track of your perishable foods by notifications, etc. Moreover you can share these goods with others if you think.

##### Parameters

|               Key                |          Default value          | Description |
|:---------------------------------|:-------------------------------:|-------------|
| init                             | false                           | Reset the application included cancelling all notifications, deleting each downloaded images, eviction of the cache and logging the user out. |
| serverUrl                        | "https://ivgraai.ddns.net/v1/"  | The backend's base uniform resource locator. |
| cache.imageEvictionFrequency     | "monthly"                       | Photos will not be downloaded again if their creation times are within this interval. |
| cache.data.enabled               | true                            | Determine whether mine and nearby goods has to be cached or not. (Note: it does handle only the reading operation so if this property is false it will still be writing the cache.) |
| cache.data.evictionFrequency     | "weekly"                        | How long these datas remain valid. |
| cache.data.latitudeThreshold     | 0.15                            | Nearby items have positions but the device's location is not always the same thus we allow a slight deviation to stay able to get goods. |
| cache.data.longitudeThreshold    | 0.15                            | This is the longitude delta of the previously defined region. |
| defaultCurrentPosition.latitude  | 51.509865                       | If the current position is not available then this is going to be the fallback value of it. |
| defaultCurrentPosition.longitude | -0.118092                       | Degree of longitude of London. |

##### Internationalization

Currently the application is available in English, Hungarian, French and Spanish languages.

File access paths:
 - `constants/languages/*.json`
Shipping our app to different countries, regions and want it to support various languages, we can provide localized strings for things like the display name and system dialogs. The full list of keys the platform provides by default can be seen [here](https://github.com/expo/expo/blob/master/exponent-view-template/ios/exponent-view-template/Supporting/Info.plist#L28-L41).
 - `constants/Dictionary.ts`
This is a type safe utility class. The i18n messages are defined as plain TypeScript objects with the following keys:
```
add, perishableGoods, setLocation, bestBefore, successfullyAdded, letsContinueWithOtherPerishableGood, cancel, okay, new, chooseAPhoto, expirationDate, pickedLocation, all, signUp, name, emailAddress, password, confirmPassword, submit, youHaveSuccessfullysignedUp, aProblemOccurredWhileCommunicatingWithTheServer, inOrderToMarkAsAvailableYouNeedToSignIn, signIn, or, pleaseEnterAName, pleaseEnterAPassword, passwordMustBeAtLeast6Characters, confirmPasswordMustBeEqualToPassword, pleaseEnterAnEmailAddress, pleaseEnterAValidEmailAddress, nearby, meter, showMyNeed, statusOfMyRequest, loading, inOrderToShowYourNeedYouHaveToSignIn, lookWhoRequestedThis, approve, goToSignIn, goToSignUp, leaveAMessage, egBreadMilkOrEggs, yourRequestHasNotYetBeenApproved, yourRequestHasAlreadyBeenApproved, username, address, reply, approved, pickADate, confirm, unsupportedStatus, unsupportedContent, yourGoodsAreNotFound, noGoodsAreAvailable, resultSetIsEmpty, pleaseEnterAnItem, expiryMustNotBeAPastDate
```

#### Software components

##### NPM

Node Package Manager is an online repository for the publishing of open-source Node.js projects and it is a command-line utility for interacting with said repository that aids in package installation, version management, and dependency management.
Used version: [6.10.1](https://www.npmjs.com/package/npm/v/6.10.1)

##### Expo

This is a framework and a platform for universal React applications. It is a set of tools and services built around React Native and native platforms that help us develop, build, deploy, and quickly iterate on iOS, Android, and web apps from the same JavaScript/TypeScript codebase.
Used version: [37.0.0](https://blog.expo.io/expo-sdk-37-is-now-available-dd5770f066a6)

##### React-Native

A framework for building native apps using React.
Used version: [0.61.4](https://github.com/expo/react-native/releases/tag/sdk-37.0.1)

###### React

Makes it painless to create interactive UIs. Design simple views for each state in our application, and React will efficiently update and render just the right components when our data changes.
Used version: [16.9.0](https://github.com/facebook/react/releases/tag/v16.9.0)

##### Redux

A predictable state container for JavaScript apps. It helps us write applications that behave consistently, run in different environments (client, server, and native), and are easy to test.
Used version: [4.0.5](https://github.com/reduxjs/redux/releases/tag/v4.0.5)

##### Jest

This is a JavaScript testing framework designed to ensure correctness of any JavaScript codebase. It allows you to write tests with an approachable, familiar and feature-rich API that gives you results quickly. Jest makes testing delightful.
Used version: [24.7.1](https://www.npmjs.com/package/jest/v/24.7.1)

#### File system

|            Directory            | Content |
|:-------------------------------:|:--------|
| package.json, package-lock.json | These do list the packages our project depends on. |
| app.json                        | This file is our go-to place for configuring parts of our app that don't belong in code. It configures many things, from our app name to icon to splash screen and even deep linking scheme and API keys to use for some services. |
| App.tsx                         | Entry point of the application. It contains other logics as well as requesting permissions and the initialization. |
| services/                       | Classes to support the view layer can be found here. Such as caching goods, database manipulation, HTTP client and storing the user's authorization token. |
| screens/                        | The React components are under this folder. |
| rsc/                            | Resources folder mainly with the Node.js mock server which is generated from Swagger. |
| navigation/                     | Navigation related definitions including eg. bottom tab navigator. |
| docs/                           | Readme, privacy policy and other documents are here. |
| coverage/                       | Collected and reported test coverage information. Open with `lcov-report/index.html` file. |
| constants/languages/            | See: [internationalization](#internationalization) |
| constants/redux/                | Location of redux integration. It consists of: types, actions, reducers and dispatchers/bindings. |
| constants/styles/               | Stylesheet for the views. |
| constants/validations/          | The validation constraints are declared in this folder. |
| constants/                      | Color and layout constants related to the user interface and the data transfer objects are here too. |
| components/                     | Reusable UI elements. For instance some of them are the `CachedImage` (download images only once) and `GoodList` (flat-listing goods), or there are the styled components (using the common theme). |
| common/                         | Domain independent useful codes. |
| assets/                         | Required fonts and images. |


---

#### Remaining topics

TypeScript,
Testing,
GitHub Actions,
Navigation,
SQLite
