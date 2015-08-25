#!/bin/bash
set -e

./scripts/cibuild

docker run -t --rm \
  -v ${pwd}/src:/style-guide/src \
  -v ${pwd}/gulpfile.js:/style-guide/gulpfile.js \
  -v ${pwd}/dist:/style-guide/dist \
  -v ${pwd}/docs:/style-guide/docs \
  -e AWS_ACCESS_KEY=$AWS_ACCESS_KEY \
  -e AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
  brainly/style-guide s3_website push