# 🌐 Global Network Admin Dashboard

A modern, responsive admin dashboard built with React, Vite, TypeScript, Tailwind CSS, and shadcn/ui. This dashboard allows admins to manage various sections like watch age, genres, users, and more.

---

## 🚀 Tech Stack

- **Frontend**: React + Vite + TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: Lucide
- **State Management**: React Hooks
- **Routing**: React Router DOM

---

## 📁 Project Structure

```bash
├── src
│   ├── components      # Reusable components (Navbar, Sidebar, Layout, etc.)
│   ├── Pages           # Page-specific components like Dashboard, ManageWatchAge
│   ├── assets          # Static images, logos, etc.
│   └── App.tsx         # Main app file
├── public              # Public files
├── index.html          # Root HTML file
├── tailwind.config.ts  # Tailwind CSS configuration
├── vite.config.ts      # Vite configuration
└── package.json        # Project metadata and scripts
```

---

## 🛠️ Installation & Running Locally

Make sure you have **Node.js (>=18)** and **npm** or **pnpm** installed.

### 1. Clone the repo

```bash
git clone https://github.com/parrthkag/globalNetwork.git
cd admindasboard
```

### 2. Install dependencies

```bash
npm install
# or
pnpm install
```

### 3. Run the project

```bash
npm run dev
# or
pnpm dev
```

---

## 📦 Build for Production

```bash
npm run build
```

---

## 🧪 Linting (Optional)

```bash
npm run lint
```

---

## 💡 Folder Notes

- If you’re using shadcn/ui, your components will be in `src/components/ui`.
- The `Pages` folder includes the screens (ManageWatchAge, ManageGenres, etc.).
- Auth and protected routing might be added later.

---

## 📸 Preview

[Insert screenshot here if needed]

---

## 🧑‍💻 Author

- **Parth Kag** – [@parrthkag](https://github.com/parrthkag)

---

## 📄 License

MIT License
