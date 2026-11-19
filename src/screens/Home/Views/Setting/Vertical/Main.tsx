import { memo, useCallback, useRef, useState } from 'react'
import { ScrollView, TouchableOpacity, View, type LayoutChangeEvent } from 'react-native'

import Basic from '../settings/Basic'
import Player from '../settings/Player'
import LyricDesktop from '../settings/LyricDesktop'
import Search from '../settings/Search'
import List from '../settings/List'
import Sync from '../settings/Sync'
import Download from '../settings/Download'
import Backup from '../settings/Backup'
import Other from '../settings/Other'
import Version from '../settings/Version'
import About from '../settings/About'
import { createStyle } from '@/utils/tools'
import { SETTING_SCREENS, type SettingScreenIds } from '../Main'
import { SectionAccordionContext } from '../components/Section'
import { useI18n } from '@/lang'
import { useTheme } from '@/store/theme/hook'
import { Icon } from '@/components/common/Icon'
import Text from '@/components/common/Text'
import { BorderWidths } from '@/theme'
import NavList from './NavList'

const ListItem = memo(
  ({ id }: { id: SettingScreenIds }) => {
    switch (id) {
      case 'player':
        return <Player />
      case 'lyric_desktop':
        return <LyricDesktop />
      case 'search':
        return <Search />
      case 'list':
        return <List />
      case 'download':
        return <Download />
      case 'sync':
        return <Sync />
      case 'backup':
        return <Backup />
      case 'other':
        return <Other />
      case 'version':
        return <Version />
      case 'about':
        return <About />
      case 'basic':
        return <Basic />
    }
  },
  () => true
)

export default () => {
  const t = useI18n()
  const theme = useTheme()
  const [activeId, setActiveId] = useState<SettingScreenIds>(global.lx.settingActiveId)
  const scrollRef = useRef<ScrollView>(null)
  const offsetsRef = useRef<Partial<Record<SettingScreenIds, number>>>({})

  const handleJump = useCallback((id: SettingScreenIds) => {
    setActiveId(id)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const y = offsetsRef.current[id]
        if (y != null) scrollRef.current?.scrollTo({ y: Math.max(0, y - 5), animated: true })
      })
    })
  }, [])

  const handleLayout = (id: SettingScreenIds) => (e: LayoutChangeEvent) => {
    offsetsRef.current[id] = e.nativeEvent.layout.y
  }

  return (
    <View style={styles.container}>
      <NavList activeId={activeId} onChangeId={handleJump} />
      <ScrollView ref={scrollRef} keyboardShouldPersistTaps={'always'} contentContainerStyle={styles.content}>
        <SectionAccordionContext.Provider value={true}>
          {SETTING_SCREENS.map(id => {
            const expanded = activeId === id
            return (
              <View key={id} onLayout={handleLayout(id)}>
                <TouchableOpacity
                  style={{ ...styles.sectionHeader, borderBottomColor: theme['c-border-background'] }}
                  onPress={() => {
                    setActiveId(id)
                    global.lx.settingActiveId = id
                  }}
                >
                  <Text size={16} color={expanded ? theme['c-primary'] : theme['c-font']}>
                    {t(`setting_${id}`)}
                  </Text>
                  <Icon
                    name="chevron-right"
                    size={14}
                    color={theme['c-font-label']}
                    style={{ transform: [{ rotate: expanded ? '90deg' : '0deg' }] }}
                  />
                </TouchableOpacity>
                {expanded ? <ListItem id={id} /> : null}
              </View>
            )
          })}
        </SectionAccordionContext.Provider>
      </ScrollView>
    </View>
  )
}

const styles = createStyle({
  container: {
    flex: 1,
  },
  content: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 15,
  },
  sectionHeader: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: BorderWidths.normal,
  },
})
