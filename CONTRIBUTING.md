# 🤝 Contributing to Video Hosting Backend API

Thank you for your interest in contributing! We welcome contributions from the community. Please read the following guidelines before submitting your contribution.

---

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Getting Started](#getting-started)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Coding Standards](#coding-standards)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

---

## 📜 Code of Conduct

By participating in this project, you agree to uphold a respectful and inclusive environment. Please:

- Be kind and constructive in all communications
- Respect differing opinions and experiences
- Focus on what is best for the community and project
- Avoid any form of harassment or discrimination

---

## 🛠️ How to Contribute

> **Important:** This project has specific contribution requirements. General PRs that add new features without completing assigned TODOs will **not** be merged.

### ✅ Accepted Contributions

1. **Complete all TODO assignments** in the `src/controllers/` folder
2. **Bug fixes** with proper reproduction steps
3. **Documentation improvements**
4. **Security patches**
5. **Performance improvements**

---

## 🚀 Getting Started

### 1. Fork the Repository

Click the **Fork** button at the top right of the [repository page](https://github.com/Mohammad-Asfin/Video-Hosting-Backend-API).

### 2. Clone Your Fork

```bash
git clone https://github.com/<your-username>/Video-Hosting-Backend-API.git
cd Video-Hosting-Backend-API
```

### 3. Set Up Upstream Remote

```bash
git remote add upstream https://github.com/Mohammad-Asfin/Video-Hosting-Backend-API.git
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Set Up Environment Variables

```bash
cp .env.sample .env
# Fill in your own values in .env
```

### 6. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 7. Make Your Changes

Complete all TODO controllers, fix bugs, or improve documentation.

### 8. Commit Your Changes

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```bash
git commit -m "feat: implement user watch history controller"
git commit -m "fix: resolve token refresh logic bug"
git commit -m "docs: update API endpoint documentation"
```

### 9. Push & Open a Pull Request

```bash
git push origin feature/your-feature-name
```

Then open a Pull Request on GitHub against the `main` branch.

---

## 📝 Pull Request Guidelines

- **Title** should be clear and descriptive
- **Description** must include:
  - What was changed and why
  - Steps to test your changes
  - Screenshots (if UI-related)
  - Link to related issue (if applicable)
- All controllers must be **fully implemented** — no partial work
- Code must follow project coding standards (Prettier formatted)
- No merge conflicts with `main`

---

## 🎨 Coding Standards

This project uses **Prettier** for consistent code formatting.

### Run Formatter

```bash
npx prettier --write .
```

### General Rules

- Use ES Modules (`import`/`export`) — **no** CommonJS (`require`)
- Use `async/await` — **no** raw Promises or callbacks
- Always use the `asyncHandler` wrapper for controller functions
- Always use `ApiError` and `ApiResponse` utility classes
- Never log sensitive data (passwords, tokens) to the console
- Keep controllers focused — put reusable logic in `utils/`

---

## 🐛 Reporting Bugs

Found a bug? Please [open an issue](https://github.com/Mohammad-Asfin/Video-Hosting-Backend-API/issues/new) with:

1. **Clear title** describing the bug
2. **Steps to reproduce** the issue
3. **Expected behavior**
4. **Actual behavior**
5. **Environment details** (Node.js version, OS, etc.)
6. **Error logs** or screenshots if available

---

## 💡 Suggesting Features

Have an idea? [Open a feature request](https://github.com/Mohammad-Asfin/Video-Hosting-Backend-API/issues/new) with:

1. **Problem statement** — what problem does this solve?
2. **Proposed solution** — how would it work?
3. **Alternatives considered**

---

## ✅ After Contributing

Once your PR is reviewed and merged:

- Your GitHub profile link will be added to the **README Contributors section**
- You will be credited in the project

---

*Thank you for contributing to this project! 🙌*
