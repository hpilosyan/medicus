var glob = require('glob');
var mongo = require('mongoskin');
var u = require('underscore');
var p = require('path');
var fs = require('fs');

var db = mongo.db('mongodb://localhost/medicus');
var completed_collections = 0;

glob('collections/*.json', function (err, files) {
    u.each(files, function (filename) {
        var collection_name = p.basename(filename, ".json");
        var collection = db.collection(collection_name);

        collection.drop(function () {
            console.log('= dropped: ' + collection_name);

            fs.readFile(filename, function (err, contents) {
                var documents = JSON.parse(contents);
                var completed_documents = 0;
                u.each(documents, function (document) {
                    collection.insert(document, function (err, result) {
                        console.log("+ inserted: " + u.first(result)._id + " into " + collection_name);
                        completed_documents++;
                        if (completed_documents === documents.length) {
                            console.log("= completed: " + collection_name);
                            completed_collections++;
                        }
                        if (completed_collections == files.length) {
                            console.log("= completed all collections");
                            db.close();
                        }
                    });
                });
            });
        });
    });
});

