import json
from dataclasses import dataclass

import requests
from bs4 import BeautifulSoup
from flask import Flask, jsonify, render_template, request, url_for
from flask_cors import CORS

app = Flask(__name__)

cors = CORS(app)

@app.route('/')
def index() :
    return render_template('index.html')

@app.route("/receiver", methods=["POST"])
def produceData():
    data = request.get_json()
    data1 = json.dumps(data)
    data2= json.loads(data1)

    destination_city = data2["destination_city"]
    departure_date = data2["departure_date"]
    number_of_people = data2["number_of_people"]

    destination_airport = "NIL"

    if destination_city == "Kuala Lumpur":
        destination_airport = "KUL"
    elif destination_city == "Penang":
        destination_airport = "PEN"
    elif destination_city == "Melaka":
        destination_airport = "MKZ"
    elif destination_city == "Kota Kinabalu":
        destination_airport = "BKI"
    elif destination_city == "Langkawi":
        destination_airport = "LGK"
    elif destination_city == "Selangor": 
        destination_airport = "SZB"
    elif destination_city == "Kuching":
        destination_airport = "KCH"

    URL = "http://www.cheapflights.com.sg/flight-search/SIN-" + destination_airport + "/" + departure_date + "/" + number_of_people + "adults?sort=bestflight_a?"
    
    headers = {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) ..."
    }

    page = requests.get(URL, headers=headers) 
    soup = BeautifulSoup(page.content, 'html.parser')
    flights = soup.find_all('div', class_= 'resultWrapper')

    depart_times = []   
    arrival_times = []
    durations = []
    airlines = []
    prices = []
    links = []

    for flight in flights:
    # departure and arrival time
        depart_time = flight.find('span', class_='depart-time base-time').text
        arrival_time = flight.find('span', class_='arrival-time base-time').text
        # duration
        div = flight.find('div', class_='section duration allow-multi-modal-icons')
        duration = div.find('div', class_='top').text.replace('\n', '').replace(' ', '')
        # airline and price 
        airline = flight.find('span', class_='codeshares-airline-names').text
        price = flight.find('span', class_='price-text').text.replace('\n', '').replace(' ', '')
        # link
        a = flight.find('a', class_='booking-link')
        sub_link = a.get('href')
        link = "https://www.cheapflights.com.sg" + sub_link

        # appending individual flight data to the arrays
        depart_times.append(depart_time)
        arrival_times.append(arrival_time)
        durations.append(duration)
        airlines.append(airline)
        prices.append(price)
        links.append(link)

    combined_lists = [depart_times, arrival_times, durations, airlines, prices, links]
    flights_list = list(map(list, zip(*combined_lists))) # combined_lists transposed
    json_str = json.dumps(flights_list) # converting flights_list into json

    return json_str
    

@app.route("/receiver2", methods=["POST"])
def produceData2(): 
    data = request.get_json()
    data1 = json.dumps(data)
    data2= json.loads(data1)

    destination_city = data2["destination_city"]

    destination_location = "NIL"

    if destination_city == "Kuala Lumpur":
        destination_location = "kuala-lumpur"
    elif destination_city == "Penang":
        destination_location = "penang"
    elif destination_city =="Selangor":
        destination_location = "shah-alam"
    elif destination_city == "Melaka":
        destination_location = "malacca"
    elif destination_city == "Genting":
        destination_location = "genting-highlands"
    elif destination_city == "Tai Ping": 
        destination_location = "taiping"
    elif destination_city == "Alor Setar":
        destination_location = "alor-setar"
    elif destination_city == "Seremban":
        destination_location = "seremban"
    elif destination_city == "Ipoh" :
        destination_location = "ipoh"

    URL = "http://www.busonlineticket.com/booking/singapore-to-" + destination_location + "-bus-tickets"

    headers = {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) ..."
    }

    page = requests.get(URL, headers=headers) 
    soup = BeautifulSoup(page.content, 'html.parser')
    bus_table = soup.find('tbody')
    buses = bus_table.find_all('tr', class_= 'bustr1')

    bus_companies = []
    depart_times_bus = []
    arrival_locations_bus = []
    prices_bus = []
    links = []

    for bus in buses:
        bus_company = bus.find('span', class_='buscompanyname').text
        depart_time = bus.find('span', class_='bustime').text

        arrival_location_div = bus.find('div', class_='businfo')
        arrival_location = arrival_location_div.find('span', 'busdropoff').text

        price = bus.find('b', 'busprice1').text

        bus_companies.append(bus_company)
        depart_times_bus.append(depart_time)
        arrival_locations_bus.append(arrival_location)
        prices_bus.append(price)
        links.append(URL)


    combined_lists_bus = [bus_companies, depart_times_bus, arrival_locations_bus, prices_bus, links]
    buses_list = list(map(list, zip(*combined_lists_bus)))  # combined_lists transposed
    json_str = json.dumps(buses_list)

    return json_str

