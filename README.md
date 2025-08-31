# 🚇 Raygo – Rail System Guide Mobile App

**Raygo** is an open-source mobile application designed as a **rail system guide**, initially focusing on Istanbul metro lines, with plans to expand to other rail systems and cities.  
It is built with **React Native (CLI) + TypeScript**, and integrates **Firebase Authentication/Firestore**, **Google Maps SDK**, and optionally **Google Places API**.

---

## ✨ Features

- 📱 **Onboarding flow** (`Onboarding1–4.tsx`)
- 🔐 **Register / Login** (Firebase Auth + Firestore)
  - Gmail-only registration
  - Strong password policy (min. 8 chars, A-Z, a-z, 0-9, special character)
  - Privacy policy agreement required
- 🗺️ **City selection** (`CitySelect.tsx`) and **route screens** (`RouteSelect.tsx`, `RouteResult.tsx`)
- 📍 **Places screen** (`Places.tsx`) with Google Places API integration
- 🗺️ **Map rendering** using Google Maps SDK
- ⚡ **User data stored in Firestore**

---

## 📌 Current Status & Limitations

- The project is currently **frontend-focused**.  
- UI screens for Onboarding, Login/Register, CitySelect, RouteSelect, RouteResult, and Places are implemented.  
- **Backend/datasets** (Istanbul districts, metro lines, stations, and route calculation engine) are **not yet integrated**.  
- Firestore is currently used only for **user data** (registration & login).  
- Future plans include adding datasets and APIs for rail system data and route calculation.

---

## 📂 Project Structure

RAYGO_APP/
├── android/
├── ios/
├── assets/
├── src/
│ ├── constants/ # Colors, fonts, styles
│ ├── data/ # Example metro data (m1.json)
│ ├── navigation/ # AppNavigator (React Navigation)
│ ├── screens/ # UI screens
│ └── services/ # Firebase initialization
├── App.tsx
├── index.js
└── README.md


---

## 🔧 Prerequisites

- Node.js 18+
- Java 17 (for Android)
- Android Studio + SDK/Emulator
- Xcode (for iOS, on macOS)
- Firebase project (Auth + Firestore enabled)

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/emineugurlu/raygo-app
cd raygo-app
```
---

### 2.Install dependencies

npm install
# or
yarn install

### 3. Firebase setup

In Firebase Console, enable Email/Password in Authentication.

Create a Firestore database.

Download google-services.json → place it in android/app/

Download GoogleService-Info.plist → place it in ios/

Update src/services/firebase.js with your config if needed.

### . Google Maps/Places API keys

⚠️ Important: API keys are not stored in this repo.
They must be configured locally.

Android
In android/app/src/main/AndroidManifest.xml:
<meta-data
  android:name="com.google.android.geo.API_KEY"
  android:value="${GOOGLE_MAPS_API_KEY}" />
  
In android/app/build.gradle:
defaultConfig {
    ...
    manifestPlaceholders = [
        GOOGLE_MAPS_API_KEY: project.hasProperty("MAPS_API_KEY") ? MAPS_API_KEY : ""
    ]
}

Local android/local.properties (ignored by git):
MAPS_API_KEY=AIzaSy...yourKey...

In ios/<AppName>/Info.plist:
<key>GOOGLE_MAPS_API_KEY</key>
<string>$(GOOGLE_MAPS_API_KEY)</string>

In ios/Config/Debug.xcconfig / Release.xcconfig (gitignored):
GOOGLE_MAPS_API_KEY = AIzaSy...yourKey...

Places (REST API)

Add to .env (gitignored):
GOOGLE_PLACES_API_KEY=AIzaSy...yourKey...

▶️ Running the App

Start Metro Bundler:
````
npx react-native start
````
Run on Android:
````
npx react-native run-android
````
Run on iOS (macOS only):
````
cd ios && pod install && cd ..
npx react-native run-ios

````

🧰 Troubleshooting

EADDRINUSE: 8081 already in use
````
taskkill /F /IM node.exe   # Windows
# or start Metro on another port:
npx react-native start --port 8082 --reset-cache
````
No online devices / emulator offline
````
adb kill-server && adb start-server && adb devices
````
If still offline → Android Studio → Device Manager → Cold Boot Now

[firestore/unavailable]

  Check internet connection in emulator

  Ensure google-services.json is correct

  Check Firebase console for project setup

auth/wrong-password / invalid-credential

  Verify email/password match

permission-denied

  Update Firestore Rules accordingly

🔑 API Key Security

This repo does not contain any API keys.
The following files must be ignored:
````
.env
.env.*
android/local.properties
ios/Config/*.xcconfig
android/app/google-services.json
ios/**/GoogleService-Info.plist
````
🛣️ Roadmap / TODO

 Add full Istanbul metro lines & stations dataset
 Implement route calculation (duration, transfers)
 Add backend/proxy for Places API (hide keys from client)
 Localization (TR/EN)
 Analytics, Crashlytics, automated tests
 iOS build documentation
👥 Contributing

 Fork this repo
 Create a new branch:
