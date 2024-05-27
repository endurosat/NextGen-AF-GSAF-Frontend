# NextGen GSAF UI

NextGen GSAF UI is an innovative React JS project specifically designed for the NextGen framework. This powerful user interface aids in the management of applications allowing for the creation and preparation of builds for deployment, initial updates, and the execution of both ground and sanitation commands. With NextGen GSAF UI, users can effortlessly start and stop applications on-demand or according to a specified schedule, streamlining the deployment and management process.

## Features

- **Applications Management:** Create and manage your applications builds with ease.
- **Deployment Preparation:** Get your builds ready for deployment effortlessly.
- **Updates Initialization:** Initialize updates to your application with a simple interface.
- **Ground Commands:** Execute ground commands for your application.
- **Sanitation Commands:** Utilize start and stop commands to manage your applications as needed or on a schedule.

## Tech Stack

NextGen GSAF UI leverages the latest in web technologies to provide a fast and friendly user interface:

- React JS
- @mui/material
- @mui/icons-material
- @reduxjs/toolkit
- Axios
- React Router Dom
- And more...

For the exact versions of these libraries, please refer to the `package.json` file.

## Installation

To get the NextGen GSAF UI running on your local system, follow these simple steps:

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/nextgen-gsaf-ui.git
cd nextgen-gsaf-ui
```

2. **Install dependencies:**

```bash
npm install
```

3. **Configure API URL:**
   - Navigate to `/src/network/axiosConfig.js`
   - Update the `baseURL` on line 7 to match your API URL. It currently looks like this:

```javascript
baseURL: 'https://your.domain.com/api/'
```

4. **Build the application (Optional):**

```bash
npm run build
```

5. **Start the application:**

```bash
npm start
```

The application should now be running on `http://localhost:3000`.

## Contributing

Your contributions are welcome! If you would like to contribute to the project, please follow these steps:

1. Fork the repository.
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a pull request.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Support

If you find an issue, please report it via GitHub issues. For additional help or general inquiry, feel free to reach out.

## Acknowledgments

- Team members
- Contributors
- YOU, for showing interest in NextGen GSAF UI!

Happy Coding!