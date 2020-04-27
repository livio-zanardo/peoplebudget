#!/bin/bash

clear
printf 'Installing VSCode Plugins...\n'
sh ./setup/install-plugins.sh

clear
printf 'Installing server dependencies...\n'
npm i

clear
printf 'Setting up database'
node ./setup/setup.js

clear
printf 'Cleaning up database...\n'
npm run drop:dev
npm run drop:test

clear
printf 'Migrating Database...\n'
npm run migrate:dev
npm run migrate:test

clear
printf 'Setting up keys...\n'
PRI=jwtRS256.key
PUB=jwtRS256.key.pub
KEYS=keys

clear
printf 'Checking for existing keys...\n'
if [ -d "$KEYS" ]; then
    printf 'Keys found, removing old keys'
    rm -rf $KEYS
fi
mkdir keys

cd keys || exit

clear
printf 'Generating private key...\n'
ssh-keygen -t rsa -P "" -b 4096 -m PEM -f $PRI
if [ -f "$PRI" ];
then
    printf "$PRI is good."
else
    printf "$PRI has failed."
fi

clear
printf 'Generating public key...\n'
ssh-keygen -e -m PEM -f $PRI > $PUB
if [ -f "$PUB" ];
then
    printf "$PUB is good."
else
    printf "$PUB has failed."
fi

clear
printf 'Installing React Dependencies...\n'
cd ../view
npm i

