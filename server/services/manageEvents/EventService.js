const validate = require("../../validation/EventValidation")
const { randomUUID } = require("crypto");
const fs = require('fs');
const path = require('path');
const jsonFilePath = path.join(__dirname, '..', '..', 'database', 'events.json');

module.exports.createEvent = (data, emaildata) => {

    const myPromise = new Promise((resolve, reject) => {
        const id = randomUUID();
        const email = emaildata;
        console.log(data);
        try {
            const validator = validate.createEvent(data);
            validator.check().then(async (matched) => {
                console.log(matched, "sdads");

                if (!matched) {
                    return reject({ message: "Validation error", success: false });
                } else {
                    const eventData = {
                        createdby: email,
                        eventid: id,
                        title: data.title,
                        location: data.location,
                        participants: data.participants,
                        startdate: data.startdate,
                        enddate: data.enddate,
                        description: data.description
                    };
                    console.log("Event data:", eventData);

                    fs.readFile(jsonFilePath, 'utf8', (err, jsonString) => {
                        console.log("Read file callback executed");

                        if (err) {
                            console.error("Error reading file:", err);
                            if (err.code === 'ENOENT') {
                                console.log("File does not exist");
                                const events = [eventData];
                                fs.writeFile(jsonFilePath, JSON.stringify(events, null, 2), 'utf8', (err) => {
                                    if (err) {
                                        reject({ message: "Error writing file", success: false });
                                    } else {
                                        resolve({ message: "Data added successfully", success: true });
                                    }
                                });
                            } else {
                                reject({ message: "Error reading file", success: false });
                            }
                        } else {
                            console.log("File content:", jsonString);
                            try {
                                let events = JSON.parse(jsonString);
                                events.push(eventData);
                                fs.writeFile(jsonFilePath, JSON.stringify(events, null, 2), 'utf8', (err) => {
                                    if (err) {
                                        reject({ message: "Error writing file", success: false });
                                    } else {
                                        resolve({ message: "Data added successfully", success: true });
                                    }
                                });
                            } catch (parseError) {
                                reject({ message: "Error parsing JSON", success: false });
                            }
                        }
                    });
                }
            }).catch((err) => {
                console.error("Validation check failed:", err);
                reject({ message: "Validation check failed", success: false });
            });
        } catch (err) {
            console.error("Some problem occurred:", err);
            reject({ message: "Some problem occurred", success: false });
        }
    });

    return myPromise;
};





module.exports.getAllEvents = (data, res) => {
    const myPromise = new Promise((resolve, reject) => {
        try {
         
            const eventsData = fs.readFileSync(jsonFilePath, 'utf-8');
            const events = JSON.parse(eventsData);
          
            resolve({ events, measage: "fetched data", success: true });
        } catch (error) {
            console.error('Error reading events:', error);
            reject({ message: 'Internal Server Error', success: false });
        }
    });
    ;

    return myPromise;
};


module.exports.getUserEvent = (emaildata, res) => {
    const myPromise = new Promise((resolve, reject) => {
        const email = emaildata;
        console.log(email)
        try {
          
            const eventsData = fs.readFileSync(jsonFilePath, 'utf-8');
            const events = JSON.parse(eventsData);

            const userEvents = events.filter(event => event.createdby === email);


            resolve({ userEvents, message: "User events fetched successfully", success: true });
        } catch (error) {
            console.error('Error reading events:', error);
            reject({ message: 'Internal Server Error', success: false });
        }
    });

    return myPromise;
};

module.exports.deleteEvent = (eventid, emaildata, res) => {
    const myPromise = new Promise((resolve, reject) => {
        const email = emaildata;
        const id = eventid
        console.log(email)
        console.log(id)
        try {
           
            const eventsData = fs.readFileSync(jsonFilePath, 'utf-8');
            let events = JSON.parse(eventsData);

            // Find event by email of user
            const userEvents = events.filter(event => event.createdby === email);

        
            const indexToDelete = events.findIndex(event => event.eventid === id && event.createdby === email);

         
            if (indexToDelete !== -1) {
                events.splice(indexToDelete, 1);
            }

            const updatedEventsData = JSON.stringify(events);
            fs.writeFileSync(jsonFilePath, updatedEventsData);
            resolve({ userEvents, message: "User events fetched successfully", success: true });
        } catch (error) {
            console.error('Error reading events:', error);
            reject({ message: 'Internal Server Error', success: false });
        }
    });

    return myPromise;
};


module.exports.editEvent = (eventId, emaildata, data) => {
    const email = emaildata;
    console.log(emaildata);
    console.log(eventId);
    console.log(data);
    const myPromise = new Promise((resolve, reject) => {
        try {
            const validator = validate.createEvent(data);
            validator.check().then(async (matched) => {
                console.log(matched, "sdads");

                if (!matched) {
                    return reject({ message: "Validation error", success: false });
                } else {
                    fs.readFile(jsonFilePath, 'utf8', (err, jsonString) => {
                        console.log("Read file callback executed");
                        if (err) {
                            console.error("Error reading file:", err);
                            reject({ message: "Error reading file", success: false });
                        } else {
                            console.log("File content:", jsonString);
                            try {
                                let events = JSON.parse(jsonString);
                                
                                const index = events.findIndex(event => event.eventid === eventId);
                                if (index !== -1) {
                                    // Update the event data
                                    events[index] = {
                                        ...events[index],
                                        title: data.title,
                                        location: data.location,
                                        participants: data.participants,
                                        startdate: data.startdate,
                                        enddate: data.enddate,
                                        description: data.description
                                    };
                                    // Write the updated events array back to the file
                                    fs.writeFile(jsonFilePath, JSON.stringify(events, null, 2), 'utf8', (err) => {
                                        if (err) {
                                            reject({ message: "Error writing file", success: false });
                                        } else {
                                            resolve({ message: "Event updated successfully", success: true });
                                        }
                                    });
                                } else {
                                    reject({ message: "Event not found", success: false });
                                }
                            } catch (parseError) {
                                reject({ message: "Error parsing JSON", success: false });
                            }
                        }
                    });
                }
            });
        } catch (err) {
            console.error("Some problem occurred:", err);
            reject({ message: "Some problem occurred", success: false });
        }
    });

    return myPromise;
};



