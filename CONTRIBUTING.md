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

We are always looking for ways to improve! Since all core controller TODOs have been successfully completed, we are now accepting PRs for entirely new features.

### ✅ Accepted Contributions

1. **New features** that enhance the backend API
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

Implement your new feature, fix bugs, or improve documentation.

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

- **Modular Design**: Use ES Modules (`import`/`export`) — **no** CommonJS (`require`).
- **Asynchronous Code**: Use `async/await` — **no** raw Promises or callbacks.
- **Controller Wrappers**: Always wrap controller functions inside the `asyncHandler` utility.
- **Standard Responses & Errors**: Always use the `ApiError` and `ApiResponse` utility classes for consistent API outputs.
- **Real-Time Integration**: For real-time updates (like notifications), utilize `emitToUser` from `src/socket.js`.
- **Security & Validation**: Use appropriate rate-limiting (`commentLimiter`, etc.) and content moderation (`moderateContent`) middlewares for user-facing post/comment creations.
- **Console Logs**: Never log sensitive user data (passwords, tokens) to the console.
- **Logic Separation**: Keep controllers clean — put reusable helpers, database aggregations, and integrations in `utils/` or dedicated middleware functions.

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

_Thank you for contributing to this project! 🙌_
