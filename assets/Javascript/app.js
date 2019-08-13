document
    .getElementById("submitButton")
    .addEventListener("click", function () {

        // const trainName = document.getElementById("trainName").value.trim();
        // const destination = document.getElementById("destinantion").value.trim();
        // const firstTrain = document.getElementById("firstTrain").value.trim();
        // const frequency = document.getElementById("frequency").value.trim();

        const trainName = "trainName"
        const destination = "destination"
        const firstTrain = "firstTrain"
        const frequency = "frequency"

        const trainData = {
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency
        }

       

        const myFunctionSet = localforage.setItem("trainName", "trainName").then(function (value) {
            console.log(value);
        });
        
        const myFunctionGet = localforage.getItem("hello").then(function (value) {
            console.log(value);
        })
        
        myFunctionSet(trainData);
        console.log(myFunctionSet);
        // myFunctionGet();
    })

