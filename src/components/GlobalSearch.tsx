import { memo, useEffect, useRef, useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import Input, { type InputType } from '@/components/common/Input'
import { Icon } from '@/components/common/Icon'
import { createStyle } from '@/utils/tools'
import { useTheme } from '@/store/theme/hook'
import { useNavActiveId } from '@/store/common/hook'

const GlobalSearch = () => {
  const theme = useTheme()
  const [text, setText] = useState('')
  const inputRef = useRef<InputType>(null)
  const navActiveId = useNavActiveId()
  // “我的列表”页搜索当前列表内的歌曲，其余页面走网络搜索页
  const isListSearch = navActiveId === 'nav_love'
  const prevNavActiveIdRef = useRef(navActiveId)

  useEffect(() => {
    // 离开“我的列表”页时清掉列表搜索关键词
    if (prevNavActiveIdRef.current === 'nav_love' && navActiveId !== 'nav_love') setText('')
    prevNavActiveIdRef.current = navActiveId
  }, [navActiveId])

  const handleChangeText = (text: string) => {
    setText(text)
    if (isListSearch) global.app_event.triggerListSearch(text.trim())
  }

  const handleSearch = () => {
    const searchText = text.trim()
    if (isListSearch) {
      global.app_event.triggerListSearch(searchText)
      inputRef.current?.blur()
      return
    }
    if (!searchText) return

    // 触发全局搜索事件
    global.app_event.triggerSearch(searchText)
    setText('')
    inputRef.current?.blur()
  }

  return (
    <View style={styles.container}>
      <Input
        ref={inputRef}
        placeholder="搜索..."
        value={text}
        onChangeText={handleChangeText}
        onSubmitEditing={handleSearch}
        style={{ ...styles.input, backgroundColor: theme['c-primary-input-background'] }}
      />
      <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
        <Icon name="search-2" color={theme['c-font-label']} size={18} />
      </TouchableOpacity>
    </View>
  )
}

const styles = createStyle({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 10,
    maxWidth: 220, // 限制最大宽度
  },
  input: {
    height: 32,
    paddingRight: 30, // 为按钮留出空间
  },
  searchBtn: {
    position: 'absolute',
    right: 15,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
})

export default memo(GlobalSearch)
