import { memo } from 'react'
import { View } from 'react-native'

import InputItem, { type InputItemProps } from '../../components/InputItem'
import { createStyle, toast } from '@/utils/tools'
import { useSettingValue } from '@/store/setting/hook'
import { useI18n } from '@/lang'
import { updateSetting } from '@/core/common'

const MIN_OFFSET = -5000
const MAX_OFFSET = 5000

export default memo(() => {
  const t = useI18n()
  const lyricOffset = useSettingValue('player.lyricOffset')

  const setOffset: InputItemProps['onChanged'] = (value, callback) => {
    let offset = parseInt(value)
    if (Number.isNaN(offset)) offset = 0
    else if (offset < MIN_OFFSET) offset = MIN_OFFSET
    else if (offset > MAX_OFFSET) offset = MAX_OFFSET
    callback(String(offset))
    if (lyricOffset == offset) return
    updateSetting({ 'player.lyricOffset': offset })
    toast(t('setting_player_lyric_offset_tip'))
  }

  return (
    <View style={styles.content}>
      <InputItem
        value={String(lyricOffset)}
        label={t('setting_player_lyric_offset')}
        onChanged={setOffset}
        placeholder="0"
      />
    </View>
  )
})

const styles = createStyle({
  content: {
    marginTop: 10,
  },
})
