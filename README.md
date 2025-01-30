
# 🤖 Battleship AI Arena

**Battleship AI Arena** is a web-based platform where users can test their AI-powered Battleship bots against each other in a competitive environment. The frontend provides an interactive interface for uploading AI bots and visualizing their battle progress.

## 📌 Features
- **AI Bot Upload**: Users can upload their AI bots for battles.
- **Drag & Drop Support**: Easily upload bots via drag-and-drop or file selection.
- **Battle Visualization**: A 7x7 grid simulates the battle progress in real-time.
- **Live Status Updates**: Displays upload progress and battle results.
- **Custom Styling**: Dark-themed UI with Tailwind CSS.

## 🚀 Tech Stack
- **React (Next.js Client Components)**
- **TypeScript**
- **Tailwind CSS**
- **Lucide Icons**

## 📂 Project Structure
```
/project-root
│── pages/
│   ├── page.tsx         # Home page that renders the AI bot upload component
│── components/
│   ├── battleship-file-upload.tsx  # Main AI bot upload and battle visualization component
│── tailwind.config.js   # Tailwind CSS configuration
│── package.json         # Project dependencies
```

## 🛠 Installation & Setup

1. **Clone the repository**  
   ```sh
   git clone https://github.com/your-repo/battleship-ai-arena.git
   cd battleship-ai-arena
   ```

2. **Install dependencies**  
   ```sh
   npm install
   ```

3. **Start the development server**  
   ```sh
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Customization
Modify the `tailwind.config.js` file to customize the color scheme:
```js
extend: {
  colors: {
    navy: {
      700: "#1a2a3a",
      800: "#0f1a2a",
      900: "#060d14",
    },
  },
}
```

## 🎯 How It Works
1. **Upload AI Bots**: Users upload their AI-controlled Battleship bots (via file selection or drag-and-drop).
2. **Simulated Battles**: The system runs a step-by-step simulation on a **7x7 grid**, marking hits and misses.
3. **Live Feedback**: The UI updates dynamically to indicate progress, success, or failure.
4. **Results & Analysis**: Once the battle is over, users get feedback on their bot's performance.

## 📸 Screenshots
![image](https://github.com/user-attachments/assets/fd7e43b9-9a3e-491f-92f6-44022fb59aab)


---

💡 **Upload your AI bots and let them battle it out!** ⚔️🤖🚢
```
