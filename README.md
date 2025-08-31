# 🏀🏸 Scoreboard Web Applications  

This repository contains **two real-time scoreboard systems**:  
- **Basketball Scoreboard**
- **Badminton Multi-Court Scoreboard**

Both use a **display page** (for projection) and a **control panel** (for staff/officials), synchronized live via **WebSockets**.  

---

## 🏀 Basketball Scoreboard  

### 📺 Display Page  
- Team names, scores, game clock, period, fouls  
- Optional team logos and looped sponsor video  
- LED-inspired high-contrast design  

### 🎛 Control Panel  
- Update team names, scores (+/-1,2,3), fouls, period  
- Control game clock (set, start, pause, reset)  
- Reset game state, upload team logos, upload loop video  
- Tablet-friendly layout with password protection  

---

## 🏸 Badminton Scoreboard (8 Courts)  

### 📺 Display Page  
- Grid showing up to **8 courts** (configurable)  
- Each court: player names, current score, games won  
- LED-style design with color-coded digits  

### 🎛 Control Panel  
- Manage **1–8 active courts**  
- Update player names, scores (+/-1), games (+/-G)  
- Reset score only or reset entire court  
- Reset all courts with one action  
- Responsive layout, optimized for tablets  

---

## 🚀 Features (Shared)  
- Real-time synchronization between display & control  
- LED-inspired UI, mobile/tablet friendly  
- Local server via **Node.js + Express + WebSockets**  
- Packaged into a standalone **Windows executable** (`pkg`)  

---

## 🏗 Tech Stack  
- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Node.js + Express + WebSocket (WS)  
- **Deployment:** Local server, LAN, or packaged `.exe`  

---

## ⚡ Workflow  
1. Officials open the **Control Panel** on a laptop/tablet.  
2. Update player/team names, scores, and game states.  
3. Changes sync instantly to the **Display Page**.  
4. Display page is projected on a big screen for the audience.  

---

## 📸 Screenshots  

### Basketball  

![Basketball Display](https://raw.githubusercontent.com/manuvarkey/scoreboard-webapp/refs/heads/main/images/basketball_display.png)  
![Basketball Control](https://raw.githubusercontent.com/manuvarkey/scoreboard-webapp/refs/heads/main/images/basketball_control.png)  

### Badminton  

![Badminton Display](https://raw.githubusercontent.com/manuvarkey/scoreboard-webapp/refs/heads/main/images/badminton_display.png)  
![Badminton Control](https://raw.githubusercontent.com/manuvarkey/scoreboard-webapp/refs/heads/main/images/badminton_control.png)  
