const config = require('./env/env');
const neo4j = require('neo4j-driver').v1;

//var driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("", ""));


/*var driver = neo4j.driver("bolt://hobby-gojbbepjgmiigbkediphfial.dbs.graphenedb.com:24786", neo4j.auth.basic("serie-graph", "b.piWUERr38SEs.xzDcne55KbpGRA4l"));*/

if(process.env.NODE_ENV ===  'production'){
    var driver = neo4j.driver("bolt://hobby-gojbbepjgmiigbkediphfial.dbs.graphenedb.com:24786", neo4j.auth.basic("serie-graph", "b.piWUERr38SEs.xzDcne55KbpGRA4l"));
}else {
    var driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("", ""));
}


module.exports = driver;