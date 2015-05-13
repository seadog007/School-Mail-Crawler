while read line
do
node index.js $line 150 > ./out/$line
done < list.txt

