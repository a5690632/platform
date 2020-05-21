/* eslint-disable */
<template>
	<div>
		<div class="box">
			<div class="table-form">
				<el-form
					v-if="formConfig.length > 0"
					:model="ruleForm"
					ref="ruleForm"
					label-width="100px"
					class="form"
					inline
					size="small"
				>
					<div class="head">
						<div class="top">
							<div class="title">数据筛选</div>
							<el-button @click="openSearch" v-if="advancedForm.length>0" type="text">高级搜索</el-button>
						</div>
						<div class="form">
							<el-form-item
								v-for="(item, index) in headForm"
								:key="index"
								:label="item.label"
								:prop="item.name"
								:rules="item.config.rule"
								v-permission="item.auth"
							>
								<template v-if="item.config.change">
									<el-input
										v-if="item.type == 'text'"
										v-model.trim="ruleForm[item.name]"
										v-bind="item.config"
										@change="item.config.change({data:ruleForm,form:$refs['ruleForm']})"
									/>

									<el-select
										v-model="ruleForm[item.name]"
										v-bind="item.config"
										v-if="item.type == 'select'"
										@change="item.config.change({data:ruleForm,form:$refs['ruleForm']})"
									>
										<el-option
											v-for="(items) in item.config.data()"
											:key="items.id"
											:label="items.value"
											:value="items.id"
										></el-option>
									</el-select>
									<el-date-picker
										v-if="item.type == 'date'"
										v-model="ruleForm[item.name]"
										v-bind="item.config"
										format="yyyy-MM-dd"
										value-format="yyyy-MM-dd"
										range-separator="至"
										start-placeholder="开始日期"
										end-placeholder="结束日期"
										@change="item.config.change({data:ruleForm,form:$refs['ruleForm']})"
									></el-date-picker>
								</template>
								<template v-else>
									<el-input
										v-if="item.type == 'text'"
										v-model.trim="ruleForm[item.name]"
										v-bind="item.config"
									/>

									<el-select v-model="ruleForm[item.name]" v-bind="item.config" v-if="item.type == 'select'">
										<el-option
											v-for="(items,index) in item.config.data()"
											:key="index"
											:label="items.value"
											:value="items.id"
										></el-option>
									</el-select>

									<el-date-picker
										v-if="item.type == 'date'"
										v-model="ruleForm[item.name]"
										v-bind="item.config"
										format="yyyy-MM-dd"
										value-format="yyyy-MM-dd"
										range-separator="至"
										start-placeholder="开始日期"
										end-placeholder="结束日期"
									></el-date-picker>
								</template>
								<el-button
									:type="item.config.type"
									v-if="item.type == 'button'"
									v-bind="item.config"
									@click="item.config.click({data:ruleForm,form:$refs['ruleForm']})"
								>{{ item.value }}</el-button>
							</el-form-item>
						</div>
					</div>
					<el-dialog title="提示" :visible.sync="showAdvancedForm" width="40%">
						<span>
							<el-form-item
								v-for="(item, index) in advancedForm"
								:key="index"
								:label="item.label"
								:prop="item.name"
								:rules="item.config.rule"
								v-permission="item.auth"
							>
								<template v-if="item.config.change">
									<el-input
										v-if="item.type == 'text'"
										v-model.trim="ruleForm[item.name]"
										v-bind="item.config"
										@change="item.config.change({data:ruleForm,form:$refs['ruleForm']})"
									/>
									<el-select
										v-model="ruleForm[item.name]"
										v-bind="item.config"
										v-if="item.type == 'select'"
										@change="item.config.change({data:ruleForm,form:$refs['ruleForm']})"
									>
										<el-option
											v-for="(items,index) in item.config.data()"
											:key="index"
											:label="items.value"
											:value="items.id"
										></el-option>
									</el-select>
									<el-date-picker
										v-if="item.type == 'date'"
										v-model="ruleForm[item.name]"
										v-bind="item.config"
										format="yyyy-MM-dd"
										value-format="yyyy-MM-dd"
										range-separator="至"
										start-placeholder="开始日期"
										end-placeholder="结束日期"
										@change="item.config.change({data:ruleForm,form:$refs['ruleForm']})"
									></el-date-picker>
								</template>
								<template v-else>
									<el-input
										v-if="item.type == 'text'"
										v-model.trim="ruleForm[item.name]"
										v-bind="item.config"
									/>
									<el-select v-model="ruleForm[item.name]" v-bind="item.config" v-if="item.type == 'select'">
										<el-option
											v-for="(items,index) in item.config.data()"
											:key="index"
											:label="items.value"
											:value="items.id"
										></el-option>
									</el-select>

									<el-date-picker
										v-if="item.type == 'date'"
										v-model="ruleForm[item.name]"
										v-bind="item.config"
										format="yyyy-MM-dd"
										value-format="yyyy-MM-dd"
										range-separator="至"
										start-placeholder="开始日期"
										end-placeholder="结束日期"
									></el-date-picker>
								</template>
								<el-button
									:type="item.config.type"
									v-if="item.type == 'button'"
									v-bind="item.config"
									@click="item.config.click({data:ruleForm,form:$refs['ruleForm']})"
								>{{ item.value }}</el-button>
							</el-form-item>
						</span>
						<span slot="footer" class="dialog-footer">
							<el-button @click="showAdvancedForm = false">取 消</el-button>
							<el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
						</span>
					</el-dialog>
				</el-form>
			</div>
			<div class="table">
				<div class="d2-crud-header" v-if="$slots.header">
					<slot name="header"></slot>
				</div>
				<div class="d2-crud-body">
					<el-table
						height="500"
						ref="elTable"
						:data="d2CrudData"
						v-bind="options"
						@current-change="handleCurrentChange"
						@select="handleSelect"
						@select-all="handleSelectAll"
						@selection-change="handleSelectionChange"
						@sort-change="handleSortChange"
						@cell-mouse-enter="handleCellMouseEnter"
						@cell-mouse-leave="handleCellMouseLeave"
						@cell-click="handleCellClick"
						@cell-dblclick="handleCellDblclick"
						@row-click="handleRowClick"
						@row-contextmenu="handleRowContextmenu"
						@row-dblclick="handleRowDblclick"
						@header-click="handleHeaderClick"
						@header-contextmenu="handleHeaderContextmenu"
					>
						<el-table-column
							v-if="selectionRow && selectionRow.off"
							type="selection"
							:label="handleAttribute(selectionRow.title, '')"
							v-bind="selectionRow"
						></el-table-column>
						<el-table-column
							v-if="indexRow || indexRow === ''"
							type="index"
							:label="handleAttribute(indexRow.title, '')"
							v-bind="indexRow"
						></el-table-column>
						<!-- 暂不使用d2-column递归组件，有bug -->
						<el-table-column
							v-for="(item, index) in columns"
							:key="index"
							:label="handleAttribute(item.title, '')"
							:prop="handleAttribute(item.key, null)"
							v-bind="item"
						>
							<template slot-scope="scope">
								<el-input
									v-if="item.component && item.component.name === 'el-input'"
									v-model="scope.row[item.key]"
									v-bind="
                    d2CrudSize
                      ? Object.assign({ size: d2CrudSize }, item.component)
                      : item.component
                  "
									@change="
                    $emit('cell-data-change', {
                      rowIndex: scope.$index,
                      key: item.key,
                      value: scope.row[item.key],
                      row: scope.row
                    })
                  "
								></el-input>
								<el-input-number
									v-else-if="
                    item.component && item.component.name === 'el-input-number'
                  "
									v-model="scope.row[item.key]"
									v-bind="
                    d2CrudSize
                      ? Object.assign({ size: d2CrudSize }, item.component)
                      : item.component
                  "
									@change="
                    $emit('cell-data-change', {
                      rowIndex: scope.$index,
                      key: item.key,
                      value: scope.row[item.key],
                      row: scope.row
                    })
                  "
								></el-input-number>
								<el-radio-group
									v-else-if="
                    item.component && item.component.name === 'el-radio'
                  "
									v-model="scope.row[item.key]"
									v-bind="
                    d2CrudSize
                      ? Object.assign({ size: d2CrudSize }, item.component)
                      : item.component
                  "
									@change="
                    $emit('cell-data-change', {
                      rowIndex: scope.$index,
                      key: item.key,
                      value: scope.row[item.key],
                      row: scope.row
                    })
                  "
								>
									<template v-if="item.component.buttonMode">
										<el-radio-button
											v-for="option in item.component.options"
											:key="option.value"
											:label="option.value"
										>{{ option.label }}</el-radio-button>
									</template>
									<template v-else>
										<el-radio
											v-for="option in item.component.options"
											:key="option.value"
											:label="option.value"
										>{{ option.label }}</el-radio>
									</template>
								</el-radio-group>
								<el-checkbox-group
									v-else-if="
                    item.component && item.component.name === 'el-checkbox'
                  "
									v-model="scope.row[item.key]"
									v-bind="
                    d2CrudSize
                      ? Object.assign({ size: d2CrudSize }, item.component)
                      : item.component
                  "
									@change="
                    $emit('cell-data-change', {
                      rowIndex: scope.$index,
                      key: item.key,
                      value: scope.row[item.key],
                      row: scope.row
                    })
                  "
								>
									<template v-if="item.component.buttonMode">
										<el-checkbox-button
											v-for="option in item.component.options"
											:key="option.value"
											:label="option.value"
										>{{ option.label }}</el-checkbox-button>
									</template>
									<template v-else>
										<el-checkbox
											v-for="option in item.component.options"
											:key="option.value"
											:label="option.value"
										>{{ option.label }}</el-checkbox>
									</template>
								</el-checkbox-group>
								<el-select
									v-else-if="
                    item.component && item.component.name === 'el-select'
                  "
									v-model="scope.row[item.key]"
									v-bind="
                    d2CrudSize
                      ? Object.assign({ size: d2CrudSize }, item.component)
                      : item.component
                  "
									@change="
                    $emit('cell-data-change', {
                      rowIndex: scope.$index,
                      key: item.key,
                      value: scope.row[item.key],
                      row: scope.row
                    })
                  "
								>
									<el-option v-for="option in item.component.options" :key="option.value" v-bind="option"></el-option>
								</el-select>
								<el-cascader
									v-else-if="
                    item.component && item.component.name === 'el-cascader'
                  "
									v-model="scope.row[item.key]"
									v-bind="
                    d2CrudSize
                      ? Object.assign({ size: d2CrudSize }, item.component)
                      : item.component
                  "
									@change="
                    $emit('cell-data-change', {
                      rowIndex: scope.$index,
                      key: item.key,
                      value: scope.row[item.key],
                      row: scope.row
                    })
                  "
								></el-cascader>
								<el-switch
									v-else-if="
                    item.component && item.component.name === 'el-switch'
                  "
									v-model="scope.row[item.key]"
									v-bind="item.component"
									@change="
                    $emit('cell-data-change', {
                      rowIndex: scope.$index,
                      key: item.key,
                      value: scope.row[item.key],
                      row: scope.row
                    })
                  "
								></el-switch>
								<el-slider
									v-else-if="
                    item.component && item.component.name === 'el-slider'
                  "
									v-model="scope.row[item.key]"
									v-bind="item.component"
									@change="
                    $emit('cell-data-change', {
                      rowIndex: scope.$index,
                      key: item.key,
                      value: scope.row[item.key],
                      row: scope.row
                    })
                  "
								></el-slider>
								<el-time-select
									v-else-if="
                    item.component && item.component.name === 'el-time-select'
                  "
									v-model="scope.row[item.key]"
									v-bind="
                    d2CrudSize
                      ? Object.assign({ size: d2CrudSize }, item.component)
                      : item.component
                  "
									@change="
                    $emit('cell-data-change', {
                      rowIndex: scope.$index,
                      key: item.key,
                      value: scope.row[item.key],
                      row: scope.row
                    })
                  "
								></el-time-select>
								<el-time-picker
									v-else-if="
                    item.component && item.component.name === 'el-time-picker'
                  "
									v-model="scope.row[item.key]"
									v-bind="
                    d2CrudSize
                      ? Object.assign({ size: d2CrudSize }, item.component)
                      : item.component
                  "
									@change="
                    $emit('cell-data-change', {
                      rowIndex: scope.$index,
                      key: item.key,
                      value: scope.row[item.key],
                      row: scope.row
                    })
                  "
								></el-time-picker>
								<el-date-picker
									v-else-if="
                    item.component && item.component.name === 'el-date-picker'
                  "
									v-model="scope.row[item.key]"
									v-bind="
                    d2CrudSize
                      ? Object.assign({ size: d2CrudSize }, item.component)
                      : item.component
                  "
									@change="
                    $emit('cell-data-change', {
                      rowIndex: scope.$index,
                      key: item.key,
                      value: scope.row[item.key],
                      row: scope.row
                    })
                  "
								></el-date-picker>
								<el-rate
									v-else-if="
                    item.component && item.component.name === 'el-rate'
                  "
									v-model="scope.row[item.key]"
									v-bind="item.component"
									@change="
                    $emit('cell-data-change', {
                      rowIndex: scope.$index,
                      key: item.key,
                      value: scope.row[item.key],
                      row: scope.row
                    })
                  "
								></el-rate>
								<el-color-picker
									v-else-if="
                    item.component && item.component.name === 'el-color-picker'
                  "
									v-model="scope.row[item.key]"
									v-bind="
                    d2CrudSize
                      ? Object.assign({ size: d2CrudSize }, item.component)
                      : item.component
                  "
									@change="
                    $emit('cell-data-change', {
                      rowIndex: scope.$index,
                      key: item.key,
                      value: scope.row[item.key],
                      row: scope.row
                    })
                  "
								></el-color-picker>
								<render-custom-component
									v-else-if="item.component && item.component.name"
									v-model="scope.row[item.key]"
									:component-name="item.component.name"
									:props="item.component.props ? item.component.props : null"
									:scope="scope"
								></render-custom-component>
								<render-component
									v-else-if="item.component && item.component.render"
									:render-function="item.component.render"
									:scope="scope"
								></render-component>
								<template v-else>
									{{
									item.formatter
									? item.formatter(
									scope.row,
									scope.column,
									_get(scope.row, item.key),
									scope.$index
									)
									: _get(scope.row, item.key)
									}}
								</template>
							</template>
							<template v-if="item.children">
								<el-table-column
									v-for="(item2, index2) in item.children"
									:key="index2"
									:label="handleAttribute(item2.title, '')"
									:prop="handleAttribute(item2.key, null)"
									v-bind="item2"
								>
									<template slot-scope="scope">
										<el-input
											v-if="
                        item2.component && item2.component.name === 'el-input'
                      "
											v-model="scope.row[item2.key]"
											v-bind="
                        d2CrudSize
                          ? Object.assign({ size: d2CrudSize }, item2.component)
                          : item2.component
                      "
											@change="
                        $emit('cell-data-change', {
                          rowIndex: scope.$index,
                          key: item2.key,
                          value: scope.row[item2.key],
                          row: scope.row
                        })
                      "
										></el-input>
										<el-input-number
											v-else-if="
                        item2.component &&
                          item2.component.name === 'el-input-number'
                      "
											v-model="scope.row[item2.key]"
											v-bind="
                        d2CrudSize
                          ? Object.assign({ size: d2CrudSize }, item2.component)
                          : item2.component
                      "
											@change="
                        $emit('cell-data-change', {
                          rowIndex: scope.$index,
                          key: item2.key,
                          value: scope.row[item2.key],
                          row: scope.row
                        })
                      "
										></el-input-number>
										<el-radio-group
											v-else-if="
                        item2.component && item2.component.name === 'el-radio'
                      "
											v-model="scope.row[item2.key]"
											v-bind="
                        d2CrudSize
                          ? Object.assign({ size: d2CrudSize }, item2.component)
                          : item2.component
                      "
											@change="
                        $emit('cell-data-change', {
                          rowIndex: scope.$index,
                          key: item2.key,
                          value: scope.row[item2.key],
                          row: scope.row
                        })
                      "
										>
											<template v-if="item2.component.buttonMode">
												<el-radio-button
													v-for="option in item2.component.options"
													:key="option.value"
													:label="option.value"
												>{{ option.label }}</el-radio-button>
											</template>
											<template v-else>
												<el-radio
													v-for="option in item2.component.options"
													:key="option.value"
													:label="option.value"
												>{{ option.label }}</el-radio>
											</template>
										</el-radio-group>
										<el-checkbox-group
											v-else-if="
                        item2.component &&
                          item2.component.name === 'el-checkbox'
                      "
											v-model="scope.row[item2.key]"
											v-bind="
                        d2CrudSize
                          ? Object.assign({ size: d2CrudSize }, item2.component)
                          : item2.component
                      "
											@change="
                        $emit('cell-data-change', {
                          rowIndex: scope.$index,
                          key: item2.key,
                          value: scope.row[item2.key],
                          row: scope.row
                        })
                      "
										>
											<template v-if="item2.component.buttonMode">
												<el-checkbox-button
													v-for="option in item2.component.options"
													:key="option.value"
													:label="option.value"
												>{{ option.label }}</el-checkbox-button>
											</template>
											<template v-else>
												<el-checkbox
													v-for="option in item2.component.options"
													:key="option.value"
													:label="option.value"
												>{{ option.label }}</el-checkbox>
											</template>
										</el-checkbox-group>
										<el-select
											v-else-if="
                        item2.component && item2.component.name === 'el-select'
                      "
											v-model="scope.row[item2.key]"
											v-bind="
                        d2CrudSize
                          ? Object.assign({ size: d2CrudSize }, item2.component)
                          : item2.component
                      "
											@change="
                        $emit('cell-data-change', {
                          rowIndex: scope.$index,
                          key: item2.key,
                          value: scope.row[item2.key],
                          row: scope.row
                        })
                      "
										>
											<el-option v-for="option in item2.component.options" :key="option.value" v-bind="option"></el-option>
										</el-select>
										<el-cascader
											v-else-if="
                        item2.component &&
                          item2.component.name === 'el-cascader'
                      "
											v-model="scope.row[item2.key]"
											v-bind="
                        d2CrudSize
                          ? Object.assign({ size: d2CrudSize }, item2.component)
                          : item2.component
                      "
											@change="
                        $emit('cell-data-change', {
                          rowIndex: scope.$index,
                          key: item2.key,
                          value: scope.row[item2.key],
                          row: scope.row
                        })
                      "
										></el-cascader>
										<el-switch
											v-else-if="
                        item2.component && item2.component.name === 'el-switch'
                      "
											v-model="scope.row[item2.key]"
											v-bind="item2.component"
											@change="
                        $emit('cell-data-change', {
                          rowIndex: scope.$index,
                          key: item2.key,
                          value: scope.row[item2.key],
                          row: scope.row
                        })
                      "
										></el-switch>
										<el-slider
											v-else-if="
                        item2.component && item2.component.name === 'el-slider'
                      "
											v-model="scope.row[item2.key]"
											v-bind="item2.component"
											@change="
                        $emit('cell-data-change', {
                          rowIndex: scope.$index,
                          key: item2.key,
                          value: scope.row[item2.key],
                          row: scope.row
                        })
                      "
										></el-slider>
										<el-time-select
											v-else-if="
                        item2.component &&
                          item2.component.name === 'el-time-select'
                      "
											v-model="scope.row[item2.key]"
											v-bind="
                        d2CrudSize
                          ? Object.assign({ size: d2CrudSize }, item2.component)
                          : item2.component
                      "
											@change="
                        $emit('cell-data-change', {
                          rowIndex: scope.$index,
                          key: item2.key,
                          value: scope.row[item2.key],
                          row: scope.row
                        })
                      "
										></el-time-select>
										<el-time-picker
											v-else-if="
                        item2.component &&
                          item2.component.name === 'el-time-picker'
                      "
											v-model="scope.row[item2.key]"
											v-bind="
                        d2CrudSize
                          ? Object.assign({ size: d2CrudSize }, item2.component)
                          : item2.component
                      "
											@change="
                        $emit('cell-data-change', {
                          rowIndex: scope.$index,
                          key: item2.key,
                          value: scope.row[item2.key],
                          row: scope.row
                        })
                      "
										></el-time-picker>
										<el-date-picker
											v-else-if="
                        item2.component &&
                          item2.component.name === 'el-date-picker'
                      "
											v-model="scope.row[item2.key]"
											v-bind="
                        d2CrudSize
                          ? Object.assign({ size: d2CrudSize }, item2.component)
                          : item2.component
                      "
											@change="
                        $emit('cell-data-change', {
                          rowIndex: scope.$index,
                          key: item2.key,
                          value: scope.row[item2.key],
                          row: scope.row
                        })
                      "
										></el-date-picker>
										<el-rate
											v-else-if="
                        item2.component && item2.component.name === 'el-rate'
                      "
											v-model="scope.row[item2.key]"
											v-bind="item2.component"
											@change="
                        $emit('cell-data-change', {
                          rowIndex: scope.$index,
                          key: item2.key,
                          value: scope.row[item2.key],
                          row: scope.row
                        })
                      "
										></el-rate>
										<el-color-picker
											v-else-if="
                        item2.component &&
                          item2.component.name === 'el-color-picker'
                      "
											v-model="scope.row[item2.key]"
											v-bind="
                        d2CrudSize
                          ? Object.assign({ size: d2CrudSize }, item2.component)
                          : item2.component
                      "
											@change="
                        $emit('cell-data-change', {
                          rowIndex: scope.$index,
                          key: item2.key,
                          value: scope.row[item2.key],
                          row: scope.row
                        })
                      "
										></el-color-picker>
										<render-custom-component
											v-else-if="item2.component && item2.component.name"
											v-model="scope.row[item2.key]"
											:component-name="item2.component.name"
											:props="
                        item2.component.props ? item2.component.props : null
                      "
											:scope="scope"
										></render-custom-component>
										<render-component
											v-else-if="item2.component && item2.component.render"
											:render-function="item2.component.render"
											:scope="scope"
										></render-component>
										<template v-else>
											{{
											item2.formatter
											? item2.formatter(
											scope.row,
											scope.column,
											_get(scope.row, item2.key),
											scope.$index
											)
											: _get(scope.row, item2.key)
											}}
										</template>
									</template>
									<template v-if="item2.children">
										<el-table-column
											v-for="(item3, index3) in item2.children"
											:key="index3"
											:label="handleAttribute(item3.title, '')"
											:prop="handleAttribute(item3.key, null)"
											v-bind="item3"
										>
											<template slot-scope="scope">
												<el-input
													v-if="
                            item3.component &&
                              item3.component.name === 'el-input'
                          "
													v-model="scope.row[item3.key]"
													v-bind="
                            d2CrudSize
                              ? Object.assign(
                                  { size: d2CrudSize },
                                  item3.component
                                )
                              : item3.component
                          "
													@change="
                            $emit('cell-data-change', {
                              rowIndex: scope.$index,
                              key: item3.key,
                              value: scope.row[item3.key],
                              row: scope.row
                            })
                          "
												></el-input>
												<el-input-number
													v-else-if="
                            item3.component &&
                              item3.component.name === 'el-input-number'
                          "
													v-model="scope.row[item3.key]"
													v-bind="
                            d2CrudSize
                              ? Object.assign(
                                  { size: d2CrudSize },
                                  item3.component
                                )
                              : item3.component
                          "
													@change="
                            $emit('cell-data-change', {
                              rowIndex: scope.$index,
                              key: item3.key,
                              value: scope.row[item3.key],
                              row: scope.row
                            })
                          "
												></el-input-number>
												<el-radio-group
													v-else-if="
                            item3.component &&
                              item3.component.name === 'el-radio'
                          "
													v-model="scope.row[item3.key]"
													v-bind="
                            d2CrudSize
                              ? Object.assign(
                                  { size: d2CrudSize },
                                  item3.component
                                )
                              : item3.component
                          "
													@change="
                            $emit('cell-data-change', {
                              rowIndex: scope.$index,
                              key: item3.key,
                              value: scope.row[item3.key],
                              row: scope.row
                            })
                          "
												>
													<template v-if="item3.component.buttonMode">
														<el-radio-button
															v-for="option in item3.component.options"
															:key="option.value"
															:label="option.value"
														>{{ option.label }}</el-radio-button>
													</template>
													<template v-else>
														<el-radio
															v-for="option in item3.component.options"
															:key="option.value"
															:label="option.value"
														>{{ option.label }}</el-radio>
													</template>
												</el-radio-group>
												<el-checkbox-group
													v-else-if="
                            item3.component &&
                              item3.component.name === 'el-checkbox'
                          "
													v-model="scope.row[item3.key]"
													v-bind="
                            d2CrudSize
                              ? Object.assign(
                                  { size: d2CrudSize },
                                  item3.component
                                )
                              : item3.component
                          "
													@change="
                            $emit('cell-data-change', {
                              rowIndex: scope.$index,
                              key: item3.key,
                              value: scope.row[item3.key],
                              row: scope.row
                            })
                          "
												>
													<template v-if="item3.component.buttonMode">
														<el-checkbox-button
															v-for="option in item3.component.options"
															:key="option.value"
															:label="option.value"
														>{{ option.label }}</el-checkbox-button>
													</template>
													<template v-else>
														<el-checkbox
															v-for="option in item3.component.options"
															:key="option.value"
															:label="option.value"
														>{{ option.label }}</el-checkbox>
													</template>
												</el-checkbox-group>
												<el-select
													v-else-if="
                            item3.component &&
                              item3.component.name === 'el-select'
                          "
													v-model="scope.row[item3.key]"
													v-bind="
                            d2CrudSize
                              ? Object.assign(
                                  { size: d2CrudSize },
                                  item3.component
                                )
                              : item3.component
                          "
													@change="
                            $emit('cell-data-change', {
                              rowIndex: scope.$index,
                              key: item3.key,
                              value: scope.row[item3.key],
                              row: scope.row
                            })
                          "
												>
													<el-option
														v-for="option in item3.component.options"
														:key="option.value"
														v-bind="option"
													></el-option>
												</el-select>
												<el-cascader
													v-else-if="
                            item3.component &&
                              item3.component.name === 'el-cascader'
                          "
													v-model="scope.row[item3.key]"
													v-bind="
                            d2CrudSize
                              ? Object.assign(
                                  { size: d2CrudSize },
                                  item3.component
                                )
                              : item3.component
                          "
													@change="
                            $emit('cell-data-change', {
                              rowIndex: scope.$index,
                              key: item3.key,
                              value: scope.row[item3.key],
                              row: scope.row
                            })
                          "
												></el-cascader>
												<el-switch
													v-else-if="
                            item3.component &&
                              item3.component.name === 'el-switch'
                          "
													v-model="scope.row[item3.key]"
													v-bind="item3.component"
													@change="
                            $emit('cell-data-change', {
                              rowIndex: scope.$index,
                              key: item3.key,
                              value: scope.row[item3.key],
                              row: scope.row
                            })
                          "
												></el-switch>
												<el-slider
													v-else-if="
                            item3.component &&
                              item3.component.name === 'el-slider'
                          "
													v-model="scope.row[item3.key]"
													v-bind="item3.component"
													@change="
                            $emit('cell-data-change', {
                              rowIndex: scope.$index,
                              key: item3.key,
                              value: scope.row[item3.key],
                              row: scope.row
                            })
                          "
												></el-slider>
												<el-time-select
													v-else-if="
                            item3.component &&
                              item3.component.name === 'el-time-select'
                          "
													v-model="scope.row[item3.key]"
													v-bind="
                            d2CrudSize
                              ? Object.assign(
                                  { size: d2CrudSize },
                                  item3.component
                                )
                              : item3.component
                          "
													@change="
                            $emit('cell-data-change', {
                              rowIndex: scope.$index,
                              key: item3.key,
                              value: scope.row[item3.key],
                              row: scope.row
                            })
                          "
												></el-time-select>
												<el-time-picker
													v-else-if="
                            item3.component &&
                              item3.component.name === 'el-time-picker'
                          "
													v-model="scope.row[item3.key]"
													v-bind="
                            d2CrudSize
                              ? Object.assign(
                                  { size: d2CrudSize },
                                  item3.component
                                )
                              : item3.component
                          "
													@change="
                            $emit('cell-data-change', {
                              rowIndex: scope.$index,
                              key: item3.key,
                              value: scope.row[item3.key],
                              row: scope.row
                            })
                          "
												></el-time-picker>
												<el-date-picker
													v-else-if="
                            item3.component &&
                              item3.component.name === 'el-date-picker'
                          "
													v-model="scope.row[item3.key]"
													v-bind="
                            d2CrudSize
                              ? Object.assign(
                                  { size: d2CrudSize },
                                  item3.component
                                )
                              : item3.component
                          "
													@change="
                            $emit('cell-data-change', {
                              rowIndex: scope.$index,
                              key: item3.key,
                              value: scope.row[item3.key],
                              row: scope.row
                            })
                          "
												></el-date-picker>
												<el-rate
													v-else-if="
                            item3.component &&
                              item3.component.name === 'el-rate'
                          "
													v-model="scope.row[item3.key]"
													v-bind="item3.component"
													@change="
                            $emit('cell-data-change', {
                              rowIndex: scope.$index,
                              key: item3.key,
                              value: scope.row[item3.key],
                              row: scope.row
                            })
                          "
												></el-rate>
												<el-color-picker
													v-else-if="
                            item3.component &&
                              item3.component.name === 'el-color-picker'
                          "
													v-model="scope.row[item3.key]"
													v-bind="
                            d2CrudSize
                              ? Object.assign(
                                  { size: d2CrudSize },
                                  item3.component
                                )
                              : item3.component
                          "
													@change="
                            $emit('cell-data-change', {
                              rowIndex: scope.$index,
                              key: item3.key,
                              value: scope.row[item3.key],
                              row: scope.row
                            })
                          "
												></el-color-picker>
												<render-custom-component
													v-else-if="item3.component && item3.component.name"
													v-model="scope.row[item3.key]"
													:component-name="item3.component.name"
													:props="
                            item3.component.props ? item3.component.props : null
                          "
													:scope="scope"
												></render-custom-component>
												<render-component
													v-else-if="item3.component && item3.component.render"
													:render-function="item3.component.render"
													:scope="scope"
												></render-component>
												<template v-else>
													{{
													item3.formatter
													? item3.formatter(
													scope.row,
													scope.column,
													_get(scope.row, item3.key),
													scope.$index
													)
													: _get(scope.row, item3.key)
													}}
												</template>
											</template>
											<!-- <d2-column v-if="item.children" :columns="item.children"></d2-column> -->
										</el-table-column>
									</template>
									<!-- <d2-column v-if="item.children" :columns="item.children"></d2-column> -->
								</el-table-column>
							</template>
							<!-- <d2-column v-if="item.children" :columns="item.children"></d2-column> -->
						</el-table-column>
						<!-- <d2-column :columns="columns"></d2-column> -->
						<el-table-column
							v-if="rowHandle"
							:label="handleAttribute(rowHandle.columnHeader, '操作')"
							v-bind="rowHandle"
						>
							<template slot-scope="scope">
								<el-button
									v-if="
                    rowHandle.edit &&
                      handleRowHandleButtonShow(
                        rowHandle.edit.show,
                        scope.$index,
                        scope.row
                      )
                  "
									:disabled="
                    handleRowHandleButtonDisabled(
                      rowHandle.edit.disabled,
                      scope.$index,
                      scope.row
                    )
                  "
									v-bind="
                    d2CrudSize
                      ? Object.assign({ size: d2CrudSize }, rowHandle.edit)
                      : rowHandle.edit
                  "
									@click="handleEdit(scope.$index, scope.row)"
								>{{ handleAttribute(rowHandle.edit.text, "编辑") }}</el-button>
								<el-button
									v-if="
                    rowHandle.remove &&
                      handleRowHandleButtonShow(
                        rowHandle.remove.show,
                        scope.$index,
                        scope.row
                      )
                  "
									:type="handleAttribute(rowHandle.remove.type, 'danger')"
									:disabled="
                    handleRowHandleButtonDisabled(
                      rowHandle.remove.disabled,
                      scope.$index,
                      scope.row
                    )
                  "
									v-bind="
                    d2CrudSize
                      ? Object.assign({ size: d2CrudSize }, rowHandle.remove)
                      : rowHandle.remove
                  "
									@click="handleRemove(scope.$index, scope.row)"
								>
									{{
									handleAttribute(rowHandle.remove.text, "删除")
									}}
								</el-button>
								<div v-for="(item, index) in handleAttribute(rowHandle.custom, [])" :key="index">
									<el-button
										v-if="
                      handleRowHandleButtonShow(
                        item.show,
                        scope.$index,
                        scope.row
                      )
                    "
										:disabled="
                      handleRowHandleButtonDisabled(
                        item.disabled,
                        scope.$index,
                        scope.row
                      )
                    "
										v-bind="
                      d2CrudSize
                        ? Object.assign({ size: d2CrudSize }, item)
                        : item
                    "
										@click="
                      $emit(item.emit, { index: scope.$index, row: scope.row,data:ruleForm,form:$refs['ruleForm']},)
                    "
									>{{ item.text }}</el-button>
								</div>
							</template>
						</el-table-column>
					</el-table>
				</div>
				<div>
					<slot name="tableFoot" v-if="$slots.tableFoot"></slot>
					<div class="d2-crud-pagination" v-if="pagination">
						<el-pagination
							v-bind="pagination"
							@size-change="handlePaginationSizeChange"
							@current-change="(value)=>handlePaginationCurrentChange({data:ruleForm,page:value,form:$refs['ruleForm']})"
							@prev-click="(value)=>handlePaginationPrevClick({data:ruleForm,page:value,form:$refs['ruleForm']})"
							@next-click="(value)=>handlePaginationNextClick({data:ruleForm,page:value,form:$refs['ruleForm']})"
						></el-pagination>
					</div>
				</div>
				<el-dialog
					v-if="isDialogShow"
					:title="formMode === 'edit' ? editTitle : addTitle"
					:visible.sync="isDialogShow"
					:before-close="handleDialogCancel"
					v-bind="formOptions"
				>
					<el-form ref="form" :model="formData" :rules="handleFormRulesMode()" v-bind="formOptions">
						<el-row v-bind="formOptions">
							<div v-for="(value, key, index) in formData" :key="index">
								<el-col
									v-if="
                    handleFormTemplateMode(key).component
                      ? handleAttribute(
                          handleFormTemplateMode(key).component.show,
                          true
                        )
                      : true
                  "
									:span="
                    handleFormTemplateMode(key).component
                      ? handleAttribute(
                          handleFormTemplateMode(key).component.span,
                          24
                        )
                      : 24
                  "
									:offset="
                    handleFormTemplateMode(key).component
                      ? handleAttribute(
                          handleFormTemplateMode(key).component.offset,
                          0
                        )
                      : 0
                  "
								>
									<el-form-item :label="handleFormTemplateMode(key).title" :prop="key">
										<el-input
											v-if="
                        !handleFormTemplateMode(key).component ||
                          (!handleFormTemplateMode(key).component.name &&
                            !handleFormTemplateMode(key).component.render) ||
                          handleFormTemplateMode(key).component.name ===
                            'el-input'
                      "
											v-model="formData[key]"
											v-bind="
                        d2CrudSize
                          ? Object.assign(
                              { size: d2CrudSize },
                              handleFormTemplateMode(key).component
                            )
                          : handleFormTemplateMode(key).component
                      "
											@change="
                        $emit('form-data-change', { key: key, value: value })
                      "
										></el-input>
										<el-input-number
											v-else-if="
                        handleFormTemplateMode(key).component.name ===
                          'el-input-number'
                      "
											v-model="formData[key]"
											v-bind="
                        d2CrudSize
                          ? Object.assign(
                              { size: d2CrudSize },
                              handleFormTemplateMode(key).component
                            )
                          : handleFormTemplateMode(key).component
                      "
											@change="
                        $emit('form-data-change', { key: key, value: value })
                      "
										></el-input-number>
										<el-radio-group
											v-else-if="
                        handleFormTemplateMode(key).component.name ===
                          'el-radio'
                      "
											v-model="formData[key]"
											v-bind="
                        d2CrudSize
                          ? Object.assign(
                              { size: d2CrudSize },
                              handleFormTemplateMode(key).component
                            )
                          : handleFormTemplateMode(key).component
                      "
											@change="
                        $emit('form-data-change', { key: key, value: value })
                      "
										>
											<template v-if="handleFormTemplateMode(key).component.buttonMode">
												<el-radio-button
													v-for="option in handleFormTemplateMode(key).component
                            .options"
													:key="option.value"
													:label="option.value"
												>{{ option.label }}</el-radio-button>
											</template>
											<template v-else>
												<el-radio
													v-for="option in handleFormTemplateMode(key).component
                            .options"
													:key="option.value"
													:label="option.value"
												>{{ option.label }}</el-radio>
											</template>
										</el-radio-group>
										<el-checkbox-group
											v-else-if="
                        handleFormTemplateMode(key).component.name ===
                          'el-checkbox'
                      "
											v-model="formData[key]"
											v-bind="
                        d2CrudSize
                          ? Object.assign(
                              { size: d2CrudSize },
                              handleFormTemplateMode(key).component
                            )
                          : handleFormTemplateMode(key).component
                      "
											@change="
                        $emit('form-data-change', { key: key, value: value })
                      "
										>
											<template v-if="handleFormTemplateMode(key).component.buttonMode">
												<el-checkbox-button
													v-for="option in handleFormTemplateMode(key).component
                            .options"
													:key="option.value"
													:label="option.value"
												>{{ option.label }}</el-checkbox-button>
											</template>
											<template v-else>
												<el-checkbox
													v-for="option in handleFormTemplateMode(key).component
                            .options"
													:key="option.value"
													:label="option.value"
												>{{ option.label }}</el-checkbox>
											</template>
										</el-checkbox-group>
										<el-select
											v-else-if="
                        handleFormTemplateMode(key).component.name ===
                          'el-select'
                      "
											v-model="formData[key]"
											v-bind="
                        d2CrudSize
                          ? Object.assign(
                              { size: d2CrudSize },
                              handleFormTemplateMode(key).component
                            )
                          : handleFormTemplateMode(key).component
                      "
											@change="
                        $emit('form-data-change', { key: key, value: value })
                      "
										>
											<el-option
												v-for="option in handleFormTemplateMode(key).component
                          .options"
												:key="option.value"
												v-bind="option"
											></el-option>
										</el-select>
										<el-cascader
											v-else-if="
                        handleFormTemplateMode(key).component.name ===
                          'el-cascader'
                      "
											v-model="formData[key]"
											v-bind="
                        d2CrudSize
                          ? Object.assign(
                              { size: d2CrudSize },
                              handleFormTemplateMode(key).component
                            )
                          : handleFormTemplateMode(key).component
                      "
											@change="
                        $emit('form-data-change', { key: key, value: value })
                      "
										></el-cascader>
										<el-switch
											v-else-if="
                        handleFormTemplateMode(key).component.name ===
                          'el-switch'
                      "
											v-model="formData[key]"
											v-bind="handleFormTemplateMode(key).component"
											@change="
                        $emit('form-data-change', { key: key, value: value })
                      "
										></el-switch>
										<el-slider
											v-else-if="
                        handleFormTemplateMode(key).component.name ===
                          'el-slider'
                      "
											v-model="formData[key]"
											v-bind="handleFormTemplateMode(key).component"
											@change="
                        $emit('form-data-change', { key: key, value: value })
                      "
										></el-slider>
										<el-time-select
											v-else-if="
                        handleFormTemplateMode(key).component.name ===
                          'el-time-select'
                      "
											v-model="formData[key]"
											v-bind="
                        d2CrudSize
                          ? Object.assign(
                              { size: d2CrudSize },
                              handleFormTemplateMode(key).component
                            )
                          : handleFormTemplateMode(key).component
                      "
											@change="
                        $emit('form-data-change', { key: key, value: value })
                      "
										></el-time-select>
										<el-time-picker
											v-else-if="
                        handleFormTemplateMode(key).component.name ===
                          'el-time-picker'
                      "
											v-model="formData[key]"
											v-bind="
                        d2CrudSize
                          ? Object.assign(
                              { size: d2CrudSize },
                              handleFormTemplateMode(key).component
                            )
                          : handleFormTemplateMode(key).component
                      "
											@change="
                        $emit('form-data-change', { key: key, value: value })
                      "
										></el-time-picker>
										<el-date-picker
											v-else-if="
                        handleFormTemplateMode(key).component.name ===
                          'el-date-picker'
                      "
											v-model="formData[key]"
											v-bind="
                        d2CrudSize
                          ? Object.assign(
                              { size: d2CrudSize },
                              handleFormTemplateMode(key).component
                            )
                          : handleFormTemplateMode(key).component
                      "
											@change="
                        $emit('form-data-change', { key: key, value: value })
                      "
										></el-date-picker>
										<el-rate
											v-else-if="
                        handleFormTemplateMode(key).component.name === 'el-rate'
                      "
											v-model="formData[key]"
											v-bind="handleFormTemplateMode(key).component"
											@change="
                        $emit('form-data-change', { key: key, value: value })
                      "
										></el-rate>
										<el-color-picker
											v-else-if="
                        handleFormTemplateMode(key).component.name ===
                          'el-color-picker'
                      "
											v-model="formData[key]"
											v-bind="
                        d2CrudSize
                          ? Object.assign(
                              { size: d2CrudSize },
                              handleFormTemplateMode(key).component
                            )
                          : handleFormTemplateMode(key).component
                      "
											@change="
                        $emit('form-data-change', { key: key, value: value })
                      "
										></el-color-picker>
										<render-custom-component
											v-else-if="handleFormTemplateMode(key).component.name"
											v-model="formData[key]"
											:component-name="
                        handleFormTemplateMode(key).component.name
                      "
											:props="
                        handleFormTemplateMode(key).component.props
                          ? handleFormTemplateMode(key).component.props
                          : null
                      "
										></render-custom-component>
										<render-component
											v-else-if="handleFormTemplateMode(key).component.render"
											:render-function="
                        handleFormTemplateMode(key).component.render
                      "
											:scope="formData[key]"
										></render-component>
									</el-form-item>
								</el-col>
							</div>
						</el-row>
					</el-form>
					<div slot="footer">
						<el-button
							:size="
                formOptions
                  ? handleAttribute(formOptions.saveButtonSize, null)
                  : null
              "
							:type="
                formOptions
                  ? handleAttribute(formOptions.saveButtonType, null)
                  : null
              "
							:icon="
                formOptions
                  ? handleAttribute(formOptions.saveButtonIcon, null)
                  : null
              "
							:loading="
                formOptions
                  ? handleAttribute(formOptions.saveLoading, false)
                  : false
              "
							@click="handleDialogSave"
						>
							{{
							formOptions
							? handleAttribute(formOptions.saveButtonText, "确定")
							: "确定"
							}}
						</el-button>
					</div>
				</el-dialog>
			</div>
		</div>
	</div>
