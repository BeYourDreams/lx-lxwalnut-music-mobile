import { memo } from 'react'
import { TouchableOpacity } from 'react-native'

import { Icon } from '@/components/common/Icon'
import { useTheme } from '@/store/theme/hook'
import { createStyle, toast } from '@/utils/tools'
import { scaleSizeW } from '@/utils/pixelRatio'
import { useI18n } from '@/lang'
import { addListMusics } from '@/core/list'
import { LIST_IDS } from '@/config/constant'
import playerState from '@/store/player/state'
import settingState from '@/store/setting/state'

// 一键把当前歌曲加入本地“我的收藏”列表
export default memo(() => {
  const theme = useTheme()
  const t = useI18n()

  const handlePress = () => {
    const playing = playerState.playMusicInfo.musicInfo
    if (!playing) return
    const musicInfo = 'progress' in playing ? playing.metadata.musicInfo : playing
    void addListMusics(
      LIST_IDS.LOVE,
      [musicInfo],
      settingState.setting['list.addMusicLocationType']
    )
      .then(() => toast(t('list_edit_action_tip_add_success')))
      .catch(() => toast(t('list_edit_action_tip_add_failed')))
  }

  return (
    <TouchableOpacity style={styles.btn} activeOpacity={0.5} onPress={handlePress}>
      <Icon name="love" color={theme['c-font-label']} size={24} />
    </TouchableOpacity>
  )
})

const styles = createStyle({
  btn: {
    width: scaleSizeW(36),
    height: scaleSizeW(36),
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
