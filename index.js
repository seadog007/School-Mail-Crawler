var request = require("request");
var cheerio = require("cheerio");
var mailregex = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/g

var domain = process.argv[2]
var pages = (process.argv[3] - 1) * 10
var curPage = 0;

function getMatches(string, regex, index) {
  index || (index = 1); // default to the first capturing group
  var match;
  while (match = regex.exec(string)) {
    console.log(match[0])
  }
  return true;
}

console.log("#" + domain)
toGoogleReq();

function toGoogleReq() {
  //console.log(curPage);
  request({
    url: "https://www.google.com.tw/search?q=%e5%b8%ab%e8%b3%87+OR+email+OR+e-mail+OR+%e4%bf%a1%e7%ae%b1+OR+%e9%83%b5%e4%bb%b6+site%3a" + domain + "&start=" + curPage,
    headers: {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36'},
    method: "GET"
  }, function(e,r,b) {
    curPage += 10;
    if (curPage <= pages) setTimeout(toGoogleReq, 10000);

    $ = cheerio.load(b);
    $('.srg>.g>.rc>.r>a').map(
        function () {
          //console.log($(this).attr('data-href') || $(this).attr('href'))
            request({
              url: $(this).attr('data-href') || $(this).attr('href'),
              method: "GET"
            }, function(e,r,b) {
              //console.log(b)
              getMatches(b, mailregex, 1)
          })
        }
      )
  })
}
