import { computed, ref } from 'vue'
import type { UserType } from '../types/user'
import { defineStore } from 'pinia'

export const useUsersStore = defineStore('users', () => {
  const users = ref<UserType[]>([])
  const totalUsers = computed(() => users.value.length)

  const setUsersIntoStore = (newUsers: UserType) => {
    console.log('newUsers', newUsers);
    
    if (newUsers.id) {
      const index = users.value.findIndex((user) => user.id === newUsers.id)
      if (index !== -1) {
        users.value[index] = newUsers
      } else {
        users.value = [...users.value, newUsers]
      }
    } else {
      const userAddId = {
        ...newUsers,
        id: users.value.length + 1
      }
      users.value = [...users.value, userAddId]
    }
  }

  return {
    users,
    totalUsers,
    setUsersIntoStore
  }
}, {
  persist: true
})
