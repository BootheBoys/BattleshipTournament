---
layout: default
title: Battleship Tournament Readme
description: Readme for the main repo
---

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
   cd frontend
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
1. **Log in Using Bama Email**: The system uses University of Alabama-issued emails for login information and storing user profiles.
2. **Upload AI Bots**: Users upload their AI-controlled Battleship bots (via file selection or drag-and-drop), which are stored as part of their profile.
3. **Simulated Battles as tournaments**: The system runs a step-by-step simulation on a **10x10 grid**, marking hits and misses. It does this multiple times to allow bots to run against each other in a tournament format.
4. **Live Feedback**: The UI updates dynamically to indicate progress, success, or failure.
5. **Results & Analysis**: Once the battle is over, users get feedback on their bot's performance.

## 📸 Screenshots
![image](https://github.com/user-attachments/assets/fd7e43b9-9a3e-491f-92f6-44022fb59aab)


---

💡 **Upload your AI bots and let them battle it out!** ⚔️🤖🚢


**On Website Documentation:**
```
Getting Started with Battleship AI
Learn how to create your first Battleship AI bot

Prerequisites
Basic knowledge of Python
A python interpreter installed in your device
A GitHub account (optional, for version control)
Step 1: Create a Bot File
The bot file should be able to do two different things:
Initialize the board, which includes placing 5 different ships in 10x10 grid, and print the board
Print a move, given the current board status and the list of previous moves
The bot script should accept command line arguments, where the arguments differs depending on whether it’s asked to initialize the board or return the next move
Initialize the board: It should be able to accept 1 command line argument. The command line argument is:
String 'Initialize'
Return a move: It should be able to accept 3 command line arguments. The command line arguments are:
Ship grid as a string: This grid contains the status of the bot's ship
Attack grid as a string: This grid contains the status of the all hits/misses of previous moves on a grid
List of previous moves of the bot as a string

Here's a basic template:

import sys
import random

def get_ships():
    ships = [
        ("Carrier", "A1", "A2", "A3", "A4", "A5"),
        ("Battleship", "B2", "C2", "D2", "E2"),
        ("Cruiser", "C3", "D3", "E3"),
        ("Submarine", "D6", "E6", "F6"),
        ("Destroyer", "E7", "E8")
    ]

    # Create the rows for each ship
    rows = [",".join(ship) for ship in ships]
    
    # Join rows with newlines
    result = "
".join(rows)

    return result

# Check if the first command-line argument is "initialize"
if len(sys.argv) > 1 and sys.argv[1].lower() == "initialize":
    print(get_ships())
else:
    # Generate a random character from 'A' to 'J'
    moves_str = sys.argv[3]
    moves_list = moves_str.split(" ")

    while True:
        random_char = chr(random.randint(ord('A'), ord('J')))

        # Generate a random digit from '1' to '10'
        random_digit = random.randint(1, 10)

        move = random_char + str(random_digit)

        if move in moves_list:
            continue
        else:
            print(move)
            break
Step 2: Test Your Bot Locally
Test your bot locally by providing valid command line arguments

Step 3: Upload Your Bot
Once you're satisfied with your bot, upload it to our platform:

Go to the Upload page
Enter your bot's name and description
Upload your bot file or paste your code
Submit your bot
Step 4: Join Tournaments
Your bot will automatically be eligible for upcoming tournaments. You can also manually register for specific tournaments on the Tournaments page.
```