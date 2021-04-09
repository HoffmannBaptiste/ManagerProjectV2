#############
### build ###
#############

# base image
FROM node:12.16.1 as build

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install

# add app
COPY . /app

RUN chmod +x wait-for-it.sh


# Indicate that we use 3000. Maybe configurable.
EXPOSE 3000

# Start the application.
# CMD ["npm", "start"]