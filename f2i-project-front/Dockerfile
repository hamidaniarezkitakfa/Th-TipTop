FROM node:14 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm install -g serve

EXPOSE 3000

CMD ["serve","-s","dist"]

#FROM nginx:alpine

#COPY --from=build /app/dist /usr/share/nginx/html

#EXPOSE 80

#CMD ["nginx", "-g", "daemon off;"]
