while read line
do
node index.js $line 150 | sort | uniq > ./out/$line
done < list.txt

