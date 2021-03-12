# Setel Order Service

 Main feature: Responsible for orders management.

## Required to start the project

- Environment required: NodeJS > 10.20
- Global environment required:
  - [TypeScript] - HTML enhanced for web apps!
  - [Gulp] - module bundle primary project
  - [Swagger-Build] - multi-file-swagger build
- Option environment:
  - [Docker] - support build manual docker

## Technical stack

- Technical programming:
  - *Language*: **NodeJS, Typescript**
  - *Framwork*: **ExpressJS**
  - Task-runner: **Gulp**
  - *Testing*: **Mocha/Chai & Suppertest**
- Technical operation:
  - *Containerize*: all application containerize with **Docker**
  - *Orchestration*: **K8S**, Kops
  - *Package manager*: **Helm**
  - *CI/CD*: **Bitbucket pipeline**
  - *Api-gateway*: **[Ambassador]**
  - *Cloud*: **AWS**

## How to build & running

You can launch applications with many different environment modes like:

- **Local**: running with local environment. Application mode running in port: **8080**

  ```shell
  # install: yarn
  # running: yarn start
  # build: yarn buildLocal
  ```

- **Test**: running with unit testing

  ```shell
  # yarn test:cov
  ```

- For **staging** & **production** environments, you cannot run it on your local server. This is because configs for these environments are used under *configmap* and *secret* on our *K8S infrastructure*. Note that for staging environment you can access the document-api link that we have implemented below

  ```bash
  # Link point api-gateway
  # --> https://setel.vmo.dev/order
  # Link document
  # https://api.setel.vmo.dev/document/?url=https://api.setel.vmo.dev/stl4-01-order-service/swagger.json
  ```

## How to manual build docker image

In some cases you want to manually build an image for the service at your local server, you can use the command group quickly as below:

- **Staging** Application build for staging environment. Dockerfile select refer _**.docker/staging.dockerfile**_

    ```shell
    cd script && ./staging.sh
    ```


## Release change

- Version 2020 list change:
  - Upgrade gulp V4 is compatibility version node >= 12
  - Lib (in src/libs) change all common variable is cammelCase

License

----
MIT

**VMO Global**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Typescript]: <https://www.typescriptlang.org>
   [Gulp]: <http://gulpjs.com>
   [Swagger-Build]: <https://github.com/mohsen1/multi-file-swagger-example>
   [Ambassador]: <https://www.getambassador.io/>
   [Docker]: <https://www.docker.com/>
