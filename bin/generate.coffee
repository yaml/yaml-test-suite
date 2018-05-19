_ = require 'lodash'

_.extend global,
  _: _
  fs: require 'fs'
  say: console.log
  exit: process.exit
  die: (msg)->
    say msg
    exit 1
  read: (path)->
    fs.readFileSync(path).toString()
  write: (path, text)->
    fs.writeFileSync(path, text)
  print: (text)->
    process.stdout.write String text
  exists: (path)->
    fs.existsSync path
  mkdir: (path)->
    fs.mkdirSync path
  link: (source, target)->
    fs.symlinkSync target, source
  compiler: require('testml-compiler/lib/testml-compiler/compiler')
