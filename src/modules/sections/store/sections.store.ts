import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { SectionType } from '../types/section'

export const useSectionsStore = defineStore(
  'sections',
  () => {
    const sections = ref<SectionType[]>([])
    const totalSections = computed(() => sections.value.length)

    const setSectionsIntoStore = (newSection: SectionType) => {
      console.log('newSection', newSection)
      if (newSection.id) {
        const index = sections.value.findIndex(
          (section) => section.id === newSection.id
        )
        if (index !== -1) {
          const existingSection = sections.value[index]
          sections.value[index] = {
            ...newSection,
            id: existingSection?.id
          }
        } else {
          sections.value = [...sections.value, newSection]
        }
      } else {
        const sectionAddId = {
          ...newSection,
          id: sections.value.length + 1
        }
        sections.value = [...sections.value, sectionAddId]
      }
    }

    const deleteSection = (id: number) => {
      sections.value = sections.value.filter((section) => section.id !== id)
    }

    return {
      sections,
      totalSections,
      setSectionsIntoStore,
      deleteSection
    }
  },
  {
    persist: true
  }
)
