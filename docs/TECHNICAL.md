*Last update: 23 July 2020*

#### Overview

(placeholder)

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

(placeholder)

##### Expo

(placeholder)

##### React-Native

(placeholder)

###### React

(placeholder)

##### Redux

(placeholder)

##### Jest

(placeholder)

#### File system

|            Directory            | Content |
|:-------------------------------:|:--------|
| package.json, package-lock.json | These do list the packages our project depends on. |
| app.json                        | This file is our go-to place for configuring parts of our app that don't belong in code. It configures many things, from our app name to icon to splash screen and even deep linking scheme and API keys to use for some services. |
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
TypeScript,
Testing,
GitHub Actions,
Navigation,
SQLite
