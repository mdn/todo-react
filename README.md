# todo-react

Sample todo app built with the React/ReactDOM framework. For the accompanying documentation, see
[Understanding client-side JavaScript frameworks
: React tutorials](https://wiki.developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks#React_tutorials).

For the live version, see https://mdn.github.io/todo-react/.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting started

To get this app running locally, you'll need to have [Node.js](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com/getting-started/install) installed on your machine.
In the project directory, you can run:

```bash
yarn && yarn start
```

More information about the available commands can be found in the [Contributing](CONTRIBUTING.md) guide.

## Validation

Use the Node version in `.nvmrc`. This Vite project provides the following checks:

```bash
npm test
npm run lint
npm run build
```

`npm test` uses Node's built-in test runner, jsdom, and Vite's existing JSX
transform to render the actual React app without starting a web server. The tests
cover clearing completed tasks in all three filter views, disabled button states,
empty lists, focus after clearing, and the existing add/edit/toggle/delete actions.
The test-only jsdom dependency may emit a `punycode` deprecation warning on recent
Node versions.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

The following sections are recommended:

- [Code Splitting](https://facebook.github.io/create-react-app/docs/code-splitting)
- [Analyzing the Bundle Size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)
- [Making a Progressive Web App](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)
- [Advanced Configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)
- [Deployment](https://facebook.github.io/create-react-app/docs/deployment)
- [npm run build fails to minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

To learn React, check out the [React documentation](https://reactjs.org/).

## Contributing

Our project welcomes contributions from any member of our community.
To get started contributing, please see our [Contributor Guide](CONTRIBUTING.md).

By participating in and contributing to our projects and discussions, you acknowledge that you have read and agree to our [Code of Conduct](CODE_OF_CONDUCT.md).

## License

This project is licensed under the [LICENSE](LICENSE).
