
function getTrainInfo(cb) {
    localforage.getItem("trainSchedules").then(function (result) {
        cb(result || []);
    });
}

function setTrainInfo(newTrainInfo, cb) {
    localforage.setItem("trainSchedules", newTrainInfo).then(cb);
};

document
    .getElementById("submitButton")
    .addEventListener("click", function (event) {
        event.preventDefault();

        let trainName = document.getElementById("trainName").value.trim();
        let destination = document.getElementById("destinantion").value.trim();
        let firstTrain = document.getElementById("firstTrain").value.trim();
        let frequency = document.getElementById("frequency").value.trim();


        const trainData = {
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency
        }

        console.log(trainData);

        getTrainInfo(function (result) {
            let newArray = result;

            newArray.push(trainData);

            setTrainInfo(newArray, function () {
                console.log(newArray);
            })
        })
    });

function updateDisplay(result) {
    console.log(result);

    let contain = document.getElementById("tableBody");
    contain.innerHTML = "";


    for (let i = 0; i < result.length; i++) {
        // console.log(result[i]);

        let tFrequency = result[i].frequency;

        // Time is 3:30 AM
        let firstTime = result[i].firstTrain;

        // First Time (pushed back 1 year to make sure it comes before current time)
        let firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);

        // Current Time
        let currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        // Difference between the times
        let diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        let tRemainder = diffTime % tFrequency;
        console.log(tRemainder);

        // Minute Until Train
        let tMinutesTillTrain = tFrequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        // Next Train
        let nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


        contain.innerHTML += "<tr><td>" + result[i].trainName +
            "</td><td>" + result[i].destination + "</td><td>" + result[i].frequency +
            "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td></tr>";
    }
}


getTrainInfo(function (result) {
    updateDisplay(result)
})

window.setInterval(function(){

    getTrainInfo(function(result) {
        updateDisplay(result);
        console.log(result);
    });
},1000)







