# 🚇 Raygo: Intelligent Rail System Guide & Urban Navigator

> **"A high-performance, open-source mobile ecosystem designed to simplify urban rail transit. Built with React Native CLI and TypeScript, Raygo integrates real-time geospatial data with secure cloud infrastructure."**

![Framework](https://img.shields.io/badge/Framework-React%20Native%20CLI-61dafb?style=for-the-badge&logo=react)
![Language](https://img.shields.io/badge/Language-TypeScript-3178c6?style=for-the-badge&logo=typescript)
![Backend](https://img.shields.io/badge/Backend-Firebase-ffca28?style=for-the-badge&logo=firebase)
![Platform](https://img.shields.io/badge/Platform-Android-black?style=for-the-badge)

Raygo is more than a transit app; it is a scalable framework for urban mobility. Initially focused on Istanbul’s complex metro network, it utilizes a robust **React Native** architecture to provide seamless navigation, location-based services, and secure user management. 

---

## 🚀 Engineering Excellence

This project showcases professional-grade mobile development standards:

*   **Modular Navigation & Flow:** Implementing complex navigation stacks with **React Navigation**, including a multi-stage **Onboarding Engine** (`Onboarding1–4.tsx`) to enhance user retention.
*   **Geospatial Intelligence:** Seamless integration of **Google Maps SDK** for spatial rendering and **Google Places API** for dynamic Point of Interest (POI) discovery.
*   **Secure Infrastructure:** Leveraging **Firebase Authentication** with a strict security policy and **Cloud Firestore** for real-time user state persistence.
*   **Type-Safe Development:** Fully written in **TypeScript** to ensure code reliability and maintainability across large-scale mobile components.
*   **Environment Security:** Implementation of secure API key management via `.env` and native configuration files (Xccodes/Gradle) to prevent credential leakage.

## ✨ Core Features

*   🔐 **Identity Management:** Secure Gmail-based registration with enforced strong password policies and privacy compliance.
*   🗺️ **Dynamic Urban Routing:** City selection and route visualization logic designed for multi-system scalability.
*   📍 **Smart Places:** Integrated search functionality for local landmarks and stations.
*   🎨 **Modern UI/UX:** A clean, typography-driven interface optimized for high-speed navigation and accessibility.

## 📸 Interface Showcase

| **Onboarding & Entry** | **Authentication** | **City & Route Selection** |
| :--- | :--- | :--- |
| ![Onboarding](https://github.com/user-attachments/assets/919d13cb-df33-478b-b836-dbbe55db5237) | ![Login](https://github.com/user-attachments/assets/9c0c4ae9-118d-4315-8901-17fa41458e43) | ![City](https://github.com/user-attachments/assets/15e81b6c-0f1a-4a19-9a3b-3c8a7502f302) |
| ![Start](https://github.com/user-attachments/assets/83dd2ab1-d0b5-44f6-b3b4-515a2a2d9373) | ![Register](https://github.com/user-attachments/assets/6df9060d-44bf-4a16-be11-b3a83edd8eeb) | ![Route](https://github.com/user-attachments/assets/1fc8bddd-1253-4ed8-ac34-f10cfb511b1f) |

---

## 🛠️ Installation & Setup

### 1. Prerequisites
*   Node.js 18+ / Java 17 (Android) / Xcode (iOS)
*   A Firebase Project with Auth & Firestore enabled.

### 2. Getting Started
```bash
git clone [https://github.com/emineugurlu/raygo-app](https://github.com/emineugurlu/raygo-app)
cd raygo-app
npm install
````

### 3.Native Configuration

Android: Place google-services.json in android/app/.

iOS: Place GoogleService-Info.plist in ios/.

API Keys: Configure MAPS_API_KEY in local.properties (Android) and Info.plist (iOS).

### 4.Run the Engine

 # Start Metro
 ````bash
npx react-native start
````
# Launch Platform
````bash
npx react-native run-android # or run-ios
````

📂 Architecture Overview

src/navigation/: AppNavigator logic.

src/screens/: High-fidelity UI components.

src/services/: Firebase & API orchestrators.

src/constants/: Unified design tokens (colors, fonts).

Developed by Emine Uğurlu - Computer Engineer. Pioneering urban mobility through code.
