<template>
	<div class="navbar">
		<div class="hamburger-container">
			<i
				class="el-icon-s-unfold"
				:class="{ 'is-active': sidebar.opened }"
				id="hamburger-container"
				@click="toggleSideBar"
			></i>
		</div>
		<!-- <breadcrumb id="breadcrumb-container" class="breadcrumb-container" /> -->
		<div class="right-menu">
			<el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
				<div class="avatar-wrapper">
					<!-- <img src="../../assets/img/avatar.jpg" class="user-avatar" /> -->
					<i class="el-icon-caret-bottom" />
				</div>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item divided @click.native="dialogFormVisible = true">修改密码</el-dropdown-item>

					<el-dropdown-item divided @click.native="logout">
						<span style="display:block;">登出</span>
					</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
		<!-- 修改密码 -->
		<el-dialog title="修改密码" :visible.sync="dialogFormVisible" :modal-append-to-body="false">
			<el-form :model="form">
				<el-form-item label="旧密码:" :label-width="formLabelWidth">
					<el-input v-model="form.oldPwd" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="新密码:" :label-width="formLabelWidth">
					<el-input v-model="form.newPwd" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="确认密码:" :label-width="formLabelWidth">
					<el-input v-model="form.confirmPwd" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="edit()">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	// import Breadcrumb from "@/components/Breadcrumb";
	// import Hamburger from "@/components/Hamburger";
	export default {
		name: "",
		data() {
			return {
				dialogFormVisible: false,
				form: {
					name: "",
					region: "",
					date1: "",
					date2: "",
					delivery: false,
					type: [],
					resource: "",
					desc: "",
					oldPwd: "",
					newPwd: "",
					confirmPwd: ""
				},
				formLabelWidth: "120px"
			};
		},
		components: {
			// Breadcrumb,
			// Hamburger
		},
		computed: {
			...mapState({
				sidebar: state => state.app.sidebar
			})
		},
		methods: {
			toggleSideBar() {
				this.$store.dispatch("app/toggleSideBar");
			},
			async logout() {
				await this.$store.dispatch("user/logout");
				this.$router.push(`/login?redirect=${this.$route.fullPath}`);
			},
			// 修改密码
			async edit() {
				console.log(this.$store.state.user.userInfo.id);
				let data = {
					oldPwd: this.form.oldPwd,
					newPwd: this.form.newPwd,
					confirmPwd: this.form.confirmPwd,
					id: this.$store.state.user.userInfo.id
				};
				let isfix = await this.$ajax.system.updatePassword(data);
				this.form.oldPwd = "";
				this.form.newPwd = "";
				this.form.confirmPwd = "";

				this.dialogFormVisible = false;
			}
		}
	};
</script>

<style lang="scss" scoped>
	.navbar {
		height: 50px;
		overflow: hidden;
		position: relative;
		background: #fff;
		box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
		.hamburger-container {
			line-height: 46px;
			height: 100%;
			float: left;
			cursor: pointer;
			padding: 0 15px;
			transition: background 0.3s;
			font-size: 22px;
			-webkit-tap-highlight-color: transparent;
			.is-active {
				transform: rotate(180deg);
			}
			&:hover {
				background: rgba(0, 0, 0, 0.025);
			}
		}

		.breadcrumb-container {
			float: left;
		}

		.errLog-container {
			display: inline-block;
			vertical-align: top;
		}

		.right-menu {
			float: right;
			height: 100%;
			line-height: 50px;

			&:focus {
				outline: none;
			}

			.right-menu-item {
				display: inline-block;
				padding: 0 8px;
				height: 100%;
				font-size: 18px;
				color: #5a5e66;
				vertical-align: text-bottom;

				&.hover-effect {
					cursor: pointer;
					transition: background 0.3s;

					&:hover {
						background: rgba(0, 0, 0, 0.025);
					}
				}
			}

			.avatar-container {
				margin-right: 30px;

				.avatar-wrapper {
					margin-top: 5px;
					position: relative;

					.user-avatar {
						cursor: pointer;
						width: 40px;
						height: 40px;
						border-radius: 10px;
					}

					.el-icon-caret-bottom {
						cursor: pointer;
						position: absolute;
						right: -20px;
						top: 25px;
						font-size: 12px;
					}
				}
			}
		}
	}
</style>
