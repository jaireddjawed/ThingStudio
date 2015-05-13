Template.Apps.helpers({
	appslist: function(){
		return Apps.find({})
	},
	shareable: function(){
		if(this.access == "Shareable" || this.access=="Published") {
			return true;
		} else {
			return false;
		}
	}
});

Template.Apps.events({
	'click #select-app': function(ev) {
		ev.preventDefault();
		console.log(this);
		UnsubscribeAll();
		DisconnectMQTT();
		Session.set("currentApp",this);
		ResetMessages();
	}
	
})