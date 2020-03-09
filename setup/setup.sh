#!/bin/bash
echo 'Setting up keys...'
PRI=jwtRS256.key
PUB=jwtRS256.key.pub
KEYS=keys
echo 'Checking for existing keys...'
if [ -d "$KEYS" ]; then
    echo 'Keys found, removing old keys'
    rm -rf $KEYS
fi
mkdir keys
cd keys || exit
echo 'Generating private key...'
ssh-keygen -t rsa -P "" -b 4096 -m PEM -f $PRI
if [ -f "$PRI" ];
then
    echo "$PRI is good."
else
    echo "$PRI has failed."
fi
echo 'Generating public key...'
ssh-keygen -e -m PEM -f $PRI > $PUB
if [ -f "$PUB" ];
then
    echo "$PUB has good."
else
    echo "$PUB is failed."
fi