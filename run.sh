#!/bin/bash

while read line
do
node index.js $line 10 | sort | uniq > ./out/$line
done < list.txt

