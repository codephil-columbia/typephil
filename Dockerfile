FROM node:9.3
LABEL maintainer="cfi2103@columbia.edu"

RUN apt-get update

WORKDIR /typephil
COPY ./ ./

RUN ["/bin/bash", "-c", "npm install"]

CMD ["/bin/bash", "-c", "npm start"] 