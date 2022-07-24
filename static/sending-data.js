async function sendData() {

    document.getElementById("databox0").innerHTML = "";
    document.getElementById("databox0").style.backgroundColor = "transparent";
    document.getElementById("databox1").innerHTML = "";
    document.getElementById("databox1").style.backgroundColor = "transparent";
    document.getElementById("databox2").innerHTML = "";
    document.getElementById("databox2").style.backgroundColor = "transparent";
    document.getElementById("databox3").innerHTML = "";
    document.getElementById("databox3").style.backgroundColor = "transparent";
    document.getElementById("databox4").innerHTML = "";
    document.getElementById("databox4").style.backgroundColor = "transparent";
    document.getElementById("databox5").innerHTML = "";
    document.getElementById("databox5").style.backgroundColor = "transparent";

    if(document.getElementById('sort-by-duration').checked) {
        if(document.getElementById('destination-choice').value == 'Kuala Lumpur' || 
           document.getElementById('destination-choice').value =='Melaka' || 
           document.getElementById('destination-choice').value =='Selangor' ||
           document.getElementById('destination-choice').value == 'Penang' || 
           document.getElementById('destination-choice').value =='Kuching' || 
           document.getElementById('destination-choice').value =='Kota Kinabalu' || 
           document.getElementById('destination-choice').value =='Langkawi') {

    var destination = document.getElementById('destination-choice').value;
    var departDate = document.getElementById('dep-date').value;
    var returning = "No";
    var people = document.getElementById('no-pax').value;
    
    const jsonObject = {"destination_city" : destination, "departure_date" : departDate, 
    "return_flight" : returning, "number_of_people" : people}
    const s = JSON.stringify(jsonObject)

    console.log(s)

    fetch('/receiver', 
        {
            method: "POST",
            headers: {
                'Content-type' : 'application/json', 
                'Accept' : 'application/json'
            },

        body:JSON.stringify(jsonObject)}).then(res => {
                if(res.ok){
                    return res.json()
                }else{
                    alert("something is wrong!")
                }
        }).then(function (jsonResponse) {
            console.log(jsonResponse)
            if (jsonResponse.length == 0) {
                document.getElementById("databox4").innerHTML +=
                "No available buses/flights at this time";
            } else if (jsonResponse.length >= 5) {
                for (var i = 0; i < 5; i++) {
                    var link = jsonResponse[i][5];
                    let text = "databox";
                    text += i;
                    console.log(text);
                    document.getElementById(text).innerHTML += 
                    "Airline Provider: " + jsonResponse[i][3]  + "<br/>" +
                    "Departs: " + jsonResponse[i][0]  + "<br/>" +
                    "Duration " + jsonResponse[i][2] + "<br/>" + 
                     jsonResponse[i][4] + "<br />" + "<a href=' "+link+"'>Click here to book!</a>";

                     document.getElementById(text).style.backgroundColor = "#adde86"
                }   
            } else {
                for (var i = 0; i < jsonResponse.length; i++) {
                    var link = jsonResponse[i][5];
                    let text = "databox";
                    text += i;
                    console.log(text);
                    document.getElementById(text).innerHTML += 
                    "Airline Provider: " + jsonResponse[i][3]  + "<br/>" +
                    "Departs: " + jsonResponse[i][0]  + "<br/>" +
                    "Duration: " + jsonResponse[i][2] + "<br/>" + 
                    jsonResponse[i][4] + "<br />" + "<a href=' "+link+"'>Click here to book!</a>";

                    document.getElementById(text).style.backgroundColor = "#adde86"
            }
            }}).catch((err) => console.error(err));
        } else {

        var destination = document.getElementById('destination-choice').value;
        var departDate = document.getElementById('dep-date').value;
        var returning = "No";
        var people = document.getElementById('no-pax').value;
        
        const jsonObject = {"destination_city" : destination, "departure_date" : departDate, 
        "return_flight" : returning, "number_of_people" : people}
        const s = JSON.stringify(jsonObject)
    
        console.log(s)
    
        fetch('/receiver2', 
            {
                method: "POST",
                headers: {
                    'Content-type' : 'application/json', 
                    'Accept' : 'application/json'
                },
    
            body:JSON.stringify(jsonObject)}).then(res => {
                    if(res.ok){
                        return res.json()
                    }else{
                        alert("something is wrong!")
                    }
            }).then(function (jsonResponse) {
                console.log(jsonResponse)
                if (jsonResponse.length == 0) {
                    document.getElementById("databox4").innerHTML +=
                    "No available buses/flights at this time";
                } else if (jsonResponse.length >= 5) {
                    for (var i = 0; i < 5; i++) {
                        var link = jsonResponse[i][4];
                        let text = "databox";
                        text += i;
                        console.log(text);
                        document.getElementById(text).innerHTML += 
                        "Bus Provider: " + jsonResponse[i][0] + "<br/>" +
                        "Cost: " + jsonResponse[i][3] + "<br/>" + 
                        "Departure Time: " + jsonResponse[i][1] + "<br/>" +
                        "Destination: " + jsonResponse[i][2] + "<br />" + "<a href=' "+link+"'>Click here to book!</a>";

                        document.getElementById(text).style.backgroundColor = "#adde86"
                    }   
                } else {
                    for (var i = 0; i < jsonResponse.length; i++) {
                        var link = jsonResponse[i][4];
                        let text = "databox";
                        text += i;
                        console.log(text);
                        document.getElementById(text).innerHTML += 
                        "Bus Provider: " + jsonResponse[i][0] + "<br/>" + 
                         "Cost: " + jsonResponse[i][3] + "<br/>" + 
                        "Departure Time: " + jsonResponse[i][1] + "<br/>" +
                        "Destination: " + jsonResponse[i][2] + "<br />" + "<a href=' "+link+"'>Click here to book!</a>";

                        document.getElementById(text).style.backgroundColor = "#adde86"
                }
            }
        }).catch((err) => console.error(err));
        }
    } else if(document.getElementById('sort-by-price').checked) {
        if(document.getElementById('destination-choice').value == 'Kuching' || 
           document.getElementById('destination-choice').value == 'Kota Kinabalu' ||
           document.getElementById('destination-choice').value ==  'Langkawi') {

    var destination = document.getElementById('destination-choice').value;
    var departDate = document.getElementById('dep-date').value;
    var returning = "No";
    var people = document.getElementById('no-pax').value;
    
    const jsonObject = {"destination_city" : destination, "departure_date" : departDate, 
    "return_flight" : returning, "number_of_people" : people}
    const s = JSON.stringify(jsonObject)

    console.log(s)

    fetch('/receiver', 
        {
            method: "POST",
            headers: {
                'Content-type' : 'application/json', 
                'Accept' : 'application/json'
            },

        body:JSON.stringify(jsonObject)}).then(res => {
                if(res.ok){
                    return res.json()
                }else{
                    alert("something is wrong!")
                }
        }).then(function (jsonResponse) {
            console.log(jsonResponse)
            if (jsonResponse.length == 0) {
                document.getElementById("databox4").innerHTML +=
                "No available buses/flights at this time";
            } else if (jsonResponse.length >= 5) {
                for (var i = 0; i < 5; i++) {
                    var link = jsonResponse[i][5];
                    let text = "databox";
                    text += i;
                    console.log(text);
                    document.getElementById(text).innerHTML += 
                    "Airline Provider: " + jsonResponse[i][3]  + "<br/>" +
                    "Departs: " + jsonResponse[i][0]  + "<br/>" +
                    "Duration " + jsonResponse[i][2] + "<br/>" + 
                     jsonResponse[i][4] + "<br />" + "<a href=' "+link+"'>Click here to book!</a>";

                     document.getElementById(text).style.backgroundColor = "#adde86"
                }   
            } else {
                for (var i = 0; i < jsonResponse.length; i++) {
                    var link = jsonResponse[i][5];
                    let text = "databox";
                    text += i;
                    console.log(text);
                    document.getElementById(text).innerHTML += 
                    "Airline Provider: " + jsonResponse[i][3]  + "<br/>" +
                    "Departs: " + jsonResponse[i][0]  + "<br/>" +
                    "Duration: " + jsonResponse[i][2] + "<br/>" + 
                    jsonResponse[i][4] + "<br />" + "<a href=' "+link+"'>Click here to book!</a>";

                    document.getElementById(text).style.backgroundColor = "#adde86"
            }
            }}).catch((err) => console.error(err));
        } else {

        var destination = document.getElementById('destination-choice').value;
        var departDate = document.getElementById('dep-date').value;
        var returning = "No";
        var people = document.getElementById('no-pax').value;
        
        const jsonObject = {"destination_city" : destination, "departure_date" : departDate, 
        "return_flight" : returning, "number_of_people" : people}
        const s = JSON.stringify(jsonObject)
    
        console.log(s)
    
        fetch('/receiver2', 
            {
                method: "POST",
                headers: {
                    'Content-type' : 'application/json', 
                    'Accept' : 'application/json'
                },
    
            body:JSON.stringify(jsonObject)}).then(res => {
                    if(res.ok){
                        return res.json()
                    }else{
                        alert("something is wrong!")
                    }
            }).then(function (jsonResponse) {
                console.log(jsonResponse)
                if (jsonResponse.length == 0) {
                    document.getElementById("databox4").innerHTML +=
                    "No available buses/flights at this time";
                } else if (jsonResponse.length >= 5) {
                    for (var i = 0; i < 5; i++) {
                        var link = jsonResponse[i][4];
                        let text = "databox";
                        text += i;
                        console.log(text);
                        document.getElementById(text).innerHTML += 
                        "Bus Provider: " + jsonResponse[i][0] + "<br/>" +
                        "Cost: " + jsonResponse[i][3] + "<br/>" + 
                        "Departure Time: " + jsonResponse[i][1] + "<br/>" +
                        "Destination: " + jsonResponse[i][2] + "<br />" + "<a href=' "+link+"'>Click here to book!</a>";

                        document.getElementById(text).style.backgroundColor = "#adde86"
                    }   
                } else {
                    for (var i = 0; i < jsonResponse.length; i++) {
                        var link = jsonResponse[i][4];
                        let text = "databox";
                        text += i;
                        console.log(text);
                        document.getElementById(text).innerHTML += 
                        "Bus Provider: " + jsonResponse[i][0] + "<br/>" +
                        "Cost: " + jsonResponse[i][3] + "<br/>" + 
                        "Departure Time: " + jsonResponse[i][1] + "<br/>" +
                        "Destination: " + jsonResponse[i][2] + "<br />" + "<a href=' "+link+"'>Click here to book!</a>";

                        document.getElementById(text).style.backgroundColor = "#adde86"
                }
            }
        }).catch((err) => console.error(err));
        }
    } else if (document.getElementById('sort-by-all').checked) {
        if(document.getElementById('destination-choice').value == 'Kuching' || 
        document.getElementById('destination-choice').value == 'Kota Kinabalu' ||
        document.getElementById('destination-choice').value ==  'Langkawi') {

    var destination = document.getElementById('destination-choice').value;
    var departDate = document.getElementById('dep-date').value;
    var returning = "No";
    var people = document.getElementById('no-pax').value;
    
    const jsonObject = {"destination_city" : destination, "departure_date" : departDate, 
    "return_flight" : returning, "number_of_people" : people}
    const s = JSON.stringify(jsonObject)

    console.log(s)

    fetch('/receiver', 
        {
            method: "POST",
            headers: {
                'Content-type' : 'application/json', 
                'Accept' : 'application/json'
            },

        body:JSON.stringify(jsonObject)}).then(res => {
                if(res.ok){
                    return res.json()
                }else{
                    alert("something is wrong!")
                }
        }).then(function (jsonResponse) {
            console.log(jsonResponse)
            if (jsonResponse.length == 0) {
                document.getElementById("databox4").innerHTML +=
                "No available buses/flights at this time";
            } else if (jsonResponse.length >= 5) {
                for (var i = 0; i < 5; i++) {
                    var link = jsonResponse[i][5];
                    let text = "databox";
                    text += i;
                    console.log(text);
                    document.getElementById(text).innerHTML += 
                    "Airline Provider: " + jsonResponse[i][3]  + "<br/>" +
                    "Departs: " + jsonResponse[i][0]  + "<br/>" +
                    "Duration " + jsonResponse[i][2] + "<br/>" + 
                     jsonResponse[i][4] + "<br />" + "<a href=' "+link+"'>Click here to book!</a>";

                     document.getElementById(text).style.backgroundColor = "#adde86"
                }   
            } else {
                for (var i = 0; i < jsonResponse.length; i++) {
                    var link = jsonResponse[i][5];
                    let text = "databox";
                    text += i;
                    console.log(text);
                    document.getElementById(text).innerHTML += 
                    "Airline Provider: " + jsonResponse[i][3]  + "<br/>" +
                    "Departs: " + jsonResponse[i][0]  + "<br/>" +
                    "Duration: " + jsonResponse[i][2] + "<br/>" + 
                    jsonResponse[i][4] + "<br />" + "<a href=' "+link+"'>Click here to book!</a>";

                    document.getElementById(text).style.backgroundColor = "#adde86"
            }
            }}).catch((err) => console.error(err));
        } else if (document.getElementById('destination-choice').value == 'Genting Highlands' || 
                   document.getElementById('destination-choice').value == 'Tai Ping' ||
                   document.getElementById('destination-choice').value ==  'Alor Setar' ||
                   document.getElementById('destination-choice').value ==  'Seremban' ||
                   document.getElementById('destination-choice').value ==  'Ipoh') {

        var destination = document.getElementById('destination-choice').value;
        var departDate = document.getElementById('dep-date').value;
        var returning = "No";
        var people = document.getElementById('no-pax').value;
        
        const jsonObject = {"destination_city" : destination, "departure_date" : departDate, 
        "return_flight" : returning, "number_of_people" : people}
        const s = JSON.stringify(jsonObject)
    
        console.log(s)
    
        fetch('/receiver2', 
            {
                method: "POST",
                headers: {
                    'Content-type' : 'application/json', 
                    'Accept' : 'application/json'
                },
    
            body:JSON.stringify(jsonObject)}).then(res => {
                    if(res.ok){
                        return res.json()
                    }else{
                        alert("something is wrong!")
                    }
            }).then(function (jsonResponse) {
                console.log(jsonResponse)
                if (jsonResponse.length == 0) {
                    document.getElementById("databox4").innerHTML +=
                    "No available buses/flights at this time";
                } else if (jsonResponse.length >= 5) {
                    for (var i = 0; i < 5; i++) {
                        var link = jsonResponse[i][4];
                        let text = "databox";
                        text += i;
                        console.log(text);
                        document.getElementById(text).innerHTML += 
                        "Bus Provider: " + jsonResponse[i][0] + "<br/>" +
                        "Cost: " + jsonResponse[i][3] + "<br/>" + 
                        "Departure Time: " + jsonResponse[i][1] + "<br/>" +
                        "Destination: " + jsonResponse[i][2] + "<br />" + "<a href=' "+link+"'>Click here to book!</a>";

                        document.getElementById(text).style.backgroundColor = "#adde86"
                    }   
                } else {
                    for (var i = 0; i < jsonResponse.length; i++) {
                        var link = jsonResponse[i][4];
                        let text = "databox";
                        text += i;
                        console.log(text);
                        document.getElementById(text).innerHTML += 
                        "Bus Provider: " + jsonResponse[i][0] + "<br/>" +
                        "Cost: " + jsonResponse[i][3] + "<br/>" + 
                        "Departure Time: " + jsonResponse[i][1] + "<br/>" +
                        "Destination: " + jsonResponse[i][2] + "<br />" + "<a href=' "+link+"'>Click here to book!</a>";

                        document.getElementById(text).style.backgroundColor = "#adde86"
                }
            }
        }).catch((err) => console.error(err));
    } else if (document.getElementById('destination-choice').value == 'Kuala Lumpur' || 
               document.getElementById('destination-choice').value =='Melaka' || 
               document.getElementById('destination-choice').value =='Selangor' ||
               document.getElementById('destination-choice').value == 'Penang') {

        var destination = document.getElementById('destination-choice').value;
        var departDate = document.getElementById('dep-date').value;
        var returning = "No";
        var people = document.getElementById('no-pax').value;
        
        const jsonObject = {"destination_city" : destination, "departure_date" : departDate, 
        "return_flight" : returning, "number_of_people" : people}
        const s = JSON.stringify(jsonObject)
    
        console.log(s)

        fetch('/receiver3', 
            {
                method: "POST",
                headers: {
                    'Content-type' : 'application/json', 
                    'Accept' : 'application/json'
                },
    
            body:JSON.stringify(jsonObject)}).then(res => {
                    if(res.ok){
                        return res.json()
                    }else{
                        alert("something is wrong!")
                    }
            }).then(function (jsonResponse) {
                console.log(jsonResponse)
                if (jsonResponse.length == 0) {
                    document.getElementById("databox4").innerHTML +=
                    "No available buses/flights at this time";
                } else if (jsonResponse.length >= 5) {
                    for (var i = 0; i < 3; i++) {
                        var link = jsonResponse[i][3];
                        let text = "databox";
                        text += i;
                        document.getElementById(text).innerHTML += 
                        "Transport Provider: " + jsonResponse[i][0] + "<br/>" + 
                        "Departure Time: " + jsonResponse[i][1] + "<br/>" +
                        "Price: " + jsonResponse[i][2] + "<br />" + "<a href=' "+link+"'>Click here to book!</a>";

                        document.getElementById(text).style.backgroundColor = "#adde86"
                    }

                    for (var i = 3; i < 6; i++) {
                        var link = jsonResponse[jsonResponse.length - 6 + i][3];
                        let text = "databox";
                        text += i;
                        document.getElementById(text).innerHTML += 
                        "Transport Provider: " + jsonResponse[jsonResponse.length - 6 + i][0] + "<br/>" + 
                        "Departure Time: " + jsonResponse[jsonResponse.length - 6 + i][1] + "<br/>" +
                        "Price: " + jsonResponse[jsonResponse.length - 6 + i][2] + "<br />" + "<a href=' "+link+"'>Click here to book!</a>";

                        document.getElementById(text).style.backgroundColor = "#adde86"
                    }     
                } else {
                    for (var i = 0; i < jsonResponse.length; i++) {
                        var link = jsonResponse[i][3];
                        let text = "databox";
                        text += i;
                        document.getElementById(text).innerHTML += 
                        "Transport Provider: " + jsonResponse[i][0] + "<br/>" + 
                        "Departure Time: " + jsonResponse[i][1] + "<br/>" +
                        "Price: " + jsonResponse[i][2] + "<br />" + "<a href=' "+link+"'>Click here to book!</a>";

                        document.getElementById(text).style.backgroundColor = "#adde86"
                    }
                }
            }).catch((err) => console.error(err));
        }
    }
}



