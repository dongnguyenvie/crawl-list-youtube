FROM node:latest
ADD ./docker_compose/nodejs/start.sh /start.sh
# RUN CMD
RUN sed -i 's/\r//' start.sh
RUN chmod +x start.sh
ADD . /app
WORKDIR /app
# Installing the pre-required packages and libraries for electron & Nightmare
RUN apt-get update &&\
    apt-get install -y libgtk2.0-0 libgconf-2-4 \
    libnotify4 libasound2 libxtst6 libxss1 libnss3 xvfb