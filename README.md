# boiler

Boiler is a Nextjs & Mobx State Tree based React project boilerplate. 

To install dependencies:

`npm install` 
or
`yarn install`

To run locally:

`npm run dev` or `yarn dev`


Explanation of what is used follows below:

## Env.js configuration
...TODO

## Nextjs

Core logic runs with on Nextjs https://nextjs.org/ - all of the Nextjs documentation is relevant. If you need explanation how to make something work you will find it in their docs. Autoprefixing, routing, SSR, code splitting and more is all handled inside Nextjs. Examples how to integrate popular js tech inside Next can be found here https://github.com/zeit/next.js/tree/master/examples/ 

## Mobx State Tree

Global store is managed by Mobx State Tree https://github.com/mobxjs/mobx-state-tree. All of the stores and models are contained inside `/store` folder.

## Mobx Forms
...TODO

## Decorators

Mobx supports them by default. They are already enabled through `@babel/plugin-proposal-decorators` and ready to use. Use them also outside the scope of Mobx, for any wrapper functions you may integrate later - it keeps the code much more cleaner and readable. If you are not sure how decorators work google it :)

## Linting

Files are lintend with https://github.com/okonet/lint-staged. lint-staged is triggered with a pre-commit hook. The hook is set automatically when you run boiler install. You can configure linter inside `.eslintrc`. Basic setup uses airbnb linter config with a few custom rules.

## Aliases

There are a few preconfigured aliases already set up for you. You can check them or add new ones inside `.babelrc`.

Preconfigured:
- api
- components
- constants
- store
- utils

## Classnames

For css class composition we use https://github.com/JedWatson/classnames.

Example usage:
```
import cx from "classnames"

const elementClasses = cx({
  button: true,
  "button-active": this.state.isActive
});
```

## Axios

We use Axios https://github.com/axios/axios for async requests. External requests should be added inside `/api` folder.

## Suggested additional field-tested plugins that may be used if needed later

- https://momentjs.com/ - if you have to heavily deal with dates
- https://material-ui.com/ - React Components that Implement Google's Material Design. Handy for admin UI and form UI building.