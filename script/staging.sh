#!/bin/sh
echo '~~~~~~ Manual script build docker image in staging ~~~~~~~~~'

# prepare source build
yarn install && yarn build:staging

# build in image
ENV=staging
HOST=073874858801.dkr.ecr.ap-southeast-2.amazonaws.com
IMAGE=stl4-01-order-service

cd ../ && docker build --cache-from=$HOST/$IMAGE:$ENV -t $HOST/$IMAGE:$ENV -f .docker/$ENV.dockerfile .

echo '~~~~~~ Ending build dockerfile ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'
