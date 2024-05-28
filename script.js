let isLoading = false;

async function getAirQuality() {
  const citySelect = document.getElementById("cities");
  const city = citySelect.value;

  const districtSelect = document.getElementById("districts");
  const district = districtSelect.value;

  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const url = `https://www.iqair.com/malaysia/${city}/${district}`;

  try {
    isLoading = true;
    document.getElementById("loading-spinner").style.display = "block";
    const response = await fetch(proxyUrl + url);
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const airQualityElement = doc.querySelector(".aqi-value__value");

    const airQuality = airQualityElement.textContent;

    const airQualityStatus = doc.querySelector(".aqi-status__text");
    const airStatus = airQualityStatus.textContent;

    const airQualityConcentration = doc.querySelector(
      ".pollutant-concentration-value"
    );
    const airConcentration = airQualityConcentration.textContent;

    document.getElementById("result").textContent = `${airQuality}`;
    document.getElementById("status").textContent = `${airStatus}`;
    document.getElementById(
      "concentration"
    ).textContent = `${airConcentration}`;

    const resultElement = document.getElementById("result");
    resultElement.style.color = getColorForAirQuality(airQuality);

    const statusElement = document.getElementById("status");
    statusElement.style.color = getColorForAirStatus(airStatus);

    const concentrationElement = document.getElementById("concentration");
    concentrationElement.style.color =
      getColorForairConcentration(airConcentration);

    const showdistrictsElement = document.getElementById("showdistrict");
    showdistrictsElement.textContent = district
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    isLoading = false;
    document.getElementById("loading-spinner").style.display = "none";

    const sectionTwo = document.querySelector(".section-two");
    sectionTwo.style.display = "block";
    sectionTwo.scrollIntoView({ behavior: "smooth" });

    const lastUpdateElement = doc.querySelector(".aqi-status__time");
    const lastUpdate = lastUpdateElement.textContent;
    document.getElementById(
      "last-update"
    ).textContent = `Last update at ${lastUpdate}`;
  } catch (error) {
    console.error("Error:", error);
    isLoading = false;
    document.getElementById("loading-spinner").style.display = "none";
  }
}
function getMoreInformation() {
  const sectionThree = document.querySelector(".section-three");
  sectionThree.style.display = "block";
  sectionThree.scrollIntoView({ behavior: "smooth" });
}

function getCategories() {
  const sectionFour = document.querySelector(".section-four");
  sectionFour.style.display = "block";
  sectionFour.scrollIntoView({ behavior: "smooth" });
}

function getColorForAirQuality(airQuality) {
  const value = parseInt(airQuality);

  if (value >= 301) {
    return "maroon";
  } else if (value >= 201) {
    return "purple";
  } else if (value >= 151) {
    return "red";
  } else if (value >= 101) {
    return "orange";
  } else if (value >= 51) {
    return "yellow";
  } else {
    return "green";
  }
}

function getColorForAirStatus(airStatus) {
  const status = airStatus.toLowerCase();

  switch (status) {
    case "hazardous":
      return "maroon";
    case "very unhealthy":
      return "purple";
    case "unhealthy":
      return "red";
    case "unhealthy for sensitive groups":
      return "orange";
    case "moderate":
      return "yellow";
    default:
      return "green";
  }
}

function getColorForairConcentration(airConcentration) {
  const concentrate = parseFloat(airConcentration);

  if (concentrate >= 250.5) {
    return "maroon";
  } else if (concentrate >= 150.5) {
    return "purple";
  } else if (concentrate >= 55.5) {
    return "red";
  } else if (concentrate >= 35.5) {
    return "orange";
  } else if (concentrate >= 12.1) {
    return "yellow";
  } else {
    return "green";
  }
}
function populateDistrictDropdown(city) {
  const districts = getDistrictsForCity(city);
  const districtSelect = document.getElementById("districts");

  districtSelect.innerHTML = "";

  districts.forEach((district) => {
    const option = document.createElement("option");
    option.value = district;
    option.text = district
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    districtSelect.appendChild(option);
  });
}

function populateCityDropdown() {
  const cities = [
    "kedah",
    "perlis",
    "penang",
    "kelantan",
    "terengganu",
    "perak",
    "selangor",
    "putrajaya",
    "sarawak",
    "labuan",
    "sabah",
    "johor",
    "melaka",
    "pahang",
    "negeri-sembilan",
    "kuala-lumpur",
  ];
  const citySelect = document.getElementById("cities");

  cities.forEach((city) => {
    const option = document.createElement("option");
    option.value = city;
    option.text = city
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    citySelect.appendChild(option);
  });
}

function getDistrictsForCity(city) {
  const districts = {
    kedah: ["kuah", "alor-setar", "sungai-petani", "kulim"],
    perlis: ["kangar"],
    penang: [
      "george-town",
      "balik-pulau",
      "gelugor",
      "tanjung-tokong",
      "prai",
      "simpang-ampat",
    ],
    kelantan: ["kota-bharu", "tanah-merah"],
    terengganu: ["jerteh", "kuala-terengganu", "paka", "chukai"],
    perak: ["taiping", "seri-manjung", "ipoh", "tanjong-malim"],
    selangor: [
      "kuala-selangor",
      "klang",
      "kuala-langat",
      "banting",
      "shah-alam",
      "petaling-jaya",
    ],
    putrajaya: ["putrajaya-s"],
    sarawak: [
      "kuching",
      "kota-samarahan",
      "sri-aman",
      "sarikei",
      "sibu",
      "mukah",
      "kapit",
      "bintulu",
      "miri",
      "limbang",
    ],
    labuan: ["labuan"],
    sabah: ["bongawan", "keningau", "kota-kinabalu", "tawau"],
    johor: [
      "pengerang",
      "kota-tinggi",
      "pasir-gudang",
      "johor-bahru",
      "kluang",
      "batu-pahat",
      "segamat-district",
      "tangkak",
    ],
    melaka: ["bandaraya-melaka", "bukit-rambai", "alor-gajah"],
    "negeri-sembilan": ["port-dickson", "seremban", "nilai"],
    "kuala-lumpur": [
      "jalan-kiara-mont-kiara",
      "batu-muda",
      "cheras",
      "jalan-ampang-hilir",
    ],
    pahang: ["pekan", "temerloh", "jerantut", "kuantan", "balok"],
  };

  return districts[city] || [];
}

function handleCityChange() {
  const citySelect = document.getElementById("cities");
  const city = citySelect.value;

  populateDistrictDropdown(city);
}

function refreshAirQuality() {
  getAirQuality();
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  document.getElementById(
    "last-update"
  ).textContent = `Last update at ${formattedDate}`;
}

function enableDisableButton() {
  const citySelect = document.getElementById("cities");
  const districtSelect = document.getElementById("districts");
  const button = document.getElementById("getAirQualityButton");

  if (citySelect.value && districtSelect.value) {
    button.disabled = false;
  } else {
    button.disabled = true;
  }
}

populateCityDropdown();
setInterval(getAirQuality, 60000);
document.getElementById("cities").addEventListener("change", handleCityChange);
document
  .getElementById("refresh-button")
  .addEventListener("click", refreshAirQuality);
document
  .getElementById("cities")
  .addEventListener("change", enableDisableButton);
document
  .getElementById("districts")
  .addEventListener("change", enableDisableButton);
