const fs = require('fs');
const rawData = require('./raw_data');


console.log('processing raw data')

try {
    const patientLinks=rawData.raw_data.reduce((acc, row) => {
        let patient= {'id':row.patientnumber}
        if(!acc.nodes){
            acc.nodes=[]
        }
        if(!acc.links){
            acc.links=[]
        }
        acc.nodes.push(patient)
        let suspectedSources=row.contractedfromwhichpatientsuspected.split(",").filter(x=> x!="").map(x=>x.trim().substr(1))
        for (suspectedSource of suspectedSources){
            let link={}
            link.source=suspectedSource
            link.target=row.patientnumber
            acc.links.push(link)
       }
       return acc

    },{})

    fs.writeFileSync('patient_links.json', JSON.stringify(patientLinks, null, 2));
    console.log('Done with  creating link data for patients...');
    
} catch (error) {
    console.log(error)
}