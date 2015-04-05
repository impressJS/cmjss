contentsDb = new Mongo.Collection('contents');
if (Meteor.isClient) {
    // counter starts at 0
    Session.setDefault('counter', 0);
    Session.setDefault('contents', "");
    Session.setDefault('contentText', '');
    Session.setDefault('content_id', '');
    Template.body.helpers({
        counter: function () {
            return Session.get('counter');
        },
        content_id: function () {
            var dbId = Session.get('content_id');
            Session.set('contentText', contentsDb.findOne({_id: dbId}));
        },
        contents: function () {
            return contentsDb.find({});
//        return "<p>"+Session.get('contentsDb')+"</p>";// contentsDb.find({});
        },
        contentText: function () {
//            return this._id;
            var content = Session.get('contentText').content;
            return (content == undefined) ? "" : content;
        }
    });

    Template.body.events({
        'click button#bt1': function () {
            // increment the counter when button is clicked
            var count = Session.get('counter');
            Session.set('counter', count + 1);
        },
        'click button#bt2': function () {
            // decrement the counter when button is clicked
            var count = Session.get('counter');
            Session.set('counter', count - 1);
        },
        'blur #contentId': function (ev) {
            // write in database collection 'contentsDb'
            var content = ev.target.value;
            var dbId = Session.get('content_id');
            if (dbId === "") {
                contentsDb.insert({
                    content: content
                });
            } else {
                contentsDb.update({_id: dbId}, {$set: {content: content}})
                Session.set('content', "");
                Session.set('content_id', "");
            }
            Session.set('contents', content);//Revresh then DB Collections List
        }
    });
    Template.content.helpers({
        text: function () {
            console.log("WWWWWWWWWWWWWWWWWWW");
            return this.content;
        }
    });
    Template.content.events({
        "click .delete": function () {
            contentsDb.remove(this._id);
        },
        "click .edit": function () {
            Session.set('content_id', this._id);
        }
    })
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}
