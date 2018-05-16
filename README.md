NkznTodo
==========

My Flux + Layered Architecture sample.

![ss](images/ss.gif)

Samples
----------

* multi-package: punctuate Layered Architecture with monorepo.
* single-package: punctuate Layered Architecture with plain directory.

multi-package
----------

This sample uses monorepo with [lerna](https://github.com/lerna/lerna).

### structure

| package | description |
|---------|-------------|
| presentation-redux | create-react-app based TypeScript Web App |
| application-redux | Application Service & Redux Ducks |
| presentation-mobx | coming soon... |
| application-mobx | coming soon... |
| domain | Type Definition & Behavior Functions **(No Redux Dependencies)** |
| infrastructure | Dummy Networking **(No Redux Dependencies)** |

Monorepo structure with lerna allows us to build dependency graph between packages. `domain` is the most *pure* package, and `presentation` is most *complex* package. If you build all packages, lerna considers dependency. `lerna run ***` command executes commands in order of dependencies.

![dependency-graph](images/dependency-graph.png)

### Getting Started

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

single-package
----------

### structure

The single-package punctuate Layered Architecture with plain directory.

### Getting Started

```
$ yarn install
$ yarn start
```

That's all!