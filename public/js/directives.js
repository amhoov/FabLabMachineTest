var VIEW_NAME_REGEX=RegExp(/[a-zA-Z_]+[a-z]/g),dragOps={addClass:!1,cursorAt:{left:17,top:17},revert:"invalid",zIndex:900,start:function(){$(this).addClass("ui-state-disabled")},stop:function(){var a=$(this);a.data("dropped")||(a.draggable("enable"),a.removeClass("ui-state-disabled"))}},dropOps={addClasses:!1,tolerance:"intersect",over:function(){var a=$(this);a.add(a.siblings()).addClass("ui-state-hover")},out:function(){var a=$(this);a.add(a.siblings()).removeClass("ui-state-hover")},drop:function(a,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         g){var b=$(this),c=b.add(b.siblings()),d=g.draggable,h=d.add(d.siblings()),e=d.data("part-id").replace(VIEW_NAME_REGEX,""),f=b.data("part-id"),k=b.parents(".machine-view").siblings(".span3"),l=k.find(".score").add($(".check-total").find(".score"));l.length&&(l.html(""),b.parent().siblings().add(b.parent()).children().each(function(){var a=$(this);a.css("border-color",a.data("border-color"))}));c.hasClass("ui-state-hover")&&c.removeClass("ui-state-hover");if(d.hasClass("part-drop")){if(b.data("part-id")!==
    d.data("part-id"))if(void 0===b.data("part-id"))h.removeClass("ui-state-highlight").text("");else{c.data("part-id",d.data("part-id"));c.text(d.text());h.removeData("part-id").text("").removeClass("ui-state-highlight");k.find(".part").each(function(){var a=$(this);a.data("part-id")===f&&a.data("dropped",!1).draggable("enable").removeClass("ui-state-disabled")});return}else return!1;c.addClass("ui-state-highlight").text(e).data("part-id",d.data("part-id"));h.removeData("part-id")}else void 0===b.data("part-id")?
    d.data("dropped",!0).draggable("disable"):(d.data("dropped",!0).draggable("disable"),d.siblings().each(function(){var a=$(this);if(a.data("part-id")===f)return a.data("dropped",!1).draggable("enable").removeClass("ui-state-disabled"),!1})),c.addClass("ui-state-highlight").text(e).data("part-id",d.data("part-id"))}},rearrangeOps={addClass:!1,cursorAt:{left:17,top:17},revert:"invalid",zIndex:900,start:function(){var a=$(this);if(a.data("part-id"))a.add(a.siblings()).addClass("ui-draggable-disabled");
else return!1},stop:function(){var a=$(this);a.add(a.siblings()).removeClass("ui-draggable-disabled")}};
app.directive("uiDraggable",function(){return{restrict:"A",link:function(a,g,b){var c=a.$eval(b.uiDraggable);a=dragOps;a.scope=c.scope;a.helper=function(){return $("<div></div>").text(c.helper.letter)};g.draggable(a).tap(function(){var a=$(this),b=a.siblings(".ui-touch-active").add(a.parents(".span3").siblings(".span9").find(".ui-touch-active"));a.hasClass("ui-draggable-disabled")||(a.toggleClass("ui-touch-active"),b.length&&b.removeClass("ui-touch-active"))})}}}).directive("uiDroppable",function(){return{restrict:"A",
    link:function(a,g,b){a=a.$eval(b.uiDroppable);var c=dropOps;c.scope=a.scope;g.droppable(c).tap(function(){var a=$(this),b=a.parents(".span9").siblings(".span3").find(".ui-touch-active"),e=a.parent().siblings().find(".ui-touch-active"),e=b.add(e);e.length?(e.context=e[0],delete e.prevObject,delete e.selector,c.drop.call(a,event,{draggable:e.eq(0)}),e.removeClass("ui-touch-active")):b.length||a.hasClass("ui-draggable-disabled")||!a.hasClass("ui-state-highlight")||(a.add(a.siblings()).toggleClass("ui-touch-active"),
        e.length&&e.removeClass("ui-touch-active"))})}}}).directive("uiRearrange",function(){return{restrict:"A",link:function(a,g,b){a=a.$eval(b.uiRearrange);b=rearrangeOps;b.scope=a.scope;b.helper=function(){return $("<div></div>").text(g.data("part-id")?g.data("part-id").replace(VIEW_NAME_REGEX,""):"")};g.draggable(b)}}}).directive("addPartId",function(){return{restrict:"A",link:function(a,g){g.data("part-id",a.partId)}}}).directive("addPartDescription",function(){return{restrict:"A",link:function(a,g){var b,
        c;a.part.description&&(b=$('<i class="icon-question-sign get-description ui-icon" title="Hint" data-toggle="tooltip"></i>').click(function(){a.toggle(event)}),c=$('<span class="part-description ui-helper-hidden-accessible">'+a.part.description+"</span>"),g.append(b).append(c))}}}).directive("stylePart",function(){return{restrict:"A",link:function(a,g,b){var c=a.$eval(b.stylePart);b=c.part;var d=c.count,h=c.viewIndex,c=c.name,e=a[c+"BorderColors"],d={left:b["x"+d]+"%",top:b["y"+d]+"%"},f=a[c+"Colors"];
        e.length?(f.currentviewIndex!==h&&(a[c+"Colors"].currentIndex=null,f.currentviewIndex=h,f.colors=e.slice(0)),f.currentPart!==b.name&&(f.currentPart=b.name,null!==f.currentIndex&&f.colors.splice(f.currentIndex,1),f.currentIndex=Math.floor(Math.random()*f.colors.length)),b=f.colors[f.currentIndex],a[c+"Colors"]=f,a=b):a="rgb(0, 136, 204)";d["border-color"]=a;g.css(d).data("border-color",d["border-color"])}}});