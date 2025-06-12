## Project Context

- **Type:** Next.js, React, TypeScript, Ant Design, Tailwind CSS
- **Domain:** KYC/Compliance, Entity Management, File Upload, Feature Management
- **Structure:** Modular, with `app/`, `components/`, `hooks/`, `types/`, and `api/` directories
- **Key Libraries:** next, react, antd, tailwindcss

## Coding Conventions

- **Use TypeScript** for all new code and prefer type safety throughout the codebase.
- **Component Structure:**
  - Use functional components and React hooks.
  - Place shared UI in `components/shared/` and feature-specific UI in their respective folders.
  - Use `components/kyc/` for KYC-related UI and logic.
- **Styling:**
  - Use Tailwind CSS utility classes for layout and spacing.
  - Use Ant Design components for UI consistency.
- **Naming:**
  - Use descriptive, camelCase names for variables and functions.
  - Use PascalCase for React components and TypeScript types.
- **Testing:**
  - Write small, testable functions and components.
  - Prefer integration tests for business logic and UI flows.
- **Documentation:**
  - Add JSDoc comments for exported functions and complex logic.
  - Use clear, concise comments to explain intent, especially for Copilot-generated code.

## Copilot Usage Guidelines

- **Prompt Copilot with clear comments** before writing new logic or components.
- **Review all Copilot suggestions** for correctness, security, and performance.
- **Never accept secrets or credentials** from Copilot suggestions. Use environment variables for sensitive data.
- **Validate and sanitize all user input** to prevent security vulnerabilities.
- **Check for license compliance** if Copilot generates large code blocks or third-party integrations.
- **Document significant Copilot-generated code** with a comment (e.g., `// Copilot generated` or similar).
- **Use `.copilotignore`** to exclude sensitive or proprietary files from Copilot suggestions if needed.

## Accessibility & Inclusivity

- **Follow accessibility best practices** (ARIA, keyboard navigation, color contrast) for all UI code.
- **Use inclusive language** in code, comments, and documentation.

## Keeping Copilot Effective

- **Update Copilot regularly** to benefit from the latest features and improvements.
- **Enable Copilot for all relevant file types** (TypeScript, JavaScript, CSS, etc.).

## References

- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [Copilot Custom Instructions Guide](https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot)

---

By following these instructions, you help ensure that Copilot suggestions are relevant, secure, and consistent with our project standards. Thank you for contributing!
