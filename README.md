NkznTodo
==========

My Flux + Layered Architecture sample.

![ss](images/ss.gif)

Getting Started
----------

At first, install with yarn.

```
$ yarn install
```

next, build TypeScript in the infrastructure, domain, application-redux.

```
$ yarn build:tsc
```

finally, start webapp in the presentation-redux.

```
$ cd packages/presentation-redux
$ yarn start
```

packages
----------

| package | description |
|---------|-------------|
| presentation-redux | create-react-app based TypeScript Web App |
| application-redux | Application Service & Redux Ducks |
| domain | Type Definition & Behavior Functions **(No Redux Dependencies)** |
| infrastructure | Dummy Networking **(No Redux Dependencies)** |
