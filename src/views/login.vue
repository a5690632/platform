<template>
	<div class="login-container">
		<el-form
			ref="ruleForm"
			:model="ruleForm"
			:rules="loginRules"
			class="login-form"
			auto-complete="on"
			label-position="left"
		>
			<div class="title-container">
				<h3 class="title">登陆</h3>
			</div>
			<el-form-item prop="userName">
				<el-input
					ref="userName"
					v-model="ruleForm.userName"
					placeholder="用户名"
					prefix-icon="el-icon-user"
					name="userName"
					type="text"
					tabindex="1"
					auto-complete="on"
				/>
			</el-form-item>

			<el-form-item prop="password">
				<el-input
					ref="password"
					v-model="ruleForm.password"
					placeholder="密码"
					tabindex="2"
					type="password"
					auto-complete="on"
					@keyup.enter.native="handleLogin"
				/>
			</el-form-item>

			<el-button
				:loading="loading"
				type="primary"
				style="width:100%;margin-bottom:30px;"
				@click.native.prevent="handleLogin"
			>登陆</el-button>
		</el-form>
	</div>
</template>

<script>
	export default {
		name: "Login",
		data() {
			return {
				ruleForm: {
					userName: "",
					password: ""
				},
				loginRules: {
					userName: [
						{
							required: true,
							trigger: "blur",
							message: "请输入账号"
						}
					],
					password: [
						{
							required: true,
							trigger: "blur",
							message: "请输入密码"
						}
					]
				},
				loading: false,
				redirect: undefined
			};
		},
		watch: {
			$route: {
				handler: function(route) {
					const query = route.query;
					if (query) {
						this.redirect = query.redirect;
						this.otherQuery = this.getOtherQuery(query);
					}
				},
				immediate: true
			}
		},
		async mounted() {
			if (this.ruleForm.userName === "") {
				this.$refs.userName.focus();
			} else if (this.ruleForm.password === "") {
				this.$refs.password.focus();
			}
		},
		methods: {
			handleLogin() {
				this.$refs.ruleForm.validate(async valid => {
					if (valid) {
						this.loading = true;
						this.$store
							.dispatch("user/login", this.ruleForm)
							.then(() => {
								this.$router.push({
									path: this.redirect || "/",
									query: this.otherQuery
								});
								this.loading = false;
							})
							.catch(() => {
								this.loading = false;
							});
					} else {
						return false;
					}
				});
			},
			getOtherQuery(query) {
				return Object.keys(query).reduce((obj, k) => {
					if (k !== "redirect") {
						obj[k] = query[k];
					}
					return obj;
				}, {});
			}
		}
	};
</script>

<style lang="scss">
	/* 修复input 背景不协调 和光标变色 */
	/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

	$bg: #283443;
	$light_gray: #fff;
	$cursor: #fff;

	/* reset element-ui css */
	.login-container {
		.el-input {
			input {
				color: $light_gray;
				background: transparent;
				border: 0px;
				&:-webkit-autofill {
					box-shadow: 0 0 0px 1000px $bg inset !important;
					-webkit-text-fill-color: $cursor !important;
				}
			}
		}

		.el-form-item {
			border: 1px solid rgba(255, 255, 255, 0.1);
			background: rgba(0, 0, 0, 0.1);
			border-radius: 5px;
			color: #454545;
		}
	}
</style>

<style lang="scss" scoped>
	$bg: #2d3a4b;
	$dark_gray: #889aa4;
	$light_gray: #eee;

	.login-container {
		min-height: 100vh;
		width: 100%;
		background-color: $bg;
		overflow: hidden;

		.login-form {
			position: relative;
			width: 520px;
			max-width: 100%;
			padding: 160px 35px 0;
			margin: 0 auto;
			overflow: hidden;
		}

		.title-container {
			position: relative;
			.title {
				font-size: 26px;
				color: $light_gray;
				margin: 0px auto 40px auto;
				text-align: center;
				font-weight: bold;
			}
		}

		.send_box {
			position: absolute;
			top: 50%;
			right: 20px;
			transform: translateY(-50%);
			.send_code {
				color: blue;
				cursor: pointer;
			}
			.time {
				color: #eee;
			}
		}
	}
	.mmm {
		display: flex;

		.pr {
			flex: 1;
		}

		button {
			height: 42px;
			margin-left: 16px;
		}
	}
</style>
