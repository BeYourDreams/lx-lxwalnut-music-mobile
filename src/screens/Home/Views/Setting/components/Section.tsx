import { createContext, useContext } from 'react'
import { View } from 'react-native'

import { createStyle } from '@/utils/tools'
import { useTheme } from '@/store/theme/hook'
import Text from '@/components/common/Text'

interface Props {
  title: string
  children: React.ReactNode | React.ReactNode[]
}

// 手风琴模式下由外层渲染标题
export const SectionAccordionContext = createContext(false)

export default ({ title, children }: Props) => {
  const theme = useTheme()
  const inAccordion = useContext(SectionAccordionContext)

  return (
    <View style={styles.container}>
      {inAccordion ? null : (
        <Text style={{ ...styles.title, borderLeftColor: theme['c-primary'] }} size={16}>
          {title}
        </Text>
      )}
      <View>{children}</View>
    </View>
  )
}

const styles = createStyle({
  container: {
    // paddingLeft: 10,
    // backgroundColor: 'rgba(0,0,0,0.2)',
  },
  title: {
    borderLeftWidth: 5,
    paddingLeft: 12,
    marginBottom: 10,
    // lineHeight: 16,
  },
})
