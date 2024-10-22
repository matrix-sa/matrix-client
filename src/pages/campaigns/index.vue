<script setup>
  const handleAddButtonClicked = () => {
    console.log('Add button clicked')
  }
</script>
<template>
  <EmptyState
    add-button-text="add_communication_rule"
    message="no_communication_rules"
    @add-button-clicked="handleAddButtonClicked"
  />
</template>
