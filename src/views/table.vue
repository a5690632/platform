<template>
	<div></div>
</template>

<script>
	export default {
		async created() {
			let res = await this.$ajax.common.getTable();
			console.log(res);
		}
	};
</script>

<style lang="scss" scoped>
</style>