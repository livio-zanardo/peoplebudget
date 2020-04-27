#!/bin/bash

printf 'Installing server dependencies...'
npm i

clear
printf 'Setting up database'
node ./setup/setup.js

clear
printf 'Cleaning up database...'
npm run drop:dev
npm run drop:test

clear
printf 'Migrating Database...'
npm run migrate:dev
npm run migrate:test

clear
printf 'Generating docs...'
npm run docs

clear
printf 'Setting up keys...'
PRI=jwtRS256.key
PUB=jwtRS256.key.pub
KEYS=keys

clear
printf 'Checking for existing keys...'
if [ -d "$KEYS" ]; then
    printf 'Keys found, removing old keys'
    rm -rf $KEYS
fi
mkdir keys

cd keys || exit

clear
printf 'Generating private key...'
ssh-keygen -t rsa -P "" -b 4096 -m PEM -f $PRI
if [ -f "$PRI" ];
then
    printf "$PRI is good."
else
    printf "$PRI has failed."
fi

clear
printf 'Generating public key...'
ssh-keygen -e -m PEM -f $PRI > $PUB
if [ -f "$PUB" ];
then
    printf "$PUB is good."
else
    printf "$PUB has failed."
fi

clear
printf 'Installing React Dependencies...'
cd ../view
npm i

