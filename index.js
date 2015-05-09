var request = require("request");
var cheerio = require("cheerio");
var fs = require('fs');
var mailregex = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/g

var domain = process.argv[2]
var pages =  process.argv[3] * 10

function getMatches(string, regex, index) {
  index || (index = 1); // default to the first capturing group
  var matches = [];
  var match;
  while (match = regex.exec(string)) {
    console.log(match[0])
    matches.push(match[index]);
  }
  return matches;
}

console.log("#" + domain)
for (i = 0; i <= pages; i+=10) {
  request({
    url: "https://www.google.com.tw/search?q=%E7%B3%BB+%E5%B8%AB%E8%B3%87+site:" + domain + "&start=" + i,
    headers: {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36'},
    method: "GET"
  }, function(e,r,b) { /* Callback 函式 */
    /* e: 錯誤代碼 */
    /* b: 傳回的資料內容 */
    $ = cheerio.load(b);
    $('.srg>.g>.rc>.r>a').map(
        function () {
          //console.log($(this).attr('data-href') || $(this).attr('href'))
            request({
              url: $(this).attr('data-href') || $(this).attr('href'),
              method: "GET"
            }, function(e,r,b) {
              //console.log(getMatches(b, mailregex, 1))
              getMatches(b, mailregex, 1)
          })
        }
      )
  })
}
