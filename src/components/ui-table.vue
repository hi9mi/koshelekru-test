<script setup lang="ts" generic="T extends any[]">
import { computed, ref } from 'vue'

const props = defineProps<{
  title: string
  items: T
  loading?: boolean
  headers: { title: string, key: string }[]
  uniqueKey?: keyof T[number]
}>()

const itemsPerPage = ref(100)
const availableItemsPerPage = [100, 500, 1000]

const slicedItems = computed(() => {
  return props.items.slice(0, itemsPerPage.value)
})
</script>

<template>
  <v-card class="table-view">
    <v-card-title class="table-view__title">
      {{ title }}
      <v-select
        v-model="itemsPerPage"
        :items="availableItemsPerPage"
        label="Items per page"
        variant="outlined"
        class="items-per-page"
        hide-details="auto"
        density="compact"
      />
    </v-card-title>

    <div class="table-view__container">
      <v-table class="table-view__table">
        <thead class="table-view__header">
          <tr>
            <th v-for="header in headers" :key="header.key" class="text-left">
              {{ header.title }}
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-if="loading">
            <tr v-for="i in 10" :key="i">
              <td v-for="header in headers" :key="header.key">
                <v-skeleton-loader type="text" class="skeleton-text " />
              </td>
            </tr>
          </template>
          <template v-else>
            <tr
              v-for="(item, index) in slicedItems"
              :key="item[uniqueKey] ?? index"
            >
              <td v-for="header in headers" :key="header.key">
                {{ item[header.key] }}
              </td>
            </tr>
          </template>
        </tbody>
      </v-table>
    </div>
  </v-card>
</template>

<style scoped>
.table-view {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 100px);
}

.table-view__title {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.table-view__container {
  display: flex;
  flex-grow: 1;
  overflow: hidden;
}

.table-view__table {
  display: flex;
  flex-grow: 1;
  width: 100%;
}

.table-view__header {
  position: sticky;
  top: 0;
  z-index: 2;
  background: #fff;
}

.table-view__table > :deep(div) {
  width: 100%;
  overflow-y: scroll;
}

.skeleton-text > :deep(div) {
  margin: 0 !important;
}

@media screen and (max-width: 600px) {
  .table-view {
    height: calc(50vh - 60px);
  }
}
</style>
