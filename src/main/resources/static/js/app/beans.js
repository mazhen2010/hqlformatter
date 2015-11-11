define(function(require, exports, module) {
	
	"use strict";
	
	var _ = require('underscore');
	
	function extendClass(superClass, proto) {
		var superInstance = _.isFunction(superClass)? new superClass(): superClass;
		return _.extend(
			(function() {}).prototype, 
			superInstance, proto, 
			{
				superInstance: superInstance,
				superMethod: function(methodName) {
					var method = superInstance[methodName];
					if(!_.isFunction[method]) {
						return null;
					}
					var args = [].concat(arguments);
					args.shift();
					args.unshift(this);
					return method.apply(args);
				}
			}
		).constructor;
	}
	
	var Base = extendClass({
		start(start) {
			this._start = start;
			return this;
		},
		getStart() {
			return this._start || 0;
		},
		end(end) {
			this._end = end;
			return this;
		},
		getEnd() {
			return this._end || 0;
		},
		ensureArray: function(attr) {
			if(!_.isString(attr)) {
				throw 'Argument[attr] is required!';
			}
			if(!_.isArray(this[attr])) {
				this[attr] = [];
			}
			return this[attr];
		}
	});
	
	var AbstractTable = extendClass(Base, {
		alias(alias) {
			this._alias = alias;
			return this;
		},
		getAlias() {
			return this._alias || '';
		},
		headComment(comment) {
			this._headComment = comment;
			return this;
		},
		getHeadComment() {
			return this._headCommend || null;
		},
		tailComment(comment) {
			this._tailComment = comment;
			return this;
		},
		getTailComment() {
			return this._tailComment || null;
		}
	});
		
	var SimpleTable = extendClass(AbstractTable, {
		table: function(table) {
			this._table = table;
			return this;
		},
		getTable: function() {
			return this._table || '';
		},
		toString: function() {
			return this.getTable() + (_.isEmpty(this.getAlias())? '': ' ' + this.getAlias());
		}
	});
	
	var JoinTable = extendClass(AbstractTable, {
		joinKeyword: function(keyword) {
			this._joinKeyword = keyword;
			return this;
		},
		getJoinKeyword: function() {
			return this._joinKeyword || null;
		},
		baseTable: function(baseTable) {
			this._baseTable = baseTable;
			return this;
		},
		getBaseTable: function() {
			return this._baseTable || null;
		},
		getTable: function() {
			var table = this._baseTable? this._baseTable.getTable(): null;
			return 'JoinTable[' + table + ']';
		},
		addJoinOns: function () {
			this.ensureArray('_joinOnList').concat(argument);
			return this;
		},
		getJoinOns: function() {
			return this.ensureArray('_joinOnList');
		}
	});
	
	var UnionTable = extendClass(AbstractTable, {
		addUnionKeywords: function() {
			this.ensureArray('_unionKeywords').concat(arguments);
			return this;
		},
		getUnionKeywords: function() {
			return this.ensureArray('_unionKeywords');
		}
	});
	
	var QueryTable = extendClass(AbstractTable, {
		query: function(query) {
			if(query == null) {
				return this;
			}
			this._query = query;
			this.end(query.getEnd());
			return this;
		},
		getQuery: function() {
			return this._query || null;
		},
		getTable: function() {
			var queryStr = this._query? this._query.toString(): null;
			return 'QueryTable[' + queryStr + ']'
		}
	});
	
	var Query = extendClass(Base, {
		addSelects: function() {
			this.ensureArray('_selects').concat(arguments);
			return this;
		},
		getSelects: function() {
			return this.ensureArray('_selects');
		},
		addTables: function() {
			this.ensureArray('_tables').concat(arguments);
			return this;
		},
		getTables: function() {
			return this.ensureArray('_tables');
		},
		addWheres: function() {
			this.ensureArray('_wheres').concat(arguments);
			return this;
		},
		getWheres: function() {
			return this.ensureArray('_wheres');
		},
		addGroupBys: function() {
			this.ensureArray('_groupBys').concat(arguments);
			return this;
		},
		getGroupBys: function() {
			return this.ensureArray('_groupBys');
		}
	});
	
	var Keyword = extendClass(Base, {
		name: function(name) {
			this._name = name;
			return this;
		},
		getName: function() {
			return this._name || '';
		},
		comment: function(comment) {
			this._comment = comment;
			return this;
		},
		getComment: function() {
			return this._comment || null;
		}
	});
	
	var Comment = extendClass(Base, {
		content: function(content) {
			this._content = content;
			return this;
		},
		getContent: function() {
			return this._content || '';
		}
	});
	
	module.exports = {
		createKeyword: function() {
			return new Keyword();
		},
		createComment: function() {
			return new Comment();
		},
		createQuery: function() {
			return new Query();
		},
		createSimpleTable: function() {
			return new SimpleTable();
		},
		createQueryTable: function() {
			return new QueryTable();
		},
		createJoinTable: function() {
			return new JoinTable();
		},
		createUnionTable: function() {
			return new UnionTable();
		}
	};
	
});