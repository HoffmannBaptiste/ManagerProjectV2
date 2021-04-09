#############
### build ###
#############

# base image
FROM node:12.16.1 as build

# set working directory
WORKDIR /project-manager

# add `/project-manager/node_modules/.bin` to $PATH
ENV PATH /project-manager/node_modules/.bin:$PATH

# install and cache app dependencies
RUN npm install -g @angular/cli@8.3.17
RUN echo "y" | ng new project-manager --style=scss --skip-tests=true --directory ./

COPY package.json /project-manager/package.json
RUN npm install
RUN npm install xlsx --save
RUN npm install file-saver --save
RUN npm install font-awesome --save



# add src files
COPY src /project-manager/src
COPY proxy.conf.json /project-manager/

# generate build
# RUN ng build --output-path=dist

CMD ["npm", "start"]

# expose port 4200
EXPOSE 4200

############
### prod ###
############

# base image
# FROM nginx:1.16.0-alpine

# # copy artifact build from the 'build environment'
# COPY --from=build /app/dist /usr/share/nginx/html

# # expose port 80
# EXPOSE 80

# # run nginx
# CMD ["nginx", "-g", "daemon off;"]
