# 3D-estimate-creator

Drag and drop objects in a 3d scene and estimate their cost

## Build & Run

You can use docker (or not):

```bash
docker run --name 3EC -it -p 8080:8080 -p 8081:8081 -w /var/www -v ${pwd}:/var/www node /bin/bash
```

Gather dependancies:

```bash
yarn
```

Create a directory models under dist and add you models..

Serve on 8080:

```bash
yarn serve
```

Build:

```bash
yarn build
```

## Test

```bash
yarn test
```

## License

[CC-BY-NC-4.0](https://creativecommons.org/licenses/by-nc/4.0/)