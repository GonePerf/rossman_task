# zadanie

## Project setup
```
npm install
```

### Compiles and hot-reloads for development

### Dodatkowe dwa terminale dla json-servera

```
npm i json-server
```
#### pierwszy terminal
```
json-server --watch src/data/articles.json
```
#### drugi terminal
```
json-server --watch -p 4000 src/data/boxes.json
```

#### trzeci terminal
```
npm run serve
```



### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
