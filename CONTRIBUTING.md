# Contribution guide

![github-profile](https://user-images.githubusercontent.com/10350960/166113119-629295f6-c282-42c9-9379-af2de5ad4338.png)

- [Ways to contribute](#ways-to-contribute)
- [Finding an issue](#finding-an-issue)
- [Asking for help](#asking-for-help)
- [Pull request process](#pull-request-process)
- [Setting up the development environment](#setting-up-the-development-environment)
  - [Forking and cloning the project](#forking-and-cloning-the-project)
  - [Prerequisites](#prerequisites)
- [Signing commits](#signing-commits)

Welcome 👋 Thank you for your interest in contributing to MDN Web Docs. We are happy to have you join us! 💖

As you get started, you are in the best position to give us feedback on project areas we might have forgotten about or assumed to work well.
These include, but are not limited to:

- Problems found while setting up a new developer environment
- Gaps in our documentation
- Bugs in our automation scripts

If anything doesn't make sense or work as expected, please open an issue and let us know!

## Setting up the development environment

This project requires [Node.js](https://nodejs.org/en/) to be installed on your local machine.
Additionally, you should have git and GitHub access.

### Forking and cloning the project

The first step in setting up your development environment is to [fork the repository](https://docs.github.com/en/get-started/quickstart/fork-a-repo) and [clone](https://docs.github.com/en/get-started/quickstart/fork-a-repo#cloning-your-forked-repository) the repository to your local machine.

### Prerequisites

To get started, make sure you have the following:

- [NVM](https://github.com/nvm-sh/nvm) or [NVM for Windows](https://github.com/coreybutler/nvm-windows)
- [Nodejs](https://nodejs.org/en/) (Latest stable release or up to two versions back)
- [Yarn](https://yarnpkg.com/getting-started/install)

### Building the project

Once you have the above installed and have the repository cloned, it is time to install the project dependencies.

In the project directory, you can run the following command which runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.
You will also see any lint errors in the console.

```bash
yarn start
```

Launches the test runner in the interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

```bash
yarn test
```

The following command builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

```bash
yarn build
```

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

```bash
yarn eject
```

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Ways to contribute

We welcome many different types of contributions including:

- New features and content suggestions.
- Identifying and filing issues.
- Providing feedback on existing issues.
- Engaging with the community and answering questions.
- Contributing documentation or code.
- Promoting the project in personal circles and social media.

## Finding an issue

We have issues labeled `good first issue` for new contributors and `help wanted` suitable for any contributor.
Good first issues have extra information to help you make your first contribution a success.
Help wanted issues are ideal when you feel a bit more comfortable with the project details.

Sometimes there won't be any issues with these labels, but there is likely still something for you to work on.
If you want to contribute but don't know where to start or can't find a suitable issue, speak to us on [Matrix](https://matrix.to/#/#mdn:mozilla.org), and we will be happy to help.

Once you find an issue you'd like to work on, please post a comment saying you want to work on it.
Something like "I want to work on this" is fine.
Also, mention the community team using the `@mdn/mdn-community-engagement` handle to ensure someone will get back to you.

## Asking for help

The best way to reach us with a question when contributing is to use the following channels in the following order of precedence:

- [Start a discussion](https://github.com/orgs/mdn/discussions)
- Ask your question or highlight your discussion on [Matrix](https://matrix.to/#/#mdn:mozilla.org).
- File an issue and tag the community team using the `@mdn/mdn-community-engagement` handle.

## Pull request process

The MDN Web Docs project has a well-defined pull request process which is documented in the [Pull request guidelines](https://developer.mozilla.org/en-US/docs/MDN/Community/Pull_requests).
Make sure you read and understand this process before you start working on a pull request.

## Signing commits

We require all commits to be signed to verify the author's identity.
GitHub has a detailed guide on [setting up signed commits](https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits).
If you get stuck, please [ask for help](#asking-for-help).
