<template>
   <div class="table-container" ref="table">
      <table class="table">
         <tr class="table__headline">
            <th v-for="item in tableHeadline" :key="item">{{ item.text }}</th>
         </tr>
         <tr v-for="row in tableRows" :key="row.id">
            <td v-for="item in tableHeadline" :key="item.key">
               <slot v-if="item.slot" :name="item.key" :item="row.id" />
               <template v-else>
                  {{ row[item.key] }}
               </template>
            </td>
         </tr>
      </table>
   </div>
</template>

<script>

export default {
   name: 'AppTable',
   props: {
      tableHeadline: {
         type: Array,
         default() {
            return []
         }
      },
      tableRows: {
         type: Array,
         default() {
            return []
         }
      },
      offset: {
         type: String,
         default: 'auto'
      }
   },
   mounted() {
      this.offsetFunc()
   },
   methods: {
      offsetFunc() {
         this.$refs.table.style.maxHeight = this.offset
      }
   }
}
</script>

<style lang="scss" scoped>
.table-container {
   overflow: auto;
}

.table {
   border-collapse: collapse;

   th {
      font-size: 14px;
      font-weight: 400;
   }

   th+th {
      padding-left: 30px;
   }

   tr {
      font-size: 13px;
      font-weight: 300;
      height: 40px;
      border-bottom: 0.5px solid $AltoSolid;

      td+td {
         padding-left: 30px;
      }
   }

   td {
      white-space: pre;
   }

   &__headline {
      padding-bottom: 6px;
      border-bottom: 1px solid $Silver !important;

      th {
         text-align: left;
      }
   }
}
</style>
