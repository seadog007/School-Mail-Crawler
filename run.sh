#!/bin/bash

while read line
do
#node index.js $line 150 > ./out/$line
node index.js $line 10
#node index.js $line 150 | sort | uniq > ./out/$line
done < list.txt

