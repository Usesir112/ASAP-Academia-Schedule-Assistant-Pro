<template>
  <div>
    <TableView />
    <Edit />
  </div>
</template>
<script>
import TableView from '../components/Table/TableView.vue';
import Edit from '../components/Table/Edit.vue';

export default {
    components: { TableView, Edit }
}
</script>

