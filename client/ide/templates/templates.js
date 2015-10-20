Template.ScreensBody.created = function(){
	//InstantiateWidgets();
}

Template.ScreensBody.helpers({
	widgetlist: function(){
		wl =  Screens.find({  isWidget: true})
		return wl;
	},
	templatelist: function(){
		return Screens.find({$or:[{owner: Meteor.userId()}, {isWidget: false} ] }, {sort: {title: 1}});
	},
	// owner: function() {
	// 	return
	// },
	// publicscreens: function() {
	// 	return Screens.find({public: true})
	// },
	// allscreens: function() {
	// 	return Screens.find({})
	// },
	// status: function(){
	// 	if(this.owner == Meteor.userId()) {
	// 		return "Owner";
	// 	} else {
	// 		u = Meteor.users.findOne(this.owner);
	// 		return u ? u.username : "Unknown";
	// 	}
	// },
	// fromApp: function(){
	// 	app = Apps.findOne(this.appId);
	// 	return app.title;
	// },
	// home_page: function(){
	// 	app = Session.get("currentApp");
	// 	return  this._id == app.home_page ? "yes" : "no";
	// },
	isWidget: function(){
		return this.isWidget ? "icon-ts-checkmark" : "";
	},
	widget: function(){
		return( "aa" +this.isWidget)
	}
});

InstantiateWidgets = function(){
	//Instantiate all screens which are widgets
	wdgts = Widgets.find().fetch();
	// console.log("Instantiating Widgets", wdgts);
	for(var s=0; s<wdgts.length; s++){
		wgt = wdgts[s];
		scr = Screens.findOne({_id: wgt.baseScreen});
		if(!scr) {
			break;
		}
		if(Template[scr.title]) {
			// console.log("Deleting: ", scr.title);
			delete Template[scr.title]; //Remove the existing template.
		}
		// console.log("Compiling ", scr.title);
		compileTemplate(scr.title, scr.html, scr.js);
		if(wgt.widgetType == "Web Component") {
			try {
				// console.log("Registering widget")
				Template[scr.title].registerElement(wgt.tagName);
			}
			catch(err) {
				console.log("Problem registering element: "+ wgt.tagName);
			}
		}
	}
}
