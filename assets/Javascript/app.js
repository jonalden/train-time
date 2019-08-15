
function getTrainInfo(cb) {
    localforage.getItem("trainSchedules").then(function (result) {
        cb(result || []); //{name, score}
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

getTrainInfo(function (result) {
    console.log(result);

    for (let i = 0; i < result.length; i++) {
        console.log(result[i]);
        let contain = document.getElementById("tableBody");
        contain.innerHTML += "<tr><td>B&O Railroad</td><td>Boardwalk</td><td>12 Minutes</td><td>5:40PM</td><td>17</td></tr>";
        contain.innerHTML += "<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + firstTrain + "</td><td>" + frequency + "</td><td>" + Minutes + "</td></tr>";

    }
})