@app.route("/receiver3", methods=["POST"])
def produceData3(): 
    data = request.get_json()
    data1 = json.dumps(data)
    data2= json.loads(data1)

    destination_city = data2["destination_city"]

    departure_date = data2["departure_date"]
    number_of_people = data2["number_of_people"]


    destination_airport = "NIL"
    destination_location = "NIL"

    if destination_city == "Kuala Lumpur":
        destination_airport = "KUL"
        destination_location = "kuala-lumpur"
    elif destination_city == "Penang":
        destination_airport = "PEN"
        destination_location = "penang"
    elif destination_city == "Melaka":
        destination_airport = "MKZ"
        destination_location = "melaka"
    elif destination_city == "Selangor" :
        destination_airport = "SZB"
        destination_location = "shah-alam"
        
    AirURL = "http://www.cheapflights.com.sg/flight-search/SIN-" + destination_airport + "/" + departure_date + "/" + number_of_people + "adults?sort=bestflight_a?"
    BusURL = "http://www.busonlineticket.com/booking/singapore-to-" + destination_location + "-bus-tickets"

    headers = {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) ..."
    }

    page1 = requests.get(AirURL, headers=headers) 
    soup1 = BeautifulSoup(page1.content, 'html.parser')
    flights = soup1.find_all('div', class_= 'resultWrapper')
    
    page2 = requests.get(BusURL, headers=headers) 
    soup2 = BeautifulSoup(page2.content, 'html.parser')
    bus_table = soup2.find('tbody')
    buses = bus_table.find_all('tr', class_= 'bustr1')

    transport_providers = []
    depart_times = []
    prices = []
    urls = []

    for flight in flights:
    # departure time
        depart_time = flight.find('span', class_='depart-time base-time').text

        # airline and price 
        airline = flight.find('span', class_='codeshares-airline-names').text
        price = flight.find('span', class_='price-text').text.replace('\n', '').replace(' ', '')
        # link
        a = flight.find('a', class_='booking-link')
        sub_link = a.get('href')
        link = "https://www.cheapflights.com.sg" + sub_link

        # appending individual flight data to the arrays
        transport_providers.append(airline)
        depart_times.append(depart_time)
        prices.append(price)
        urls.append(link)

    for bus in buses:
        depart_time = bus.find('span', class_='bustime').text

        bus_company = bus.find('span', class_='buscompanyname').text

        price = bus.find('b', 'busprice1').text

        transport_providers.append(bus_company)
        depart_times.append(depart_time)
        prices.append(price)
        urls.append(BusURL)

    all_combined_lists = [transport_providers, depart_times, prices, urls]
    combined_list = list(map(list, zip(*all_combined_lists)))  # combined_lists transposed
    json_str = json.dumps(combined_list)

    return json_str

if __name__ == "__main__" :
    app.run(debug=True)


    


