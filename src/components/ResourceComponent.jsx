import React from "react";

const ResourceComponent = () => {
  return (
    <div
      style={{
        padding: "1rem",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1 style={{ textAlign: "left", marginBottom: "1.5rem", color: "#333" }}>
        Emergency Preparedness Resources
      </h1>
      <div>
        {/* Understanding Earthquakes */}
        <div
          style={{ textAlign: "left" }}
          className="accordion"
          id="accordionEarthquake"
        >
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingEarthquake">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseEarthquake"
                aria-expanded="true"
                aria-controls="collapseEarthquake"
                style={{
                  textAlign: "left",
                  backgroundColor: "#f5f5f5",
                  color: "#333",
                  fontWeight: "bold",
                }}
              >
                Understanding Earthquakes
              </button>
            </h2>
            <div
              id="collapseEarthquake"
              className="accordion-collapse collapse show"
              aria-labelledby="headingEarthquake"
              data-bs-parent="#accordionEarthquake"
              style={{ textAlign: "left" }}
            >
              <div className="accordion-body">
                <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                  <li>
                    <strong>Definition of Earthquakes:</strong> Earthquakes are
                    sudden shaking or movement of the Earth's crust.
                  </li>
                  <li>
                    <strong>Causes of Earthquakes:</strong> Tectonic plate
                    movements, volcanic activity, human-induced (e.g., mining).
                  </li>
                  <li>
                    <strong>Seismic Waves:</strong> Types of seismic waves
                    (e.g., P-waves, S-waves) and their effects.
                  </li>
                  <li>
                    <strong>Earthquake Magnitudes:</strong> Understanding the
                    Richter scale and its measurement of earthquake intensity.
                  </li>
                  <li>
                    <strong>Historic Earthquake Events:</strong> Examples of
                    significant earthquakes and their impacts.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Flooding */}
        <div
          style={{ textAlign: "left" }}
          className="accordion"
          id="accordionFlooding"
        >
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFlooding">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFlooding"
                aria-expanded="false"
                aria-controls="collapseFlooding"
                style={{
                  textAlign: "left",
                  backgroundColor: "#f5f5f5",
                  color: "#333",
                  fontWeight: "bold",
                }}
              >
                Understanding Flooding
              </button>
            </h2>
            <div
              id="collapseFlooding"
              className="accordion-collapse collapse"
              aria-labelledby="headingFlooding"
              data-bs-parent="#accordionFlooding"
              style={{ textAlign: "left" }}
            >
              <div className="accordion-body">
                <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                  <li>
                    <strong>Definition of Flooding:</strong> Flooding occurs
                    when water overflows onto normally dry land.
                  </li>
                  <li>
                    <strong>Causes of Flooding:</strong> Heavy rainfall, river
                    overflow, storm surges, snowmelt, and dam breaks.
                  </li>
                  <li>
                    <strong>Types of Flooding:</strong> Flash flooding, river
                    flooding, coastal flooding, urban flooding.
                  </li>
                  <li>
                    <strong>Flood Warning Systems:</strong> Understanding early
                    warning indicators and monitoring channels.
                  </li>
                  <li>
                    <strong>Flood Mitigation Strategies:</strong> Measures to
                    reduce flood risks and protect communities.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Hurricanes */}
        <div
          style={{ textAlign: "left" }}
          className="accordion"
          id="accordionHurricanes"
        >
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingHurricanes">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseHurricanes"
                aria-expanded="false"
                aria-controls="collapseHurricanes"
                style={{
                  textAlign: "left",
                  backgroundColor: "#f5f5f5",
                  color: "#333",
                  fontWeight: "bold",
                }}
              >
                Understanding Hurricanes
              </button>
            </h2>
            <div
              id="collapseHurricanes"
              className="accordion-collapse collapse"
              aria-labelledby="headingHurricanes"
              data-bs-parent="#accordionHurricanes"
              style={{ textAlign: "left" }}
            >
              <div className="accordion-body">
                <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                  <li>
                    <strong>Definition of Hurricanes:</strong> Hurricanes are
                    powerful tropical cyclones with high winds and heavy rain.
                  </li>
                  <li>
                    <strong>Hurricane Formation:</strong> Conditions required
                    for hurricane formation (e.g., warm ocean waters, low wind
                    shear).
                  </li>
                  <li>
                    <strong>Hurricane Categories:</strong> Understanding the
                    Saffir-Simpson Hurricane Wind Scale.
                  </li>
                  <li>
                    <strong>Hurricane Tracking and Forecasting:</strong>{" "}
                    Monitoring hurricane paths and intensity using weather data.
                  </li>
                  <li>
                    <strong>Notable Hurricane Disasters:</strong> Examples of
                    major hurricane events and their impacts.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Extreme Temperatures */}
        <div
          style={{ textAlign: "left" }}
          className="accordion"
          id="accordionTemperatures"
        >
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTemperatures">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTemperatures"
                aria-expanded="false"
                aria-controls="collapseTemperatures"
                style={{
                  textAlign: "left",
                  backgroundColor: "#f5f5f5",
                  color: "#333",
                  fontWeight: "bold",
                }}
              >
                Understanding Extreme Temperatures
              </button>
            </h2>
            <div
              id="collapseTemperatures"
              className="accordion-collapse collapse"
              aria-labelledby="headingTemperatures"
              data-bs-parent="#accordionTemperatures"
              style={{ textAlign: "left" }}
            >
              <div className="accordion-body">
                <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                  <li>
                    <strong>Definition of Extreme Heat:</strong> Extreme heat
                    refers to prolonged periods of high temperatures.
                  </li>
                  <li>
                    <strong>Definition of Extreme Cold:</strong> Extreme cold
                    refers to prolonged periods of low temperatures.
                  </li>
                  <li>
                    <strong>Health Risks:</strong> Understand the health risks
                    associated with both extreme heat and cold.
                  </li>
                  <li>
                    <strong>Heat Waves and Cold Snaps:</strong> Recognizing the
                    signs and impacts of these extreme temperature events.
                  </li>
                  <li>
                    <strong>Adaptation Strategies:</strong> Measures to protect
                    individuals and communities during extreme temperatures.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Wildfires */}
        <div
          style={{ textAlign: "left" }}
          className="accordion"
          id="accordionWildfires"
        >
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingWildfires">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseWildfires"
                aria-expanded="false"
                aria-controls="collapseWildfires"
                style={{
                  textAlign: "left",
                  backgroundColor: "#f5f5f5",
                  color: "#333",
                  fontWeight: "bold",
                }}
              >
                Understanding Wildfires
              </button>
            </h2>
            <div
              id="collapseWildfires"
              className="accordion-collapse collapse"
              aria-labelledby="headingWildfires"
              data-bs-parent="#accordionWildfires"
              style={{ textAlign: "left" }}
            >
              <div className="accordion-body">
                <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
                  <li>
                    <strong>Definition of Wildfires:</strong> Wildfires are
                    uncontrolled fires that occur in natural areas.
                  </li>
                  <li>
                    <strong>Causes of Wildfires:</strong> Wildfires can be
                    caused by lightning strikes, human activities like
                    campfires, or arson.
                  </li>
                  <li>
                    <strong>Factors that Influence Wildfire Spread:</strong>{" "}
                    Weather conditions (e.g., wind, humidity), terrain (e.g.,
                    slope, vegetation density).
                  </li>
                  <li>
                    <strong>Fire Behavior and Intensity:</strong> Understanding
                    the characteristics and effects of different types of
                    wildfires.
                  </li>
                  <li>
                    <strong>Wildfire Suppression Techniques:</strong> Methods
                    used by firefighters and agencies to control and extinguish
                    wildfires.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceComponent;
