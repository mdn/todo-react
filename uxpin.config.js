module.exports = {
  components: {
    categories: [
      {
        name: 'General',
        include: [
          'src/components/Form.js',
          'src/components/FilterButton.js',
          'src/components/merge/todo/Todo.js'
        ]
      }
    ],
    wrapper: 'src/wrapper/UXPinWrapper.js',
    webpackConfig: 'uxpin.webpack.config.js',
  },
  name: 'Learn UXPin Merge - React Todo list tutorial'
};
