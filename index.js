
(function () {
    const path = require('path')
    const readlineSync = require('readline-sync');
    const fs = require('fs')
    function recursionPath(dir) {
        if (fs.statSync(dir).isDirectory() == false) {
            return
        }
        const ways = fs.readdirSync(dir)
        let rootArr = []
        for (let i = 0, length = ways.length; i < length; ++i) {
            if (ways[i] == 'node_modules') {
                continue
            }
            let way = path.resolve(dir, ways[i])
            if (fs.statSync(way).isDirectory() == false) {
                if (/^[/0-9a-zA-Z][.\-_/0-9a-zA-Z]*$/.test(way) == false || way.includes('..') || way.includes(`\\`) || way.includes('//')) {
                    console.log(way)
                }
            } else {
                rootArr.push(way)
            }
        }
        rootArr.forEach(element => {
            recursionPath(element)
        })
    }
    let rootPath = readlineSync.question('请输入路径: ')
    rootPath = path.resolve(rootPath)
    console.log(rootPath)
    recursionPath(rootPath)
})()

