// const fs = require('fs')
const cheerio = require('cheerio')
const _ = require('lodash')
const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: false })

module.exports = async (req, res) => {
  const { url } = req.body
  if (!url && !isValidUrl(url)) {
    res.status(400).json({ message: 'url not found or Url is malformed' })
  }
  crawlRequest(url, {}, listAutio => {
    res.json(Object.values(listAutio))
  })
}
// https://www.youtube.com/watch?v=EN4ZS94bbPE&list=PL3E5qDhlF56c2UDINlJgLYNHY6TFkXlF0
async function crawlRequest(url, listAutio = {}, callback) {
  console.log(url)
  const result = await nightmare
    .goto(url)
    .scrollTo(100, 0)
    .wait('#playlist-actions')
    .wait(500)
    .evaluate(() => document.querySelector('body').innerHTML)
  let $ = cheerio.load(result)

  let strList = $(
    'yt-formatted-string.index-message.style-scope.ytd-playlist-panel-renderer'
  ).text()
  let listLength = getTheLengthOFList(strList)
  const elementContainer = $(
    '.ytd-playlist-panel-renderer ytd-playlist-panel-video-renderer#playlist-items'
  )
  elementContainer.each(function(e, val) {
    const linkRemote = $(this)
      .find('a')
      .attr('href')
    const link = 'https://www.youtube.com' + linkRemote
    const title = $(this)
      .find('span#video-title')
      .attr('title')
    listAutio[getIndexFromLinkVideo(link)] = {
      link,
      title,
    }
    if (_.size(elementContainer) - 1 == e) {
      if (_.size(listAutio) != listLength) {
        // console.log(listAutio[_.size(listAutio)].link);
        crawlRequest(listAutio[_.size(listAutio)].link, listAutio, callback)
      } else {
        nightmare.end().then(() => {
          //   fs.writeFile('crawl.json', JSON.stringify(listAutio), 'utf8', () => {
          //     console.log('success')
          //   })
          callback(listAutio)
          console.log('disconnect')
        })
      }
    }
  })
}

function getTheLengthOFList(str) {
  let tempValue = null
  str = str = str.replace(/\s/g, '')
  tempValue = str.split('/')[1]
  return tempValue
}

function getIndexFromLinkVideo(str) {
  return str.split('index=')[1]
}
function isValidUrl(string) {
  try {
    new URL(string)
    return true
  } catch (_) {
    return false
  }
}
