FROM node:alpine as DEPS

WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install

COPY . .

FROM DEPS as development

CMD ng serve --host 0.0.0.0 --port $PORT

FROM development as testing

CMD ng test

FROM DEPS as production-build

RUN ng build --output-path=dist --prod

FROM nginx:latest as production

COPY --from=production-build /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]



