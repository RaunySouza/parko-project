FROM node

#RUN apt-get update -qq && apt-get install -y build-essential
#RUN apt-get install -y ruby
#RUN gem install sass

RUN mkdir /app

RUN npm install -g gulp bower coffee-script

WORKDIR /app
ADD app/package.json /app/package.json
RUN npm install

ADD app/bower.json /app/bower.json
RUN bower install --allow-root

ADD app/. /app/.

RUN gulp build

EXPOSE 3000

CMD ["npm", "start"]
