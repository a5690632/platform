<template>
	<div :class="classObj" class="app-wrapper .clearfix">
		<sidebar class="sidebar-container" />
		<div class="main-container" :class="{hasTagsView:true}">
			<div class="fixed-header">
				<navbar />
			</div>
			<app-main />
		</div>
	</div>
</template>

<script>
	import Sidebar from "../../components/layout/Sidebar/index";
	import AppMain from "../../components/layout/appmin";
	import Navbar from "../../components/layout/Navbar";

	import { mapState } from "vuex";

	export default {
		name: "Layout",
		components: {
			AppMain,
			Sidebar,
			Navbar
		},
		computed: {
			...mapState({
				sidebar: state => state.app.sidebar
			}),
			classObj() {
				return {
					hideSidebar: !this.sidebar.opened,
					openSidebar: this.sidebar.opened
				};
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "~@/styles/variables.scss";
	.app-wrapper {
		position: relative;
		height: 100%;
		width: 100%;

		&.mobile.openSidebar {
			position: fixed;
			top: 0;
		}
	}

	.drawer-bg {
		background: #000;
		opacity: 0.3;
		width: 100%;
		top: 0;
		height: 100%;
		position: absolute;
		z-index: 999;
	}

	.fixed-header {
		position: fixed;
		top: 0;
		right: 0;
		z-index: 9;
		width: calc(100% - #{$sideBarWidth});
		transition: width 0.28s;
	}

	.hideSidebar .fixed-header {
		width: calc(100% - 54px);
	}

	.mobile .fixed-header {
		width: 100%;
	}
</style>
