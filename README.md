# next-intl-starter-code

Starter code for building Next.js 14 applications with internationalization (i18n) support. This project provides a foundation for creating multi-language applications (e.g., Arabic/English) using `next-intl` for localization. Additionally, it includes a branch (`clerk`) with integration for authentication using Clerk.

## Features

- **Next.js 14:** Utilize the latest features and improvements in Next.js for building modern web applications.

- **Internationalization (i18n):** Use `next-intl` to enable localization and create applications that support multiple languages effortlessly.

- **Multi-Language Support:** Easily set up and configure the application for different languages. An example is provided for Arabic (ar) and English (en).

- **Authentication with Clerk:** The `clerk-branch` includes integration with Clerk for user authentication. Use Clerk to manage user sessions, sign-ups, logins, and more.

## Getting Started

1. **Clone the repository:**
  ```bash
   git clone https://github.com/MEClouds/next-intl-starter-code.git
  ```

2. **Install dependencies:**
  ```bash
    cd next-intl-starter-code
    npm install
  ```

3. **Start the development server:**

  ```bash
    npm run dev
  ```

    The application will be accessible at [http://localhost:3000](http://localhost:3000).

## Usage

### Internationalization (i18n)

The `locales` directory contains language-specific JSON files for translation. Use the `next-intl` library to handle internationalization in your components.

To add a new language, create a new JSON file in the `locales` directory and configure the language in the `middleware.ts` file.

### Authentication with Clerk

If you want to use Clerk for authentication, switch to the `clerk`:

  ```bash
git checkout clerk
  ```


Follow the Clerk documentation to set up your Clerk account and configure the necessary environment variables.

## Contributing
We welcome contributions! If you have ideas for improvements, bug fixes, or new features, feel free to open an issue or submit a pull request.

## License
This project is licensed under the MIT License.
