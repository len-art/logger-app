# Logger

A simple app for logging your project hours.

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

## Mobx

Global store is managed by Mobx https://mobx.js.org/. All of the stores are contained inside the `/store` folder.

## Decorators

Mobx supports them by default. They are already enabled through `@babel/plugin-proposal-decorators` and ready to use. You can also use them outside the scope of Mobx, for any wrapper functions that you may integrate later.

## Error reporting

Error reporting by default is set with https://sentry.io/. You will need to setup your `SENTRY_PUBLIC_DSN` inside the `env.js` config to enable it. You can switch the error reporting service if you swap Sentry inside `pages/_app.js` with whatever you want. Reporting is initialized inside `constructor` and errors are caught by `componentDidCatch` method.

## Linting

Basic setup uses airbnb linter config with custom rules added.