</template>

<script >
	import base from "./mixin/base";
	import handleRow from "./mixin/handleRow";
	import data from "./mixin/data";
	import edit from "./mixin/edit";
	import add from "./mixin/add";
	import remove from "./mixin/remove";
	import dialog from "./mixin/dialog";
	import pagination from "./mixin/pagination";
	import exposeMethods from "./mixin/exposeMethods.js";
	import utils from "./mixin/utils";
	import renderComponent from "./components/renderComponent.vue";
	import renderCustomComponent from "./components/renderCustomComponent.vue";

	export default {
		props: {
			formConfig: {
				type: Array,
				default: () => []
			},
			initGetData: {
				type: Boolean,
				default: false
			}
		},
		mixins: [
			base,
			data,
			handleRow,
			edit,
			add,
			remove,
			dialog,
			pagination,
			exposeMethods,
			utils
		],
		components: {
			renderComponent,
			renderCustomComponent
		},
		computed: {
			headForm() {
				var arr = [];
				this.formConfig.forEach(e => {
					if (e.slot == "head" && e.show !== false) {
						arr.push(e);
					}
				});
				return arr;
			},
			advancedForm() {
				var arr = [];
				this.formConfig.forEach(e => {
					if (e.slot == "advanced" && e.show !== false) {
						arr.push(e);
					}
				});
				return arr;
			}
		},
		data() {
			return {
				showAdvancedForm: false,
				d2CrudSize: "small",
				ruleForm: {}
			};
		},
		created() {
			this.formConfig.forEach(e => {
				if (e.config.default || e.config.default == "") {
					this.$set(this.ruleForm, e.name, e.config.default);
				}
			});
		},
		mounted() {
			if (this.initGetData) {
				this.$parent.getData({
					data: this.ruleForm,
					form: this.$refs.ruleForm
				});
			}
		},
		methods: {
			openSearch() {
				this.$refs["ruleForm"].validate(valid => {
					if (valid) {
						this.showAdvancedForm = true;
					} else {
						console.log("error submit!!");
						return false;
					}
				});
			},
			submitForm() {
				this.$refs["ruleForm"].validate(valid => {
					if (valid) {
						this.$emit("getData", {
							data: this.ruleForm,
							form: this.$refs.ruleForm
						});
						this.showAdvancedForm = false;
					} else {
						console.log("error submit!!");
						return false;
					}
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.box {
		position: relative;
		background: rgba(255, 255, 255, 1);
		padding: 24px 24px;
		.table-form {
			margin-bottom: 40px;
			.head {
				border: 1px solid black;
				.top {
					border-bottom: 1px solid black;
					height: 60px;
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 0 20px;
				}
				.form {
					padding: 20px;
					display: flex;
					align-items: center;
				}
			}
		}
		.table {
			border: 1px solid black;
			padding: 20px;
			.d2-crud-body {
				overflow: hidden;
			}
			.d2-crud-pagination {
				padding: 15px 0;
			}
			.cell {
				display: flex;
			}
		}
	}
</style>


<style lang="scss">
	.d2-crud-body {
		.cell {
			display: flex;
			button {
				margin-right: 10px;
			}
		}
	}
</style>



