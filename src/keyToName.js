export const keyToNameMapping = {
    SAMPLE_ID: 'sampleId',
    BARCODE_NAME: 'barcode',
    SPECIES: 'animalSpecies',
    PANEL: 'panel',
    LAB_REF_ID: 'labRefId',
    ANIMAL_NAME: 'animalName',
    LAB_REF_ID: 'labRefId',
    REF_DATE: 'refDate',
    REPORT_DATE: 'reportDate',
    CUSTOMER_NAME: 'customerName'
};

export const keyToNameMappingCSV = {
    LAB_REF_ID: 'LabRefId',
    CUSTOMER_NAME: 'CustomerName',
    ANIMAL_NAME: 'AnimalNameOrID'
};

export const mergeTables = (currentFile, csvJsonFile) => {
    let combinedAll = []
    currentFile.forEach(row => {
        if (row && Object.keys(row).length !== 0) {
            const referenceId = row['sampleId'];
            console.log(referenceId)
            const referenceIdExists = csvJsonFile.find(file => file['LabRefId'] === referenceId)
            console.log(referenceIdExists)
            if (referenceIdExists && referenceIdExists !== -1) {
                combinedAll.push({
                    'sampleId':row['sampleId'],
                    'barcodeName':row['barcode'],
                    'animalSpecies':row['animalSpecies'],
                    'panel':row['panel'],
                    'labRefId':referenceIdExists['LabRefId'],
                    'animalName':referenceIdExists['AnimalNameOrID'],
                    'refDate':row['refDate'],
                    'reportDate':row['reportDate'],
                    'customerName':referenceIdExists['CustomerName']
                })
            } else {
                combinedAll.push({
                    'sampleId':row['sampleId'],
                    'barcodeName':row['barcode'],
                    'animalSpecies':row['animalSpecies'],
                    'panel':row['panel'],
                    'labRefId':'',
                    'animalName':'',
                    'refDate':row['refDate'],
                    'reportDate':row['reportDate'],
                    'customerName':''
                });
            }
        };
    });
    return combinedAll
}