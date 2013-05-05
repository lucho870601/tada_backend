this.JST=this.JST||{},function(){$(function(){var t,e,n,i,r,s,o;return n=Backbone.Model.extend({defaults:function(){return{title:"...",next_id:null,done:!1}},toggle:function(){return this.save({done:!this.get("done")})}}),i=Backbone.Collection.extend({model:n,url:"/api/task",parse:function(t){return t.objects},done:function(){return this.where({done:!0})},remaining:function(){return this.without.apply(this,this.done())},comparator:"next_id"}),s=new i,r=Backbone.View.extend({tagName:"li",template:Mustache.compile($("#task-template").html()),events:{"click .toggle":"toggleDone","click .title":"edit","keypress .edit":"updateOnEnter","blur .edit":"close"},initialize:function(t){return this.listenTo(this.model,"change",this.render),this.listenTo(this.model,"change:id",this.changeAndSort),this.listenTo(this.model,"destroy",this.removeAndSort),this.vent=t.vent},render:function(){return this.$el.html(this.template(this.model.toJSON())),this.$el.toggleClass("done",this.model.get("done")),this.input=this.$(".edit"),this},changeAndSort:function(){return this.el.dataset.id=this.model.id,this.vent.trigger("sort")},removeAndSort:function(){return this.remove(),this.vent.trigger("sort")},toggleDone:function(){return this.model.toggle()},edit:function(){return this.$el.addClass("editing"),this.input.focus()},close:function(){var t;return t=this.input.val(),t?(t!==this.model.get("title")&&(console.log(t,this.model.get("title")),this.model.save({title:t})),this.$el.removeClass("editing")):this.clear()},updateOnEnter:function(t){return 13===t.keyCode?this.close():void 0},clear:function(){return this.model.destroy()}}),e=Backbone.View.extend({el:$(".container"),events:{"keypress #new-todo":"createNewTask","click .add-button":"createNewTask","click #complete-all-checkbox":"completeAllTasks"},initialize:function(t){return this.input=this.$("#new-todo"),this.completeAll=this.$("#complete-all"),this.remaining=this.$("#complete-all .remaining"),this.listenTo(s,"add",this.addOne),this.listenTo(s,"reset",this.addAll),this.listenTo(s,"all",this.render),this.footer=this.$("footer"),this.main=this.$("#main"),s.reset(preloadedTasks),this.$("#task-list").sortable({handle:".draggable",stop:this.sort,cursor:"move",items:">li[data-id]"}),this.$("#task-list").disableSelection(),_.bindAll(this,"sort"),t.vent.bind("sort",this.sort)},render:function(){var t;return t=s.remaining().length,t>1?(this.remaining.html(t),this.completeAll.show()):this.completeAll.hide()},addOne:function(t){var e,n=this;return e=new r({model:t,vent:o}),this.$("#task-list").append(e.render().el),this.completeAll.insertAfter("#task-list li:last"),setTimeout(function(){return n.$("#task-list").sortable("refresh")},500)},addPreloaded:function(t){var e;return e=new r({model:t,el:this.$("li[data-id="+t.id+"]"),vent:o}),e.input=this.$("li[data-id="+t.id+"] .edit")},addAll:function(){return s.each(this.addPreloaded,this)},createNewTask:function(t){return t.keyCode&&13!==t.keyCode||!this.input.val()?void 0:(s.create({title:this.input.val()}),this.input.val(""))},completeAllTasks:function(){var t=this;return $.ajax("/api/task/complete-all",{type:"PATCH"}).then(function(){return t.$("#complete-all :checkbox").removeAttr("checked"),s.each(function(t){return t.set({done:!0})})})},sort:function(){var t,e,n,i,r,o;for(e=$("#task-list").sortable("toArray",{attribute:"data-id"}),console.log(e),n=s.get(e[0]),o=e.slice(1),i=0,r=o.length;r>i;i++)t=o[i],n.get("next_id")!==+t&&n.save({next_id:t}),n=s.get(t);return n&&null!==n.get("next_id")?n.save({next_id:null}):void 0}}),o=_.extend({},Backbone.Events),t=new e({vent:o})})}.call(this);