<script setup>
const handleAddButtonClicked=()=> {
 console.log('Add button clicked');
}

</script>
<template>
   <EmptyState 
    addButtonText='add_communication_rule'
    message='no_communication_rules'
    @addButtonClicked='handleAddButtonClicked'
   />
</template>

