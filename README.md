# Portfolio 2017 (currently in development)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0-rc.2.

## Running the project

Run `npm install` if this is your first time running the project.  After installation is complete, run `npm start`.  The front end will be available at `http://localhost:4200/`. The (mock) backend will be available at `http://localhost:3000/`.  Coverage can be viewed at `http://localhost:4200/coverage` after running `npm test`.

The app will automatically reload if you change any of the source files.

## Permissions/tokens
You will not be able to obtain real data without my auth token (which I'm not giving out of course).  To view data, set an environment variable named `API_USE_MOCK` and re-run the project.  The data loaded will be served from the `/mocks` folder.  It is real data - it's just not live data.

### Windows
`set API_USE_MOCK=1`

### Linux/Mac
`export API_USE_MOCK=1`

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).  This will also generate code coverage which can be viewed at `http://localhost:4200/coverage` (note: the server must be running in order to host these files.  use `npm start` to run it.)

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# Hey, why'd did you...
### ...not barrel your styles?  Angular has this cool virtuzliation and it....
I know.  It's pretty great.  However, I wanted to use system-wide variables and barreling + SCSS variables are incompatible (presently).  I'm building a single application more than I am building individual, self-contained widgets, so it's more beneficial to have global style variables than to have self-contained entities.  Plus, this way I can control what portions of bootstrap I want to load (which isn't much).

### ...not bundle the noisey repo + event + language calls in to one call in the backend?  It'd save a lot of service calls.
I thought about it.  I decided against it because I don't plan to have any backend supporting this project, except for hosting the auth token.  The auth token will be added to requests through an apache header.  This won't show up here for security reasons.  Maybe I'll add a dummy one at some point.  Regardless, the NodeJS backend is strictly for development purposes.  Even if it was going to production, I don't want to bog asynchronous calls down with each other.  It's OK to have a bunch run at once - better that than having the slowest call hold everything up.

### ...not do end to end tests?  Angular has great support for Protractor or Selenium.
It does.  I don't have much that would really need to be covered by end to end testing.  The few things that would be most suitable for e2e testing (mostly mouse activities) can be mocked sufficiently without having to introduce a whole other e2e set up.

I believe that at some point, you need to trust that the libraries you're using have been tested themselves.  The e2e testing I could have done would have only been testing functionality implemented in core CSS/browsers, or things which are native to angular and already covered.

### ...use TypeScript?
I wanted to learn it.  I did that on a different project (typescript-tile-grid).  Once I started to learen it, I really liked it.  I played with React as a prototype for this project

### ...use Angular?
It's probably overkill.  This site probably doesn't need a framework, but I wanted to learn Angular v2/4 and it's a complicated enough application that it's not necessarily wasteful to use a big framework.  It's not necessary but it's not ill advised either.

I'll probably write a React and a native JS version once the Angular version is done to learn and to show why frameworks aren't always neccessary, respectively.

### ...not use React?
I did at first.  I wasn't that impressed.  I wasn't a big fan of having to load a bunch of side cars to get a full framework out of React.  I know that's by design but it just isn't suitable for what I wanted to do.  I do like the redux pattern and you'll see I used aspects of it in the Angular way in this application (Observables, BehaviorSubjects, etc).  That's the only reason I'd have gone the React route on this application.

### ...not use Babel?
TypeScript has its advantages.  So does Babel.  I like that in the near future, the whole transpiling of Babel stuff won't be necessary, but the Angular CLI tool really simplifies the set up.  I played with Babel for a while but I got tired of spending so much time configuring Webpack/Browserify and on and on.  It's exhausting. I like that the busy work of setting up Jasmine and Webpack and all of the dependencies is done with Angular CLI so I can focus on actually creating things instead of setting things up so that I can create things.
