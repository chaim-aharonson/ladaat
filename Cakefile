fs = require 'fs'

{print} = require 'sys'
{spawn} = require 'child_process'

build = (callback) ->
  coffee = spawn 'coffee', ['-c', '-o', 'assets/js', 'assets/coffeescript']
  coffee.stderr.on 'data', (data) ->
    process.stderr.write data.toString()
  coffee.stdout.on 'data', (data) ->
    print data.toString()
  coffee.on 'exit', (code) ->
    callback?() if code is 0

task 'build', 'Build assets/js/ from assets/coffeescript/', ->
  build()

 task 'watch', 'Watch assets/js/ for changes', ->
    coffee = spawn 'coffee', ['-w', '-c', '-o', 'assets/js', 'assets/coffeescript']
    coffee.stderr.on 'data', (data) ->
      process.stderr.write data.toString()
    coffee.stdout.on 'data', (data) ->
      print data.toString()