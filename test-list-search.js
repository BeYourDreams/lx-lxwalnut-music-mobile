// 自检：确认“我的列表”页搜索框走列表内搜索，其他页面仍走网络搜索页
const assert = require('assert')
const fs = require('fs')
const path = require('path')

const read = (p) => fs.readFileSync(path.join(__dirname, p), 'utf8')

const appEvent = read('src/event/appEvent.ts')
const globalSearch = read('src/components/GlobalSearch.tsx')
const mylist = read('src/screens/Home/Views/Mylist/MusicList/index.tsx')

// 事件名三处必须一致
const eventName = appEvent.match(/triggerListSearch\(text: string\) \{\s*this\.emit\('(\w+)'/)?.[1]
assert.ok(eventName, 'app_event 未定义 triggerListSearch 事件')
assert.ok(globalSearch.includes(`app_event.${eventName}(`), 'GlobalSearch 未触发列表搜索事件')
assert.ok(mylist.includes(`app_event.on('${eventName}'`), '我的列表页未监听列表搜索事件')

// 我的列表页搜索列表内歌曲，其他页面仍跳网络搜索页
assert.ok(globalSearch.includes("navActiveId === 'nav_love'"), 'GlobalSearch 未按页面区分搜索方式')
assert.ok(globalSearch.includes('app_event.triggerSearch('), 'GlobalSearch 未保留网络搜索')
assert.ok(mylist.includes("id !== 'nav_love'"), '离开我的列表页未收起搜索结果')

console.log('list search wiring ok:', eventName)
