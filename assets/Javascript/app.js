
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
        const trainName = document.getElementById("trainName").value.trim();
        const destination = document.getElementById("destinantion").value.trim();
        const firstTrain = document.getElementById("firstTrain").value.trim();
        const frequency = document.getElementById("frequency").value.trim();
        

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

const table = document.querySelector("table");

setInterval(function () {
    localforage
        .getTrainInfo("trainSchedules")
        .then(function (result) {
            if(!result) {
            result = [];
            }
            table.innerHTML = "";
            for(let i = 0; i < result.length; i++) {
                
            }
        })
}, 1000);




