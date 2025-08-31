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

 1.Fork this repo
 2.Create a new branch:
````
git checkout -b feature/your-feature
````
3.Commit changes:
````
git commit -m "Add new feature"
````
4.Push branch:
````
git push origin feature/your-feature
````
5.Open a Pull Request 🎉

### 4. Screenshot

<img width="439" height="1016" alt="Ekran görüntüsü 2025-08-31 193410" src="https://github.com/user-attachments/assets/919d13cb-df33-478b-b836-dbbe55db5237" />
<img width="442" height="1013" alt="Ekran görüntüsü 2025-08-31 193422" src="https://github.com/user-attachments/assets/83dd2ab1-d0b5-44f6-b3b4-515a2a2d9373" />
<img width="445" height="1014" alt="Ekran görüntüsü 2025-08-31 193436" src="https://github.com/user-attachments/assets/8cb5c0b3-caea-4401-8c0a-7e437ddaf9a6" />
<img width="445" height="1009" alt="Ekran görüntüsü 2025-08-31 193444" src="https://github.com/user-attachments/assets/2681eee3-c0ae-4d3b-9b41-6909598a09ec" />
<img width="443" height="1012" alt="Ekran görüntüsü 2025-08-31 193456" src="https://github.com/user-attachments/assets/9c0c4ae9-118d-4315-8901-17fa41458e43" />
<img width="448" height="1009" alt="Ekran görüntüsü 2025-08-31 193506" src="https://github.com/user-attachments/assets/6df9060d-44bf-4a16-be11-b3a83edd8eeb" />
<img width="444" height="1012" alt="Ekran görüntüsü 2025-08-31 193519" src="https://github.com/user-attachments/assets/7bb4d581-2c26-49a0-b151-2bf729da2011" />
<img width="444" height="1016" alt="Ekran görüntüsü 2025-08-31 195616" src="https://github.com/user-attachments/assets/15e81b6c-0f1a-4a19-9a3b-3c8a7502f302" />
<img width="443" height="1012" alt="Ekran görüntüsü 2025-08-31 195630" src="https://github.com/user-attachments/assets/1fc8bddd-1253-4ed8-ac34-f10cfb511b1f" />
<img width="445" height="1014" alt="Ekran görüntüsü 2025-08-31 195639" src="https://github.com/user-attachments/assets/5327ae1c-f346-4db0-b527-7a7defd56c7d" />
<img width="440" height="1008" alt="Ekran görüntüsü 2025-08-31 195649" src="https://github.com/user-attachments/assets/01cc8d47-901a-44ce-9974-b672b52c8853" />
<img width="444" height="1012" alt="Ekran görüntüsü 2025-08-31 195657" src="https://github.com/user-attachments/assets/5d016d80-c5ed-49f4-85c4-5dc81a2dcee0" />
<img width="442" height="1009" alt="Ekran görüntüsü 2025-08-31 195706" src="https://github.com/user-attachments/assets/0683172e-15c3-4fd1-b978-62a68822b1e2" />
<img width="441" height="1009" alt="Ekran görüntüsü 2025-08-31 195715" src="https://github.com/user-attachments/assets/da1addf5-e922-4e16-957e-4bb9fe073bae" />
<img width="445" height="1009" alt="Ekran görüntüsü 2025-08-31 195728" src="https://github.com/user-attachments/assets/dd2ee73b-655f-4637-a8d4-ea3dfce325b9" />
<img width="447" height="1011" alt="Ekran görüntüsü 2025-08-31 195842" src="https://github.com/user-attachments/assets/146e4950-20a8-4ac2-af01-559743868ca6" />







