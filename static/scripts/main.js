this.JST=this.JST||{},function(){$(function(){var e,t,i,n,o,s,l;return i=Backbone.Model.extend({defaults:function(){return{title:"empty todo...",next_id:null,done:!1}},toggle:function(){return this.save({done:!this.get("done")})}}),n=Backbone.Collection.extend({model:i,url:"/api/task",parse:function(e){return e.objects},done:function(){return this.where({done:!0})},remaining:function(){return this.without.apply(this,this.done())},comparator:"next_id"}),s=new n,o=Backbone.View.extend({tagName:"li",template:Mustache.compile($("#task-template").html()),events:{"click .toggle":"toggleDone","click .title":"edit","click a.destroy":"clear","keypress .edit":"updateOnEnter","blur .edit":"close"},initialize:function(e){return this.listenTo(this.model,"change",this.render),this.listenTo(this.model,"change:id",this.changeAndResort),this.listenTo(this.model,"destroy",this.removeAndResort),this.vent=e.vent},render:function(){return this.$el.html(this.template(this.model.toJSON())),this.$el.toggleClass("done",this.model.get("done")),this.input=this.$(".edit"),this},changeAndResort:function(){return this.el.dataset.id=this.model.id,this.vent.trigger("sort"),console.log("trigger sort")},removeAndResort:function(){return this.remove(),this.vent.trigger("sort")},toggleDone:function(){return this.model.toggle()},edit:function(){return this.$el.addClass("editing"),this.input.focus()},close:function(){var e;return e=this.input.val(),e?(this.model.save({title:e}),this.$el.removeClass("editing")):this.clear()},updateOnEnter:function(e){return 13===e.keyCode?this.close():void 0},clear:function(){return this.model.destroy()}}),t=Backbone.View.extend({el:$(".container"),remainingTemplate:Mustache.compile($("#remaining-template").html()),events:{"keypress #new-todo":"createNewTask","click .add-button":"createNewTask","click #clear-completed":"clearCompleted","click #toggle-all":"toggleAllComplete"},initialize:function(e){return this.input=this.$("#new-todo"),this.allCheckbox=this.$("#toggle-all")[0],this.listenTo(s,"add",this.addOne),this.listenTo(s,"reset",this.addAll),this.footer=this.$("footer"),this.main=this.$("#main"),s.reset(preloadedTasks),$("#task-list").sortable({handle:".draggable",stop:this.sort}),$("#task-list").disableSelection(),_.bindAll(this,"sort"),e.vent.bind("sort",this.sort)},addOne:function(e){var t;return t=new o({model:e,vent:l}),this.$("#task-list").append(t.render().el).sortable("refresh")},addPreloaded:function(e){var t;return t=new o({model:e,el:this.$("li[data-id="+e.id+"]"),vent:l}),t.input=this.$("li[data-id="+e.id+"] .edit")},addAll:function(){return s.each(this.addPreloaded,this)},createNewTask:function(e){return e.keyCode&&13!==e.keyCode||!this.input.val()?void 0:(s.create({title:this.input.val()}),this.input.val(""))},clearCompleted:function(){return _.invoke(s.done(),"destroy"),!1},toggleAllComplete:function(){var e;return e=this.allCheckbox.checked,s.each(function(t){return t.save({done:e})})},sort:function(){var e,t,i,n,o,l;for(t=$("#task-list").sortable("toArray",{attribute:"data-id"}),console.log(t),i=s.get(t[0]),l=t.slice(1),n=0,o=l.length;o>n;n++)e=l[n],i.get("next_id")!==+e&&i.save({next_id:e}),i=s.get(e);return i&&null!==i.get("next_id")?i.save({next_id:null}):void 0}}),l=_.extend({},Backbone.Events),e=new t({vent:l})})}.call(this);