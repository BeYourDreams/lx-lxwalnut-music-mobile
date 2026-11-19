// 自检：设置页折叠/隐藏项 + 播放详情页按钮布局的接线
const assert = require('assert')
const fs = require('fs')
const path = require('path')

const read = (p) => fs.readFileSync(path.join(__dirname, p), 'utf8')

const basic = read('src/screens/Home/Views/Setting/settings/Basic/index.tsx')
const wy = read('src/screens/Home/Views/Setting/settings/Basic/WyCookie.tsx')
const settingMain = read('src/screens/Home/Views/Setting/Vertical/Main.tsx')
const playDetailMenu = read('src/screens/PlayDetail/components/PlayDetailMenu.tsx')
const verticalMore = read('src/screens/PlayDetail/Vertical/Player/components/MoreBtn/index.tsx')
const horizontalMore = read('src/screens/PlayDetail/Horizontal/MoreBtn/index.tsx')
const favorite = read('src/screens/PlayDetail/components/FavoriteBtn.tsx')

// 设置页：手风琴 + 快速直达；隐藏 QQ Cookie / SerpApi，保留网易云 Cookie
assert.ok(settingMain.includes('SectionAccordionContext'), '设置页未启用手风琴模式')
assert.ok(settingMain.includes('<NavList'), '设置页缺少快速直达导航')
assert.ok(!basic.includes('TxCookie'), 'QQ 音乐 Cookie 未隐藏')
assert.ok(basic.includes('WyCookie'), '网易云 Cookie 被误删')
assert.ok(!wy.includes('SerpApi'), 'SerpApi 未隐藏')

// 播放详情页：喜欢按钮隐藏，添加到/歌词/评论进更多，最左侧一键收藏
assert.ok(!verticalMore.includes('<LoveBtn'), '竖屏喜欢按钮未隐藏')
assert.ok(!horizontalMore.includes('<LoveBtn'), '横屏喜欢按钮未隐藏')
assert.ok(verticalMore.includes('<FavoriteBtn'), '竖屏缺少一键收藏按钮')
assert.ok(horizontalMore.includes('<FavoriteBtn'), '横屏缺少一键收藏按钮')
assert.ok(!verticalMore.includes('<CommentBtn') && !verticalMore.includes('<MusicAddBtn'), '竖屏按钮未收入更多')
for (const action of ['add', 'desktopLyric', 'comment']) {
  assert.ok(playDetailMenu.includes(`action: '${action}'`), `更多菜单缺少 ${action}`)
}
assert.ok(favorite.includes('LIST_IDS.LOVE'), '一键收藏未写入我的收藏列表')

console.log('settings/playdetail wiring ok')
