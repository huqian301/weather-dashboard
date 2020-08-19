$(document).ready(function () {

    const $search = $('#searchInput');
    cities = [];

    function  renderHist(){
        let search_Hist = JSON.parse(localStorage.getItem("cities"));
        console.log(search_Hist)

        if (search_Hist !== null){
            for (i = 0; i < search_Hist.length; i++ ){
                const $cities = $('<button>').addClass('btn past_search').text(search_Hist[i]);
                $("#history").append($cities);
            }

        }else{
            return;
        }

    }
    renderHist();



    // render last;

    const last_element = JSON.parse(localStorage.getItem("cities"));

    if (last_element !== null){
        const target_search = last_element[last_element.length-1].trim().toLowerCase();


        const apiKey = 'b457a2be511f2ae77119bf5182a1ce41';


        $.ajax({
            url: `https://api.openweathermap.org/data/2.5/weather?q=${target_search}&appid=${apiKey}`,
            method: "GET"


        }).then(function (response) {
            // console.log(response);
            const res = response;
            const lat = res.coord.lat;
            const lon = res.coord.lon;


            $.ajax({
                url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`,
                method: 'GET'
            }).then(function (r) {
                console.log(r);
                const date = new Date(r.current.dt * 1000).toLocaleDateString();
                $('#display').empty();
                $('.card-deck').empty();

                const $uvIndex = $('<p>').text('UV Index: ' + r.current.uvi);
                console.log(r.current.uvi);
                if (r.current.uvi < 3) {
                    $uvIndex.attr('class', 'low');
                } else if (r.current.uvi >= 3 && $uvIndex < 6) {
                    $uvIndex.attr('class', 'moderate');
                } else if (r.current.uvi >= 6 && $uvIndex < 8) {
                    $uvIndex.attr('class', 'high');
                } else {
                    $uvIndex.attr('class', 'veryHigh');
                }

                const $icon = $('<img>').attr('src', `https://openweathermap.org/img/wn/${r.current.weather[0].icon}@2x.png`);


                const $newDiv = $('<div>').addClass('currentBox box1');
                const $cityName = $('<h3>').text(res.name + ', ' + res.sys.country + ', ');
                const $temp = $('<p>').text('Temperature: ' + r.current.temp +'°F');
                const $hum = $('<p>').text('Humdity: ' + res.main.humidity + '%');
                const $windSpeed = $('<p>').text('Wind Speed: ' + res.wind.speed + ' MPH');

                $newDiv.append(date,$cityName, $icon, $temp, $hum, $windSpeed, $uvIndex);
                $('#display').append($newDiv);


                for(i = 1; i < 7;i++){
                    const $newDiv1 = $('<div>').addClass('card').attr('style','width: 18rem;');
                    const $newDiv2 = $('<div>').addClass('card-body');
                    const newDate = new Date(r.daily[i].dt * 1000).toLocaleDateString();
                    const title = $('<h4>').addClass('card-text').text(res.name);
                    const icon = $('<img>').attr('src', `https://openweathermap.org/img/wn/${r.daily[i].weather[0].icon}@2x.png`);
                    const temp = $('<p>').addClass('card-text').text('Temperature: ' +r.daily[i].temp.day +'°F');
                    const hum = $('<p>').addClass('card-text').text('Humdity: ' + r.daily[i].humidity + '%');


                    $newDiv2.append($newDiv1,newDate,title,icon,temp,hum);
                    $('#fiveBox').append($newDiv2);



                }




            })
        })



    }














    $('#search').on('click', function (event) {
        event.preventDefault();


        const search_res = $search.val().trim().toLowerCase();
        cities.push(search_res);
        localStorage.setItem("cities", JSON.stringify(cities))
        $('#history').empty()
        renderHist()
        
        const apiKey = 'b457a2be511f2ae77119bf5182a1ce41';
        const search = $search.val().trim().toLowerCase();
        console.log(search);
        $.ajax({
            url: `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}`,
            method: "GET"


        }).then(function (response) {
            // console.log(response);
            const res = response;
            const lat = res.coord.lat;
            const lon = res.coord.lon;
            

            $.ajax({
                url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`,
                method: 'GET'
            }).then(function (r) {
                console.log(r);
                const date = new Date(r.current.dt * 1000).toLocaleDateString();
                $('#display').empty();
                $('.card-deck').empty(); 

                const $uvIndex = $('<p>').text('UV Index: ' + r.current.uvi);
                console.log(r.current.uvi);
                if (r.current.uvi < 3) {
                    $uvIndex.attr('class', 'low');
                } else if (r.current.uvi >= 3 && $uvIndex < 6) {
                    $uvIndex.attr('class', 'moderate');
                } else if (r.current.uvi >= 6 && $uvIndex < 8) {
                    $uvIndex.attr('class', 'high');
                } else {
                    $uvIndex.attr('class', 'veryHigh');
                }

                const $icon = $('<img>').attr('src', `https://openweathermap.org/img/wn/${r.current.weather[0].icon}@2x.png`);


                const $newDiv = $('<div>').addClass('currentBox box1');
                const $cityName = $('<h3>').text(res.name + ', ' + res.sys.country + ', ');
                const $temp = $('<p>').text('Temperature: ' + r.current.temp +'°F');
                const $hum = $('<p>').text('Humdity: ' + res.main.humidity + '%');
                const $windSpeed = $('<p>').text('Wind Speed: ' + res.wind.speed + ' MPH');

                $newDiv.append(date,$cityName, $icon, $temp, $hum, $windSpeed, $uvIndex);
                $('#display').append($newDiv);


                for(i = 1; i < 7;i++){
                    const $newDiv1 = $('<div>').addClass('card').attr('style','width: 18rem;');
                    const $newDiv2 = $('<div>').addClass('card-body');
                    const newDate = new Date(r.daily[i].dt * 1000).toLocaleDateString();
                    const title = $('<h4>').addClass('card-text').text(res.name);
                    const icon = $('<img>').attr('src', `https://openweathermap.org/img/wn/${r.daily[i].weather[0].icon}@2x.png`);
                    const temp = $('<p>').addClass('card-text').text('Temperature: ' +r.daily[i].temp.day +'°F');
                    const hum = $('<p>').addClass('card-text').text('Humdity: ' + r.daily[i].humidity + '%');

                    
                    $newDiv2.append($newDiv1,newDate,title,icon,temp,hum);
                    $('#fiveBox').append($newDiv2);

                

                }
                $('#history').empty()
                renderHist()


            })
        })

    })




    // 2nd condition;



    $('.past_search').on('click', function (event) {
        event.preventDefault();
        console.log('I am hit')
        console.log($(this).text().trim().toLowerCase())

        const apiKey = 'b457a2be511f2ae77119bf5182a1ce41';

        // delegation;
        const past_search = $(this).text().trim().toLowerCase();
        cities.push(past_search);


        $.ajax({
            url: `https://api.openweathermap.org/data/2.5/weather?q=${past_search}&appid=${apiKey}`,
            method: "GET"


        }).then(function (response) {
            // console.log(response);
            const res = response;
            const lat = res.coord.lat;
            const lon = res.coord.lon;


            $.ajax({
                url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`,
                method: 'GET'
            }).then(function (r) {
                console.log(r);
                const date = new Date(r.current.dt * 1000).toLocaleDateString();
                $('#display').empty();
                $('.card-deck').empty();

                const $uvIndex = $('<p>').text('UV Index: ' + r.current.uvi);
                console.log(r.current.uvi);
                if (r.current.uvi < 3) {
                    $uvIndex.attr('class', 'low');
                } else if (r.current.uvi >= 3 && $uvIndex < 6) {
                    $uvIndex.attr('class', 'moderate');
                } else if (r.current.uvi >= 6 && $uvIndex < 8) {
                    $uvIndex.attr('class', 'high');
                } else {
                    $uvIndex.attr('class', 'veryHigh');
                }

                const $icon = $('<img>').attr('src', `https://openweathermap.org/img/wn/${r.current.weather[0].icon}@2x.png`);


                const $newDiv = $('<div>').addClass('currentBox box1');
                const $cityName = $('<h3>').text(res.name + ', ' + res.sys.country + ', ');
                const $temp = $('<p>').text('Temperature: ' + r.current.temp +'°F');
                const $hum = $('<p>').text('Humdity: ' + res.main.humidity + '%');
                const $windSpeed = $('<p>').text('Wind Speed: ' + res.wind.speed + ' MPH');

                $newDiv.append(date,$cityName, $icon, $temp, $hum, $windSpeed, $uvIndex);
                $('#display').append($newDiv);


                for(i = 1; i < 7;i++){
                    const $newDiv1 = $('<div>').addClass('card').attr('style','width: 18rem;');
                    const $newDiv2 = $('<div>').addClass('card-body');
                    const newDate = new Date(r.daily[i].dt * 1000).toLocaleDateString();
                    const title = $('<h4>').addClass('card-text').text(res.name);
                    const icon = $('<img>').attr('src', `https://openweathermap.org/img/wn/${r.daily[i].weather[0].icon}@2x.png`);
                    const temp = $('<p>').addClass('card-text').text('Temperature: ' +r.daily[i].temp.day +'°F');
                    const hum = $('<p>').addClass('card-text').text('Humdity: ' + r.daily[i].humidity + '%');


                    $newDiv2.append($newDiv1,newDate,title,icon,temp,hum);
                    $('#fiveBox').append($newDiv2);



                }




            })
        })

    })



});
