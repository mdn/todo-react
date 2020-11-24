# UXPin Merge Tutorial

Learn how to integrate an existing React app's components with [UXPin Merge](https://uxpin.com/merge).

[UXPin Merge](https://uxpin.com/merge) lets designers create interactive prototypes with custom React components. This eliminates the need for designers to manually maintain a design system within their design tool. This tutorial shows how to integrate UXPin Merge with [Mozilla's React Todo App example](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_todo_list_beginning), making the app's React components available within UXPin for designers to prototype.

You can find a live version of the React Todo app [here](https://mdn.github.io/todo-react-build/) and the [original source code on GitHub](https://github.com/mdn/todo-react). This tutorial's completed code with a working UXPin integration [is available on GitHub](https://github.com/itsderek23/todo-react).

## The components

The Todo app has three React components:

1. Form - create a todo item.
2. FilterButton - filter todos by their current state.
3. Todo - A todo list item.

These components are in the `src/components` directory and are outlined in the screenshot below:

![components](/docs/images/components.png)

When this tutorial is completed, a designer will be able to create a prototype with these components. Your real-world custom design system (DS) likely has many more than three components. However, the concepts we'll illustrate in this tutorial should apply to your DS as well.

## Setup UXPin Merge

First, fork the React Todo App [on GitHub](https://github.com/itsderek23/todo-react) and clone the repo locally. Then install our UXPin Merge NodeJS package:

```
cd todo-react
yarn add @uxpin/merge-cli --dev

# Babel-loader will be used by Webpack to create the app bundle
yarn add babel-loader --dev

yarn install

# Ignore the UXPin Merge build directory
echo '/.uxpin-merge' >> .gitignore
```

You can view the working React app with `yarn start`.

A custom design system requires two additional config files:

### Create a uxpin.config.js file

You specify the components to push to UXPin Merge via a `uxpin.config.js` in the top-level directory of the repo. Create a `uxpin.config.js` file with the following content:

```js
module.exports = {
  components: {
    categories: [
      {
        name: 'General',
        include: [
          'src/components/Form.js',
        ]
      }
    ],
    webpackConfig: 'uxpin.webpack.config.js',
  },
  name: 'Learn UXPin Merge - React Todo list tutorial'
};
```

We're going to start with the Form component. We'll also use a UXPin-specific webpack config file (the `webpackConfig` option) which we'll cover next.

### Create a uxpin.webpack.config.js file

UXPin typically doesn't need to use your entire existing Webpack build process. We'll use a more minimal build for UXPin. Create a `uxpin.webpack.config.js` and [copy and paste this content](https://raw.githubusercontent.com/itsderek23/todo-react/master/uxpin.webpack.config.js) into the file.

At this point we have the minimum configuration required to view the Form component.

## Experimental Mode

We can run UXPin Merge Experimental Mode to preview the Form component. Experimental Mode lets us prototype with our local components to verify their behavior before pushing to UXPin. Start Experimental Mode:

```
uxpin-merge
```

Using the settings provided in `uxpin.webpack.config.js`, Experimental mode bundles your components and opens a browser window. You can lay out components in a similar fashion as the UXPin Editor. After Experimental Mode loads, drag and drop the Form component from the sidebar onto the project canvas:

![form no style](/docs/images/form_no_style.png)

We have the Form component but it lacks styling. For that, we'll create a Global Wrapper Component.

## Using a Global Wrapper Component to apply CSS styles

Just like your custom design system, this Todo app contains global styles. These are specified in the `src/index.css` file. All of our components need the styles specified in this file. We can load this file via a Global Wrapper Component. This component will wrap around every component we drag onto the UXPin canvas.

Create a wrapper file:

```
mkdir src/wrapper/
touch src/wrapper/UXPinWrapper.js
```

Copy and paste the following into `UXPinWrapper.js`:

```js
import React from "react";
import '../index.css';

export default function UXPinWrapper({ children }) {
  return children;
}
```

The `import '../index.css';` line ensures our CSS styles are loaded prior to rendering each component.

We need to tell UXPin to use this wrapper file. Add the following to `uxpin.config.js`:

```js
wrapper: 'src/wrapper/UXPinWrapper.js',
```

In your terminal, restart UXPin Experimental mode (the `uxpin-merge` command). A restart is required when updating the config file. A browser reload is only required when updating components.

Experimental mode should open a new browser window with a styled Form component:

![form_with_style](/docs/images/form_with_style.png)

## Adding the FilterButton with a customizable name

Now we'll work on adding the FilterButton to UXPin Merge. These buttons are displayed below the Form component:

![filter_button_screen](/docs/images/filter_button_screen.png)

Adding this component will be similar to the Form component. However, I'd also like to give designers the ability to specify the text that is displayed within the button. We'll do that via the `prop-types` package.

Component propTypes are mapped to the UXPin properties panel when editing a component. The existing FilterButton component doesn't use prop-types so let's add this to `FilterButton.js`:

```diff
import React from "react";
+ import PropTypes from 'prop-types';

function FilterButton(props) {
  return (
@@ -15,4 +16,9 @@ function FilterButton(props) {
  );
}

+ FilterButton.propTypes = {
+   name: PropTypes.string
+ }

+FilterButton.defaultProps = {
+  name: 'Button Name'
+};

export default FilterButton;
```

Add `'src/components/FilterButton.js'` to `uxpin.config.js` and restart `uxpin-merge --disable-tunneling`. A restart is required as we've updated the config file. When Experimental Mode starts, you should see a new "FilterButton" component listed in the sidebar. Click and drag this onto the canvas.

![filter_button_on_canvas](/docs/images/filter_button_on_canvas.png)

Two of our three components are now working with UXPin Merge. We have one component remaining: the Todo component.

## Adding the Todo component with a wrapper

We're moving on to our final component: the Todo. These are displayed within the list of todo items in the UI:

![todo on screen](/docs/images/todo_on_screen.png)

When adding the FilterButton, we edited the FilterButton.js file to add propTypes. What if you want to isolate your Merge-specific changes and don't want to modify the source code of your components? We can create a wrapper that is specific to the Todo component for this. It's similar in concept to the Global wrapper component we used to apply CSS styles but will be specific to the Todo component.

Type the following:

```
mkdir -p src/components/merge/todo
touch src/components/merge/todo/Todo.js
```

[Copy and paste this code](https://github.com/itsderek23/todo-react/blob/master/src/components/merge/todo/Todo.js) into Todo.js. We're importing the original Todo component as `TodoM` and returning this component in our newly defined `Todo` function. We specify propTypes just like we did with the FilterButton component on our newly defined `Todo` wrapper function.

Add `'src/components/merge/todo/Todo.js'` to `uxpin.config.js` and restart `uxpin-merge --disable-tunneling`. After Experimental launches a new window, click-and-drag the Todo component onto the canvas:

![todo no defaults](/docs/images/todo_no_defaults.png)

The default display of the Todo component looks a bit empty without displaying the name of the Todo. We could use `defaultProps` like we did with the `FilterButton` or we can use the UXPin-specific presets functionality.

### Specifying the default Todo display with presets

TODO

We have created UXPin Merge integrations for all three of our React components. It's time to let our design team use these components within the UXPin editor.

## Pushing to UXPin

Currently the UXPin Merge integration is only functional on your computer. To let your design team use these components we need to push the component bundle to UXPin. Creating and pushing a Merge design library requires two steps:

### 1. Create the library within the UXPin UI

* Go to your UXPin account
* Enter the UXPin Editor
* Create a new library
* Select the option import React components
* Copy the Auth token (don't share it with anyone and do not place it in any files checked into git repository. This token provides direct access to the library on your account.)

![https://images.prismic.io/uxpincommunity%2F0b17168b-023d-44b7-8351-6e79b6e17b9b_merge_ci_2.gif?auto=compress,format](create library)

### 2. Push the library via the uxpin-merge CLI

Using the token created from the previous stop, run the following from within the project repo:

```
uxpin-merge push --token YOUR_TOKEN
```

Your design team can now access the Merge library.

## Using the Merge library within UXPin

TODO

## Pushing an update

Show how to add function for addTask
TODO
