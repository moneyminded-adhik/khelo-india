 India Active AI 🇮🇳🏅

From School Ground to Podium: An AI-Powered Olympic Training Ecosystem.

Built for the "India Active" initiative to democratize elite sports training in Tier-3 cities.

📖 Overview

India Active AI is a progressive web application (PWA) designed to solve the three biggest hurdles for rural Indian athletes: Lack of Coaching, Lack of Resources, and Lack of Visibility.

Unlike standard fitness trackers, this platform acts as a digital ecosystem that guides a student through a gamified career path—from grassroots village tournaments to National (SAI) selection.

steps to run the project:
# 1. Create a new React app
npx create-react-app india-active-ai

# 2. Go into the folder
cd india-active-ai

# 3. Install the required libraries (Lucide Icons & Recharts)
npm install lucide-react recharts

#### **Step 2: Add Tailwind CSS (Crucial for styling)**
The app uses Tailwind classes. You need to initialize it.

```bash
# 1. Install Tailwind
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

**Edit `tailwind.config.js`:**
Open this file in your project and replace `content: []` with:
```javascript
content: [
    "./src/**/*.{js,jsx,ts,tsx}",
],

**Edit `src/index.css`:**
Delete everything in this file and add:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

#### **Step 3: Add the App Code**
1.  Open `src/App.js` in your code editor.
2.  **Delete everything** inside it.
3.  **Paste the entire code block** provided above (File 1).
4.  Save the file.

#### **Step 4: Run the Demo**
Back in your terminal, run:
```bash
npm start
This will launch the app in your browser at `http://localhost:3000`. You can now use your screen recording tool to make the video!


🚀 Key Features

1. 👻 AI Ghost Mode (Computer Vision)

The core technical differentiator. The app uses a visual overlay of a "Pro Athlete's" biomechanics (The Ghost) on the user's camera feed.

Goal: Users align their skeleton with the Ghost to learn perfect form (e.g., Hurdle clearance angles).

Tech: Simulated pose estimation feedback loop.

2. 🛠️ The "Jugaad" Guide (Resource Optimization)

Recognizing the lack of gym infrastructure in rural India, this module provides DIY instructions.

Example: How to build hurdles using PVC pipes (Cost: ₹150) or weights using sandbags.

Impact: Removes the financial barrier to entry.

3. 🧬 Bio-Passport & Scouting

Generates a FIFA-style "Athlete DNA" radar chart.

Compares user metrics (Speed, Power, Agility) against National U-16 Averages.

Direct Scout Link: High-performing data sets are flagged for Sports Authority of India (SAI) review directly within the app.

4. 🏆 Hyper-Local Leaderboards

Gamification focused on "Village-level" rankings first, creating immediate, relatable competition before scaling to District/State levels.

🛠️ Technical Stack

Frontend: React.js

Styling: Tailwind CSS (Mobile-First Design)

Visualization: Recharts (Radar & Performance Analytics)

Icons: Lucide-React

📦 How to Run Locally

Clone the repository

git clone [https://github.com/your-username/india-active-ai.git](https://github.com/your-username/india-active-ai.git)
cd india-active-ai


Install dependencies

npm install lucide-react recharts


Start the development server

npm start


🤝 Acknowledgements

Developed as part of a research proposal  under the guidance of Prof. Dasgupta.

Created by Adhik Agarwal


