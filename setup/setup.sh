#!/bin/bash

printf 'Installing server dependencies...'
npm i

printf '\n\n\n\n\n\n\n\n\n\n\n\n\nSetting up database'
node ./setup/setup.js

printf '\n\n\n\n\n\n\n\n\n\n\n\n\nCleaning up database...'
npm run drop:dev
npm run drop:test

printf '\n\n\n\n\n\n\n\n\n\n\n\n\nMigrating Database...'
npm run migrate:dev
npm run migrate:test

printf '\n\n\n\n\n\n\n\n\n\n\n\n\nGenerating docs...'
npm run docs

printf '\n\n\n\n\n\n\n\n\n\n\n\n\nSetting up keys...'
PRI=jwtRS256.key
PUB=jwtRS256.key.pub
KEYS=keys

printf '\n\n\n\n\n\n\n\n\n\n\n\n\nChecking for existing keys...'
if [ -d "$KEYS" ]; then
    printf 'Keys found, removing old keys'
    rm -rf $KEYS
fi
mkdir keys

cd keys || exit

printf '\n\n\n\n\n\n\n\n\n\n\n\n\nGenerating private key...'
ssh-keygen -t rsa -P "" -b 4096 -m PEM -f $PRI
if [ -f "$PRI" ];
then
    printf "$PRI is good."
else
    printf "$PRI has failed."
fi

printf '\n\n\n\n\n\n\n\n\n\n\n\n\nGenerating public key...'
ssh-keygen -e -m PEM -f $PRI > $PUB
if [ -f "$PUB" ];
then
    printf "$PUB is good."
else
    printf "$PUB has failed."
fi

printf '\n\n\n\n\n\n\n\n\n\n\n\n\nInstalling React Dependencies...'
cd view
npm i

