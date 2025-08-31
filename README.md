# 🚇 Raygo – Rail System Guide Mobile App

**Raygo** is an open-source mobile application designed as a **rail system guide**, initially focusing on Istanbul metro lines, with plans to expand to other cities.  
It is built with **React Native (CLI) + TypeScript**, and integrates **Firebase Authentication/Firestore**, **Google Maps SDK**, and optionally **Google Places API**.

---

## ✨ Features

- 📱 **Onboarding flow** (`Onboarding1–4.tsx`)
- 🔐 **Register / Login** (Firebase Auth + Firestore)
  - Gmail-only registration
  - Strong password policy (min. 8 chars, A-Z, a-z, 0-9, special)
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


---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/emineugurlu/raygo-app
cd raygo-ap


## 📂 Project Structure

