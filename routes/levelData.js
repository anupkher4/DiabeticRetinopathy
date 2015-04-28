var MongoClient = require('mongodb').MongoClient, assert = require('assert');

var url = 'mongodb://cmpe239:mongo@ds061767.mongolab.com:61767/drdb';

var mongoData = [];
var levelCount;

function passData(callback, model) {
    MongoClient.connect(url, function(err, db) {

        assert.equal(null, err);

        var collection = db.collection('images');

        collection.find({}, {'_id':0, 'image':0}).toArray(function(err, docs) {
            assert.equal(err, null);
            console.dir(docs);
            db.close();
            var out = [];
            for (var i in docs){
                mongoData.push(docs[i].level);
            }

            collection.aggregate[{$group : {_id : "level", image : {$count : 1}}
            },
                function(err, result){
                    callback(err, mongoData);
            }];

            res.render('mongo', {array: mongoData});
        });

    });
}

exports.createGraph = passData;