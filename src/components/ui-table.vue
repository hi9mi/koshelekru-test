<script setup lang="ts">
import { computed, ref } from 'vue'
import { useDisplay } from 'vuetify'

const props = defineProps<{
  title: string
  items: { price: string, amount: string, total: string }[]
}>()

const { mobile } = useDisplay()
const itemsPerPage = ref(100)
const availableItemsPerPage = [100, 500, 1000]

const headers = computed(() => {
  return mobile.value
    ? [{ title: 'Price', key: 'price' }, { title: 'Total', key: 'total' }]
    : [{ title: 'Price', key: 'price' }, { title: 'Amount', key: 'amount' }, { title: 'Total', key: 'total' }]
})

const slicedItems = computed(() => {
  return props.items.slice(0, itemsPerPage.value)
})
</script>

<template>
  <v-card class="table-view">
    <v-card-title>
      {{ title }}
      <v-spacer />
      <v-select
        v-model="itemsPerPage"
        :items="availableItemsPerPage"
        label="Items per page"
        dense
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
          <tr
            v-for="item in slicedItems"
            :key="item.price"
          >
            <td>
              {{ item.price }}
            </td>
            <td v-if="!mobile">
              {{ item.amount }}
            </td>
            <td>
              {{ item.total }}
            </td>
          </tr>
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

.table-view__container {
  display: flex;
  margin-top: 20px;
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

.table-view__table > div {
  width: 100%;
}
</style>
