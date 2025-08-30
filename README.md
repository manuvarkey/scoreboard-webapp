## 🏀 Basketball Scoreboard Web Application  

This project is a **web-based scoreboard system for basketball games**, designed for community sports facilities, schools, and tournaments.  

The system provides:  
- A **display page** for showing the scoreboard on a big screen.  
- A **control panel** for administrators or officials to update game details in real-time.  

---

### 📺 Display Page  
- Optimized for projection on a big screen or monitor.  
- Shows live game information, including:  
  - **Team names**  
  - **Scores** (highlighted in LED-style)  
  - **Game clock** (start, pause, reset)  
  - **Period/quarter**  
  - **Fouls**  
  - **Team logos** (optional)  
  - **Looped video** between team blocks (optional for sponsor ads, animations, etc.)  
- Designed with a **high-contrast layout** for maximum visibility.  
- Updates automatically via WebSocket connection.  

---

### 🎛 Control Panel  
- Provides an easy-to-use interface for officials or staff.  
- Features include:  
  - Update **team names**  
  - Adjust **scores** (+1, +2, +3, or -1, -2, -3 for corrections)  
  - Manage **fouls** and **period number**  
  - Control the **game clock** (set custom time, start, pause, reset)  
  - Reset the entire game state  
  - Upload **team logos**  
  - Upload a **loop video** for the display screen  
- Designed for **tablet-friendly use**, with clear, touch-friendly buttons.  
- Protected by **password-based access control**.  

---

### 🚀 Features  
- Real-time synchronization between **control panel** and **display page** using WebSockets.  
- **LED-inspired design** for authentic scoreboard look.  
- **Mobile-responsive control panel** for use on tablets and phones.  
- Customizable team branding (logos) and video loop support.  
- Runs on a **local Node.js + Express server**, with static file serving for assets.  
- Can be bundled into a **single Windows executable** for deployment without Node.js installation.  

---

### 🏗 Tech Stack  
- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Node.js + Express + WebSocket (WS)  
- **File Uploads:** Multer (saves logos and loop video to `/uploads/`)  
- **Deployment:** Local server, LAN, or packaged `.exe` (via `pkg`)  

---

### ⚡ Workflow  
1. Officials open the **Control Panel** on a laptop/tablet.  
2. Enter team names, upload logos/video, and set the game clock.  
3. During the game, staff update scores, fouls, and clock via the control panel.  
4. The **Display Page** reflects updates instantly on the facility’s screen.
   

## Screenshots

### Basketball

![Display page screenshot](https://raw.githubusercontent.com/manuvarkey/scoreboard-webapp/refs/heads/main/images/basketball_display.png)

![Control page screenshot](https://raw.githubusercontent.com/manuvarkey/scoreboard-webapp/refs/heads/main/images/basketball_control.png)
